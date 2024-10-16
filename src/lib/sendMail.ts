import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import EmailContent from "@/app/components/emails/SendVerificationEmail";
import OrderReceived from "@/app/components/emails/OrderReceived";
import { ShippingAddress } from "@prisma/client";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}`;

  // Render the EmailContent component into an HTML string
  const emailHtml = render(
    EmailContent({link: verificationLink,type: "verification"})
  );

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Confirm your email",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email.");
  }
};




export const sendPasswordResetEmail = async (email: string, token: string) => {
  const customLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-password?token=${token}`;

  const emailHtml = render(
    EmailContent({link: customLink,type: "reset"})
  );
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions)
    console.log("Reset Email sent!")
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Could not send reset email.")
  }
};

export async function sendOrderConfirmationEmail({
  email,
  shippingAddress,
  orderId,
  orderDate,
}: {
  email: string;
  shippingAddress: ShippingAddress;
  orderId: string;
  orderDate: string;
}) {
  // Generate the HTML content of the email using @react-email/render
  const emailHtml = render(
    OrderReceived({
       orderDate,
       orderId,
       shippingAddress,
    })
  );

  // Send the email
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL, 
      to: email,
      subject: "Order Confirmation - Thank you for your purchase!",
      html: emailHtml, // Rendered email content
    });
    console.log("try in sending mail")
  } catch (error) {
    console.log("error while sending thank you email", error)
  }
}