import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//  User type //
interface User {
  id: string;
  img: string;
  username: string;
}

//  Blog type //
interface Blog {
  category: string;
  content: string;
  coverImg: string;
  createdAt: string;
  desc: string;
  id: string;
  isFeatured: boolean;
  slug: string;
  title: string;
  updatedAt: string;
  user: User;
  visitCount: number;
  __v: number;
  _id: string;
}

interface BlogActionsProps {
  blog: Blog;
}

interface CustomError extends Error {
  response?: {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
  };
}

const BlogActions = ({ blog }: BlogActionsProps) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Fetch saved blogs for the user //
  const {
    isPending,
    error,
    data: savedBlogs,
  } = useQuery({
    queryKey: ['saveBlogs', user?.id],
    queryFn: async () => {
      const token = await getToken();
      const userID = user?.id;
      return axios.get(`${import.meta.env.VITE_API_URL}users/saved?clerkUserId=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    enabled: !!user?.id,
  });

  const isSaved = savedBlogs?.data?.some((savedBlog: Blog) => savedBlog.id === blog.id) || false;

  // Delete blog mutation //
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const clerkUserId = user?.id;
      return axios.delete(`${import.meta.env.VITE_API_URL}blogs/delete/${blog._id}`, {
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

  const handleDelte = () => {
    deleteMutation.mutate();
  };

  const handleSave = () => {
    if (!user) {
      return navigate('/sign-in');
    }
    if (isSaved) {
      return;
    }
    saveMutation.mutate();
  };

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {isPending ? (
        <span>Loading...</span>
      ) : error ? (
        <span>Error: {error?.message}</span>
      ) : (
        <div className="flex items-center gap-2 py-2  text-sm cursor-pointer" onClick={handleSave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2Z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8 15 3" />
          </svg>
          <span>Save blog</span>
          {saveMutation.isPending && <span className="text-sm text-gray-500">Saving...</span>}
        </div>
      )}

      {/* Delete blog */}
      {user && blog.user.username === user?.fullName && (
        <div className="flex items-center gap-2 py-2  text-sm cursor-pointer" onClick={handleDelte}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span>Delete blog</span>
          {deleteMutation.isPending && <span className="text-sm text-gray-500">Deleting...</span>}
        </div>
      )}
    </div>
  );
};

export default BlogActions;
