import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../../features/cart/cartSlice";

export function CheckoutModal({ clientSecret, orderId, onClose }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const card = elements?.getElement(CardElement);

    if (!stripe || !card) return;

    setLoading(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setLoading(false);
        alert("فشل الدفع ❌");
        return;
      }

      alert("تم الدفع بنجاح 🎉");

      setLoading(false);
      onClose();
      dispatch(clearCart());
      localStorage.removeItem("cart");
      navigate("/order");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          💳 الدفع للطلب #{orderId}
        </h2>

        <div className="border p-4 rounded-xl">
          <CardElement />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl"
        >
          {loading ? "جاري الدفع..." : "ادفع الآن"}
        </button>
      </div>
    </div>
  );
}
