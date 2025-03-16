import axios from "axios";
import { useState } from "react";
import { loginEndpoint } from "../utils/constants";

export default function useForm(initialValues, submitUrl, success, failure) {
    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.currentTarget;

        setValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const clearErrors = () => setError(() => null);

    const resetForm = () => setValues(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        axios.post(loginEndpoint, values).then(({data}) => {
            success(data);
        }).catch(({response}) => {
            setError(response.data);
            console.log('Error occurred!', response);
            failure(response);
        }).finally(() => {
            setLoading(false);
        });
    };

    return { values, loading, error, handleChange, resetForm, handleSubmit, clearErrors };
}