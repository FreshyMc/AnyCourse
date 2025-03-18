import { useEffect, useState } from "react";
import api from "../utils/api";
import { academyThumbnailEndpoint } from "../utils/constants";

export default function useThumbnail(path) {
    const [thumnbail, setThumbnail] = useState(null);

    useEffect(() => {
        if (!path) return;

        api.get(academyThumbnailEndpoint, {params: {path: path}, responseType: 'blob'}).then(({data}) => {
            setThumbnail(() => URL.createObjectURL(data));
        });
    }, [path]);

    return thumnbail;
}