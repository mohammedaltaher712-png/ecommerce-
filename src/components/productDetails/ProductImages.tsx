import { useState } from "react";
import type { ProductType } from "../../Api/ProductApi";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

type Props = {
  product: ProductType;
};

function ProductImages({ product }: Props) {
  const [mainImage, setMainImage] = useState("");

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* MAIN IMAGE */}
      <div
        className="
          bg-white rounded-2xl shadow-md p-4
          w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
          flex items-center justify-center overflow-hidden
          border border-gray-100
        "
      >
        <img
          src={mainImage || `${IMAGE_URL}/${product.image}`}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* THUMBNAILS */}
      {product.images && product.images.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
          {product.images.map((img) => {
            const isActive = mainImage === img.image;
            const imagePath = `${IMAGE_URL}/${img.image}`;
            return (
              <button
                key={img.id}
                onClick={() => setMainImage(imagePath)}
                className={`
                  h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18
                  rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0
                  flex items-center justify-center bg-white shadow-sm
                  ${
                    isActive
                      ? "border-orange-400 scale-105 shadow-md"
                      : "border-gray-200 hover:border-orange-300 hover:scale-105"
                  }
                `}
              >
                <img
                  src={imagePath}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductImages;
