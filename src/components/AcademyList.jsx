import { useRef, useState } from "react";
import AcademyListItem from "./AcademyListItem";

const TOTAL = 5;

export default function AcademyList() {
    const [page, setPage] = useState(0);
    const wrapperRef = useRef(null);

    const handleSlideLeft = () => {
        setPage((prevPage) => Math.max(0, --prevPage));
    };

    const handleSlideRight = () => {
        setPage((prevPage) => Math.min(Math.ceil(TOTAL / 2), ++prevPage));
    };

    const getWidth = () => {
        const { width } = wrapperRef.current?.getBoundingClientRect() ?? 1;

        return width;
    };

    return (
        <div className="academy-list-wrapper mt-3">
            {page !== 0 && (
                <button className="btn next-btn left" onClick={handleSlideLeft}>
                    <i className="fa-solid fa-chevron-left fa-lg" />
                </button>)
            }
            {page < TOTAL / 2 && (
                <button className="btn next-btn right" onClick={handleSlideRight}>
                    <i className="fa-solid fa-chevron-right fa-lg" />
                </button>)
            }
            <div className="academy-list">
                <div className="academies" style={{ left: `-${page * (getWidth() / 2 + 7)}px` }} ref={wrapperRef}>
                    <AcademyListItem />
                    <AcademyListItem />
                    <AcademyListItem />
                    <AcademyListItem />
                    <AcademyListItem />
                </div>
            </div>
        </div>
    );
}