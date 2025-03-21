import { useState } from "react";
import useForm from "../hooks/useForm";
import { editCredentialsEndpoint } from "../utils/constants";
import PasswordInput from "./PasswordInput";

export default function EditPasswordForm() {
    const [success, setSuccess] = useState(false);

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

    const { values, loading, error, handleChange, handleSubmit, clearErrors, resetForm } = useForm(
        {
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        editCredentialsEndpoint,
        'put',
        handleSuccess,
        handleFailure
    );

    return (
        <form onSubmit={handleSubmit}>
            {success && <div className="alert alert-success" role="alert">Password changed successfully!</div>}
            {error && <div className="alert alert-danger" role="alert">{error?.message}</div>}
            <PasswordInput value={values.password} onChange={handleChange} name="password" placeholder="Current Password" required />
            <PasswordInput value={values.newPassword} onChange={handleChange} name="newPassword" placeholder="New Password" required />
            <PasswordInput value={values.confirmNewPassword} onChange={handleChange} name="confirmNewPassword" placeholder="Confirm new Password" required />
            <button type="submit" className="btn auth-btn" disabled={loading}>Change Password</button>
        </form>
    );
}