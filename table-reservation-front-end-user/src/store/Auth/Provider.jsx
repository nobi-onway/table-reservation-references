import { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const login = (authToken) => {
        localStorage.setItem('token', authToken);
        setToken(authToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Context.Provider
            value={{
                token,
                login,
                logout,
                isLoginModalOpen,
                setIsLoginModalOpen,
                isSignUpModalOpen,
                setIsSignUpModalOpen
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;
