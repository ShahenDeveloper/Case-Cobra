'use server'

import { auth } from "@/auth"
import { getUserByEmail } from "../actions/user"

export const getAuthStatus = async () => {
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    throw new Error('Unauthorized')
  }

  const user = await getUserByEmail(session.user.email as string)

  if (!user) {
    throw new Error("User not found")
  }

  return { success: true }
}
