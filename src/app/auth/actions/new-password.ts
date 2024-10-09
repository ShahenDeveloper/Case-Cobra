"use server";

import { getUserByEmail } from "@/app/actions/user";
import { NewPasswordSchema } from "@/app/schemas";
import { getPasswordResetTokenByToken } from "@/app/data/password-reset-token";
import { db } from "@/db/prisma";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  token: string | null,
  values: z.infer<typeof NewPasswordSchema>
) => {
  try {
    if (!token) {
      return { error: "Missing Token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired" };
    }

    const exisitingUser = await getUserByEmail(existingToken.email);

    if (!exisitingUser) {
      return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: exisitingUser.id },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return {success: true, message: "Password updated!"}    
  } catch (error) {
    console.error("Error resetting password:", error);
    return { error: "Something went wrong. Please try again later." };  }
};
