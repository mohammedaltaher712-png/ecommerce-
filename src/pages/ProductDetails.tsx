import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../Api/ProductApi";
import Loading from "../Loading";
import PageTransition from "../PageTransition";
import ProductImages from "../components/productDetails/ProductImages";
import ProductInfo from "../components/productDetails/ProductInfo";
import SlideProducts from "../components/SlideProducts/SlideProducts";

function ProductDetails() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));
  if (isLoading) {
    return <Loading />;
  }
  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        <h2 className="text-2xl font-bold">❌ لم يتم العثور على المنتج</h2>
      </div>
    );
  }

  if (isError) return <p className="p-4 text-red-500">حدث خطأ تحميل </p>;
  return (
    <PageTransition key={id}>
      <div className="py-8 md:mx-20 ">
        <div className="max-w-6xl  mx-auto flex flex-col lg:flex-row justify-between items-center gap-20 px-4 sm:px-6 lg:px-8 ">
          {/* LEFT IMAGES */}

          <div className="flex flex-col  md:flex-row  gap-10 justify-around ">
            <ProductImages product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
        <div className="mt-5 px-4 sm:px-6 lg:px-8">
          {product && <SlideProducts product={product} />}
        </div>
      </div>
    </PageTransition>
  );
}

export default ProductDetails;
