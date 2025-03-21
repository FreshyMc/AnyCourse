import { useCallback, useState } from "react";
import { editProfileEndpoint } from "../utils/constants";
import useForm from "../hooks/useForm";

export default function EditProfileForm() {
    const [success, setSuccess] = useState(false);

    const successCallback = useCallback((data) => {
        console.log(data);
        resetForm();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2500);
    }, []);

    const failureCallback = useCallback((err) => {
        console.error(err);
    }, []);

    const { values, loading, error, handleChange, handleSubmit, clearErrors, resetForm } = useForm(
        {username: ''}, 
        editProfileEndpoint,
        'put',
        successCallback,
        failureCallback,
    );

    return (
        <form onSubmit={handleSubmit}>
            {success && <div class="alert alert-success" role="alert">Username changed successfully!</div>}
            <input value={values.username} onChange={handleChange} type="text" name="username" placeholder="Username" className="form-control mb-3" />
            <button type="submit" className="btn auth-btn" disabled={loading}>Save</button>
        </form>
    );
}