
import PageTransition from "../../PageTransition";
import type { RootState } from "../../store";
import {  useSelector } from "react-redux";
import FavoritesFilter from "./FavoritesFilter";

function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-semibold text-orange-600 tracking-tight">
                المفضلة
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                المنتجات المفضلة لديك محفوظة هنا
              </p>
            </div>

            <span className="text-xs sm:text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
              {favorites.length} منتجات
            </span>
          </div>

          {/* FILTERS */}
          <FavoritesFilter />
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;
