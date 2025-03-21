import { useCallback, useImperativeHandle, useRef, useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { registerEndpoint } from "../utils/constants";
import useAuthForm from "../hooks/useAuthForm";
import AuthAlert from "./AuthAlert";
import PasswordInput from "./PasswordInput";

export default function RegisterModal({ref}) {
    const [success, setSuccess] = useState(false);
    const { setToken, closeRegister } = useAuth();

    const successCallback = useCallback((data) => {
        setSuccess(true);
        setToken(data.token);
        setTimeout(() => {
            closeRegister();
            setSuccess(false);
        }, 1000);
    }, []);

    const failureCallback = useCallback((err) => {
        console.error(err);

    }, []);

    const validate = (values) => {
        const emptyFields = Object.values(values).some(value => !value.trim());

        const {password, confirmPassword} = values;

        const notValid = emptyFields || password !== confirmPassword;

        let errors = [];

        if (notValid) {
            if (emptyFields) {
                errors.push('Please fill all the fields');

                return {validated: false, errors};
            } else {
                errors.push('Passwords don\'t match');
                
                return {validated: false, errors};
            }
        }

        return {validated: true, errors};
    }

    const { values, loading, error, handleChange, handleSubmit, clearErrors } = useAuthForm(
        {email: '', password: '', confirmPassword: '', username: ''}, 
        registerEndpoint, 
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
                {success && <AuthAlert message={'Successfully registered!'} success />}
                <button className="btn close-btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content">
                    <h2 className="mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={values.username} type="text" name="username" placeholder="Username" className="form-control mb-3" />
                        <input onChange={handleChange} value={values.email} type="email" name="email" placeholder="Email" className="form-control mb-3" />
                        <PasswordInput onChange={handleChange} value={values.password} type="password" name="password" placeholder="Password" />
                        <PasswordInput onChange={handleChange} value={values.confirmPassword} type="password" name="confirmPassword" placeholder="Confirm password" />
                        <button type="submit" className="btn auth-btn" disabled={loading}>Register</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}