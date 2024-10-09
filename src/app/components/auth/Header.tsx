import Image from "next/image";

const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={"text-3xl font-semibold"}>CaseCobra</h1>
      <Image src={"/snake-1.png"} alt="Logo" width={45} height={45}/>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export { Header };
