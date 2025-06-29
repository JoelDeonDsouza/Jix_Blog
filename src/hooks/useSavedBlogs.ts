/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook to fetch saved blogs for the authenticated user.
 * Utilizes Clerk authentication and React Query to handle API requests.
 * Fetches blogs saved by the current user with authorization headers.
 * Query is enabled only when user ID is available.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Blog } from '../types';

export const useSavedBlogs = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['saveBlogs', user?.id],
    queryFn: async () => {
      const token = await getToken();
      const userID = user?.id;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}users/saved?clerkUserId=${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data as Blog[];
    },
    enabled: !!user?.id,
  });
};
