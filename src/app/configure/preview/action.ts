"use server";

import { auth } from "@/auth";
import { BASE_PRICE, PRODUCT_PRICES } from "@/app/config/product"
import { db } from "@/db/prisma";
import { stripe } from "@/lib/stripe"; 
import { Order } from "@prisma/client";
import { getUserByEmail } from "@/app/actions/user";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("You need to logged in");
  }

  const session = await auth()
  const email = session?.user?.email ?? "";
  const user = await getUserByEmail(email)

  if (!user || !session) {
    throw new Error("You need to logged in");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });
  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id as string,
        configurationId: configuration.id,
      },
    });
  }


  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imgUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["BD", "DE", "US", "UA", "IN", "PG"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
