import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from '@/components/Navbar'
import { LoginPage } from '@/pages/Login'
import { SignupPage } from '@/pages/Signup'
import { Landing } from '@/pages/Landing';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CustomerProfile } from '@/pages/CustomerProfile';


const client = new ApolloClient({
    uri: 'http://localhost:8078/query',
    cache: new InMemoryCache()
});

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/customer/profile" element={<CustomerProfile />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}
