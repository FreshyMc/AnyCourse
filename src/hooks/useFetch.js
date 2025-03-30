import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";

export default function useFetch(url, config = {}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const stableConfig = useMemo(() => config, [JSON.stringify(config)]);

    useEffect(() => {
        setLoading(true);

        const abortController = new AbortController();
        
        api.get(url, {...stableConfig, signal: abortController.signal}).then(({data}) => {
            setData(data);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false));

        return () => abortController.abort();
    }, [url, stableConfig]);

    return [data, loading, setData];
}