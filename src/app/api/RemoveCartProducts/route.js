import connectToDB from "@/Database";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import CartInfo from "@/models/CartInfo";
export async function POST(req) {
  await connectToDB();
  const { ItemDetails } = await req.json();
  try {
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    // console.log(email);
    // console.log(ItemDetails, email)
    const findUser = await CartInfo.findOneAndDelete({
      Email: email,
      uid: ItemDetails.uid,
    });
    // console.log(findUser)
    return NextResponse.json({ status: true, msg: "Item Removed Successfully!" });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      status: false,
      msg: "Failed to remove from cart",
    });
  }
}
