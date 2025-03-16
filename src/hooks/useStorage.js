import { useEffect, useState } from "react";

export default function useStorage(item, fallback = null) {
    const parseToken = (item) => {
        try {
            return JSON.parse(localStorage.getItem(item));
        } catch (error) {
            return  fallback;
        }
    };
    
    const [value, setValue] = useState(parseToken(item) ?? fallback);

    useEffect(() => {
        localStorage.setItem(item, JSON.stringify(value));
    }, [value, item]);

    return [value, setValue];
}