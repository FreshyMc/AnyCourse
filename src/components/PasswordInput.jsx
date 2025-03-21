import { useState } from "react";

export default function PasswordInput({value, onChange, name, placeholder, ...other}) {
    const [hide, setHide] = useState(true);
    
    return (
        <div className="input-group mb-3">
            <input {...other} value={value} onChange={onChange} type={hide ? 'password' : 'text'} name={name} placeholder={placeholder} className="form-control" />
            <button type="button" className="input-group-text d-flex align-items-center justify-content-center" style={{width: '50px'}} onClick={() => setHide(prev => !prev)}>
                {hide ? <i className="fa-solid fa-eye-slash" /> : <i className="fa-solid fa-eye" />}
            </button>
        </div>
    );
}