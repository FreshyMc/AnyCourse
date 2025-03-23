import { useImperativeHandle, useRef, useState } from "react";
import Modal from "./Modal";
import useFileUpload from "../hooks/useFileUpload";
import { editThumbnailEndpoint } from "../utils/constants";

export default function ChangeThumbnailModal({ academyId, handleChange, ref }) {
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

    const resetForm = () => {
        if (formRef.current) formRef.current.reset();
    };

    const handleSuccess = (data) => {
        handleChange(data);
        resetForm();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            handleClose();
        }, 2500);
    };

    const handleFailure = (data) => {
        console.log(data);
    };

    const { file, loading, fileChange, handleSubmit } = useFileUpload(editThumbnailEndpoint(academyId), 'post', 'thumbnail', handleSuccess, handleFailure);

    return (
        <Modal ref={modalRef}>
            <div className="academy-dialog">
                <button className="btn close-btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content">
                    <h2 className="mb-4">Change Academy Thumbnail</h2>
                    <form onSubmit={handleSubmit} ref={formRef}>
                        {success && <div className="alert alert-success" role="alert">Academy thumbnail changed successfully!</div>}
                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">Select Thumbnail Picture</label>
                            <input onChange={fileChange} className="form-control" id="thumbnail" type="file" accept="image/*" required />
                        </div>
                        <button type="submit" className="btn auth-btn" disabled={loading}>Upload</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}