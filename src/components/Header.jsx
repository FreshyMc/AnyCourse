import { useAuth } from "../contexts/AuthContext";

export default function Header() {
    const { openRegister } = useAuth();

    return (
        <header className="row align-items-center landing-header">
            <div className="col text-center">
                <h1 className="m-0 py-2">Learn <span className="highlighted">anything</span>, join <span className="highlighted">AnyCourse</span>!</h1>
                <div className="pt-2 mt-4">
                    <button className="btn join-btn" onClick={openRegister}>Join Now</button>
                </div>
            </div>
        </header>
    );
}