/**
 * @author: Joel Deon Dsouza
 * @description: Component that provides actions for a blog post such as saving, featuring, and deleting, with logic based on user roles and ownership.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../types';
import { useSavedBlogs } from '../hooks/useSavedBlogs';
import { useBlogActions } from '../hooks/useBlogActions';

interface BlogActionsProps {
  blog: Blog;
}

const BlogActions = ({ blog }: BlogActionsProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isPending, error, data: savedBlogs } = useSavedBlogs();
  const { deleteMutation, saveMutation, featuredMutation } = useBlogActions(blog);
  // Check if the user is an admin or if the blog belongs to the user //
  const isAdmin = user?.publicMetadata?.role === 'admin' || false;
  const isSaved = savedBlogs?.some((savedBlog: Blog) => savedBlog.id === blog.id) || false;
  const handleDelete = () => {
    deleteMutation.mutate();
  };
  const handleFeature = () => {
    featuredMutation.mutate();
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
      {user ? (
        <>
          <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
          {isPending ? (
            <span>Loading...</span>
          ) : error ? (
            <span>Error: {error?.message}</span>
          ) : (
            <div
              className="flex items-center gap-2 py-2  text-sm cursor-pointer"
              onClick={handleSave}
            >
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
          {/* Make featured */}
          {isAdmin && (
            <div
              className="flex items-center gap-2 py-2  text-sm cursor-pointer"
              onClick={handleFeature}
            >
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
                <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2" />
              </svg>
              <span>Make Feature</span>
              {featuredMutation.isPending && (
                <span className="text-sm text-gray-500">Saving...</span>
              )}
            </div>
          )}
          {/* Delete blog */}
          {(user && blog.user.username === user?.fullName) || isAdmin ? (
            <div
              className="flex items-center gap-2 py-2  text-sm cursor-pointer"
              onClick={handleDelete}
            >
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
              {deleteMutation.isPending && (
                <span className="text-sm text-gray-500">Deleting...</span>
              )}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default BlogActions;
