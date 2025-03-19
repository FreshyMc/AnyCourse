import { useEffect, useRef, useState } from "react";
import AcademyListItem from "./AcademyListItem";
import api from "../utils/api";
import { academiesEndpoint } from "../utils/constants";
import useFetch from "../hooks/useFetch";

const TOTAL = 5;

const initialPage = {page: 1, total: 1, content: []};

export default function AcademyList({requestEndpoint = academiesEndpoint, requestParams = {}}) {
    const [data, loading] = useFetch(requestEndpoint, {params: requestParams});
    const [{page, total, content}, setPage] = useState(initialPage);
    const wrapperRef = useRef(null);

    const handleSlideLeft = () => {
        setPage((prevPage) => ({...prevPage, page: Math.max(1, --prevPage.page)}));
    };

    const handleSlideRight = () => {
        setPage((prevPage) => ({...prevPage, page: Math.min(Math.ceil(total / 2), ++prevPage.page)}));
    };

    const getWidth = () => {
        const { width } = wrapperRef.current?.getBoundingClientRect() ?? 1;

        return width;
    };

    useEffect(() => {
        setPage(() => data ?? initialPage);
    }, [data]);

    return (
        <div className="academy-list-wrapper mt-3">
            {page !== 1 && (
                <button className="btn next-btn left" onClick={handleSlideLeft}>
                    <i className="fa-solid fa-chevron-left fa-lg" />
                </button>)
            }
            {page < total / 2 && (
                <button className="btn next-btn right" onClick={handleSlideRight}>
                    <i className="fa-solid fa-chevron-right fa-lg" />
                </button>)
            }
            <div className="academy-list">
                <div className="academies" style={{ left: `-${(page - 1) * (getWidth() / 2 + 7)}px` }} ref={wrapperRef}>
                    {content.map(item => <AcademyListItem key={item.id} {...item} />)}
                </div>
            </div>
        </div>
    );
}