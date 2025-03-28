import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import OnlineShop from "./store/OnlineShop";
import DetailMain from "./store/detail/detailmain";
import ScrolledPage from "./ScrolledPage";
import Login from "./pages/Login";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
// import LanguageChoose from "./components/LanguageChoose";
import Profile from "./pages/Profile";
import Glava from "./Glava";
import Faires from "./pages/Faires";
import FairesDetail from "./pages/FairesDetail";
import Chat from "./pages/Chat";
import AdminPanel from "./pages/AdminPanel";
import AdminChat from "./pages/AdminChat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrolledPage />
        {/* <LanguageChoose /> */}
        <Routes>
          <Route path='/' element={<Glava />} />
          <Route path='/home' element={<Home />} />
          <Route path='/store' element={<OnlineShop />} />
          <Route path='/store/product/:id' element={<DetailMain />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="/admin/chat/:chatId" element={<AdminChat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:id' element={<NewsDetail />} />
          <Route path='/faires/' element={<Faires />} />
          <Route path='/faires/:id' element={<FairesDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;