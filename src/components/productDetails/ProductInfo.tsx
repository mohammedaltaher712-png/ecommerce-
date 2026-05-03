import { FaRegStarHalfStroke, FaShare, FaStar } from "react-icons/fa6";
import type { ProductType } from "../../Api/ProductApi";
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  toggleCartItem,
} from "../../features/cart/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../features/favorites/favoritesSlice";

type Props = {
  product: ProductType;
};

function ProductInfo({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length
    : 0;
  // ✅ هل المنتج موجود؟
  const cartItem = items.find((p) => String(p.id) === String(product.id));
  const isFav = useSelector((state: RootState) =>
    state.favorites.items.some((p) => p.id === product.id),
  );
  const handleAddToFavorites = () => {
    if (isFav) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        // fallback (لو المتصفح لا يدعم)
        navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ الرابط");
      }
    } catch (error) {
      console.log("Share failed:", error);
    }
  };
  const infoList = [
    {
      label: "القسم",
      render: (
        <span className="inline-block w-fit bg-orange-50 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full border border-orange-200">
          {product.category?.name}
        </span>
      ),
    },
    {
      label: "المنتج",
      render: (
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-400">
          {product.name}
        </h1>
      ),
    },
    {
      label: "التقييم",
      render: (
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
      ),
    },
    {
      label: "السعر",
      render: (
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-2xl sm:text-3xl font-bold text-orange-500">
            ${product.price}
          </span>

          {product?.coupons?.[0]?.discount && (
            <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full">
              وفّر {product.coupons[0].discount}%
            </span>
          )}
        </div>
      ),
    },
    {
      label: "الوصف",
      render: (
        <p className="text-gray-600 leading-6 text-sm sm:text-base">
          {product.description}
        </p>
      ),
    },
    {
      label: "الحالة",
      render: (
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            product?.condition === "new"
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-yellow-50 text-yellow-600 border-yellow-200"
          }`}
        >
          {product?.condition === "new" ? "جديد" : "مستخدم"}
        </span>
      ),
    },
    {
      label: "الضمان",
      render: (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCheckCircle className="text-green-500" />
          <span className="font-semibold text-gray-800">
            {product.warranty ?? "غير محدد"}
          </span>
        </div>
      ),
    },
    {
      label: "المخزون",
      render: (
        <span className="text-sm font-medium text-red-600 border-b-2 border-red-200 w-fit">
          باقي فقط {product?.quantity || 10} قطعة
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* PRODUCT NAME داخل list (مهم) */}

      {/* INFO LIST */}
      {infoList.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <h5 className="text-sm font-semibold text-gray-500 min-w-20">
            {item.label}
          </h5>
          <div>{item.render}</div>
        </div>
      ))}

      {/* ACTIONS */}
      <div className="flex gap-4 mt-6">
        {!cartItem ? (
          <button
            onClick={() => dispatch(toggleCartItem(product))}
            className="flex-1 min-w-35 sm:min-w-45 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md active:scale-95 bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200"
          >
            إضافة إلى السلة <TiShoppingCart className="text-lg" />
          </button>
        ) : (
          <div className="flex items-center gap-3 mb-5">
            {/* Label */}
            <span className="text-sm text-gray-500">الكمية</span>

            {/* Counter */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {/* Minus */}
              <button
                onClick={() => dispatch(decreaseQty(product.id))}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 transition"
              >
                −
              </button>

              {/* Quantity */}
              <span className="w-12 text-center text-base font-semibold text-gray-800 select-none">
                {cartItem?.quantityCart}
              </span>

              {/* Plus */}
              <button
                onClick={() => dispatch(increaseQty(product.id))}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-green-50 hover:text-green-500 transition"
              >
                +
              </button>
            </div>
          </div>
        )}

        <span
          onClick={handleAddToFavorites}
          className="w-10 h-10 flex items-center justify-center bg-white shadow rounded-full hover:bg-red-100 cursor-pointer transition"
        >
          {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </span>

        <span
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center bg-white shadow rounded-full hover:bg-red-100 cursor-pointer transition"
        >
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
