"use client";
import { userContext } from "@/context/GlobalContextProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import CircleLoader from "@/components/CircleLoader";
import { getSingleProduct } from "@/utils/productsFetch/SliderImages";
import { FaShoppingCart } from "react-icons/fa";
import RecommendedProducts from "@/components/Products/RecommendedProducts";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';

const SingleProduct = ({ params }) => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState();
  const { isLoaded, isSignedIn, user } = useUser();
  const { setUserDetails, setIsLoggedIn } = useContext(userContext);
  const [increaseQuantity, setIncreaseQuantity] = useState(1);
  const [category, setcategory] = useState();
  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const myproduct = await getSingleProduct({ id: params.productId });
        setSelectedProduct(myproduct);
        console.log(myproduct);
        setcategory(myproduct.category);
      } catch (error) {
        console.log(error);
        router.push("/404");
      }
    }
    fetchSingleProduct();
  }, []);
  if (!isLoaded) {
    return <CircleLoader />;
  }

  if (!user) {
    router.push("/sign-in");
  }
  setUserDetails(user);
  setIsLoggedIn(isSignedIn);

  if (!selectedProduct) {
    return <CircleLoader />;
  }

  const handleIncreaseQuantity = () => {
    setIncreaseQuantity(increaseQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (increaseQuantity > 1) {
      setIncreaseQuantity(increaseQuantity - 1);
    }
  };

  const AddToCart = async (jewel) => {
    try {
      console.log(jewel);
      const res = await fetch("/api/myaccount", {
      method: "POST",
      body: JSON.stringify({
        ItemDetails: jewel,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    toast.success(data.msg, {
      duration: 2000,
      position: 'top-right',
    });
    } catch (error) {
      toast.error(data.msg, {
        duration: 2000,
        position: 'top-right',
      });
    }
  };


const makePayments = async () => {
  try {
    const stripe = await loadStripe("pk_test_51OmCUvSGbcvshBgxh9EycDiBA6hCbPW0RRCc0wrDTG5i9R3ndrDVUMAEa9V0zKNLUNTh9ISOAdQamBC7LsHQPh7o00dK5cxj2z");

    const body = {
      selectedProduct: selectedProduct, // Assuming selectedProduct is defined elsewhere
      increaseQuantity: increaseQuantity // Assuming increaseQuantity is defined elsewhere
    };

    const headers = {
      "Content-Type": "application/json"
    };

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error("Failed to create payment session");
    }

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.error(result.error);
      // Handle error appropriately, e.g., display to the user
    }
  } catch (error) {
    console.error("Error making payment:", error);
    // Handle error appropriately, e.g., display to the user
  }
};


  return (
    <div className="w-screen overflow-x-hidden h-screen">
  <Toaster/>
  {selectedProduct ? (
    <>
      <div className="flex flex-col sm:flex-row w-full h-3/5" onClick={makePayments}>
        <div className="sm:w-3/5 sm:flex sm:items-center flex justify-center bg-white">
          <img
            src={selectedProduct.image}
            alt="Image"
            className="sm:h-full object-contain"
          />
        </div>
        <div className="bg-black md:w-2/5 flex flex-col gap-y-1 overflow-y-hidden overflow-x-hidden items-center justify-center p-4">
          <p className="text-white text-2xl font-bold mb-4">
            {selectedProduct.title}
          </p>
          <p className="text-white mb-2">
            {selectedProduct.description.length > 100
              ? `${selectedProduct.description.slice(0, 100)}...`
              : selectedProduct.description}
          </p>
          <p className="text-white mb-2 text-lg">
            Price: ${selectedProduct.price}
          </p>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-l-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <span className="bg-white text-gray-700 px-4 py-2">
                {increaseQuantity}
              </span>
              <button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-around w-full md:justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 mb-2 md:mb-0 md:mr-2 md:px-6 md:py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400" onClick={makePayments}>
              Purchase
            </button>
            <div
              className="flex items-center hover:cursor-pointer"
              onClick={() => AddToCart(selectedProduct)}
            >
              <FaShoppingCart className="text-white mr-2 md:text-xl" />
              <p className="text-white">Cart</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2/5 w-full">
        {category ? (
          <RecommendedProducts category={category} />
        ) : (
          <p className="text-white text-center text-3xl flex justify-center">
            Loading...
          </p>
        )}
      </div>
    </>
  ) : (
    <p className="text-white text-center text-lg">Loading...</p>
  )}
</div>

  );
};

export default SingleProduct;
