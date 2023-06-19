import { Routes, Route } from 'react-router-dom';
import Login from '../components/login';

function Guest() {
    return (
        <>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
        </>
    );
}

export default Guest;
