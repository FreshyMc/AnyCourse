import { useRef, useImperativeHandle, useState, useEffect } from "react";
import Modal from "./Modal";
import useForm from "../hooks/useForm";
import { editAcademyEndpoint } from "../utils/constants";

export default function EditAcademyModal({ academyId, data, handleChange: change, ref }) {
    const [academy, setAcademy] = useState(data);
    const [success, setSuccess] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        setAcademy(() => data);
    }, [JSON.stringify(data)]);

    useImperativeHandle(ref, () => ({
        open: () => modalRef.current.open(),
        close: () => modalRef.current.close()
    }));

    const handleClose = () => {
        if (modalRef.current) modalRef.current.close();
    };

    const handleSuccess = (data) => {
        change(data);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2500);
    };

    const handleFailure = (data) => {
        console.log(data);
    };

    const { values, loading, handleChange, handleSubmit, resetForm } = useForm(
        {
            id: `${academyId}`,
            name: academy?.name ?? '',
            description: academy?.description ?? ''
        },
        editAcademyEndpoint,
        'put',
        handleSuccess,
        (data) => { console.log('Failure', data) }
    );

    return (
        <Modal ref={modalRef}>
            <div className="academy-dialog">
                <button className="btn close-btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content">
                    <h2 className="mb-4">Edit Academy</h2>
                    <form onSubmit={handleSubmit}>
                        {success && <div className="alert alert-success" role="alert">Academy details changes successfully!</div>}
                        <input type="hidden" value={values.id} />
                        <input type="text" value={values.name} onChange={handleChange} name="name" placeholder="Academy Name" className="form-control mb-3" />
                        <textarea value={values.description} onChange={handleChange} name="description" placeholder="Acamdemy Description" style={{ maxHeight: '150px' }} className="form-control mb-3" />
                        <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}