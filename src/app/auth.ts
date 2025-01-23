import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const { auth, handlers, login, logout } = NextAuth({
    providers: [Github],
});