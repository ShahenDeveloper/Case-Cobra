import { Check, Star } from 'lucide-react'
import React from 'react'

interface CommentProps {
    text1: string;
    text2?: string
    hightLightedText: string;
    imgSrc: string;
    customerName: string
}
const Comment: React.FC<CommentProps> = ({
    text1,
    text2,
    hightLightedText,
    imgSrc,
    customerName
}) => {
  return (
    <div 
    className="flex flex-auto flex-col gap-4 " 
  >
    <div className="flex gap-0.5 mb-2">
      <Star className="h-5 w-5 text-green-600 fill-green-600" />
      <Star className="h-5 w-5 text-green-600 fill-green-600" />
      <Star className="h-5 w-5 text-green-600 fill-green-600" />
      <Star className="h-5 w-5 text-green-600 fill-green-600" />
      <Star className="h-5 w-5 text-green-600 fill-green-600" />
    </div>
    <div className="text-lg leading-8">
    <p>
  "{text1}{" "}
  <span className="p-0.5 bg-slate-800 text-white">
    {hightLightedText}
  </span>
  {text2}""
</p>
    </div>
    <div className="flex gap-4 mt-2">
      <img
        className="rounded-full h-12 w-12 object-cover"
        src={imgSrc}
        alt="user"
      />
      <div className="flex flex-col">
        <p className="font-semibold">{customerName}</p>
        <div className="flex gap-1.5 items-center text-zinc-600">
          <Check className="h-4 w-4 stroke-[3px] text-green-600" />
          <p className="text-sm">Verified Purchase</p>
        </div>
      </div>
    </div>
  </div>  )
}

export default Comment