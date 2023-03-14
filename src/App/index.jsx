import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from '@/components/Navbar'
import { Login } from '@/pages/common/Login'
import { Landing } from '@/pages/common/Landing';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Navigation />
        </Router>
    );
};
