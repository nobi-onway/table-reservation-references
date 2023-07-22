import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layouts/DefaultLayout';
import { AuthContext } from './store/Auth';
import { guestRoutes, userRoutes } from './routes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialPayPalOptions = {
    clientId:
        'AeWUyLVA8l3mNr4z9t_xi5eiIsfPX5WMXi14RPVOg1wSguzhYC60Ai_zNsIE6RYOKY63IzOupB5yFGy0',
    currency: 'USD',
    intent: 'capture',
};

function App() {
    const { token, setIsLoginModalOpen } = useContext(AuthContext);

    return (
        <PayPalScriptProvider options={initialPayPalOptions}>
            <Router>
                <Routes>
                    {guestRoutes.map((route, index) => {
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                Component={() => (
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                )}
                            />
                        );
                    })}

                    {userRoutes.map((route, index) => {
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                Component={() => {
                                    if (!token) setIsLoginModalOpen(true);

                                    return (
                                        <DefaultLayout>
                                            {token && <Page />}
                                        </DefaultLayout>
                                    );
                                }}
                            />
                        );
                    })}
                </Routes>
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
