import { useParams } from "react-router";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import AcademyFollowBtn from "../components/AcademyFollowBtn";
import Material from "../components/Material";
import MaterialsWrapper from "../components/MaterialsWrapper";
import useFetch from "../hooks/useFetch";
import { getAcademyEndpoint } from "../utils/constants";
import useAvatar from "../hooks/useAvatar";
import useThumbnail from "../hooks/useThumbnail";

export default function AcademyPage() {
    const { id } = useParams();
    const [academy, loading] = useFetch(getAcademyEndpoint(id));
    const avatar = useAvatar(academy?.ownerAvatar ?? null);
    const thumbnail = useThumbnail(academy?.thumbnail ?? null);

    const style = thumbnail ? { backgroundImage: `url(${thumbnail})` } : {};

    return (
        <>
            <main className="row">
                <div className="academy-header col-12"></div>
                <div className="col-8 mx-auto p-0 academy-page-wrapper d-flex flex-column">
                    <div className="academy-page-thumbnail" style={style}>
                        <h2 className="m-0">{academy?.name}</h2>
                    </div>
                    <div className="acamemy-page-content container">
                        <div className="row px-4 py-3">
                            <div className="col-6 academy-owner">
                                <div className="owner-avatar">
                                    <Avatar src={avatar} username={academy?.ownerUsername ?? ''} />
                                </div>
                                <p className="m-0 ps-3 fs-4">{academy?.ownerUsername}</p>
                            </div>
                            <div className="col-6 academy-stats">
                                <p className="m-0 followers-count" title="Followers count">
                                    <span>{academy?.followersCount}</span>
                                    <i className="fa-solid fa-user-plus" />
                                </p>
                                <AcademyFollowBtn id={id} follower={academy?.following ?? false} />
                            </div>
                        </div>
                        <div className="academy-bio">
                            <h4 className="mb-2">Description</h4>
                            <p className="m-0">
                                {academy?.description}
                            </p>
                        </div>
                        <div className="academy-materials mt-4">
                            <h4 className="title m-0">Materials</h4>
                            <MaterialsWrapper>
                                <Material />
                            </MaterialsWrapper>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}