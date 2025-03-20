import { useCallback, useImperativeHandle, useRef, useState } from "react";
import Modal from "./Modal";
import useAuthForm from "../hooks/useAuthForm";
import { loginEndpoint } from "../utils/constants";
import AuthAlert from "./AuthAlert";
import { useAuth } from "../contexts/AuthContext";

export default function LoginModal({ref}) {
    const [success, setSuccess] = useState(false);
    const { setToken, closeLogin } = useAuth();

    const successCallback = useCallback((data) => {
        setSuccess(true);
        setToken(data.token);
        setTimeout(() => {
            closeLogin();
            setSuccess(false);
        }, 1000);
    }, []);

    const failureCallback = useCallback((err) => {
        console.error(err);

    }, []);

    const validate = (values) => {
        const emptyFields = Object.values(values).some(value => !value.trim());

        const notValid = emptyFields;

        let errors = [];

        if (notValid) {
            errors.push('Please fill all the fields');

            return {validated: false, errors};
        }

        return {validated: true, errors};
    };

    const { values, loading, error, handleChange, handleSubmit, clearErrors } = useAuthForm(
        {email: '', password: ''}, 
        loginEndpoint, 
        successCallback, 
        failureCallback,
        validate
    );

    const modalRef = useRef(null);

    const handleClose = () => {
        modalRef.current.close();
        clearErrors();
    };

    useImperativeHandle(ref, () => {
        return {
            open: modalRef.current.open,
            close: modalRef.current.close
        };
    }, []);

    return (
        <Modal ref={modalRef}>
            <div className="auth-dialog">
                {error?.message && <AuthAlert message={error?.message} handleClose={clearErrors} />}
                {success && <AuthAlert message={'Successfully logged in!'} success />}
                <button className="btn close-btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content">
                    <h2 className="mb-4">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={values.email} type="email" name="email" placeholder="Email" className="form-control mb-3" />
                        <input onChange={handleChange} value={values.password} type="password" name="password" placeholder="Password" className="form-control mb-3" />
                        <button type="submit" className="btn auth-btn" disabled={loading}>Login</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}