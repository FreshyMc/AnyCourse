import EditPasswordForm from "../components/EditPasswordForm";
import EditProfileForm from "../components/EditProfileForm";
import Footer from "../components/Footer";

export default function EditProfilePage() {
    return (
        <>
            <main className="row edit-profile-main">
                <div className="col-5 p-0 my-4 edit-profile-form-wrapper">
                    <div className="form-heading text-center p-2">
                        <h3>Edit Profile</h3>
                        <p>
                            Edit your profile username and change password here
                        </p>
                    </div>
                    <div className="m-0 p-0 separator" />
                    <EditProfileForm />
                    <div className="m-0 p-0 separator" />
                    <EditPasswordForm />
                </div>
            </main>
            <Footer />
        </>
    );
}