import { useEffect, useState } from "react";
import api from "../utils/api";
import { profileAvatarEndpoint } from "../utils/constants";

export default function useAvatar(path) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (!path) return;

        api.get(profileAvatarEndpoint, {params: {path: path}, responseType: 'blob'}).then(({data}) => {
            setAvatar(() => URL.createObjectURL(data));
        });
    }, [path]);

    return avatar;
}