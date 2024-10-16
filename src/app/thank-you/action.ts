"use server";

import { auth } from "@/auth";
import { db } from "@/db/prisma";
import { getUserByEmail } from "../actions/user";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const user = await getUserByEmail(email);

  if (!user?.id || !user.email) {
    throw new Error("You need to logged in to view this page");
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) throw Error("Order does not exist.");
  
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
