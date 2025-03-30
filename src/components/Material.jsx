import { useNavigate } from "react-router";
import useMaterialThumbnail from "../hooks/useMaterialThumbnail";

export default function Material({title, description, id}) {
    const thumbnail = useMaterialThumbnail(id);
    const navigate = useNavigate();

    const handleClick = () => {
        return navigate(`/material/${id}`);
    };

    return (
        <div className="material" onClick={handleClick}>
            <div className="material-thumbnail">
                <img src={thumbnail} alt="Thumbnail" />
                <button className="play-btn m-0 p-0">
                    <i className="fa-solid fa-play fa-lg" />
                </button>
            </div>
            <p className="m-0 p-3 material-title">{title}</p>
        </div>
    );
}