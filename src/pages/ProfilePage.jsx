import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import { profileEndpoint } from "../utils/constants";
import useFetch from "../hooks/useFetch";
import useAvatar from "../hooks/useAvatar";

export default function ProfilePage() {
    const [profile, loading] = useFetch(profileEndpoint);
    const avatar = useAvatar(profile?.avatar ?? null);

    return (
        <>
            <header className="row profile-heading">
                <div className="col-12">
                    <div className="profile-wrapper m-0">
                        <div className="profile-avatar">
                            <Avatar src={avatar} username={profile?.username ?? ''} />
                        </div>
                        <p className="m-0 profile-username">{profile?.username}</p>
                    </div>
                </div>
            </header>
            <Footer />
        </>
    );
}