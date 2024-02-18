"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ImagesSlider } from "./ui/images-slider";
import { getSliderImages } from "@/utils/productsFetch/SliderImages";

export function ImagesSliderDemo() {
    const [images1, setImages1] = useState([]);
    useEffect(()=>{
        async function getSlider(){
            const images = await getSliderImages('products');
            images.map((image)=>(
                setImages1((prev)=>[...prev, image])
                ))
            }
            getSlider();
        }, [])

        console.log(images1[9])
  const images = [
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  ];
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
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
