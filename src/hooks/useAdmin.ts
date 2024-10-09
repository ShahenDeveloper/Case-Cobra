"use server";

import { auth } from "@/auth";

export const isAdminUser = async () => {
  const session = await auth();
  const user = session?.user;

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return isAdmin;
};
