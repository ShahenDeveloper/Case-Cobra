"use server";

import { getUserByEmail } from "@/app/actions/user";
import { getVerificationTokenByToken } from "@/app/data/verificationToken";
import { db } from "@/db/prisma";

export const newVerification = async (token: string) => {
  const exisiting_token = await getVerificationTokenByToken(token);

  if (!exisiting_token) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(exisiting_token.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const exisitingUser = await getUserByEmail(exisiting_token.email);

  if (!exisitingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: {
      id: exisitingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: exisitingUser.email,
    },
  });

  await db.verificationToken.delete({
    where: {
        id: exisiting_token.id
    }
  })
  
  return {success: "Email verified!"}
};
