"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { changeOrderStatus } from "./action";

// Correctly map the OrderStatus enum keys
export const LABEL_MAP: Record<OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

const StatusDropDown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  const router = useRouter();

  const {mutate} = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh()
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(LABEL_MAP).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              { "bg-zinc-100": orderStatus === status }
            )}
            onClick={() => mutate({id, newStatus: status as OrderStatus})}
          >
            <Check
              className={cn("mr-2 h-4 w-4 text-primary", {
                "opacity-100": orderStatus === status,
                "opacity-0": orderStatus !== status,
              })}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
