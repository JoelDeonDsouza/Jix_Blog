/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook for creating a new blog post.
 * Utilizes Clerk authentication and React Query mutation.
 * Handles API request to create a blog, shows success toast, and navigates to the created blog.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type BlogPostData = {
  title: string | null;
  category: string | null;
  desc: string | null;
  content: string;
  clerkUserId: string;
  coverImg: string;
};

export const useCreateBlog = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newBlogPost: BlogPostData) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}blogs/create`, newBlogPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: (res) => {
      toast.success('Blog created successfully!');
      navigate(`/${res.data.data.slug}`);
    },
  });
};
