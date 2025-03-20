import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";

export default function useFetch(url, config = {}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const stableConfig = useMemo(() => config, [JSON.stringify(config)]);

    useEffect(() => {
        setLoading(true);

        api.get(url, stableConfig).then(({data}) => {
            setData(data);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false));
    }, [url, stableConfig]);

    return [data, loading];
}