/**
 * @author: Joel Deon Dsouza
 * @description: Custom hook to provide authentication state using Clerk's useUser hook.
 * Returns loading status, sign-in status, user data, and derived auth flags.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useUser } from '@clerk/clerk-react';

export const useAuthState = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return {
    isLoaded,
    isSignedIn,
    user,
    isAuthenticated: isLoaded && isSignedIn,
    isUnauthenticated: isLoaded && !isSignedIn,
  };
};
