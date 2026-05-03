import { BrowserRouter, Route, Routes } from "react-router";
import { Elements } from "@stripe/react-stripe-js";

import "./index.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopHeader from "./components/Header/TopHeader";
import HeaderDown from "./components/Header/TopHeader/HeaderDown";
import { Toaster } from "react-hot-toast";
import GuestRoute from "./GuestRoute";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import SearchResults from "./pages/SearchResults";
import { stripePromise } from "./stripe";
import OrderTracking from "./pages/OrderTracking";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Address from "./pages/Address/Address";

function App() {
  return (
    <div dir="rtl">
      <Toaster position="bottom-left" />

      <Provider store={store}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <header>
              <TopHeader />
              <HeaderDown />
            </header>

            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />

              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/order" element={<OrderTracking />} />
              <Route path="/address" element={<Address />} />
            </Routes>
          </Elements>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
