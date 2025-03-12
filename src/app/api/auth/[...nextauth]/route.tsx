import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
import { NextAuthOptions } from "next-auth";

// تنظیمات NextAuth
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // اطمینان حاصل کنید که NEXTAUTH_SECRET تنظیم شده است
  session: {
    strategy: "jwt", // استراتژی jwt برای سشن
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  debug: true,
  callbacks: {
    // Callback برای signIn
    async signIn({ user, account, profile }) {
      console.log("signIn callback - user, account, profile:", {
        user,
        account,
        profile,
      });
      if (account.provider === "google") {
        const client = await MongoClient.connect(process.env.MONGODB_URI!, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        const db = client.db();
        const usersCollection = db.collection("users");
        // چک کردن وجود کاربر در دیتابیس
        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        console.log("کاربر موجود در دیتابیس:", existingUser);
        if (!existingUser) {
          console.log("ثبت‌نام کاربر جدید با ایمیل:", user.email);
          // ثبت‌نام کاربر جدید
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            googleId: profile.sub,
          });
        }

        client.close();
      }
      return true;
    },

    async jwt({ token, account, user }) {
      console.log("jwt callback - token, user, account:", {
        token,
        user,
        account,
      });
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        console.log("توکن دسترسی ذخیره شد:", token.accessToken);
      }
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        console.log("اطلاعات کاربر ذخیره شد:", {
          name: token.name,
          email: token.email,
        });
      }
      return token;
    },

    async session({ session, token }) {
      console.log("session callback - session, token:", { session, token });
      session.user = {
        name: token.name,
        email: token.email,
        image: token.image,
      };
      session.accessToken = token.accessToken; // توکن دسترسی را ذخیره کنید
      console.log("داده‌های سشن به‌روز شد:", session);
      return session;
    },
  },
};

console.log("NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET);

// صادر کردن NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
