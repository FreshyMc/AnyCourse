import { useImperativeHandle, useRef, useState } from "react";
import Modal from "./Modal";
import { createMaterialEdnpoint, getMaterialEndpoint } from "../utils/constants";
import useMaterialUpload from "../hooks/useMaterialUpload";
import api from "../utils/api";

export default function UploadMaterialModal({ academyId, handleChange, ref }) {
    const modalRef = useRef(null);
    const formRef = useRef(null);
    const [success, setSuccess] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => modalRef.current.open(),
        close: () => handleClose()
    }));

    const handleClose = () => {
        if (modalRef.current) modalRef.current.close();
        setSuccess(false);
    };

    const fetchMaterial = (id) => {
        return api.get(getMaterialEndpoint(id))
        .then(({data}) => {
            return data;
        }).catch(err => console.log('Error', err));
    };

    const handleSuccess = async (data) => {
        console.log(data);
        if (formRef.current) formRef.current.reset();
        resetForm();
        setSuccess(true);
        const material = await fetchMaterial(data.id);
        handleChange(material);
    };

    const handleFailure = (data) => {
        console.log(data);
    };

    const { values, loading, progress, handleChange: formChange, handleSubmit, resetForm } = useMaterialUpload(
        {
            shopId: `${academyId}`,
            title: '',
            description: ''
        },
        createMaterialEdnpoint,
        'post',
        handleSuccess,
        handleFailure
    );

    return (
        <Modal ref={modalRef}>
            <div className="academy-dialog">
                <button className="btn close-btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content">
                    <h2 className="mb-4">Upload Material</h2>
                    <form onSubmit={handleSubmit} ref={formRef}>
                        {success && <div className="alert alert-success" role="alert" onClick={() => setSuccess(false)}>Material uploaded successfully!</div>}
                        <input type="text" value={values.title} onChange={formChange} name="title" placeholder="Title" className="form-control mb-3" disabled={loading} required />
                        <textarea value={values.description} onChange={formChange} name="description" placeholder="Description" style={{ maxHeight: '150px' }} className="form-control mb-3" disabled={loading} required />
                        <div className="mb-3">
                            <label htmlFor="materialThumbnail" className="form-label">Select Thumbnail</label>
                            <input onChange={formChange} className="form-control" id="materialThumbnail" type="file" accept="image/*" name="thumbnail" disabled={loading} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="material" className="form-label">Select Material</label>
                            <input onChange={formChange} className="form-control" id="material" type="file" accept="video/*" name="material" disabled={loading} required />
                        </div>
                        {progress && Object.entries(progress).map(([key, value]) => <ProgressBar key={key} progress={value} />)}
                        <button type="submit" className="btn btn-primary" disabled={loading}>Upload</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

function ProgressBar({ progress }) {
    return (
        <div className="progress mb-3" role="progressbar" aria-label="Animated striped example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }} />
        </div>
    );
}