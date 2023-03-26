import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from '@/components/common/Navbar'
import { LoginPage } from '@/pages/common/Login'
import { SignupPage } from '@/pages/common/Signup'
import { Landing } from '@/pages/common/Landing';
import { AuthStates } from '@/dict/Dict'
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8078/query',
    cache: new InMemoryCache()
});

export const App = () => {
    const [authState, setAuthState] = useState(AuthStates.UNAUTHENTICATED);

    return (
        <ApolloProvider client={client}>
            <Router>
                <NavBar authState={authState} />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}
