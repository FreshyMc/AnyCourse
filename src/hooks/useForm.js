import { useState } from "react";
import api from "../utils/api";

export default function useForm(initialValues, submitUrl, method, success, failure) {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
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

        const call = api[method];

        call(submitUrl, values).then(({data}) => {
            success(data);
        }).catch(({response}) => {
            setError(response.data);
            console.log('Error occurred!', response);
            failure(response);
        }).finally(() => {
            setLoading(false);
        });
    };

    return { values, error, loading, handleChange, resetForm, handleSubmit, clearErrors };
}