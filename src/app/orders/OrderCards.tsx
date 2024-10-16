"use client";
import { useSession } from "next-auth/react";
import OrderLoginModal from "./OrderLoginModal";
import { cn, formatPrice } from "@/lib/utils";
import Phone from "../components/Phone";
import { useQuery } from "@tanstack/react-query";
import getOrderByEmail from "./action";
import { LABEL_MAP } from "../dashboard/StatusDropDown";
import CustomLoader from "./CustomLoader";
import NoOrderCard from "./NoOrderCard";

const OrderCards = () => {
  const { data: session } = useSession();
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-order-details"],
    queryFn: async () => await getOrderByEmail(),
  });

  if (!session || !session.user) {
    return <OrderLoginModal />;
  }
  //@ts-expect-error no prob
  if (isLoading && orders?.length !== 0) {
    return <CustomLoader />;
  }

  if (isError || !orders || orders.length === 0) {
    return <NoOrderCard />;
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center min-h-screen my-12 gap-8 mx-4",
        orders.length === 2
          ? "!md:my-12"
          : orders.length <= 3
          ? "!md:my-20"
          : "md:my-[-69px]"
      )}
    >
      {orders.map((order) => (
        <div key={order.id} className="w-full max-w-4xl">
          <div className="grid grid-cols-12 w-full border border-gray-200 p-6 md:p-10 gap-4 rounded-lg bg-white">
            <div className="md:col-span-5 col-span-12 mb-2 m-auto">
              <Phone
                color={order.configuration.color!} 
                className="w-36"
                imgSrc={
                  order.configuration.croppedImageUrl
                    ? order.configuration.croppedImageUrl
                    : ""
                }
              />
            </div>
            <div className="md:col-span-7 col-span-12 self-center">
              <div>
                <h2 className="text-gray-800 text-start text-base md:text-lg font-semibold">
                  Order Summary
                </h2>
                <div className="w-full h-px bg-gray-200 my-2" />
                <p className="text-gray-700 text-sm text-start">
                  Ordered on:
                  <strong>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>
                </p>
                <p className="text-gray-700 text-sm text-start">
                  Total Amount: <strong>{formatPrice(order.amount)}</strong>
                </p>
              </div>

              <div className="w-full h-px bg-gray-200 my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                <div className="flex flex-row md:flex-col items-start">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    Customer Name<span className="md:hidden">:</span>{" "}
                    <strong className="text-gray-800 font-semibold md:hidden">
                      {order.user.name}
                    </strong>
                  </h2>
                  <p className="text-gray-800 text-[15px] md:block hidden">
                    {order.user.name}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    Payment Status<span className="md:hidden">:</span>{" "}
                    <strong className="text-gray-800 font-semibold md:hidden">
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </strong>
                  </h2>
                  <p className="text-gray-800 text-[15px] md:block hidden">
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>

                <div className="w-full md:hidden h-px bg-gray-200" />

                <div className="flex-col items-start flex">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    Model <span className="md:hidden">:</span>{" "}
                    <strong className="text-gray-800 font-semibold md:hidden">
                      {order.configuration.model}
                    </strong>
                  </h2>
                  <p className="text-gray-800 text-[15px] font-semibold md:block hidden">
                    {order.configuration.model}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    Case Color<span className="md:hidden">:</span>{" "}
                    <strong className="text-gray-800 font-semibold md:hidden">
                      {order.configuration.color}
                    </strong>
                  </h2>
                  <p className="text-gray-800 text-[15px] md:block hidden">
                    {order.configuration.color}
                  </p>
                </div>

                <div className="w-full md:hidden h-px bg-gray-200" />

                <div className="flex-col items-start flex">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    Delivery Status<span className="md:hidden">:</span>{" "}
                    <strong className="text-gray-800 font-semibold md:hidden">
                      {LABEL_MAP[order.status]}
                    </strong>
                  </h2>
                  <p className="text-gray-800 text-[15px] font-semibold md:block hidden">
                    {LABEL_MAP[order.status]}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    Quantity<span className="md:hidden">:</span>{" "}
                    <strong className="text-gray-800 font-semibold md:hidden">
                      1
                    </strong>
                  </h2>
                  <p className="text-gray-800 text-[15px] md:block hidden">1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCards;
