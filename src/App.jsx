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
import { ToastProvider } from './providers/ToastProvider';
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
import Admin from "./pages/AdminPage/Admin";
import NotFound from "./pages/NotFound/NotFound";
import ZeroMenu from "./components/NullMenu/ZeroMenu";
import UsersPage from "./pages/admin/UsersPage/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage/OrdersPage";
import CommentsPage from "./pages/admin/CommentsPage/CommentsPage";
import ReviewsPage from "./pages/admin/ReviewsPage/ReviewsPage";
import ConsultPage from "./pages/admin/ConsultPage/ConsultPage";
import UploadPage from "./pages/admin/UploadPage/UploadPage";
import CategoriesPage from "./pages/admin/CategoriesPage/CategoriesPage";
import GoodsPage from "./pages/admin/GoodsPage/GoodsPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Импортируем новый компонент
import CompanyData from "./pages/admin/CompanyData/CompanyData";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import ShipAndPay from "./pages/ShipAndPay/ShipAndPay";
import AuthRequiredModal from "./components/Modals/AuthRequiredModal";
import useIsMobile from "./hooks/useIsMobile";
import MobileNavBar from "./components/navbar/MobileNavBar";
import { ThemeProvider } from "./components/context/ThemeContext";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/Login/Login";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import Loader from "./components/Loader/Loader";
import FloatingMessageButton from "./components/FloatingMessageButton/FloatingMessageButton";
import ScrollToTop from "./components/ScrollToTopButton/ScrollToTop";

const AppContent = observer(() => {
  const location = useLocation(); // добавь это
  const { store } = useContext(Context);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (localStorage.getItem("token")) {
        await store.checkAuth();
      }
      setIsLoaded(true); // Устанавливаем флаг загрузки после того, как проверка завершена
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    productStore.fetchCompany();
  }, []);

  if (!isLoaded) {
    return (
        <Loader />
    );
  }

  const hideFooter = [
    "/reset-password",
    "/register",
    "/login",
    "/register",
    "/404",
    "*",
  ].some((path) => location.pathname.startsWith(path));

  const isSpecialPage = [
    '/', 
    "/reset-password",
    "/login",
    "/register",
  ].includes(location.pathname);

  return (
    <div className="App">
      <ZeroMenu
        time={productStore?.company?.workTime}
        address={productStore?.company?.address}
        phone={productStore?.company?.phone}
      />
      <ThemeProvider>
        <ScrollToTop />
        <ToastProvider>
          {isMobile ? <MobileNavBar /> : <NavBar />}
          <AuthRequiredModal />
          <Content isSpecialPage={isSpecialPage} />
          <FloatingMessageButton />
          {!hideFooter && <FooterBar />}
          <EmailConfirmationOverlay />
          <ScrollToTopButton />
        </ToastProvider>
      </ThemeProvider>
    </div>
  );
});

const Content = observer(({ isSpecialPage }) => {
  const { store } = useContext(Context);

  return (
    <div className={isSpecialPage ? "" : "content"}>
      {store.isLoading ? (
       <Loader  />
      ) : (
        <Routes>
          {/* Обычные маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Cataloq />} />
          <Route path="/ship-and-pay" element={<ShipAndPay />} />
          <Route path="/category/:categoryId" element={<ItemsList />} />
          <Route path="/category/:categoryId/:id" element={<ItemPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={store.isAuth ? <Navigate to="/profile" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={
              store.isAuth ? <Navigate to="/profile" /> : <RegisterPage />
            }
          />
          <Route
            path="/reset-password"
            element={
              !store.isAuth ? <Navigate to="/login" /> : <ResetPasswordPage />
            }
          />
          <Route
            path="/forgot-password"
            element={
              store.isAuth ? <Navigate to="/profile" /> : <ForgotPasswordPage />
            }
          />
          <Route
            path="/profile"
            element={store.isAuth ? <Profile /> : <Navigate to="/register" />}
          />

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
});

const App = observer(() => (
  <Router>
    <AppContent />
  </Router>
));

export default App;
