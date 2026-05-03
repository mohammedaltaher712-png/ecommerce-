import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import { slides } from "../data/slidesData";

function HeroSlider() {
  return (
    <div className="w-full h-[40vh] sm:h-[60vh] lg:h-125">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full">
            {/* IMAGE */}
            <img
              src={slide.img}
              className="w-full h-full object-cover sm:block hidden"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-orange-300/30 flex flex-col md:flex-row items-center justify-center md:justify-end">
              <div className="px-6 sm:px-16 text-white max-w-xl space-y-3 text-center md:text-right">
                {/* TAG */}
                <span className="text-sm tracking-widest uppercase text-orange-400 font-semibold">
                  {slide.tag}
                </span>

                {/* TITLE */}
                <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
                  {slide.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm sm:text-lg text-gray-200">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;
