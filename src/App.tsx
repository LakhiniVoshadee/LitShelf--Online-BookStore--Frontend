
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import { useEffect } from "react";
import { isTokenExpired } from "./auth/auth.ts";
import { Auth } from "./pages/auth/Auth.tsx"; // Updated import

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            navigate("/auth"); // Changed to /auth
        }
    }, [navigate]);

    return (
        <>
            <Routes>
                <Route path="/*" element={<DefaultLayout/>}></Route>
                <Route path="/auth" element={<Auth/>}></Route>
            </Routes>
        </>
    );
}

export default App;
