import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher([ '/user(.*)', 
'/admin(.*)', 
'/booking(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Block unauthorized users at server-edge
  if (protectedRoutes(req) && !userId) {
    const signInUrl = new URL('/singin', req.url)
   
    signInUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  '/(api|trpc)(.*)',],
};