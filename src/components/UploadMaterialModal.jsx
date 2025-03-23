import { useImperativeHandle, useRef, useState } from "react";
import Modal from "./Modal";
import { createMaterialEdnpoint, uploadMaterialEndpoint } from "../utils/constants";
import useMultipartForm from "../hooks/useMultipartForm";

export default function UploadMaterialModal({ academyId, ref }) {
    const modalRef = useRef(null);
    const formRef = useRef(null);
    const [success, setSuccess] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => modalRef.current.open(),
        close: () => modalRef.current.close()
    }));

    const handleClose = () => {
        if (modalRef.current) modalRef.current.close();
    };

    const handleSuccess = (data) => {
        console.log(data);
        if (formRef.current) formRef.current.reset();
        resetForm();
        setSuccess(true);
    };

    const handleFailure = (data) => {
        console.log(data);
    };

    const { values, loading, progress, handleChange, handleSubmit, resetForm } = useMultipartForm(
        {
            shopId: `${academyId}`,
            title: '',
            description: ''
        },
        createMaterialEdnpoint,
        uploadMaterialEndpoint,
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
                        <input type="text" value={values.title} onChange={handleChange} name="title" placeholder="Title" className="form-control mb-3" disabled={loading} />
                        <textarea value={values.description} onChange={handleChange} name="description" placeholder="Description" style={{ maxHeight: '150px' }} className="form-control mb-3" disabled={loading} />
                        <div className="mb-3">
                            <label htmlFor="profilePicture" className="form-label">Select Material</label>
                            <input onChange={handleChange} className="form-control" id="profilePicture" type="file" accept="video/*" disabled={loading} required />
                        </div>
                        {progress && (
                            <div className="progress mb-3" role="progressbar" aria-label="Animated striped example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }} />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary" disabled={loading}>Upload</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}