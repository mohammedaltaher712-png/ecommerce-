import LOGO from "../../assets/img/logo2.png";
import { FaRegHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { TiShoppingCart } from "react-icons/ti";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import SearchBox from "./TopHeader/SerachBox";

function TopHeader() {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const FavoritesCount = useSelector(
    (state: RootState) => state.favorites.items.length,
  );
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const isFavPage = location.pathname === "/favorites";
  return (
    <div className="flex items-center justify-around shadow-sm bg-white border-b border-gray-100 h-20">
      {/* LOGO */}
      <Link to="/">
        <img className="w-60 h-auto" src={LOGO} alt="الشعار" />
      </Link>

      {/* SEARCH */}
      <SearchBox />

      {/* ICONS */}
      <div className="flex items-center justify-center gap-5">
        {/* FAVORITES */}
        <Link to="/favorites">
          <div className="relative flex items-center justify-center group">
            <FaRegHeart
              className={`text-[28px] transition ${
                isFavPage
                  ? "text-orange-500"
                  : "text-gray-700 group-hover:text-orange-500"
              }`}
            />

            <span className="absolute -top-3 -right-2 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow ring-2 ring-white">
              {FavoritesCount}
            </span>
          </div>
        </Link>

        {/* CART */}
        <Link to="/cart">
          <div className="relative flex items-center justify-center group">
            <TiShoppingCart
              className={`text-[28px] transition ${
                isCartPage
                  ? "text-orange-500"
                  : "text-gray-700 group-hover:text-orange-500"
              }`}
            />

            <span className="absolute -top-3 -right-2 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow ring-2 ring-white">
              {cartCount}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopHeader;
