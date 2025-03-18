import { useState } from "react";
import api from "../utils/api";
import { followAcademyEndpoint, unfollowAcademyEndpoint } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";

export default function AcademyFollowBtn({ id, follower }) {
    const { loggedIn, openLogin } = useAuth();
    const [inRequest, setRequest] = useState(false);
    const [following, setFollowing] = useState(follower);

    const handleFollow = (e) => {
        setRequest(true);

        api.post(followAcademyEndpoint(id)).then(({ statusText }) => {
            if (statusText === 'OK') {
                setFollowing(true);
            }
        }).finally(() => setRequest(false));
    };

    const handleUnfollow = (e) => {
        setRequest(true);

        api.post(unfollowAcademyEndpoint(id)).then(({ statusText }) => {
            if (statusText === 'OK') {
                setFollowing(false);
            }
        }).finally(() => setRequest(false));
    };

    if (!loggedIn) {
        return (
            <button className="btn follow-btn" onClick={openLogin} disabled={inRequest}>
                <span>Follow Academy</span>
                <i className="fa-solid fa-plus" />
            </button>
        )
    }

    return following ? (
        <button className="btn unfollow-btn" onClick={handleUnfollow} disabled={inRequest}>
            <span>Unfollow Academy</span>
            <i className="fa-solid fa-minus" />
        </button>
    ) : (
        <button className="btn follow-btn" onClick={handleFollow} disabled={inRequest}>
            <span>Follow Academy</span>
            <i className="fa-solid fa-plus" />
        </button>
    )
}