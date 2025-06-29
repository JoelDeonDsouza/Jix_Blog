/**
 * @author: Joel Deon Dsouza
 * @description: Displays a list of featured blog posts, highlighting the primary post and showcasing up to three additional featured entries with images, metadata, and links.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { Link } from 'react-router-dom';
import ImageTag from './ImageTag';
import { format } from 'timeago.js';
import type { Blog } from '../types';
import { useFeaturedBlogs } from '../hooks/useFeaturedBlogs';

const FeaturedBlogs = () => {
  const { isPending, error, data } = useFeaturedBlogs();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const blogs = data?.blogList;
  if (!blogs || blogs.length === 0) return null;

  const remainingBlogs = blogs.slice(1, 4);

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* Main featured blog (first blog) */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {blogs[0].coverImg && (
          <ImageTag
            src={blogs[0].coverImg}
            className="rounded-3xl object-cover img-shadow"
            width={'895'}
          />
        )}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to={`/blogs?cat=${blogs[0].category}`} className="text-orange-600 lg:text-lg">
            {blogs[0].category}
          </Link>
          <span className="text-gray-500">{format(blogs[0].createdAt)}</span>
        </div>
        <Link
          to={`/${blogs[0].slug}`}
          className="text-xl lg:text-3xl font-semibold lg:font-bold opacity-80"
        >
          {blogs[0].title}
        </Link>
      </div>

      {/* Sub blogs (remaining blogs) */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {remainingBlogs.map((blog: Blog, index: number) => (
          <div key={blog.id || index} className="lg:h-1/3 flex justify-between gap-4">
            <div className="w-1/3 aspect-video">
              <ImageTag
                src={blog.coverImg || '/default-image.png'}
                className="rounded-3xl object-cover img-shadow w-full h-full"
                width={'298'}
              />
            </div>
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">{String(index + 2).padStart(2, '0')}.</h1>
                <Link to={`/blogs?cat=${blog.category}`} className="text-orange-600">
                  {blog.category}
                </Link>
                <span className="text-gray-500 text-sm">{format(blog.createdAt)}</span>
              </div>
              <Link
                to={`/${blog.slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl opacity-80"
              >
                {blog.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
