import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import OnlineShop from "./online-shop/OnlineShop";
import CartComp from "./online-shop/cart/CartComp";
import DetailMain from "./online-shop/detail/detailmain";
import Orders from "./online-shop/orders/orders";
import Contacts from "./pages/Contacts";
import ScrolledPage from "./ScrolledPage";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrolledPage />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<OnlineShop />} />
          <Route path='/store/product/:id' element={<DetailMain />} />
          <Route path='/store/orders' element={<Orders />} />
          <Route path='/store/cart' element={<CartComp />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;