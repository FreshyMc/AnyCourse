import { useImperativeHandle, useRef } from "react";
import Modal from "./Modal";

export default function RegisterModal({ref}) {
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
                <button className="btn close-btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content">
                    <h2 className="mb-4">Sign Up</h2>
                    <form>
                        <input type="email" name="email" placeholder="Email" className="form-control mb-3" />
                        <input type="password" name="password" placeholder="Password" className="form-control mb-3" />
                        <button type="submit" className="btn auth-btn">Login</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}