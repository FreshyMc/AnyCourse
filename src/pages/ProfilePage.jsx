import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import { academiesEndpoint, profileEndpoint } from "../utils/constants";
import useFetch from "../hooks/useFetch";
import useAvatar from "../hooks/useAvatar";
import AcademyList from "../components/AcademyList";
import { useEffect } from "react";
import { Link } from "react-router";

export default function ProfilePage() {
    const [profile, loading] = useFetch(profileEndpoint);
    const avatar = useAvatar(profile?.avatar ?? null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <header className="row profile-heading">
                <div className="col-12">
                    <div className="profile-wrapper m-0">
                        <div className="profile-avatar">
                            <Avatar src={avatar} username={profile?.username ?? ''} />
                        </div>
                        <p className="m-0 profile-username">{profile?.username}</p>
                        <div className="profile-actions">
                            <Link to='/edit-profile' className="edit-profile-btn">
                                <span>Edit Profile</span>
                                <i className="fa-solid fa-pen" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className="row">
                <div className="col-12 academy-list-outer-wrapper">
                    <h2 className="section-title">My Academies</h2>
                    <AcademyList requestParams={{ owner_id: profile?.id }} />
                </div>
                <div className="col-12 academy-list-outer-wrapper">
                    <h2 className="section-title">Following Academies</h2>
                    <AcademyList requestParams={{ follower_id: profile?.id }} />
                </div>
            </main>
            <Footer />
        </>
    );
}