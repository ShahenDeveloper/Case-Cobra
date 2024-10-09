import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import BackButton from "./BackButton";
import { Header } from "./Header";
import Social from "./Social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  className?: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  className
}: CardWrapperProps) => {
  return (
    <Card className={`w-[400px] mx-5 sm:mx-0 shadow-none ${className}`}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        <div>{children}</div> {/* Wrap children in a single div */}
      </CardContent>
      {showSocial && <Social />}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
