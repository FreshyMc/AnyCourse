import { useEffect, useState } from "react";
import api from "../utils/api";

export default function useFetch(url, config = {}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setLoading(true);

        api.get(url, config).then(({data}) => {
            setData(data);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false));
    }, [url]);

    return [data, loading];
}