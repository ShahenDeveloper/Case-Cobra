"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import getOrderByEmail from "../orders/action";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ShoppingCart = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["get-order-details"],
    queryFn: async () => await getOrderByEmail(),
  });
  return (
    <motion.div
      initial={{ y: -48 }}
      animate={{ y: [-48, -60, -48] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
      }}
      className="bg-slate-200 right-6 bottom-12 z-50 w-16 h-16 fixed rounded-full flex items-center justify-center"
    >
      <Tooltip >
        <TooltipTrigger>
          <TooltipContent>
            Order Details
          </TooltipContent>
        <Link
          href={"/orders"}
          className="w-full h-full flex items-center justify-center"
        >
          {/* @ts-expect-error no prob */}
          {orders?.length !== 0 && !isLoading && (
            <span className="h-2 w-2 rounded-full bg-red-600 absolute top-5 right-5"></span>
          )}
          <ShoppingBag size={24} className="text-gray-800" />
        </Link>
        </TooltipTrigger>
      </Tooltip>
    </motion.div>
  );
};

export default ShoppingCart;
