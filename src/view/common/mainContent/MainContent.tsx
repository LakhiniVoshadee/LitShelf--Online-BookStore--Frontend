import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "../../../pages/home/Home.tsx";
import {About} from "../../../pages/about/About.tsx";
import {Contact} from "../../../pages/contact/Contact.tsx";
import {ShoppingCart} from "../../../pages/ShoppingCart/ShoppingCart.tsx";


export function MainContent() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/contact" element={<Contact/>}></Route>
                <Route path="/shopping-cart" element={<ShoppingCart/>}></Route>
            </Routes>
        </div>
    );
}