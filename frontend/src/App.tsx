
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ShoppingListPage from "./pages/ShoppingListPage.tsx";
import ShoppingPage from "./pages/ShoppingPage.tsx";

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-custom-gradient">
            <Header />
            <div id="page-body-main" className="flex-grow p-6 sm:p-8 lg:p-14">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shoppinglist" element={<ShoppingListPage />} /> {/* Create a new list */}
                    <Route path="/shoppinglist/:id" element={<ShoppingListPage />} /> {/* Load an existing list */}
                    <Route path="/shopping/:id" element={<ShoppingPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
