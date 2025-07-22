import {NavBar} from "../navBar/NavBar.tsx";
import {MainContent} from "../mainContent/MainContent.tsx";
import {Footer} from "../footer/Footer.tsx";

export function DefaultLayout() {
    return (
        <>
            <NavBar></NavBar>
            <MainContent></MainContent>
            <Footer></Footer>
        </>
    );
}