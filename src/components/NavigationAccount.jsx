import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { profileAvatarEndpoint, profileEndpoint } from "../utils/constants";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function NavigationAccount() {
    const { loggedIn, setToken } = useAuth();
    const [profile, loading] = useFetch(profileEndpoint);
    const [avatar, setAvatar] = useState(null);

    const handleLogout = () => {
        setToken(() => null);
    };

    useEffect(() => {
        if (!profile?.avatar) return;

        api.get(profileAvatarEndpoint, {params: {path: profile.avatar}, responseType: 'blob'}).then(({data}) => {
            setAvatar(() => URL.createObjectURL(data));
        });
    }, [profile]);

    return (
        <div className="account-menu">
            <div className="avatar-icon">
                {avatar ? <img className="img-fluid img-avatar" src={avatar} /> : <span className="text-avatar">{profile?.username.slice(0, 1)}</span>}
            </div>
            <div className="account-menu-items-wrapper">
                <ul className="m-0 list-unstyled account-menu-items">
                    <li>
                        <Link to='/my-profile'>My Profile</Link>
                    </li>
                    <li>
                        <Link to='/dashboard'>My Dashboard</Link>
                    </li>
                    <li className="separated">
                        <button className="btn logout-btn" onClick={handleLogout}>
                            <span>Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}