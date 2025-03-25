import { useEffect, useState } from "react";
import api from "../utils/api";
import { allMaterialsEndpoint } from "../utils/constants";

export default function useMaterials(academyId) {
    const [loading, setLoading] = useState(false);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        if (!academyId) return;
        setLoading(true);

        api.get(allMaterialsEndpoint, {params: {shop_id: academyId}})
        .then(({data}) => {
            setMaterials([...data.content]);
        })
        .catch(err => console.log('Error', err))
        .finally(() => {
            setLoading(false);
        });
    }, [academyId]);

    const addMaterial = (material) => {
        setMaterials((prev) => [material, ...prev]);
    };

    return [materials, addMaterial, loading];
}