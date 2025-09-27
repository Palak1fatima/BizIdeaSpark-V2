import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/contact',
    '/privacy',
    '/terms',
    '/pro',
    '/saved',
    '/sign-in',
    '/sign-up',
    '/finishLogin'
  ]
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
