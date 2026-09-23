import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return <main><div className="label">gprop · private access test</div><h1>Welcome back</h1>
    <p>Use your approved email address to sign in. We’ll email you a verification code.</p>
    <div className="login"><SignIn routing="path" path="/sign-in" signUpUrl="/sign-up/" forceRedirectUrl="/" appearance={{ elements: { socialButtons: { display: 'none' }, dividerRow: { display: 'none' }, footerAction: { display: 'none' } } }} /></div>
    <p>This is a test of invite-only access. The existing public documentation remains available during testing.</p>
  </main>;
}
