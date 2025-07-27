import { Navigate } from "react-router-dom";
import type {JSX} from "react";

export function AdminRoute({ children }: { children: JSX.Element }) {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return children;
}