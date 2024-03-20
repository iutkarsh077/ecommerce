"use client"

import { userContext } from "@/context/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MdRemoveShoppingCart } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const MyCart = () => {
    const { setUserDetails, setIsLoggedIn } = useContext(userContext);
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [CartProduct, setCartProduct] = useState([]);
  
    useEffect(() => {
      async function OnSearch() {
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        try {
         const res = await fetch("/api/MyCartProducts", {
            method: 'GET'
         });
         const CartData = await res.json();
        setCartProduct(CartData.cartItems);
        setIsLoggedIn(true);
        setUserDetails(user);
        } catch (error) {
          console.log(error);
          toast.error('Try Again', {
            position: "top-right",
            duration: 4000
          })
        }
      }
  
      OnSearch();
    }, []);

    const RemoveToCart = async (myCart) =>{
        try {
            console.log(myCart);
            const res = await fetch("/api/RemoveCartProducts", {
              method: "POST",
              body: JSON.stringify({
                ItemDetails: myCart,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            router.push('/')
          } catch (error) {
            toast.error('Failed to remove from cart');
            console.log(error);
          }
    }
  console.log(CartProduct)
  return (
    <>
    <div className="bg-red-600 text-lg sm:text-3xl p-4 font-bold">
      Your Cart
    </div>
    <Toaster />
    <div className="flex flex-wrap justify-center">
      {CartProduct ? (
        CartProduct.map((myCart) => (
          <div
            key={myCart._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 relative rounded overflow-hidden shadow-lg m-4"
          >
              <div className="aspect-w-1 aspect-h-1 md:aspect-w-1 md:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src={myCart.image}
                  alt="myCartry"
                  className="object-cover w-full h-60 hover:cursor-pointer"
                />
              </div>
              <div className="px-6 py-4">
            <Link href={`/singleProduct/${myCart.uid}`}>
                <div className="font-bold text-xl mb-2">{myCart.title}</div>

                <div className="flex items-center">
                  <p className="text-gray-600 mr-2">{myCart.rating}</p>
                  <div className="flex">
                    {Number.isInteger(Math.floor(myCart.rating)) &&
                      myCart.rating > 0 &&
                      [...Array(Math.floor(myCart.rating))].map(
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
                
            </Link>
              </div>
              <div className="px-6 py-4 flex justify-between hover:cursor-pointer">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Price: {myCart.price}
                </span>
                <span className="text-2xl" onClick={()=>RemoveToCart(myCart)}>
                <MdRemoveShoppingCart />
                </span>
              </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-8 text-white">Loading...</div>
      )}
    </div>
  </>
  )
}

export default MyCart
