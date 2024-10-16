import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const NoOrderCard = () => {
  return (
    <div className="flex flex-col justify-center mx-auto items-center h-fit  my-auto text-center">
    <div className="mb-6">
      <Image
      priority
        width={200}
        height={200}
        src="/sad.svg"
        alt="Sad face"
        className="mx-auto"
      />
    </div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
      No Orders Yet
    </h2>
    <p className="text-gray-500 mb-6">
      It's sad you haven't ordered a case yet.
    </p>
    <Link
      href={"/configure/upload"}
      className={cn(buttonVariants({ className: "w-56" }))}
    >
      Create a case
    </Link>
  </div>  )
}

export default NoOrderCard