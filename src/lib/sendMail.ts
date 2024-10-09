import EmailContent from "@/app/components/emails/SendVerificationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const customLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: EmailContent({link: customLink, type:"verification"})
  })
};


export const sendPasswordResetEmail = async (email: string, token: string) => {
  const customLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react:  EmailContent({link: customLink, type:"reset"})
  });
};
