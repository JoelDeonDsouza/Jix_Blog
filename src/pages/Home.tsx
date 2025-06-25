import { Link } from 'react-router-dom';
// Components //
import FilterSearch from '../components/FilterSearch';
import FeaturedBlogs from '../components/FeaturedBlogs';
import BlogList from '../components/BlogList';

const Home = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Text Section */}
        <div className="flex items-center gap-2 text-base">
          <Link to="/">Home</Link>
          <span>*</span>
          <span className="text-orange-600 font-semibold">Buzzing Now</span>
        </div>

        {/* SVG Link */}
        <Link to="/create-blog" className="flex items-center justify-center">
          <button className="bg-jix w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        </Link>
      </div>
      <FilterSearch />
      <FeaturedBlogs />
      <div>
        <h1 className="my-8 text-2xl text-gray-700">New Feeds</h1>
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
