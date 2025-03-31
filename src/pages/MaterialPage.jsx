import { useParams } from "react-router";
import Footer from "../components/Footer";
import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { materialStreamEndpoint } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";
import useMaterial from "../hooks/useMaterial";
import useAvatar from "../hooks/useAvatar";
import Avatar from "../components/Avatar";
import useRelatedMaterials from "../hooks/useRelatedMaterials";
import LoadingContainer from "../components/LoadingContainer";
import Material from "../components/Material";
import useMaterialThumbnail from "../hooks/useMaterialThumbnail";

export default function MaterialPage() {
    const { token } = useAuth();
    const { id } = useParams();
    const thumbnail = useMaterialThumbnail(id);
    const [material, loading] = useMaterial(id);
    const [relatedMaterials, loadingRelated, getNext] = useRelatedMaterials(id);
    const avatar = useAvatar(material?.shop?.ownerAvatar ?? null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        if (Hls.isSupported()) {
            const hls = new Hls({
                debug: true,
                xhrSetup: xhr => {
                    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                },
            });

            hls.loadSource(materialStreamEndpoint(id));
            hls.attachMedia(videoRef.current);
        }
    }, [id, token]);

    return (
        <>
            <div className="container-fluid overflow-hidden p-3">
                <main className="row gx-3">
                    <div className="col-8">
                        <div className="video-player-wrapper p-3">
                            <div className="video-player">
                                <video ref={videoRef} poster={thumbnail} controls />
                                <h2>{material?.title ?? ''}</h2>
                            </div>
                            <div className="video-author mt-3">
                                <div className="lecturer">
                                    <Avatar src={avatar} username={material?.shop?.ownerUsername ?? ''} />
                                    <span>{material?.shop?.ownerUsername}</span>
                                </div>
                            </div>
                            <div className="video-description mt-3 p-3">
                                <p className="m-0">{material?.description ?? ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="related-videos p-3">
                            <LoadingContainer loading={loadingRelated}>
                                <h3 className="mb-3 section-title">Related Materials</h3>
                                {relatedMaterials.map(material => <Material key={material.id} {...material} />)}
                            </LoadingContainer>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}