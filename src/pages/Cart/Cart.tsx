import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import CartDetails from "./CartDetails";
import PageTransition from "../../PageTransition";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "../../Api/orderApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import { CheckoutModal } from "../Checkout/Checkout";

function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantityCart),
    0,
  );
  const [createOrder] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [checkoutData, setCheckoutData] = useState<null | {
    clientSecret: string;
    orderId: number;
  }>(null);
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      toast.error("يجب تسجيل الدخول أولاً 🔐");
      return;
    }

    const addressId = localStorage.getItem("address_id");

    if (!addressId) {
      toast.error("يرجى اختيار العنوان أولاً 📍");
      navigate("/address");
      return;
    }

    if (!items.length) {
      toast.error("السلة فارغة");
      return;
    }

    try {
      setLoading(true);

      // 🔥 هنا التعديل الحقيقي
      const payload = {
        address_id: Number(addressId),
        items: items.map((item) => ({
          product_id: Number(item.id),
          quantity: Number(item.quantityCart ?? 1),
        })),
      };

      console.log("🔥 SEND ORDER PAYLOAD:", payload);

      const orderRes = await createOrder(payload).unwrap();

      const orderId = orderRes.order.id;

      const paymentRes = await createPaymentIntent(orderId).unwrap();

      setCheckoutData({
        clientSecret: paymentRes.clientSecret,
        orderId,
      });
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إنشاء الطلب ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageTransition>
      <div className="h-screen xl:h-120 from-gray-50 to-gray-100 p-4 sm:p-6 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-6 xl:gap-8">
          {/* LEFT SIDE */}
          <CartDetails />

          {/* RIGHT SIDE */}
          <div className="w-full xl:w-96 shrink-0 flex-1 ">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span className="text-green-600">مجاني</span>
                </div>

                <div className="flex justify-between">
                  <span>الخصم</span>
                  <span>$0.00</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>الإجمالي</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || loading}
                className={`mt-6 w-full py-3 rounded-xl transition flex items-center justify-center gap-2 ${
                  items.length === 0 || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:scale-105"
                }`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                    جاري المعالجة...
                  </>
                ) : (
                  "إتمام الدفع"
                )}
              </button>
              {checkoutData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-4 relative">
                    {/* زر الإغلاق */}
                    <button
                      onClick={() => setCheckoutData(null)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    >
                      ✖
                    </button>

                    {/* Checkout Component */}
                    <CheckoutModal
                      clientSecret={checkoutData.clientSecret}
                      orderId={checkoutData.orderId}
                      onClose={() => setCheckoutData(null)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Cart;
