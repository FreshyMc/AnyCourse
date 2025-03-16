import { useEffect, useState } from "react";

export default function useStorage(item, fallback = null) {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(item)) ?? fallback);

    useEffect(() => {
        localStorage.setItem(item, JSON.stringify(value));
    }, [value, item]);

    return [value, setValue];
}