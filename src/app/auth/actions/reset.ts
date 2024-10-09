"use server"

import { getUserByEmail } from "@/app/actions/user"
import { ResetSchema } from "@/app/schemas"
import { sendPasswordResetEmail } from "@/lib/sendMail" 
import { generateResetPasswordToken } from "@/lib/tokens"
import * as z from "zod"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validationFields = ResetSchema.safeParse(values)

    if(!validationFields.success){
        return {error: "Invalid email!"}
    }

    const {email } = validationFields.data

    const exisitingUser =await getUserByEmail(email)

    if(!exisitingUser) {
        return {error: "User does not exist!"}
    }

    const passwordResetToken = await generateResetPasswordToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

return {success: "Reset email sent!"}
}