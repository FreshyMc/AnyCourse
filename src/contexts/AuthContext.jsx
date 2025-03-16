import { createContext, useContext, useRef } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import useStorage from "../hooks/useStorage";

const AuthContext = createContext({
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

    const loggedIn = token !== null;

    return (
        <AuthContext.Provider value={{openLogin, closeLogin, openRegister, closeRegister, setToken, loggedIn}}>
            {children}
            <LoginModal ref={loginRef} />
            <RegisterModal ref={registerRef} />
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}