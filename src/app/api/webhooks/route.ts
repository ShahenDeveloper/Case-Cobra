import { db } from "@/db/prisma";
import { sendOrderConfirmationEmail } from "@/lib/sendMail";
import { stripe } from "@/lib/stripe"; 
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    console.log("in webhook...");
    
    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }
    
    console.log("in webhook22...");

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_details?.email) {
        throw new Error("Missing user email");
      }

      console.log("in webhook33...");

      const { userId, orderId } = session.metadata || { userId: null, orderId: null };

      if (!userId || !orderId) {
        console.log("don't get the userId or orderId");
        throw new Error("Invalid request metadata");
      }

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
      });

      await sendOrderConfirmationEmail({
        orderId,
        orderDate: updatedOrder.createdAt.toLocaleDateString(),
        //@ts-expect-error asd
        shippingAddress: {
          name: session.customer_details!.name!,
          city: shippingAddress!.city!,
          country: shippingAddress!.country!,
          postalCode: shippingAddress!.postal_code!,
          street: shippingAddress!.line1!,
          state: shippingAddress!.state,
        },
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error("error in webhooks", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
