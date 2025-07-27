import './MainContent.css';
import { Route, Routes } from "react-router-dom";
import { Home } from "../../../pages/home/Home.tsx";
import { About } from "../../../pages/about/About.tsx";
import { Contact } from "../../../pages/contact/Contact.tsx";
import { ShoppingCart } from "../../../pages/ShoppingCart/ShoppingCart.tsx";
import { Dashboard } from "../../../pages/admin/Dashboard.tsx";
import { ManageBooks } from "../../../pages/admin/ManageBooks.tsx";
import { ManageUsers } from "../../../pages/admin/ManageUsers.tsx";
import { AdminRoute } from "../../../components/AdminRoute.tsx";

export function MainContent() {
    return (
        <div  style={{ paddingTop: '80px' }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shopping-cart" element={<ShoppingCart />} />
                <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
                <Route path="/admin/books" element={<AdminRoute><ManageBooks /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            </Routes>
        </div>
    );
}