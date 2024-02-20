import connectToDB from "@/Database";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import MyCart from "@/models/CartInfo";
export async function POST(req) {
  const { ItemDetails } = await req.json();
  // console.log(ItemDetails)
  try {
    await connectToDB();
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    // console.log(email);
    const findProductAndUser = await MyCart.findOne({ Email: email, uid: ItemDetails.id });
    if(findProductAndUser && findProductAndUser.uid == ItemDetails.id){
        return NextResponse.json({status: false, msg: "Item already in cart"})
    }
    await MyCart.create({
          Email: email,
          uid: ItemDetails.id,
          title: ItemDetails.title,
          price: ItemDetails.price,
          category: ItemDetails.category,
          image: ItemDetails.image,
          rating: ItemDetails.rating.rate,
    });

    return NextResponse.json({status: true, msg: "Item added to cart"})
        
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Item not added to cart" });
  }
}
