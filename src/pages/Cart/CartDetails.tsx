import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { FaTrash } from "react-icons/fa6";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../features/cart/cartSlice";

function CartDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex-1 flex flex-col space-y-4 min-h-0 ">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex justify-between items-center border border-gray-200">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          🛒 سلة المشتريات
        </h1>

        <span className="text-xs sm:text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
          {items.length} منتجات
        </span>
      </div>

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 ">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg font-semibold">🛒 لا يوجد شيء في السلة</p>
            <p className="text-sm mt-2">ابدأ بإضافة منتجاتك الآن</p>

            <Link to="/" className="mt-4 text-sky-500 hover:underline">
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 border border-gray-200"
              >
                {/* IMAGE + NAME */}
                <div className="flex items-center gap-4 flex-1 w-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl flex items-center justify-center border shrink-0">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${item.image}`}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col">
                      <span className="text-xs text-orange-500  mb-1">المنتج</span>

                      <h2 className="font-semibold text-gray-800 text-base sm:text-lg truncate">
                        {item.name}
                      </h2>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 text-xs sm:text-sm hover:text-red-700 flex items-center gap-1 mt-1"
                    >
                      <FaTrash />
                      إزالة
                    </button>
                  </div>
                </div>

                {/* QTY */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-orange-500 ">الكمية</span>

                  <div className="flex items-center border rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="px-5 py-2 font-semibold text-gray-700">
                      {item.quantityCart}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PRICE */}
                <div className="w-28 text-center">
                  <p className="text-xs text-orange-500 ">السعر</p>
                  <p className="text-gray-600 font-medium">{item.price} $</p>
                </div>

                {/* TOTAL */}
                <div className="w-28 text-center font-bold text-gray-900 text-lg">
                  <p className="text-xs text-orange-500  mb-1"> الإجمالي</p>
                  {Number(item.price) * Number(item.quantityCart)} $
                </div>
              </div>
            ))}

            {/* CLEAR BUTTON */}
            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2"
            >
              <FaTrash />
              تفريغ السلة
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDetails;
