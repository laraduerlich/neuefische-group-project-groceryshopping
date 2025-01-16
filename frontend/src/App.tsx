
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ShoppingListPage from "./pages/ShoppingListPage.tsx";
import ShoppingPage from "./pages/ShoppingPage.tsx";

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/shoppinglist"} element={<ShoppingListPage />} />
        <Route path={"/shopping"} element={<ShoppingPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
