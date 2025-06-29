/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook to fetch a list of featured blogs.
 * Utilizes React Query to fetch data from the API with a limit of 4 featured blogs.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { BlogResponse } from '../types';

const fetchFeaturedBlogs = async (): Promise<BlogResponse> => {
  const response = await axios.get<BlogResponse>(
    `${import.meta.env.VITE_API_URL}blogs/list?featured=true&limit=4`,
  );
  return response.data;
};

export const useFeaturedBlogs = () => {
  return useQuery<BlogResponse>({
    queryKey: ['featuredBlog'],
    queryFn: fetchFeaturedBlogs,
  });
};
