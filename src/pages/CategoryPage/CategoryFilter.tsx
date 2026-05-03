import React from "react";

type Props = {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  brands: any[];
  defaultFilters: any;
};

function CategoryFilter({
  openFilter,
  setOpenFilter,
  filters,
  setFilters,
  brands,
  defaultFilters,
}: Props) {
  return (
    <aside
      className={`fixed lg:static top-0 right-0 h-full lg:h-fit w-72 lg:w-1/5 bg-white p-5 border shadow-md rounded-lg z-50 lg:z-auto transform transition-transform duration-300
      ${
        openFilter
          ? "translate-x-0"
          : "translate-x-full lg:translate-x-0"
      }`}
    >
      <h3 className="text-lg font-semibold mb-5 border-b pb-3">فلتر</h3>

      <div className="space-y-6 text-sm">

        {/* الحالة */}
        <div>
          <h4 className="font-medium mb-3">الحالة</h4>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={filters.condition === "new"}
              className="accent-orange-500"
              onChange={() =>
                setFilters((p: any) => ({
                  ...p,
                  condition: "new",
                  page: 1,
                }))
              }
            />
            جديد
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              checked={filters.condition === "used"}
              className="accent-orange-500"
              onChange={() =>
                setFilters((p: any) => ({
                  ...p,
                  condition: "used",
                  page: 1,
                }))
              }
            />
            مستعمل
          </label>
        </div>

        {/* البراند */}
        <div>
          <h4 className="font-medium mb-3">العلامة التجارية</h4>

          <select
            value={filters.brand}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFilters((p: any) => ({
                ...p,
                brand: e.target.value,
                page: 1,
              }))
            }
          >
            <option value="">كل العلامات</option>

            {brands.map((brand: any) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* السعر */}
        <div>
          <h4 className="font-medium mb-3">السعر: {filters.price}$</h4>

          <input
            type="range"
            min={0}
            max={2000}
            className="w-full accent-orange-500"
            value={filters.price}
            onChange={(e) =>
              setFilters((p: any) => ({
                ...p,
                price: Number(e.target.value),
                page: 1,
              }))
            }
          />
        </div>

        {/* التقييم */}
        <div>
          <h4 className="font-medium mb-3">التقييم: {filters.rating} ⭐</h4>

          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={filters.rating}
            className="w-full accent-orange-500"
            onChange={(e) =>
              setFilters((p: any) => ({
                ...p,
                rating: Number(e.target.value),
                page: 1,
              }))
            }
          />
        </div>

        {/* كوبون */}
        <div>
          <h4 className="font-medium mb-3">العروض</h4>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.coupon === "yes"}
              className="accent-orange-500"
              onChange={(e) =>
                setFilters((p: any) => ({
                  ...p,
                  coupon: e.target.checked ? "yes" : "",
                  page: 1,
                }))
              }
            />
            يوجد كوبون
          </label>
        </div>

        {/* reset */}
        <button
          onClick={() => setFilters(defaultFilters)}
          className="w-full border py-2 rounded"
        >
          إعادة تعيين
        </button>

        <button
          onClick={() => setOpenFilter(false)}
          className="lg:hidden w-full border py-2 rounded"
        >
          إغلاق
        </button>
      </div>
    </aside>
  );
}

export default CategoryFilter;