import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
    const { openLogin, openRegister, loggedIn, setToken } = useAuth();

    const handleLogout = () => {
        setToken(() => null);
    };

    return (
        <nav className='row px-3 px-lg-4 py-2 py-lg-3'>
            <div className="col p-0">
                <Link to='#index'>
                    <h1 className="fs-4 text-logo m-0">Any<span>Course</span></h1>
                </Link>
            </div>
            <div className="col p-0">
                {
                    !loggedIn && (
                        <ul className="p-0 m-0 menu-items list-unstyled d-flex h-100 justify-content-end align-items-center">
                            <li className="ps-3">
                                <button className="btn menu-item outlined" onClick={openLogin}><span>Sign In</span></button>
                            </li>
                            <li className="ps-3">
                                <button className="btn menu-item" onClick={openRegister}><span>Sign Up</span></button>
                            </li>
                        </ul>
                    )
                }
                {
                    loggedIn && (
                        <ul className="p-0 m-0 menu-items list-unstyled d-flex h-100 justify-content-end align-items-center">
                            <li className="ps-3">
                                <button className="btn menu-item" onClick={handleLogout}><span>Log Out</span></button>
                            </li>
                        </ul>
                    )
                }
            </div>
        </nav>
    );
}