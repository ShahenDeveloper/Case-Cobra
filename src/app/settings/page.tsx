import { auth } from "@/auth"

const Page = async() => {
  const session =await auth()
  const isAdmin = process.env.ADMIN_EMAIL === session?.user?.email ? true : false
  return (
    <div>{JSON.stringify(session)
    }
    <p>IsAdmin: {isAdmin}</p>
    </div>
  )
}

export default Page