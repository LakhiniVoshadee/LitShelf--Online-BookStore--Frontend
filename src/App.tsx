import './App.css';

import {Route, Routes, useNavigate} from "react-router-dom";

import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import {useEffect} from "react";
import {isTokenExpired} from "./auth/auth.ts";
import {Login} from "./pages/login/Login.tsx";


function App() {
    const navigate = useNavigate(); // for navigation

    useEffect(() => {  // to redirect to login page if no token is present in local storage
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);
    return (


        <>
            <Routes>
                <Route path="/*" element={<DefaultLayout/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </>

    );
}

export default App;