import { useEffect, useState } from "react";
import api from "../utils/api";
import { profileAvatarEndpoint } from "../utils/constants";

export default function useAvatar(path) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (!path) return;

        const abortController = new AbortController();

        let objectUrl = null;

        api.get(profileAvatarEndpoint, {params: {path: path}, responseType: 'blob', signal: abortController.signal}).then(({data}) => {
            objectUrl = URL.createObjectURL(data);
            setAvatar(() => objectUrl);
        });

        return () => {
            abortController.abort()
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [path]);

    return avatar;
}