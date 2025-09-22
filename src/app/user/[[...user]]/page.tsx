import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => (
  <div className="flex justify-center items-center h-screen">
    <UserProfile
      path="/user"
      routing="path"
      appearance={{
        variables: {
          colorPrimary: '#FFC72C',
        },
      }}
    />
  </div>
);

export default UserProfilePage;
