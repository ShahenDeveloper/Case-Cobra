import { Check, Star } from "lucide-react";
import Phone from "./Phone";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";

const HeroSection = () => {
  return (
    <section>
      <MaxWidthWrapper className="pb-24 overflow-hidden pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="col-span-2 px-6 pg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="absolute w-28 left-0 -top-20 hidden lg:block">
              <Image
                className="w-full"
                src="/snake-1.png"
                alt="snake image"
                width={112}
                height={112}
              />
            </div>
            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
              Your Image on a
              <span className="bg-green-600 px-2 text-white">Custom</span>
              Phone Case
            </h1>
            <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
              Capture your favorite memories with your own,{" "}
              <span className="font-semibold">
                phone case. CaseCobra allows you to protect your memories, not
                just your phone case.
              </span>
            </p>
            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
              <div className="space-y-2">
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  High-quality, durable material
                </li>
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />5 years
                  print gurantee
                </li>
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Modern iPhone models supported
                </li>
              </div>
            </ul>

            <div className="flex mt-12 flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex -space-x-4">
                <Image
                  src={"/users/user-1.png"}
                  alt="User png"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />

                <Image
                  src={"/users/user-2.png"}
                  alt="User png"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />

                <Image
                  src={"/users/user-3.png"}
                  alt="User png"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />

                <Image
                  src={"/users/user-4.jpg"}
                  alt="User png"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />

                <img
                  src={
                    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                  }
                  alt="User png"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />
              </div>
              <div className="flex flex-col justify-between items-center sm:items-start">
                <div className="flex gap-0.5">
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />

                  <Star className="h-4 w-4 text-green-600 fill-green-600" />

                  <Star className="h-4 w-4 text-green-600 fill-green-600" />

                  <Star className="h-4 w-4 text-green-600 fill-green-600" />

                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                </div>
                <p>
                  <span>1.250</span> happy customers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit"
        >
          <div className="relative md:max-w-xl">
            <img
              src="/your-image.png"
              className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              alt="Your Image"
            />
            <img
              src="/line.png"
              className="absolute w-20 -left-6 -bottom-6 select-none"
              alt="line image"
            />
            <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
          </div>
        </div>{" "}
      </MaxWidthWrapper>
    </section>
  );
};

export default HeroSection;
