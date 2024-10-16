import { Skeleton } from "@/components/ui/skeleton"

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen mx-9 md:my-0 my-12">
    <div className="grid border border-gray-200 p-6 md:p-10 rounded-lg grid-cols-12 gap-8 md:gap-0 w-full max-w-4xl">
      <div className="md:col-span-6 col-span-12 flex justify-center">
        <Skeleton className="h-72 w-48" />
      </div>
      <div className="md:col-span-6 mx-auto col-span-12 space-y-8 my-auto">
        <Skeleton className="h-4 w-[300px]" />

        <Skeleton className="h-4 w-[300px]" />

        <Skeleton className="h-4 w-[300px]" />

        <Skeleton className="h-4 w-[300px]" />

        <Skeleton className="h-4 w-[300px]" />

        <Skeleton className="h-4 w-[300px]" />
      </div>
    </div>
  </div>  )
}

export default CustomLoader