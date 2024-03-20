import connectToDB from "@/Database";
import MyCart from "@/models/CartInfo";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';

export async function GET() {
  try {
    await connectToDB();
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    // console.log("User Email:", email);

    const cartItems = await MyCart.find({ Email: email }).maxTimeMS(30000);
    // console.log("Cart Items:", cartItems);


      return NextResponse.json({ status: true, msg: "Items from cart", cartItems }); 
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: false, msg: "Failed to get items from cart" });
  }
}
