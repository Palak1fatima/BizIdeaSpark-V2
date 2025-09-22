
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        afterSignInUrl="/"
        routing="hash"
        appearance={{
          variables: {
            colorPrimary: '#FFC72C',
          },
        }}
      />
    </div>
  );
}
