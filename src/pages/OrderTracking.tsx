import { useState } from "react";
import { useGetMyOrdersQuery } from "../Api/orderApi";
import PageTransition from "../PageTransition";
import { FiCalendar, FiClock, FiPackage } from "react-icons/fi";
import type { OrderItemType, OrderType } from "../Types/Types";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function OrderTracking() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ✅ الفلترة من الباك اند
  const { data, isLoading } = useGetMyOrdersQuery({
    status: statusFilter,
    from_date: fromDate,
    to_date: toDate,
  });

  const orders: OrderType[] = data || [];

  // 🔥 stats من كل الطلبات (بدون فلتر)
  const { data: allOrdersData } = useGetMyOrdersQuery({
    status: "all",
  });

  const allOrders: OrderType[] = allOrdersData || [];

  const totalOrders = allOrders.length;

  const deliveredCount = allOrders.filter(
    (o: any) => o.status === "delivered",
  ).length;

  const activeCount = allOrders.filter(
    (o: any) => !["delivered", "cancelled"].includes(o.status),
  ).length;

  const totalSpent = allOrders
    .filter((o: any) => o.status !== "cancelled")
    .reduce((sum: number, o: any) => sum + Number(o.total), 0);

  const filters = [
    { key: "all", label: "الكل" },
    { key: "paid", label: "مدفوع" },
    { key: "pending", label: "قيد الانتظار" },
    { key: "processing", label: "قيد التجهيز" },
    { key: "shipped", label: "تم الشحن" },
    { key: "delivered", label: "تم التسليم" },
    { key: "cancelled", label: "ملغي" },
  ];

  const statusLabels: Record<string, string> = {
    all: "الكل",
    paid: "مدفوع",
    pending: "قيد الانتظار",
    processing: "قيد التجهيز",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي",
  };

  const stats = [
    {
      icon: "🛍️",
      label: "إجمالي الطلبات",
      value: totalOrders,
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: "✅",
      label: "تم التسليم",
      value: deliveredCount,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: "🔄",
      label: "طلبات نشطة",
      value: activeCount,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "💰",
      label: "إجمالي الإنفاق",
      value: `$${totalSpent.toFixed(0)}`,
      color: "from-violet-400 to-violet-600",
    },
  ];
  function StatsCard({
    icon,
    label,
    value,
    color,
  }: {
    icon: string;
    label: string;
    value: number | string;
    color: string;
  }) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div
          className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -mr-8 -mt-8 ${color}`}
        />
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">{label}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        ⏳ جاري تحميل الطلبات...
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50/30 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* HEADER */}

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-orange-600">📦 طلباتي</h1>
              <p className="text-gray-400 text-sm mt-2">
                تتبع جميع طلباتك بسهولة
              </p>
            </div>

            <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
              {orders.length} طلب
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((item, index) => (
              <StatsCard
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>

          {/* STATUS FILTER */}

          {/* DATE FILTER (DESIGN CLEAN & FORMAL) */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* FROM */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  📅 من تاريخ
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* TO */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  📅 إلى تاريخ
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex items-end gap-2">
                <button
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                    setStatusFilter("all");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm transition"
                >
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-72 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              style={{
                accentColor: "#f97316", // برتقالي (للبعض من العناصر)
              }}
            >
              {filters.map((item) => (
                <div key={item.key}>
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                </div>
              ))}
            </select>
          </div>
          {/* ORDERS */}
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 py-20">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                <FiPackage className="text-3xl text-gray-400" />
              </div>

              <h2 className="text-lg font-semibold text-gray-700">
                لا توجد طلبات
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                لم يتم العثور على طلبات مطابقة للفلتر
              </p>
            </div>
          ) : (
            orders.map((order: OrderType) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4 hover:shadow-md transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-200 shrink-0">
                        <FiPackage className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="font-bold text-gray-800">
                        طلب #{order.id}
                      </h2>
                    </div>
                    <p className="text-xs text-gray-400 pt-2 flex flex-col leading-tight">
                      {(() => {
                        const date = new Date(order.created_at);

                        const dateString = date.toLocaleDateString("en-GB");

                        const timeString = date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });

                        const period = timeString.includes("AM")
                          ? "صباحاً"
                          : "مساءً";

                        const cleanTime = timeString
                          .replace("AM", "")
                          .replace("PM", "")
                          .trim();

                        return (
                          <>
                            {/* التاريخ */}
                            <span className="flex items-center gap-1">
                              <FiCalendar className="text-gray-400" />
                              {dateString}
                            </span>

                            {/* الوقت */}
                            <span className="flex items-center gap-1">
                              <FiClock className="text-gray-400" />
                              {cleanTime} {period}
                            </span>
                          </>
                        );
                      })()}
                    </p>
                  </div>

                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {statusLabels[order.status] ?? order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                  {order.items.map((item: OrderItemType) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border border-gray-100 rounded-xl p-3"
                    >
                      <img
                        src={`${IMAGE_URL}/${item.product.image}`}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {item.product.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          الكمية: {item.quantity}
                        </p>

                        <p className="text-xs text-gray-500">
                          الحالة:{" "}
                          {item.product.condition === "new" ? "جديد" : "مستعمل"}
                        </p>

                        <p className="text-xs text-gray-500">
                          الكوبون:{" "}
                          {item.product.coupons &&
                          item.product.coupons.length > 0
                            ? "يوجد كوبون 🎟️"
                            : "لا يوجد كوبون"}
                        </p>

                        <p className="text-xs text-gray-500">
                          الضمان: {item.product.warranty}
                        </p>

                        <p className="text-xs text-gray-500">
                          📍 المدينة: {order.address?.city ?? "غير متوفر"}
                        </p>

                        <p className="text-xs text-gray-500">
                          🏠 الشارع: {order.address?.street ?? "غير متوفر"}
                        </p>
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${order.address?.latitude},${order.address?.longitude}`,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                          className="inline-block text-xs bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                          📍 عرض الموقع على الخريطة
                        </button>
                      </div>

                      <div className="text-orange-500 font-bold text-sm">
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div>
                <OrderStatusSteps status={order.status} />
                {/* TOTAL */}
                <div className="flex justify-between border-t border-gray-300 pt-3 text-sm">
                  <span className="text-gray-500">الإجمالي</span>
                  <span className="font-bold text-gray-800">
                    ${order.total}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default OrderTracking;
const steps = [
  { key: "pending", label: "قيد الانتظار" },
  { key: "processing", label: "قيد التجهيز" },
  { key: "shipped", label: "تم الشحن" },
  { key: "delivered", label: "تم التسليم" },
];

function OrderStatusSteps({ status }: { status: string }) {
  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="flex justify-center bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
      <div className="flex items-center w-full max-w-2xl">
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* دائرة */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    isActive ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-[11px] mt-1 ${
                    isActive ? "text-orange-600 font-medium" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* الخط */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    index < currentIndex ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
