import { useEffect, useState } from "react";
import api from "../utils/api";
import { materialThumbnailEndpoint } from "../utils/constants";

export default function useMaterialThumbnail(id) {
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (!id) return;

        const abortController = new AbortController();

        let objectUrl = null;

        api.get(materialThumbnailEndpoint(id), {responseType: 'blob', signal: abortController.signal}).then(({data}) => {
            objectUrl = URL.createObjectURL(data);
            setThumbnail(() => objectUrl);
        });

        return () => {
            abortController.abort()
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [id]);

    return thumbnail;
}