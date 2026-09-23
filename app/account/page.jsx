import { UserButton } from '@clerk/nextjs';

export default function Page() {
  return <main><h1>Your account</h1><p>Use the account menu to sign out.</p><UserButton /><p><a href="/">Return to documentation</a></p></main>;
}
