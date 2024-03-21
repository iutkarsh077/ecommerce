import connectToDB from "@/Database";
import MyCart from "@/models/CartInfo";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';

export async function POST(req) {
  try {
    await connectToDB();
    const { myUser } = await req.json();
    const user = await currentUser();
    const email = myUser ? myUser : user.emailAddresses[0].emailAddress;
    console.log("User Email:", email);

    const cartItems = await MyCart.find({ Email: email });
    console.log("Cart Items:", cartItems);


      return NextResponse.json({ status: true, msg: "Items from cart", cartItems }, {status: 201}); 
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: false, msg: "Failed to get items from cart" }, {status:401});
  }
}
