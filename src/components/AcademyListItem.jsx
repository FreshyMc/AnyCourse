import useAvatar from "../hooks/useAvatar";
import useThumbnail from "../hooks/useThumbnail";
import AcademyFollowBtn from "./AcademyFollowBtn";
import Avatar from "./Avatar";

export default function AcademyListItem({id, name, description, thumbnail, followersCount, ownerId, ownerUsername, ownerAvatar, following}) {
    const avatar = useAvatar(ownerAvatar);
    const academyThumbnail = useThumbnail(thumbnail);

    const style = academyThumbnail ? {backgroundImage: `url(${academyThumbnail})`} : {};

    return (
        <div className="academy">
            <div className="academy-thumbnail" style={style}>
                <h3>{name}</h3>
            </div>
            <div className="academy-bottom">
                <div className="d-flex px-4 py-3">
                    <div className="lecturer">
                        <Avatar src={avatar} username={ownerUsername} />
                        <span>{ownerUsername}</span>
                    </div>
                    <div className="actions">
                        <AcademyFollowBtn id={id} follower={following} />
                    </div>
                </div>
                <div className="academy-description">
                    <h4 className="m-0">Description</h4>
                    <p className="m-0">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}