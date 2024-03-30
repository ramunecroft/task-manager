import authConfig from "@/auth.config";
import {DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes} from "@/routes";
import NextAuth from "next-auth";

const {auth} = NextAuth(authConfig);

export default auth(req => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
});

/**
 * @see {https://clerk.com/docs/references/nextjs/auth-middleware}
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
