import connectToDB from "@/Database";
import MyCart from "@/models/CartInfo";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';

export async function GET() {
  await connectToDB();
  try {
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    console.log(email);

    const cartItems = await MyCart.find({Email: email});
    console.log(cartItems);
    return NextResponse.json({status: true, msg: "Items from cart", cartItems});
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: true, msg: "Failed to get Items from cart"})
  }
}
