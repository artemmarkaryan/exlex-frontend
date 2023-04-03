import React, { useMemo, useRef } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from '@/components/Navbar';
import { LoginPage } from '@/pages/Login';
import { SignupPage } from '@/pages/Signup';
import { Landing } from '@/pages/Landing';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CustomerProfile } from '@/pages/CustomerProfile';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/stores/auth';

const httpLink = createHttpLink({
    uri: 'http://localhost:8079/query',
});

const AppRoutes = React.memo(() => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/customer/profile" element={<CustomerProfile />} />
            </Routes>
        </Router>
    );
});
AppRoutes.displayName = 'AppRoutes';

export const App = () => {
    const [token] = useAtom(tokenAtom);
    const tokenRef = useRef(token);

    tokenRef.current = token;

    const client = useMemo(() => {
        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = tokenRef.current;
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });

        return client;
    }, []);

    return (
        <ApolloProvider client={client}>
            <AppRoutes />
        </ApolloProvider>
    );
};
