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
import EditAcademyModal from "../components/EditAcademyModal";
import ChangeThumbnailModal from "../components/ChangeThumbnailModal";
import { useEffect, useRef, useState } from "react";
import UploadMaterialModal from "../components/UploadMaterialModal";
import useMaterials from "../hooks/useMaterials";

export default function AcademyPage() {
    const { id } = useParams();
    const [academy, loading, changeAcademy] = useFetch(getAcademyEndpoint(id));
    const avatar = useAvatar(academy?.ownerAvatar ?? null);
    const [thumbnailPath, setThumbnailPath] = useState(null);
    const thumbnail = useThumbnail(thumbnailPath);
    const [materials, addMaterial, loadingMaterials] = useMaterials(academy?.id ?? null);

    useEffect(() => {
        setThumbnailPath(academy?.thumbnail);
    }, [academy?.thumbnail]);

    const style = thumbnail ? { backgroundImage: `url(${thumbnail})` } : {};

    const isAcademyOwner = academy?.owner ?? false;

    const thumbnailModalRef = useRef(null);
    const academyModalRef = useRef(null);

    const openThumbnailModal = () => {
        if (thumbnailModalRef.current) thumbnailModalRef.current.open();
    };

    const openEditAcademyModal = () => {
        if (academyModalRef.current) academyModalRef.current.open();
    };

    const handleThumbnailChange = (data) => {
        setThumbnailPath(data?.thumbnail);
    };

    const handleAcademyDetailsChange = (data) => {
        changeAcademy(data);
    };

    const uploadModalRef = useRef(null);

    const handleUploadMaterial = () => {
        if (uploadModalRef.current) uploadModalRef.current.open();
    };

    return (
        <>
            <main className="row">
                <div className="academy-header col-12"></div>
                <div className="col-8 mx-auto p-0 academy-page-wrapper d-flex flex-column">
                    <div className="academy-page-thumbnail" style={style}>
                        <h2 className="m-0">{academy?.name}</h2>
                        {isAcademyOwner && (
                            <div className="thumbnail-actions">
                                <button className="btn btn-primary" onClick={openThumbnailModal}>
                                    <i className="fa-solid fa-pencil" />
                                    <span className="ps-2">Change thumbnail</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="acamemy-page-content container">
                        <div className="row px-4 py-3">
                            <div className="col academy-owner">
                                <div className="owner-avatar">
                                    <Avatar src={avatar} username={academy?.ownerUsername ?? ''} />
                                </div>
                                <p className="m-0 ps-3 fs-4">{academy?.ownerUsername}</p>
                            </div>
                            <div className="col-8 academy-stats">
                                {isAcademyOwner && (
                                    <button className="btn btn-primary" onClick={openEditAcademyModal}>
                                        <i className="fa-solid fa-pencil" />
                                        <span className="ps-2">Edit Academy</span>
                                    </button>
                                )}
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
                        {isAcademyOwner && (
                            <div className="academy-upload mt-3">
                                <button className="btn btn-primary" onClick={handleUploadMaterial}>
                                    <i className="fa-solid fa-upload" />
                                    <span className="ps-2">Upload Material</span>
                                </button>
                            </div>
                        )}
                        <div className="academy-materials mt-4">
                            <h4 className="title m-0">Materials</h4>
                            <MaterialsWrapper>
                                {materials.map(material => <Material key={material.id} {...material} />)}
                            </MaterialsWrapper>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {isAcademyOwner && <EditAcademyModal academyId={id} ref={academyModalRef} data={academy} handleChange={handleAcademyDetailsChange} />}
            {isAcademyOwner && <ChangeThumbnailModal academyId={id} ref={thumbnailModalRef} handleChange={handleThumbnailChange} />}
            {isAcademyOwner && <UploadMaterialModal academyId={id} ref={uploadModalRef} handleChange={addMaterial} />}
        </>
    );
}