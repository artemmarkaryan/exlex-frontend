import React, { useMemo, useRef } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes as ReactRoutes,
} from 'react-router-dom';
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
import { ExecutorProfile } from '@/pages/ExecutorProfile';
import { CustomerSearch } from '@/pages/CustomerNewSearch';
import { CustomerSearches } from '@/pages/CustomerSearches';

const httpLink = createHttpLink({
    uri: 'http://localhost:8079/query',
});

const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/search/new" element={<CustomerSearch />} />
            <Route path="/customer/searches" element={<CustomerSearches />} />

            <Route path="/executor/profile" element={<ExecutorProfile />} />
        </ReactRoutes>
    );
};

const AppRoutes = React.memo(() => {
    return (
        <Router>
            <Navigation />
            <Routes />
        </Router>
    );
});
AppRoutes.displayName = 'AppRoutes';

export const App = () => {
    const [token] = useAtom(tokenAtom);

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <AppRoutes />
        </ApolloProvider>
    );
};
