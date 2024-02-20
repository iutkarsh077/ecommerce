"use client";

import { useEffect, useState } from "react";
import CircleLoader from "../CircleLoader";
import { getRecommendedProduct } from "@/utils/productsFetch/SliderImages";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RecommendedProducts = ({ category }) => {
  const [reProducts, setReProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getReProducts() {
      try {
        const reProducts = await getRecommendedProduct({ category });
        setReProducts(reProducts);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    }
    getReProducts();
  }, [category]);
  if (!reProducts) {
    return <CircleLoader />;
  }
  return (
    <>
      <div className="bg-red-600 text-lg sm:text-3xl p-4 font-bold">
        Recommended Products
      </div>
      <div className="flex flex-wrap justify-center">
        {reProducts ? (
          reProducts.map((electro) => (
            <div
              key={electro.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 relative rounded overflow-hidden shadow-lg m-4">
                <Link href={`/singleProduct/${electro.id}`}>
              {" "}
              <div className="aspect-w-1 aspect-h-1 md:aspect-w-1 md:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src={electro.image}
                  alt="Jewelry"
                  className="object-cover w-full h-60 hover:cursor-pointer"
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{electro.title}</div>
                <div className="flex">
                  {Number.isInteger(Math.floor(electro.rating.rate)) &&
                    electro.rating.rate > 0 &&
                    [...Array(Math.floor(electro.rating.rate))].map(
                      (_, index) => (
                        <svg
                          key={index}
                          className="h-5 w-5 text-yellow-400 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 14.634l-5.308 2.789a1 1 0 01-1.448-1.054l1.018-5.92L.272 7.773a1 1 0 01.554-1.705l5.947-.863L9.43.842a1 1 0 011.14 0l2.657 4.363 5.947.863a1 1 0 01.554 1.705l-4.026 3.927 1.018 5.92a1 1 0 01-1.447 1.054L10 14.634z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )
                    )}
                </div>
              </div>
              <div className="px-6 py-4 flex justify-between hover:cursor-pointer">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Price: {electro.price}
                </span>
                <span className="text-2xl o">
                  <FaShoppingCart />
                </span>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center mt-8 text-white">Loading...</div>
        )}
      </div>
    </>
  );
};

export default RecommendedProducts;
