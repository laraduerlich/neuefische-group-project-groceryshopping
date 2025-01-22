
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ShoppingListPage from "./pages/ShoppingListPage.tsx";
import ShoppingPage from "./pages/ShoppingPage.tsx";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div id="page-body-main" className="flex-grow">
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/shoppinglist"} element={<ShoppingListPage />} />
                    <Route path={"/shopping/:id"} element={<ShoppingPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
