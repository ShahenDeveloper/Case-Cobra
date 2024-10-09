"use server"

import { db } from "@/db/prisma";
import { OrderStatus } from "@prisma/client";

export const changeOrderStatus = async ({id, newStatus}: {id: string, newStatus: OrderStatus}) => {
    try {
        await db.order.update({
            where: {id},
            data: {status: newStatus}
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.log("Error in server")
    }
};
