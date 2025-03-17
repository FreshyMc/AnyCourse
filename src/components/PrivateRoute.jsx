import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({children, redirect = '/'}) {
    const {loggedIn} = useAuth();

    if (!loggedIn) {
        return <Navigate  to={redirect} replace />;
    }

    return children ? children : <Outlet />;
}