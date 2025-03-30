import { useEffect, useState } from "react";
import api from "../utils/api";
import { academyThumbnailEndpoint } from "../utils/constants";

export default function useThumbnail(path) {
    const [thumnbail, setThumbnail] = useState(null);

    useEffect(() => {
        if (!path) return;

        const abortController = new AbortController();

        let objectUrl = null;

        api.get(academyThumbnailEndpoint, {params: {path: path}, responseType: 'blob', signal: abortController.signal}).then(({data}) => {
            objectUrl = URL.createObjectURL(data);
            setThumbnail(() => objectUrl);
        });

        return () => {
            abortController.abort()
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [path]);

    return thumnbail;
}