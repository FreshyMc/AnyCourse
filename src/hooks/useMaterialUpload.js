import { useState } from "react";
import api from "../utils/api";
import { uploadMaterialEndpoint, uploadMaterialThumbnailEndpoint } from "../utils/constants";

const uploadUrlMap = {
    material: (id) => uploadMaterialEndpoint(id),
    thumbnail: (id) => uploadMaterialThumbnailEndpoint(id)
};

export default function useMaterialUpload(initialValues, submitUrl, method, success, failure) {
    const chunkSize = 5000000; //5MB
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [files, setFiles] = useState(null);
    const [progress, setProgress] = useState(null);

    const resetForm = () => {
        setLoading(false);
        setValues(initialValues);
        setFiles(null);
        setProgress(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.currentTarget;

        if (type === "file") {
            const fileInput = e.currentTarget;
            if (fileInput.files.length > 0) {
                setFiles((prev) => ({...prev, [name]: fileInput.files[0] }));
            }
            return;
        }

        setValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const uploadPartially = async (file, uploadUrl, key) => {
        const fileName = file.name;

        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const chunkEnd = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, chunkEnd);

            const formData = new FormData();
            formData.append('file', chunk, fileName);

            try {
                await api.post(uploadUrl, formData, { params: { chunkNumber: i + 1, totalChunks: totalChunks } });
                setProgress((prev) => ({...prev, [key]: ((i + 1) / totalChunks) * 100}));
            } catch (error) {
                setLoading(false);
                console.log('File upload error:', error);
                return;
            }
        }
    };

    const doFileUpload = async (data) => {
        const { id } = data;

        for (const [key, file] of Object.entries(files)) {
            if (typeof uploadUrlMap[key] !== 'undefined') {
                const url = uploadUrlMap[key](id);

                await uploadPartially(file, url, key);
            }
        }

        setLoading(false);
        success(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const call = api[method];

        call(submitUrl, values).then(({ data }) => {
            doFileUpload(data);
        }).catch(({ response }) => {
            setLoading(false);
            console.log('Error occurred!', response);
            failure(response);
        });
    };

    return { values, loading, progress, handleChange, handleSubmit, resetForm };
}