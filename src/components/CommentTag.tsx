/**
 * @author: Joel Deon Dsouza
 * @description: Renders a single comment with user details, avatar, timestamp, and content formatting for display in the comment list.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import ImageTag from './ImageTag';
import { format } from 'timeago.js';
import type { CommentTagProps } from '../types';

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
