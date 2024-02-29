import connectToDB from "@/Database";
import MyCart from "@/models/CartInfo";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';

export async function GET() {
  try {
    await connectToDB();
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    console.log("User Email:", email);

    const cartItems = await MyCart.find({ Email: email }).maxTimeMS(30000);
    console.log("Cart Items:", cartItems);

    if (cartItems && cartItems.length > 0) {
      return NextResponse.json({ status: true, msg: "Items from cart", cartItems });
    } else {
      return NextResponse.json({ status: false, msg: "No items found in the cart" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: false, msg: "Failed to get items from cart" });
  }
}
