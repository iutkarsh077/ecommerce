"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ImagesSlider } from "./ui/images-slider";
import { getSliderImages } from "@/utils/productsFetch/SliderImages";
import { useRouter } from "next/navigation";
export function ImagesSliderDemo() {
  const [images1, setImages1] = useState([]);
  const router = useRouter();
  // let slide1 = null;
  useEffect(() => {
    async function getSlider() {
      const images = await getSliderImages("products");
      setImages1(images);
    }
    getSlider();
  }, []);
  let slide1 = images1[1]?.image;
  const images = [
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  ];
  console.log(slide1);

  const handleRandomProduct = () => {
    const myArr = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ];

    const productId = Math.floor(Math.random() * myArr.length);
    return router.push(`/singleProduct/${productId}`);
  };
  return (
    <ImagesSlider className="h-[36rem]" images={images}>
      <motion.div
        initial={{
          //   opacity: 0.1,
          y: -80,
        }}
        animate={{
          //   opacity: 0.6,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          ShopSmart: Your Ultimate Shopping <br /> Companion
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span onClick={handleRandomProduct}>Only for you →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
