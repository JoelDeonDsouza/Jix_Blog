/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook to fetch and create comments for a blog post.
 * Utilizes React Query for data fetching and mutation with Clerk authentication.
 * Includes optimistic UI updates and error handling with toast notifications.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import type { Comment, CreateCommentRequest, CreateCommentResponse, CustomError } from '../types';

interface UseCommentsProps {
  blogId: string;
}

const fetchComments = async (blogId: string): Promise<Comment[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}comments/${blogId}`);
  return response.data;
};

const createComment = async (
  blogId: string,
  commentData: CreateCommentRequest,
  token: string | null,
): Promise<CreateCommentResponse> => {
  const requestBody = {
    desc: commentData.desc,
    clerkUserId: commentData.clerkUserId,
  };
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}comments/${blogId}`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const useComments = ({ blogId }: UseCommentsProps) => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

  // Fetch comments query //
  const commentsQuery = useQuery<Comment[], Error>({
    queryKey: ['comments', blogId],
    queryFn: () => {
      if (!blogId) throw new Error('Blog ID is undefined');
      return fetchComments(blogId);
    },
    enabled: !!blogId,
  });

  // Create comment mutation //
  const createCommentMutation = useMutation<
    CreateCommentResponse,
    CustomError,
    CreateCommentRequest
  >({
    mutationFn: async (newComment: CreateCommentRequest) => {
      const token = await getToken();
      console.log(
        'Token being sent:',
        token ? `Token exists: ${token.substring(0, 20)}...` : 'No token',
      );
      return createComment(blogId, newComment, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', blogId],
      });
      toast.success('Comment posted successfully!');
    },
    onError: (error: CustomError) => {
      console.error('Comment creation error:', error);
      if (error.response) {
        const errorMessage = error.response.data.message || 'Failed to post comment';
        toast.error(`Error: ${errorMessage}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  // Submit new comment //
  const submitComment = (commentText: string) => {
    // Check if user is loaded and has an id //
    if (!isLoaded || !user?.id) {
      console.error('User not loaded or ID is undefined:', { isLoaded, user, userId: user?.id });
      toast.error('You must be logged in to comment');
      return;
    }

    if (!blogId) {
      toast.error('Blog ID is missing');
      return;
    }

    if (!commentText || commentText.trim().length === 0) {
      toast.error('Comment cannot be empty');
      return;
    }

    console.log('Submitting comment with user ID:', user.id);

    const commentData: CreateCommentRequest = {
      desc: commentText.trim(),
      clerkUserId: user.id,
    };

    createCommentMutation.mutate(commentData);
  };

  // Optimistic comment for UI feedback //
  const createOptimisticComment = (): Comment | null => {
    if (!user || !user.id || !createCommentMutation.variables) return null;
    return {
      _id: 'temp-' + Date.now(),
      desc: `${createCommentMutation.variables.desc} (Sending...)`,
      createdAt: new Date().toISOString(),
      user: {
        id: user.id,
        username: user.username || 'Anonymous',
        img: user.imageUrl || '',
      },
    };
  };

  return {
    comments: commentsQuery.data || [],
    isLoading: commentsQuery.isPending,
    error: commentsQuery.error,
    isSubmitting: createCommentMutation.isPending,
    submitComment,
    optimisticComment: createCommentMutation.isPending ? createOptimisticComment() : null,
    isUserLoaded: isLoaded,
    user,
  };
};
