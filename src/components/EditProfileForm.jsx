import { useCallback } from "react";
import { editProfileEndpoint } from "../utils/constants";
import useForm from "../hooks/useForm";

export default function EditProfileForm() {
    const successCallback = useCallback((data) => {
        console.log(data);
    }, []);

    const failureCallback = useCallback((err) => {
        console.error(err);
    }, []);

    const { values, loading, error, handleChange, handleSubmit, clearErrors } = useForm(
        {username: ''}, 
        editProfileEndpoint,
        'put',
        successCallback,
        failureCallback,
    );

    return (
        <form onSubmit={handleSubmit}>
            <input value={values.username} onChange={handleChange} type="text" name="username" placeholder="Username" className="form-control mb-3" />
            <button type="submit" className="btn auth-btn">Save</button>
        </form>
    );
}