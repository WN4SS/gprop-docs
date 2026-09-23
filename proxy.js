import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();
// HTML, search JSON, scripts, images, and downloads must all reach the protected handler.
export const config = { matcher: ['/((?!_next/).*)'] };
