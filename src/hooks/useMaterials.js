import { useEffect, useState } from "react";
import api from "../utils/api";
import { allMaterialsEndpoint } from "../utils/constants";

export default function useMaterials(academyId) {
    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        if (!academyId) return;
        setLoading(true);

        const abortController = new AbortController();

        api.get(allMaterialsEndpoint, {params: {shop_id: academyId}, signal: abortController.signal})
        .then(({data}) => {
            setMaterials([...data.content]);
        })
        .catch(err => console.log('Error', err))
        .finally(() => {
            setLoading(false);
        });

        return () => abortController.abort();
    }, [academyId]);

    const addMaterial = (material) => {
        setMaterials((prev) => [material, ...prev]);
    };

    return [materials, addMaterial, loading];
}