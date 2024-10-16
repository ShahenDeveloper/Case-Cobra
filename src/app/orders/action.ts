"use server"
import { db } from "@/db/prisma"
import { getUserByEmail } from "../actions/user"
import { auth } from "@/auth"

const getOrderByEmail = async () => {
  try {
    const session = await auth();
    
    // Check if the user is logged in
    if (!session || !session.user?.email) {
      return []
    }
    
    const email = session.user.email;
    const user = await getUserByEmail(email);
    
    if (!user) {
     return []
    }

    const orders = await db.order.findMany({
      where: { userId: user.id },
      include: {
        user: true,
        configuration: true,  
      },
    })

    if(!orders){
        return false
    }


    return orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Could not retrieve order details");
  }
}

export default getOrderByEmail;
