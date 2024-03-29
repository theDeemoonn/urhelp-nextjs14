import type { AuthOptions } from "next-auth";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { IUser } from "@/types/IUser";

export const authConfig: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Имя пользователя",
          type: "text",
          placeholder: "Имя пользователя",
          required: true,
        },
        password: {
          label: "Пароль",
          type: "password",
          placeholder: "Пароль",
          required: true,
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as IUser;

        

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
        
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),


    VkProvider({
      clientId: process.env.VK_CLIENT_ID!,
      clientSecret: process.env.VK_CLIENT_SECRET!,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
    // EmailProvider({
    //     server: process.env.EMAIL_SERVER,
    //     from: process.env.EMAIL_FROM,
    //     maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    //   }),
  ],
    pages: {
      signIn: "/login",
      
     
    },


  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, account, profile }) { 
      if(account && account.type === "credentials") { //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
      }
      return token;
    },
    async session({ session, token, user }) { 
      session.user.id = token.userId; //(3)
      return session;
    },
  },



  secret: process.env.NEXTAUTH_SECRET!,
};
