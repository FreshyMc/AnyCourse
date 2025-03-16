export default function AuthAlert({ message, handleClose, success = false }) {
    const alertStyle = success ? 'success' : 'error';

    return (
        <div className={`auth-alert ${alertStyle}`}>
            <p className="m-0 p-0">{message}</p>
            {!success && (
                <button type="button" className="btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark fa-lg" />
                </button>)
            }
        </div>
    );
}