"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/app/schemas";
import { db } from "@/db/prisma";
import { getUserByEmail } from "@/app/actions/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/sendMail";

export const registeraction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return {
      error: validationFields.error.errors.map((err) => err.message).join(", "),
    };
  }

  const { email, password, name } = validationFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing_user = await getUserByEmail(email)

if (existing_user) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

const verificationToken = await generateVerificationToken(email)


await sendVerificationEmail(
  verificationToken.email,
  verificationToken.token
)


  return { success: "Please check your email to verify your account." };
};
