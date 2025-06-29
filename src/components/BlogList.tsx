/**
 * @author: Joel Deon Dsouza
 * @description: Renders an infinite scrolling list of blog posts with filtering via URL search parameters,using React Query for data fetching and pagination.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import BlogItem from './BlogItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchBlogData = async (pageParam: number, seacrhParams: URLSearchParams) => {
  const searchParamsObj = Object.fromEntries(seacrhParams.entries());
  const response = await axios.get(`${import.meta.env.VITE_API_URL}blogs/list`, {
    params: {
      page: pageParam,
      limit: 10,
      ...searchParamsObj,
    },
  });
  return response.data;
};

const BlogList = () => {
  const [seacrhParams] = useSearchParams();
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['blogs', seacrhParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchBlogData(pageParam, seacrhParams),
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
