/**
 * @author: Joel Deon Dsouza
 * @description: Custom React Query hook to fetch blog data by slug from the API.
 * Uses React Router's useParams to get the slug from the URL.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const fetchBlog = async (slug: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}blogs/${slug}`);
  return response.data;
};

export const useBlog = () => {
  const { slug } = useParams();

  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => {
      if (!slug) throw new Error('Slug is undefined');
      return fetchBlog(slug);
    },
  });
};
