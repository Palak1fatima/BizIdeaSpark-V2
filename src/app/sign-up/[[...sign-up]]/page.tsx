
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        afterSignUpUrl="/"
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
