import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const OrderLoginModal = () => {
  return (
    <div className="flex justify-center items-center mx-auto my-auto">
    <Card className="border border-gray-300 p-6 mr-4 ml-4 lg:p-12 gap-8 flex flex-col justify-center items-center max-w-md mx-auto">
      <Image
      width={80}
      height={80}
        className="mx-auto w-16 h-16 lg:w-20 lg:h-20 object-contain"
        alt="logo"
        src={"/snake-1.png"}
      />
      <h2 className="text-center text-lg lg:text-xl font-semibold text-gray-700">
        Please login to access this page
      </h2>
      <p className="text-gray-500 text-sm lg:text-base text-center">
        You need to be logged in to view your orders. Sign in or create an
        account to continue.
      </p>
      <div className="flex items-center justify-center gap-2 lg:gap-4 w-full">
        <Link
          href={"/auth/login"}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Login
        </Link>
        <Link
          href={"/auth/register"}
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          Sign up
        </Link>
      </div>
    </Card>
  </div>  )
}

export default OrderLoginModal