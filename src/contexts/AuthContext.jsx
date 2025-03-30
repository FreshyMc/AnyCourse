import { createContext, useContext, useEffect, useRef } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import useStorage from "../hooks/useStorage";
import axios from "axios";
import { validateTokenEndpoint } from "../utils/constants";
import { useNavigate } from "react-router";

const AuthContext = createContext({
    token: null,
    loggedIn: false,
    openLogin: () => {},
    closeLogin: () => {},
    openRegister: () => {},
    closeRegister: () => {},
    setToken: () => {},
});

export function AuthProvider({children}) {
    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const [token, setToken] = useStorage('auth');
    const navigate = useNavigate();

    const openLogin = () => {
        loginRef.current.open();
    };

    const closeLogin = () => {
        loginRef.current.close();
    };

    const openRegister = () => {
        registerRef.current.open();
    };

    const closeRegister = () => {
        registerRef.current.close();
    };

    useEffect(() => {
        if (token === null) return;

        axios.post(validateTokenEndpoint, {token: token}).then(({data}) => {
            if (data.expired) {
                setToken(() => null);
                navigate('/');
            }
        }).catch(error => {
            console.log(error);
        });
    }, [token]);

    const loggedIn = token !== null;

    return (
        <AuthContext.Provider value={{openLogin, closeLogin, openRegister, closeRegister, token, setToken, loggedIn}}>
            {children}
            <LoginModal ref={loginRef} />
            <RegisterModal ref={registerRef} />
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}