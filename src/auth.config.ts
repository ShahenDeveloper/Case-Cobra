import {NextAuthConfig} from "next-auth";
import Github from "next-auth/providers/github"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./app/schemas";
import { getUserByEmail } from "./app/actions/user";
import Google from "next-auth/providers/google"
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Validate the credentials
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatched = await bcrypt.compare(password, user.password);
          if (passwordMatched) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig