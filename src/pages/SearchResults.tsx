import { useGetProductQuery } from "../Api/ProductApi";
import { useSearchParams } from "react-router";
import PageTransition from "../PageTransition";
import Product from "../components/SlideProducts/Product";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data = [], isLoading } = useGetProductQuery({
    search,
    page: 1,
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-semibold text-orange-600 tracking-tight">
                نتائج البحث
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                المنتجات المفضلة لديك محفوظة هنا
              </p>
            </div>

            <span className="text-xs sm:text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
              {data.length} منتجات
            </span>
          </div>
          {/* HEADER */}

          {/* LOADING */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">جاري البحث...</p>
            </div>
          )}

          {/* RESULTS */}
          {!isLoading && data.length > 0 && (
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-6
              "
            >
              {data.map((product) => (
                <div
                  key={product.id}
                  className="transform hover:-translate-y-1 transition duration-300"
                >
                  <Product data={product} />
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-7xl mb-3">🔍</div>

              <h3 className="text-lg font-bold text-gray-800">لا توجد نتائج</h3>

              <p className="text-gray-500 mt-1">جرّب البحث بكلمات مختلفة</p>

              <span className="mt-4 text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                نصيحة: جرّب اسم مختصر أو نوع المنتج
              </span>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default SearchResults;
