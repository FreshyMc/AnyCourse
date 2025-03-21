import { useState } from "react";
import api from "../utils/api";

export default function useFileUpload(submitUrl, method, name, success, failure) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(name, file, file.name);

        setLoading(true);

        const call = api[method];

        call(submitUrl, formData).then(({data}) => {
            success(data);
        }).catch(({response}) => {
            setError(response.data);
            console.log('Error occurred!', response);
            failure(response);
        }).finally(() => {
            setLoading(false);
        });
    };

    const fileChange = (e) => {
        setFile(e.currentTarget.files[0]);
    };

    return {file, loading, fileChange, handleSubmit};
}