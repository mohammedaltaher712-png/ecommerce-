import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../Api/AuthApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema, type TypeLogin } from "../validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SaveAuth } from "../features/StateAuth";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeLogin>({
    resolver: zodResolver(LoginSchema),
  });
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<TypeLogin> = (data) => submitLogin(data);

  async function submitLogin(data: TypeLogin) {
    try {
      const res = await login(data).unwrap();
      if (res.data.role === "user") {
        dispatch(SaveAuth({ user: res.data, token: res.token }));

        toast.success("تم تسجيل الدخول بنجاح", {
          style: { background: "#16a34a", color: "#fff" },
        });

        reset();

        navigate("/", { replace: true });
      } else {
        toast.error("مصرح لمستخدمين فقط لدخول", {
          style: { background: "#dc2626", color: "#fff" },
        });
      }
      // مباشرة بدون تأخير
    } catch (error: any) {
      const status = error?.status || error?.originalStatus;

      const message =
        error?.data?.message || error?.error || "حدث خطأ غير متوقع";

      if (status >= 400 && status < 500) {
        toast.error(message || "بيانات غير صحيحة", {
          style: { background: "#dc2626", color: "#fff" },
        });
      } else if (status >= 500) {
        toast.error("خطأ في السيرفر", {
          style: { background: "#b91c1c", color: "#fff" },
        });
      } else {
        toast.error(message);
      }
    }
  }
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
        <span className="loading loading-bars   loading-xl text-orange-500"></span>
      </div>
    );
  }
  return (
    <div className=" min-h-screen flex justify-center  bg-linear-to-br from-sky-100 via-white to-orange-200 py-30">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 p-8 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            تسجيل الدخول
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">البريد الإلكتروني</label>
            <input
              {...register("email")}
              type="email"
              className="input input-bordered w-full focus:ring-2 focus:ring-orange-400 transition"
              placeholder="example@email.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {" "}
                {errors.email.message}{" "}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm text-gray-600">كلمة السر</label>
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              className="input input-bordered w-full pr-10 focus:ring-2 focus:ring-orange-400 transition"
              placeholder="********"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {" "}
                {errors.password.message}{" "}
              </span>
            )}
          </div>

          {/* Button */}
          <button className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg mt-2 transition-all duration-300 hover:scale-[1.03] active:scale-95">
            تسجيل الدخول
          </button>

          {/* Extra */}
          <Link to="/register">
            <p className="text-center text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">
                إنشاء الحساب
              </span>
            </p>
          </Link>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
