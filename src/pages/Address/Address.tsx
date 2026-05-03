import React, { useState } from "react";
import {
  useGetMyAddressesQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
} from "../../Api/AddressApi";
import { useNavigate } from "react-router";
import { FaMapMarkerAlt, FaMapPin } from "react-icons/fa";
import { addressSchema, type AddressForm } from "../../validation/Address";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

function Address() {
  const { data, isLoading, isError, refetch } = useGetMyAddressesQuery();
  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // 👇 مودال الحذف (واحد فقط)
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const selectedAddress = localStorage.getItem("address_id");

  if (isLoading)
    return <div className="text-center mt-10">⏳ جاري تحميل العناوين...</div>;

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ حدث خطأ في جلب العناوين
      </div>
    );

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoadingDelete(true);
      await deleteAddress(deleteId).unwrap();
      refetch();
      toast.success("تم حذف العنوان 🗑");
      setDeleteId(null);
    } catch (err) {
      toast.error("فشل حذف العنوان ❌");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      await addAddress(formData).unwrap();
      refetch();
      setOpen(false);
      toast.success("تم إضافة العنوان 📍");
    } catch (err) {
      toast.error("فشل إضافة العنوان ❌");
    }
  };

  const selectAddress = (id: number) => {
    localStorage.setItem("address_id", String(id));
    toast.success("تم اختيار العنوان 📍");
    navigate("/cart");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="bg-white  rounded-2xl p-5 flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaMapPin className="text-orange-500 w-6 h-6" />
            موقعي
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            تحكم بعناوين التوصيل الخاصة بك
          </p>
        </div>

        <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
          {data?.data?.length} موقع
        </span>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="mb-6 flex items-center gap-2 
  bg-gradient-to-r from-orange-500 to-orange-600 
  text-white px-6 py-3 rounded-2xl 
  shadow-md hover:shadow-lg 
  hover:scale-[1.02] active:scale-95 
  transition-all duration-200 
  font-semibold"
      >
        <span className="text-lg">＋</span>
        <span>إضافة عنوان جديد</span>
      </button>
      {data?.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-20">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-3">
            <FaMapMarkerAlt className="text-3xl text-gray-400" />
          </div>

          <h2 className="text-lg font-semibold text-gray-700">
            {" "}
            لا توجد عناوين{" "}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            لم تقم بإضافة أي عنوان توصيل بعد
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {data?.data?.map((address: any) => (
            <div
              key={address.id}
              onClick={() => selectAddress(address.id)}
              className={`group relative p-6 rounded-2xl max-w-md border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                selectedAddress == address.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-orange-200"
              }`}
            >
              {/* Header */}
              <div className="space-y-3">
                <h3 className="font-bold text-orange-500 text-lg flex items-center gap-2">
                  📍 عنوان التوصيل
                </h3>

                <InfoRow
                  icon={<FaMapMarkerAlt />}
                  label="المدينة"
                  value={address.city}
                />

                <InfoRow
                  icon={<FaMapPin />}
                  label="الشارع"
                  value={address.street}
                />

                <InfoRow
                  icon={<span>📞</span>}
                  label="الهاتف"
                  value={address.phone}
                />
              </div>

              {/* Divider */}
              <div className="h-px my-4 rounded-full bg-gray-100" />

              {/* Footer */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-gray-800 text-xs">
                  <FaMapMarkerAlt />
                  <span>
                    {Number(address.latitude).toFixed(4)}° ,{" "}
                    {Number(address.longitude).toFixed(4)}°
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(address.id);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 bg-red-50 text-red-500 border border-red-100"
                >
                  🗑 حذف
                </button>
              </div>

              {/* Selected badge */}
              {selectedAddress == address.id && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  المختار
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {/* LIST */}

      {/* ================= DELETE MODAL (FIXED) ================= */}
      {deleteId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl w-[90%] max-w-sm text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold">هل أنت متأكد من الحذف؟</h2>
            <p className="text-gray-500 text-sm">لا يمكن التراجع بعد الحذف</p>

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                إلغاء
              </button>

              <button
                disabled={loadingDelete}
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                {loadingDelete ? "جاري الحذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {open && (
        <AddressModal onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default Address;

/* =========================
   📍 MODAL (UI ONLY IMPROVED)
========================= */

function AddressModal({ onClose, onSubmit }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: "",
      street: "",
      phone: "",
      latitude: "",
      longitude: "",
    },
  });

  const [locationSuccess, setLocationSuccess] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  // 📍 تحديد الموقع
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue("latitude", String(pos.coords.latitude), {
          shouldValidate: true,
        });

        setValue("longitude", String(pos.coords.longitude), {
          shouldValidate: true,
        });

        setLocationSuccess(true);
        setLoadingLocation(false);

        toast.success("تم تحديد الموقع بنجاح 📍");
      },
      () => {
        setLoadingLocation(false);
        toast.error("فشل تحديد الموقع");
      },
    );
  };
  // 🚀 submit
  const submit = async (data: AddressForm) => {
    try {
      await onSubmit({
        ...data,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      });

      reset();
      setLocationSuccess(false);
      onClose();

      toast.success("تم حفظ العنوان بنجاح 🎉");
    } catch (err) {
      toast.error("حدث خطأ أثناء حفظ العنوان ❌");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">📍 إضافة عنوان</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
            type="button"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          {/* CITY */}
          <input
            {...register("city")}
            placeholder="المدينة"
            className="w-full p-3 rounded-xl border"
          />
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}

          {/* STREET */}
          <input
            {...register("street")}
            placeholder="الشارع"
            className="w-full p-3 rounded-xl border"
          />
          {errors.street && (
            <p className="text-red-500 text-xs">{errors.street.message}</p>
          )}

          {/* PHONE */}
          <input
            {...register("phone")}
            placeholder="الهاتف"
            className="w-full p-3 rounded-xl border"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}

          {/* LOCATION BUTTON */}
          <button
            type="button"
            onClick={getLocation}
            disabled={loadingLocation}
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loadingLocation ? "⏳ جاري تحديد الموقع..." : "📍 تحديد الموقع"}
          </button>

          {/* SUCCESS */}
          {locationSuccess && (
            <p className="text-green-600 text-sm text-center">
              ✔ تم تحديد الموقع بنجاح
            </p>
          )}

          {/* LAT/LNG ERRORS */}
          {(errors.latitude || errors.longitude) && (
            <p className="text-red-500 text-xs text-center">
              يجب تحديد الموقع الجغرافي
            </p>
          )}

          {/* hidden fields */}
          <input type="hidden" {...register("latitude")} />
          <input type="hidden" {...register("longitude")} />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ العنوان"}
          </button>
        </form>
      </div>
    </div>
  );
}
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(249,115,22,0.08)" }}
      >
        <span className="text-orange-400/80">{icon}</span>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-gray-400  text-xs flex-shrink-0">{label}:</span>
        <span className="text-gray-800   text-sm font-semibold truncate">
          {value}
        </span>
      </div>
    </div>
  );
}
