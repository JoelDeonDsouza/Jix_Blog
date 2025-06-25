import CommentTag from './CommentTag';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

// Type definitions
interface User {
  _id: string;
  username: string;
  img: string;
}

interface Comment {
  _id: string;
  user: User;
  desc: string;
  createdAt: string;
}

interface CreateCommentRequest {
  desc: string;
  clerkUserId: string;
  blogId?: string;
}

interface CreateCommentResponse {
  success: boolean;
  data: Comment;
  message: string;
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
}

type CommentListProps = {
  blogId: string;
};

const fetchComment = async (blogId: string): Promise<Comment[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}comments/${blogId}`);
  return response.data;
};

const createComment = async (
  blogId: string,
  commentData: CreateCommentRequest,
  token: string | null,
): Promise<CreateCommentResponse> => {
  // Add blogId to the request body
  const requestBody = {
    ...commentData,
    blogId: blogId,
  };

  console.log('Sending comment data:', requestBody);

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

const CommentList = ({ blogId }: CommentListProps) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Fetch comments for the given blog ID //
  const {
    isPending,
    error,
    data = [],
  } = useQuery<Comment[], Error>({
    queryKey: ['comments', blogId],
    queryFn: () => {
      if (!blogId) throw new Error('Blog ID is undefined');
      return fetchComment(blogId);
    },
    enabled: !!blogId,
  });

  // Mutation to create a new comment //
  const mutation = useMutation<CreateCommentResponse, Error, CreateCommentRequest>({
    mutationFn: async (newComment: CreateCommentRequest) => {
      const token = await getToken();
      return createComment(blogId, newComment, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', blogId],
      });
      toast.success('Comment posted successfully!');

      // Reset form //
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) form.reset();
    },
    onError: (error: Error) => {
      console.error('Comment creation error:', error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as ApiErrorResponse;
        toast.error(`Error: ${errorData.message || 'Failed to post comment'}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('You must be logged in to comment');
      return;
    }

    if (!blogId) {
      toast.error('Blog ID is missing');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const desc = formData.get('desc') as string;

    if (!desc || desc.trim().length === 0) {
      toast.error('Comment cannot be empty');
      return;
    }

    const commentData: CreateCommentRequest = {
      desc: desc.trim(),
      clerkUserId: user.id,
    };

    mutation.mutate(commentData);
  };

  if (isPending) {
    return (
      <div className="flex flex-col gap-8 lg:w-3/5">
        <div className="animate-pulse">Loading comments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8 lg:w-3/5">
        <div className="text-red-500">Error loading comments: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl underline opacity-80">Comments</h1>

      <form className="flex flex-col justify-between gap-6 w-full" onSubmit={handleSubmit}>
        <textarea
          name="desc"
          placeholder="Write your thoughts"
          className="w-full h-40 p-4 rounded-2xl bg-white outline-none resize-none"
          required
          minLength={1}
          maxLength={1000}
        />
        <button
          className="bg-jix w-40 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          <>
            {mutation.isPending && (
              <CommentTag
                comment={{
                  desc: `${mutation.variables?.desc || ''} (Sending...)`,
                  createdAt: new Date().toISOString(),
                  user: {
                    _id: user?.id || '',
                    username: user?.username || 'Anonymous',
                    img: user?.imageUrl || '',
                  },
                }}
              />
            )}
            {data.map((comment: Comment) => (
              <CommentTag key={comment._id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentList;
