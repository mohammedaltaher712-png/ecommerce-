import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryQuery } from "../../Api/CategoryApi";
import type { RootState } from "../../store";
import { clearFavorites } from "../../features/favorites/favoritesSlice";
import Product from "../../components/SlideProducts/Product";

function FavoritesFilter() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const { data: categories = [], isLoading } = useGetCategoryQuery();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sort, setSort] = useState("default");

  // 🔥 فلترة + ترتيب
  const filteredFavorites = useMemo(() => {
    let data = [...favorites];

    // فلترة حسب القسم
    if (selectedCategory !== null) {
      data = data.filter((p: any) => {
        return (
          String(p.category?.id) === String(selectedCategory) ||
          String(p.category_id) === String(selectedCategory)
        );
      });
    }

    // ترتيب
    switch (sort) {
      case "price-desc":
        data.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-asc":
        data.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }

    return data;
  }, [favorites, selectedCategory, sort]);
  return (
    <div>
      <div className="mb-10 flex flex-col gap-6">
        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {/* ALL BUTTON */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`
      px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
      border transition-all duration-200
      ${
        selectedCategory === null
          ? "bg-orange-500 text-white border-orange-500 shadow-sm"
          : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
      }
    `}
          >
            الكل
          </button>

          {/* CATEGORIES */}
          {!isLoading &&
            categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
          px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
          border transition-all duration-200
          ${
            selectedCategory === cat.id
              ? "bg-orange-500 text-white border-orange-500 shadow-sm scale-105"
              : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
          }
        `}
              >
                {cat.name}
              </button>
            ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gray-100"></div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm text-orange-600 bg-transparent outline-none"
          >
            <option value="default">ترتيب</option>
            <option value="price-asc">السعر ↑</option>
            <option value="price-desc">السعر ↓</option>
          </select>

          {favorites.length > 0 && (
            <button
              onClick={() => dispatch(clearFavorites())}
              className="text-sm text-orange-600 hover:text-red-500 transition"
            >
              مسح الكل
            </button>
          )}
        </div>
      </div>

      {/* EMPTY STATE (IMPORTANT FIX) */}
      {filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="text-5xl mb-4 opacity-50">♡</div>
          <h3 className="text-lg font-medium text-gray-700">
            لا توجد منتجات في المفضلة
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            يمكنك إضافة منتجات أو تغيير القسم
          </p>
        </div>
      ) : (
        /* GRID */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {filteredFavorites.map((item) => (
            <Product key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesFilter;
