import ImageTag from '../components/ImageTag';
import BlogActions from '../components/BlogActions';
import SearchTag from '../components/SearchTag';
import CommentList from '../components/CommentList';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useBlog } from '../hooks/useBlog';

const Blog = () => {
  const { isPending, error, data } = useBlog();
  // Primary renderings //
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No blog found</div>;

  return (
    <div className="flex flex-col gap-8">
      {/* Text block */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold opacity-80">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Blog by</span>
            <Link to="/" className="text-orange-600">
              {data.user.username}
            </Link>
            <span>on</span>
            <Link to="/" className="text-orange-600">
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {/* Img block */}
        {data.coverImg && (
          <div className="hidden lg:block w-1/3 xl:w-2/5">
            <ImageTag
              src={data.coverImg}
              width={400}
              className="hover:scale-105 transition-all duration-300 ease-in-out object-contain w-full h-48 md:h-56 lg:h-64"
            />
          </div>
        )}
      </div>
      {/* Blog content */}
      <div className="flex gap-8">
        <div className="lg:text-lg flex flex-col gap-6 text-justify flex-grow min-h-screen">
          <p>{data.content}</p>
        </div>
        {/* Side menu */}
        <div className="px-4 h-max sticky top-8 w-64 flex-shrink-0">
          <h1 className="mb-4 text-sm font-medium">About Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {data.user.img && (
                <ImageTag
                  src={data.user.img}
                  className="w-10 h-10 rounded-full object-cover"
                  width={32}
                  height={32}
                />
              )}
              <Link to={`/blogs?author=${data.user.username}`}>{data.user.username}</Link>
            </div>
            <p className="text:sm text-gray-500">Hello world</p>
            <div className="flex gap-2">
              <Link to="/">
                <ImageTag src="facebook.svg" className="w-8 h-8 object-cover" />
              </Link>
              <Link to="/">
                <ImageTag src="instagram.svg" className="w-8 h-8 object-cover" />
              </Link>
            </div>
          </div>
          <BlogActions blog={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text:sm">
            <Link to={`/blogs?cat=${data.category}`} className="underline">
              {data.category}
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <SearchTag />
        </div>
      </div>
      <CommentList blogId={data._id} />
    </div>
  );
};

export default Blog;
