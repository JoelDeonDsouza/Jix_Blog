/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook to handle blog-related mutations such as deleting, saving, and featuring blogs using React Query and Clerk authentication.
 * Provides mutation handlers with optimistic UI updates and error handling.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Blog, CustomError } from '../types';

export const useBlogActions = (blog: Blog) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Delete blog mutation //
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const clerkUserId = user?.id;
      return axios.delete(`${import.meta.env.VITE_API_URL}blogs/delete/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { clerkUserId },
      });
    },
    onSuccess: () => {
      toast.success('Blog deleted successfully');
      navigate('/');
    },
    onError: (error) => {
      toast.error(`Error deleting blog: ${error.message}`);
    },
  });

  // Save blog mutation //
  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const clerkUserId = user?.id;
      const blogId = blog.id;
      return axios.patch(
        `${import.meta.env.VITE_API_URL}users/save`,
        { clerkUserId, blogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saveBlogs'] });
    },
    onError: (error: CustomError) => {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === 'Blog is already saved.'
      ) {
        toast.info('Blog is already saved');
      } else {
        toast.error(`Error saving blog: ${error.message}`);
      }
    },
  });

  // Feature blog mutation //
  const featuredMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const clerkUserId = user?.id;
      const blogId = blog.id;
      return axios.patch(
        `${import.meta.env.VITE_API_URL}blogs/featured`,
        { clerkUserId, blogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', blog.slug] });
    },
    onError: (error: CustomError) => {
      toast.error(`Error featuring blog: ${error.message}`);
    },
  });

  return {
    deleteMutation,
    saveMutation,
    featuredMutation,
  };
};
