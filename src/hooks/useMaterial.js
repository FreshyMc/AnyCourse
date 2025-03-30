import { useEffect, useState } from "react";
import api from "../utils/api";
import { getMaterialEndpoint } from "../utils/constants";

export default function useMaterial(id) {
    const [loading, setLoading] = useState(true);
    const [material, setMaterial] = useState(null);

    useEffect(() => {
        api.get(getMaterialEndpoint(id)).then(({data}) => {
            setMaterial(data);
        }).catch(error => {
            console.log(error);
        }).finally(() => setLoading(false));
    }, [id]);

    return [material, loading];
}