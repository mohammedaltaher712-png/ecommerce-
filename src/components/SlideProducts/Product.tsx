import { Link, useNavigate } from "react-router";
import type { ProductType } from "../../Api/ProductApi";
import { FaCartArrowDown, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { toggleCartItem } from "../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../features/favorites/favoritesSlice";
import toast from "react-hot-toast";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

type Props = {
  data: ProductType;
};

function Product({ data: product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const isExist = cartItem !== undefined;

    dispatch(toggleCartItem(product));

    if (!isExist) {
      toast.success(
        <div className="toast-wrapper ">
          <img
            src={`${IMAGE_URL}/${product.image}`}
            className="toast-img"
            alt=""
          />

          <div className="toast-content">
            <strong className="truncate block max-w-40.5">
              {product.name}
            </strong>
            <span className="text-[11px] text-green-600 font-medium">
              تم الإضافة إلى السلة ✔
            </span>
            <div>
              <button
                onClick={() => navigate("/cart")}
                className="mt-1 text-[15px] px-3 py-0.75 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition w-fit"
              >
                عرض السلة
              </button>
            </div>
          </div>
        </div>,
        { duration: 3500 },
      );
    }
  };
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));

      toast.success(
        <div className="toast-wrapper">
          <img
            src={`${IMAGE_URL}/${product.image}`}
            className="toast-img"
            alt=""
          />

          <div className="toast-content">
            <strong className="truncate block max-w-40.5">
              {product.name}
            </strong>
            <p className="text-xs text-pink-500">تمت الإضافة إلى المفضلة ❤️</p>
            <button
              onClick={() => navigate("/favorites")}
              className="mt-1 text-[15px] px-3 py-0.75 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition w-fit"
            >
              عرض المفضلة
            </button>
          </div>
        </div>,
        { duration: 3000 },
      );
    }
  };
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === product.id),
  );
  const isFav = useSelector((state: RootState) =>
    state.favorites.items.some((p) => p.id === product.id),
  );
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length
    : 0;
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <div
          className="
    group relative bg-white
    border border-gray-300
    rounded-xl overflow-hidden
    transition-all duration-300
    hover:shadow-lg
  "
        >
          {/* IMAGE */}
          <div className="relative h-56 flex items-center justify-center bg-gray-50 p-3">
            <img
              src={`${IMAGE_URL}/${product.image}`}
              alt={product.name}
              className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* badge */}
            {Number(product.quantity) > 0 ? (
              <span className="absolute top-2 left-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                متوفر
              </span>
            ) : (
              <span className="absolute top-2 left-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-2">
            {/* title */}
            <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10">
              {product.name}
            </h2>

            {/* rating */}
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;

                if (avgRating >= starValue) {
                  return <FaStar key={i} />;
                } else if (avgRating >= starValue - 0.5) {
                  return <FaRegStarHalfStroke key={i} />;
                } else {
                  return <FaStar key={i} className="text-gray-300" />;
                }
              })}

              <span className="text-gray-400 text-xs ml-1">
                ({avgRating.toFixed(1)})
              </span>
            </div>
            <p className="text-lg font-bold text-orange-600">
              ${product.price}
            </p>
            {/* price + actions row */}
            <div
              className="
    absolute top-1/2 -translate-y-1/2 -right-15
    flex flex-col gap-2
    opacity-0 group-hover:opacity-100
    group-hover:right-2
    transition-all duration-300
  "
            >
              {/* add to cart */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-orange-100 transition"
              >
                <FaCartArrowDown className="text-orange-500" />
                {cartItem?.quantityCart ? (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-md text-orange-500 bg-white rounded-full">
                    1
                  </span>
                ) : null}
              </button>

              {/* favorite */}
              <button
                onClick={toggleFavorite}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-100 transition"
              >
                {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
