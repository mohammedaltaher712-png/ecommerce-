import { useParams } from "react-router";

import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useGetBrandsQuery } from "../../Api/BrandApi";
import { useGetCategoryBySlugQuery } from "../../Api/CategoryApi";
import Loading from "../../Loading";
import type { ProductType } from "../../Types/Types";
import PageTransition from "../../PageTransition";
import Product from "../../components/SlideProducts/Product";
import CategoryFilter from "./CategoryFilter";

function CategoryPage() {
  const { slug } = useParams();

  const [openFilter, setOpenFilter] = useState(false);

  const defaultFilters = {
    price: 2000,
    condition: "",
    brand: "",
    rating: 0,
    coupon: "",
    page: 1,
  };

  const [filters, setFilters] = useState(defaultFilters);

  const shouldSkip = !slug;

  const { data, isLoading, isFetching, isError } = useGetCategoryBySlugQuery(
    {
      slug: slug!,
      ...filters,
    },
    {
      skip: shouldSkip,
    },
  );

  const { data: brandsData } = useGetBrandsQuery();
  const brands = brandsData ?? [];

  const products: ProductType[] = data?.products ?? [];

  // =========================
  // Guards
  // =========================
  if (shouldSkip) return <p className="p-4">تصنيف غير صالح</p>;

  if (isLoading || isFetching) return <Loading />;

  if (isError)
    return <p className="p-4 text-red-500">حدث خطأ أثناء تحميل التصنيف</p>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex flex-col lg:flex-row gap-6">
          {/* Overlay */}
          {openFilter && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setOpenFilter(false)}
            />
          )}

          {/* SIDEBAR */}
          <CategoryFilter
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            defaultFilters={defaultFilters}
          />

          {/* PRODUCTS */}
          <div className="w-full lg:w-4/5">
            {/* HEADER */}
            <div className="mb-6 bg-white rounded-xl px-5 py-4 shadow flex justify-between">
              <div className=" flex  justify-center items-center gap-4">
                <button
                  onClick={() => setOpenFilter(true)}
                  className="lg:hidden bg-orange-500 text-white px-3 py-1 rounded"
                >
                  <FiFilter />
                </button>
                <h2 className="text-xl font-bold">{data?.data?.name}</h2>
              </div>
              <span className="text-xs sm:text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
                {products.length} منتجات
              </span>
            </div>

            {/* PRODUCTS */}
            {products.length ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Product key={product.id} data={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">لا توجد منتجات</p>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default CategoryPage;
