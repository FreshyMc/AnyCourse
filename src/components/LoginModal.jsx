import { useCallback, useImperativeHandle, useRef, useState } from "react";
import Modal from "./Modal";
import useForm from "../hooks/useForm";
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
    const { values, loading, error, handleChange, handleSubmit, clearErrors } = useForm(
        {email: '', password: ''}, 
        loginEndpoint, 
        successCallback, 
        failureCallback
    );
    const modalRef = useRef(null);

    const handleClose = () => {
        modalRef.current.close();
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