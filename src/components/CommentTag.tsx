import ImageTag from './ImageTag';
import { format } from 'timeago.js';

interface User {
  _id: string;
  username: string;
  img: string;
}

interface Comment {
  user: User;
  desc: string;
  createdAt: string;
}

interface CommentTagProps {
  comment: Comment;
}

const CommentTag = ({ comment }: CommentTagProps) => {
  const { user, desc, createdAt } = comment;
  return (
    <div className="p-4 bg-white rounded-2xl mb-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        {user.img && (
          <ImageTag
            src={user.img}
            className="w-10 h-10 rounded-full object-cover"
            width="40"
            height="40"
            alt={`${user.username}'s profile`}
          />
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span className="font-medium text-gray-900">{user.username || 'Anonymous User'}</span>
          <span className="text-sm text-gray-500" title={new Date(createdAt).toLocaleString()}>
            {format(createdAt)}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{desc}</p>
      </div>
    </div>
  );
};

export default CommentTag;
