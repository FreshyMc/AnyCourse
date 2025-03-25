import useMaterialThumbnail from "../hooks/useMaterialThumbnail";

export default function Material({title, description, id}) {
    const thumbnail = useMaterialThumbnail(id);

    return (
        <div className="material">
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