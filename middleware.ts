import {auth} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT, SIGN_IN, authRoutes, publicRoutes} from "@/routes";

export default auth(req => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
});

/**
 * @see {https://clerk.com/docs/references/nextjs/auth-middleware}
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
