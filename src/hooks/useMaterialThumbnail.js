import { useEffect, useState } from "react";
import api from "../utils/api";
import { materialThumbnailEndpoint } from "../utils/constants";

export default function useMaterialThumbnail(id) {
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (!id) return;

        api.get(materialThumbnailEndpoint(id), {responseType: 'blob'}).then(({data}) => {
            setThumbnail(() => URL.createObjectURL(data));
        });
    }, [id]);

    return thumbnail;
}