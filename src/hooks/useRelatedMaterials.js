import { useEffect, useState } from "react";
import { getRelatedMaterialsEndpoint } from "../utils/constants";
import api from "../utils/api";

export default function useRelatedMaterials(materialId, size = 15) {
    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        api.get(getRelatedMaterialsEndpoint, {params: {related_to: materialId, page, size}}).then(({data}) => {
            setMaterials((prev) => [...prev, ...data.content]);
        }).catch(error => {
            console.log(error);
        }).finally(() => setLoading(false));

        return () => {
            setMaterials([]);
            setPage(0);
        }
    }, [materialId, page]);

    const getNextPage = () => setPage(prev => prev + 1);

    return [materials, loading, getNextPage];
}