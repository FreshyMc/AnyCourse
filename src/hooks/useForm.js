import axios from "axios";
import { useState } from "react";

export default function useForm(initialValues, submitUrl, success, failure, validate = () => ({validated: true, errors: []})) {
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

        const {validated, errors} = validate(values);

        if (!validated) {
            setLoading(false);
            setError({message: errors.join(', ')});
            return;
        }

        axios.post(submitUrl, values).then(({data}) => {
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