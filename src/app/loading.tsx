import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-137px)] mx-auto text-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Loading...</h3>
        <p>This won't take long</p>
      </div>
    </div>  )
}

export default Loading