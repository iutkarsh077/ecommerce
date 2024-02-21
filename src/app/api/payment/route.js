import stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const { selectedProduct, increaseQuantity } = await req.json();
  console.log(selectedProduct, increaseQuantity)

  const lineItems = [{
    price_data: {
      currency: "usd",
      product_data: {
        name: selectedProduct.title,
        images: [selectedProduct.image],
      },
      unit_amount: Math.round(selectedProduct.price * 100),
    },
    quantity: increaseQuantity,
  }];

  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems, 
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failed_order",
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.error("Error creating Stripe session", 500);
  }
}
