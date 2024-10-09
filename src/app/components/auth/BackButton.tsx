"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button"; 

interface Props {
  label: string;
  href: string;
}

const BackButton: React.FC<Props> = ({ label, href }) => {
  return (
    <Button size={"sm"} className="font-normal w-full text-gray-600" variant={"link"}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
