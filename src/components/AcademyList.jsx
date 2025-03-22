import { useEffect, useRef, useState } from "react";
import AcademyListItem from "./AcademyListItem";
import { academiesEndpoint } from "../utils/constants";
import useFetch from "../hooks/useFetch";

const initialPage = {page: 1, total: 1, content: []};

const OFFSET_PER_PAGE = 1;

export default function AcademyList({requestEndpoint = academiesEndpoint, requestParams = {}}) {
    const [data, loading] = useFetch(requestEndpoint, {params: requestParams});
    const [{page, total, content}, setPage] = useState(initialPage);
    const wrapperRef = useRef(null);

    const maxPages = Math.ceil(total / OFFSET_PER_PAGE);

    const handleSlideLeft = () => {
        setPage((prevPage) => ({...prevPage, page: Math.max(1, prevPage.page - 1)}));
    };

    const handleSlideRight = () => {
        setPage((prevPage) => ({...prevPage, page: Math.min(maxPages, prevPage.page + 1)}));
    };

    const getWidth = () => {
        const { width } = wrapperRef.current?.getBoundingClientRect() ?? 1;

        return width;
    };

    useEffect(() => {
        setPage(() => data ?? initialPage);
    }, [data]);

    const offsetLeft = (getWidth() / 2 + 7) * ((page - 1) * OFFSET_PER_PAGE);

    return (
        <div className="academy-list-wrapper mt-3">
            {page > 1 && (
                <button className="btn next-btn left" onClick={handleSlideLeft}>
                    <i className="fa-solid fa-chevron-left fa-lg" />
                </button>)
            }
            {(page < maxPages - OFFSET_PER_PAGE) && (
                <button className="btn next-btn right" onClick={handleSlideRight}>
                    <i className="fa-solid fa-chevron-right fa-lg" />
                </button>)
            }
            <div className="academy-list">
                <div className="academies" style={{ left: `-${offsetLeft}px` }} ref={wrapperRef}>
                    {content.map(item => <AcademyListItem key={item.id} {...item} />)}
                </div>
            </div>
        </div>
    );
}