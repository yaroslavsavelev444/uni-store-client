import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import FooterBar from "./components/FooterBar/FooterBar";
import "./App.css";
import { observer } from "mobx-react-lite";
import ToastProvider from "./providers/ToastProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import EmailConfirmationOverlay from "./components/EmailConfirmationOverlay/EmailConfirmationOverlay";
import { Context, productStore } from "./main";
import Home from "./pages/Home/Home";
import Cataloq from "./pages/Cataloq/Cataloq";
import ItemsList from "./pages/ItemsList/ItemsList";
import ItemPage from "./pages/ItemPage/ItemPage";
import Contacts from "./pages/Contacts/Contacts";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Admin from "./pages/AdminPage/Admin";
import NotFound from "./pages/NotFound/NotFound";
import ZeroMenu from "./components/NullMenu/ZeroMenu";
import Auth from "./pages/Auth/Auth";
import UsersPage from "./pages/admin/UsersPage/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage/OrdersPage";
import CommentsPage from "./pages/admin/CommentsPage/CommentsPage";
import ReviewsPage from "./pages/admin/ReviewsPage/ReviewsPage";
import ConsultPage from "./pages/admin/ConsultPage/ConsultPage";
import UploadPage from "./pages/admin/UploadPage/UploadPage";
import CategoriesPage from "./pages/admin/CategoriesPage/CategoriesPage";
import GoodsPage from "./pages/admin/GoodsPage/GoodsPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Импортируем новый компонент
import { Loader } from "lucide-react";
import DataOrg from "./pages/admin/CompanyData/CompanyData";
import CompanyData from "./pages/admin/CompanyData/CompanyData";

const AppContent = observer(() => {
  const { store } = useContext(Context);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (localStorage.getItem("token")) {
        await store.checkAuth();
      }
      setIsLoaded(true); // Устанавливаем флаг загрузки после того, как проверка завершена
    };
    checkAuthStatus();
  }, []);

  if (!isLoaded) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  const hideFooter = ["/chats", "/auth", "/reset-password", "*"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      <ZeroMenu
        time={productStore?.company?.workTime}
        address={productStore?.company?.address}
        phone={productStore?.company?.phone}
      />
      <ToastProvider>
        <ThemeProvider>
          <NavBar />
          <Content />
          {!hideFooter && <FooterBar />}
          <EmailConfirmationOverlay />
        </ThemeProvider>
      </ToastProvider>
    </div>
  );
});

const Content = () => {
  const location = useLocation();
  const isSpecialPage = ["/", "/chats", "/chats/:userId", "/auth"].includes(
    location.pathname
  );

  const { store } = useContext(Context);

  return (
    <div className={isSpecialPage ? "" : "content"}>
      {store.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          {/* Обычные маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/cataloq" element={<Cataloq />} />
          <Route path="/items-list" element={<ItemsList />} />
          <Route path="/item-page" element={<ItemPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/auth"
            element={store.isAuth ? <Navigate to="/profile" /> : <Auth />}
          />
          <Route
            path="/profile"
            element={store.isAuth ? <Profile /> : <Navigate to="/auth" />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Защищённые админские маршруты */}
          <Route
            path="/admin"
            element={<ProtectedRoute element={<Admin />} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute element={<UsersPage />} />}
          />
          <Route
            path="/admin/orders"
            element={<ProtectedRoute element={<OrdersPage />} />}
          />
          <Route
            path="/admin/comments"
            element={<ProtectedRoute element={<CommentsPage />} />}
          />
          <Route
            path="/admin/reviews"
            element={<ProtectedRoute element={<ReviewsPage />} />}
          />
          <Route
            path="/admin/consult"
            element={<ProtectedRoute element={<ConsultPage />} />}
          />
          <Route
            path="/admin/upload"
            element={<ProtectedRoute element={<UploadPage />} />}
          />
           <Route
            path="/admin/data_org"
            element={<ProtectedRoute element={<CompanyData />} />}
          />
          <Route
            path="/admin/categories"
            element={<ProtectedRoute element={<CategoriesPage />} />}
          />
          <Route
            path="/admin/goods"
            element={<ProtectedRoute element={<GoodsPage />} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
