import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import OnlineShop from "./store/OnlineShop";
import CartComp from "./store/cart/CartComp";
import DetailMain from "./store/detail/detailmain";
import Orders from "./store/orders/orders";
import Contacts from "./pages/Contacts";
import ScrolledPage from "./ScrolledPage";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

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
          <Route path='/news' element={<News />} />
          <Route path='/news/:id' element={<NewsDetail />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;