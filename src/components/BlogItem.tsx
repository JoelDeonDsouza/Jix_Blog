/**
 * @author: Joel Deon Dsouza
 * @description: Displays a blog preview item with cover image, title, metadata, and a short description,long with navigation links to the full blog post and filtered views.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { Link } from 'react-router-dom';
import ImageTag from './ImageTag';
import { format } from 'timeago.js';
import type { Blog } from '../types';

interface BlogItemProps {
  blog: Blog;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  return (
    <div className="flex flex-col xl:flex-row  mb-12 gap-8">
      {blog.coverImg && (
        <div className="md:hidden xl:block xl:w-1/3">
          <ImageTag
            src={blog?.coverImg}
            className="h-72 w-full object-cover rounded-2xl img-shadow"
            width={'735'}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${blog.slug}`} className="text-4xl font-semibold opacity-80">
          {blog.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Blog by</span>
          <Link to={`/blogs?author=${blog.user.username}`} className="text-orange-600">
            {blog.user.username}
          </Link>
          <span>on</span>
          <Link to={`/blogs?cat=${blog.category}`} className="text-orange-600">
            {blog.category}
          </Link>
          <span>{format(blog.createdAt)}</span>
        </div>
        <p>{blog.desc}</p>
        <Link to={`/${blog.slug}`} className="underline text-orange-600 text-sm">
          Read more..
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
