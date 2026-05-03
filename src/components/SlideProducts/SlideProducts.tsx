import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Product from "./Product";
import { useGetCategoryByIdQuery } from "../../Api/CategoryApi";
import Loading from "../../Loading";
import type { ProductType } from "../../Types/Types";
type Props = {
  product: ProductType;
};
function SlideProducts({ product }: Props) {
  const { data, isLoading, isError } = useGetCategoryByIdQuery(
    Number(product.category_id),
  );
  if (isLoading) return <Loading />;
  const products: ProductType[] = data?.products ?? [];
  if (isError) return <p className="p-4 text-red-500">حدث خطأ تحميل </p>;
  return (
    <div>
      <div className=" ">
        <div className="flex items-center justify-between mb-4 px-2 ">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 relative w-full ">
            المنتجات
            <span className="block  h-1 bg-orange-500 mt-1 ml-4 rounded-full"></span>
          </h2>
        </div>

        <div>
          <Swiper
            loop={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="pl-5">
                  <Product data={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
export default SlideProducts;
