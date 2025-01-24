
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CreateShoppingListPage from "./pages/CreateShoppingListPage.tsx";
import EditShoppingListPage from "./pages/EditShoppingListPage.tsx";
import ShoppingPage from "./pages/ShoppingPage.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage.tsx";
import ProtectedRoutes from "./pages/ProtectedRoute.tsx";

function App() {

    const[username, setUsername] = useState<string|undefined>()

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.host
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.host
        window.open(host + "/logout", "_self")
    }

    function loadUser(){
        axios.get("/api/auth/me")
            .then(response => setUsername(response.data))
    }

    useEffect(()=>{
        loadUser()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-custom-gradient">
            <Header />
            <div id="page-body-main" className="flex-grow p-6 sm:p-8 lg:p-14">
                <Routes>
                    <Route path={"/"} element={<LandingPage userName={username} />} />
                    <Route element={<ProtectedRoutes username={username} />}>
                        <Route path={"/home"} element={<HomePage />} />
                        <Route path="/shoppinglist/new" element={<CreateShoppingListPage />} /> {/* Create a new list */}
                        <Route path="/shoppinglist/:id" element={<EditShoppingListPage />} /> {/* Load an existing list */}
                        <Route path={"/shopping/:id"} element={<ShoppingPage />} />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
