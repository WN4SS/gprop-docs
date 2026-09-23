import { ClerkProvider } from '@clerk/nextjs';
import './login.css';

export const metadata = { title: 'Sign in · gprop', robots: { index: false, follow: false } };
export default function Layout({ children }) {
  return <ClerkProvider signInUrl="/sign-in/" signUpUrl="/sign-up/" signInFallbackRedirectUrl="/" signUpFallbackRedirectUrl="/">
    <html lang="en"><body>{children}</body></html>
  </ClerkProvider>;
}
