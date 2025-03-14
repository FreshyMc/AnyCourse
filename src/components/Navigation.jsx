import { Link } from "react-router";

export default function Navigation() {
    return (
        <nav className='row px-3 px-lg-4 py-2 py-lg-3'>
            <div className="col p-0">
                <Link to='#index'>
                    <h1 className="fs-4 text-logo m-0">Any<span>Course</span></h1>
                </Link>
            </div>
            <div className="col p-0">
                <ul className="p-0 m-0 menu-items list-unstyled d-flex h-100 justify-content-end align-items-center">
                    <li className="ps-3">
                        <Link className="menu-item outlined"><span>Sign In</span></Link>
                    </li>
                    <li className="ps-3">
                        <Link className="menu-item"><span>Sign Up</span></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}