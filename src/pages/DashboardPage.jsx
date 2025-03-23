import { useRef } from "react";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import useAvatar from "../hooks/useAvatar";
import useFetch from "../hooks/useFetch";
import { createAcademyEndpoint, profileEndpoint } from "../utils/constants";
import Modal from "../components/Modal";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router";

export default function DashboardPage() {
    const [profile, profileLoading] = useFetch(profileEndpoint);
    const avatar = useAvatar(profile?.avatar ?? null);
    const navigate = useNavigate();

    const academyModalRef = useRef(null);

    const successHandler = (data) => {
        console.log('Success', data);
        resetForm();
        navigate(`/academy/${data.id}`);
    };

    const handleAcademyCreation = () => {
        if (academyModalRef.current) academyModalRef.current.open();
    };

    const handleClose = () => {
        if (academyModalRef.current) academyModalRef.current.close();
    };

    const {values, loading, handleChange, handleSubmit, resetForm} = useForm(
        {
            name: '',
            description: ''
        },
        createAcademyEndpoint,
        'post',
        successHandler,
        (data) => {console.log('Failure', data)}
    );

    return (
        <>
            <main className="row">
                <div className="col-12 dashboard-header">
                    <div className="dashboard-avatar">
                        <Avatar src={avatar} username={profile?.username ?? ''} />
                    </div>
                    <h2 className="ps-4">Welcome back, <span className="underscored-light">{profile?.username}</span>!</h2>
                </div>
                <div className="col-8 mx-auto dashboard-panel">
                    <h3>My Dashboard</h3>
                    <div className="create-academy-wrapper mt-4">
                        <button className="btn btn-primary" onClick={handleAcademyCreation}>Create Academy</button>
                    </div>
                </div>
            </main>
            <Modal ref={academyModalRef}>
                <div className="academy-dialog">
                    <button className="btn close-btn" onClick={handleClose}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                    <div className="content">
                        <h2 className="mb-4">Create Academy</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={values.name} onChange={handleChange} name="name" placeholder="Academy Name"  className="form-control mb-3" />
                            <textarea value={values.description} onChange={handleChange} name="description" placeholder="Acamdemy Description" style={{maxHeight: '150px'}}  className="form-control mb-3" />
                            <button type="submit" className="btn btn-primary" disabled={loading}>Create</button>
                        </form>
                    </div>
                </div>
            </Modal>
            <Footer />
        </>
    );
}