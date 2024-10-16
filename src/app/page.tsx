import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Phone from "./components/Phone";
import Reviews from "./components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ShoppingCart from "./components/ShoppingCart";
import Comments from "./components/Comments";
import HeroSection from "./components/HeroSection";
import { Icons } from "./components/Icons";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <ShoppingCart />
      <HeroSection />
      <section className="bg-slate-100 py-24 overflow-hidden">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
              What our{' '}
              <span className='relative px-2'>
                customers{' '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500' />
              </span>{' '}
              say
            </h2>
            <img src='/snake-2.png' className='w-24 order-0 lg:order-2' />
          </div>
          <Comments />
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                <span>Upload your photo and get</span>
                <span className="relative px-2 text-green-600">
                  {" "}
                  your own case
                </span>{" "}
                <span> now</span>
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                alt="Arrow picture"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img
                  src="/horse.jpg"
                  alt="Horse picture"
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                />
              </div>
              <Phone className="w-60" imgSrc="/horse.jpg" />
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="text-green-600 inline mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="text-green-600 inline mr-1.5" />
              Scratch and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="text-green-600 inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="text-green-600 inline mr-1.5" />5 year print
              warranty
            </li>

            <div className="flex justify-center">
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
              >
                Create your case now <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
