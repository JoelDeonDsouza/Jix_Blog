import BlogList from '../components/BlogList';

const BlogLists = () => {
  return (
    <div>
      <h1 className="mb-8 text-2xl">Memory Loop</h1>
      <div className="flex gap-8">
        <BlogList />
      </div>
    </div>
  );
};

export default BlogLists;
