import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { RegisterSchema, type TypeRegister } from "../validation/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegistersMutation } from "../Api/AuthApi";
import toast from "react-hot-toast";

function Register() {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeRegister>({
    resolver: zodResolver(RegisterSchema),
  });
  const [registers, { isLoading }] = useRegistersMutation();
  const navigate = useNavigate();
  async function submitRegister(data: TypeRegister) {
    try {
      await registers(data).unwrap();

      toast.success("تم إنشاء حساب بنجاح ", {
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });
      reset();
      navigate("/login");
    } catch (error: any) {
      // 🔥 خطأ بيانات (Laravel validation)
      if (error?.status >= 400 && error?.status < 500) {
        const message = "البريد الإلكتروني مستخدم مسبقًا";

        toast.error(message, {
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        });
      }

      // 🔥 الإيميل موجود مسبقًا (غالبًا 409 أو 422 حسب Laravel)

      // 🔥 مشكلة إنترنت
      else if (error?.status === "FETCH_ERROR") {
        toast.error("لا يوجد اتصال بالإنترنت 🌐", {
          style: {
            background: "#f59e0b",
            color: "#fff",
          },
        });
      }

      // 🔥 خطأ سيرفر
      else if (error?.status >= 500) {
        toast.error("خطأ في السيرفر، حاول لاحقًا", {
          style: {
            background: "#b91c1c",
            color: "#fff",
          },
        });
      }

      // 🔥 خطأ شبكة (Internet / API down)
      else if (error?.status === "FETCH_ERROR") {
        toast.error("لا يوجد اتصال بالإنترنت", {
          style: {
            background: "#f59e0b",
            color: "#fff",
          },
        });
      }

      // 🔥 fallback
      else {
        toast.error("حدث خطأ غير متوقع");
      }
    }
  }

  const onSubmit: SubmitHandler<TypeRegister> = (data) => submitRegister(data);
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
        <span className="loading loading-bars   loading-xl text-orange-500"></span>
      </div>
    );
  }
  return (
    <div className=" min-h-screen flex justify-center bg-linear-to-br from-sky-100 via-white to-orange-200 py-5">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 p-8 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            إنشاء حساب
          </h1>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">الاسم</label>
            <input
              {...register("name")}
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-orange-400 transition"
              placeholder="اسمك الكامل"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {" "}
                {errors.name.message}{" "}
              </span>
            )}
          </div>

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

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">تأكيد كلمة السر</label>
            <input
              {...register("password_confirmation")}
              type="password"
              className="input input-bordered w-full focus:ring-2 focus:ring-orange-400 transition"
              placeholder="********"
            />
            {errors.password_confirmation && (
              <span className="text-red-500 text-sm">
                {" "}
                {errors.password_confirmation.message}{" "}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg mt-2 transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            إنشاء الحساب
          </button>

          {/* Extra */}
          <Link to="/login">
            <p className="text-center text-sm text-gray-500">
              لديك حساب؟{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">
                تسجيل الدخول
              </span>
            </p>
          </Link>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
