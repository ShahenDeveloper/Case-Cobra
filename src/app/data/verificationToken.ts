import { db } from "@/db/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {email}
        })

        return verificationToken
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {token}
        })

        return verificationToken
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }
};