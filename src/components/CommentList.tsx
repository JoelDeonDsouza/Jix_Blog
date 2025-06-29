/**
 * @author: Joel Deon Dsouza
 * @description: Displays and manages the comment section for a blog post, including loading, error handling,submission with optimistic UI updates, and user validation.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import CommentTag from './CommentTag';
import { useComments } from '../hooks/useComments';
import type { Comment } from '../types';

type CommentListProps = {
  blogId: string;
};

const CommentList = ({ blogId }: CommentListProps) => {
  const {
    comments,
    isLoading,
    error,
    isSubmitting,
    submitComment,
    optimisticComment,
    isUserLoaded,
    user,
  } = useComments({ blogId });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const desc = formData.get('desc') as string;
    // Submit comment using the hook //
    submitComment(desc);
    // Reset form on successful submission preparation //
    const form = e.currentTarget;
    if (form) form.reset();
  };
  // If loading //
  if (isLoading) {
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
          disabled={isSubmitting || !isUserLoaded || !user}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 && !optimisticComment ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          <>
            {optimisticComment && <CommentTag comment={optimisticComment} />}
            {/* Show existing comments */}
            {comments.map((comment: Comment) => (
              <CommentTag key={comment._id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentList;
