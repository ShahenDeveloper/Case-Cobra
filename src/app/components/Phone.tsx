import { cn } from "@/lib/utils";
import { CaseColor } from "@prisma/client";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
  color?: CaseColor
}

const Phone = ({ imgSrc, className, dark = false, color, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />

      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover z-0 min-w-full min-h-full"
          src={imgSrc}
          alt="overlaying phone image"
        />
        <div
          className={cn("absolute inset-0 -z-10", {
            "bg-rose-500": color === "rose",
            "bg-zinc-900": color === "black",
            "bg-blue-500": color === "blue",
          })}
        ></div>
      </div>
    </div>
  );
};

export default Phone;
