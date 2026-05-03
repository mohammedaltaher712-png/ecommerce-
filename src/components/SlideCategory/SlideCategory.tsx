import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { useGetCategoryQuery } from "../../Api/CategoryApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function SlideCategory() {
  const { data: categories, isLoading } = useGetCategoryQuery();
  const skeletonCount = categories?.length || 7;
  return (
    <div className="w-full max-w-7xl mx-auto py-5 px-2">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 relative">
          الأقسام
          <span className="block w-10 h-1 bg-orange-500 mt-1 rounded-full"></span>
        </h2>
      </div>

      {/* ✅ LOADING STATE */}
      {isLoading ? (
        <>
          {/* 🔵 MOBILE */}
          <div className="grid grid-cols-2 sm:hidden gap-3 px-2">
            {[...Array(skeletonCount)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center
                           bg-white border border-gray-200 rounded-xl
                           p-4 shadow-sm h-28"
              >
                <div className="skeleton w-12 h-12 rounded-full mb-2"></div>
                <div className="skeleton h-3 w-16"></div>
              </div>
            ))}
          </div>

          {/* 🔵 DESKTOP */}
          <div className="hidden sm:block px-3">
            <div className="flex gap-4 overflow-hidden">
              {[...Array(skeletonCount)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center
                             bg-white border border-gray-200 rounded-xl
                             p-4 shadow-sm h-30 w-full"
                >
                  <div className="skeleton w-12 h-12 rounded-full mb-2"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 🔵 MOBILE */}
          <div className="grid grid-cols-2 sm:hidden gap-3 px-2">
            {categories?.map((categorie) => (
              <div
                key={categorie.id}
                className="flex flex-col items-center justify-center
                           bg-white border border-gray-200 rounded-xl
                           p-4 shadow-sm hover:shadow-md
                           transition-all duration-300
                           cursor-pointer h-28"
              >
                <img
                  alt={categorie.name}
                  className="w-12 h-12 object-contain"
                  src={`${IMAGE_URL}/${categorie.icon}`}
                />
                <span className="text-sm font-medium text-gray-700 text-center">
                  {categorie.name}
                </span>
              </div>
            ))}
          </div>

          {/* 🔵 DESKTOP */}
          <div className="hidden sm:block">
            <Swiper
              slidesPerView={7}
              spaceBetween={16}
              className="px-3"
              breakpoints={{
                640: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
                1280: { slidesPerView: 7 },
              }}
            >
              {categories?.map((categorie) => (
                <SwiperSlide key={categorie.id}>
                  <div
                    className="flex flex-col items-center justify-center
                               bg-white border border-gray-200 rounded-xl
                               p-4 shadow-sm hover:shadow-md
                               transition-all duration-300
                               hover:bg-orange-300 hover:translate-y-1 cursor-pointer
                               h-30"
                  >
                    <img
                      alt={categorie.name}
                      className="w-12 h-12 object-contain"
                      src={`${IMAGE_URL}/${categorie.icon}`}
                    />
                    <span className="text-sm font-medium text-gray-700 text-center mt-2">
                      {categorie.name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
}
export default SlideCategory;
