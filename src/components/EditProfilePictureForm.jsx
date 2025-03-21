import { useRef, useState } from "react";
import useForm from "../hooks/useForm";
import { editAvatarEdnpoint } from "../utils/constants";
import useFileUpload from "../hooks/useFileUpload";

export default function EditProfilePictureForm() {
    const formRef = useRef(null);
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        if (formRef.current) formRef.current.reset();
    };

    const handleSuccess = () => {
        resetForm();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2500);
    };

    const handleFailure = (data) => {
        console.log(data);
    };

    const {file, loading, fileChange, handleSubmit} = useFileUpload(editAvatarEdnpoint, 'post', 'avatar', handleSuccess, handleFailure);

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            {success && <div className="alert alert-success" role="alert">Profile picture changed successfully!</div>}
            <div className="mb-3">
                <label htmlFor="profilePicture" className="form-label">Select Profile Picture</label>
                <input onChange={fileChange} className="form-control" id="profilePicture" type="file" accept="image/*" required />
            </div>
            <button type="submit" className="btn auth-btn" disabled={loading}>Upload</button>
        </form>
    );
}