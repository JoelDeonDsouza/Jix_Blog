import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import BlogItem from './BlogItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchBlogData = async (pageParam: number) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}blogs/list`, {
    params: {
      page: pageParam,
      limit: 2,
    },
  });
  return response.data;
};

const BlogList = () => {
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['blogs'],
    queryFn: ({ pageParam = 1 }) => fetchBlogData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.totalPages ? pages.length + 1 : undefined),
  });

  if (status === 'pending') return 'Loading...';

  if (status === 'error') return 'An error has occurred: ' + error.message;

  const allBlogs = data?.pages?.flatMap((page) => page.blogList) || [];

  return (
    <InfiniteScroll
      dataLength={allBlogs.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading Blogs...</h4>}
      endMessage={
        <p>
          <b>Blogs loaded</b>
        </p>
      }
    >
      {allBlogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </InfiniteScroll>
  );
};

export default BlogList;
