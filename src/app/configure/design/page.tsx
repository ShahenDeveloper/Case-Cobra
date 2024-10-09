import { db } from "@/db/prisma"
import { notFound } from "next/navigation"
import DesignConfiguration from "./DesignConfiguration"

interface PageProps{
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}
const page = async ({searchParams}: PageProps) => {
    const {id} = searchParams
    if(!id || typeof id !== "string"){
        return notFound()
    }

    const configuration = await db.configuration.findUnique({
        where: { id }
    })

    if(!configuration){
        return notFound()
    }

    const { imgUrl, width, height } = configuration
  return (
    <DesignConfiguration configId={configuration.id} imgUrl={imgUrl} imageDimensions={{width, height}}/>
  )
}

export default page