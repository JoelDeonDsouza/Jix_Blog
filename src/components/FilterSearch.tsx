import { Link } from 'react-router-dom';

const FilterSearch = () => {
  return (
    <div className="hidden md:flex bg-white rounded-2xl  p-4 box-shadow items-center justify-center gap-8">
      <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
        <Link to="/blogs" className="bg-jix">
          Hot Feeds
        </Link>
        <Link to="/blogs?time-capsules" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
          Time Capsules
        </Link>
        <Link to="/blogs?cat=memory-loop" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
          Memory Loop
        </Link>
        <Link to="/blogs?cat=future-rust" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
          Future Rust
        </Link>
        <Link to="/blogs?cat=echo-chambers" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
          Echo Chambers
        </Link>
        <Link to="/blogs?cat=lost-hours" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
          Lost Hours
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* Search */}
      <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          color="#435edb"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          placeholder="Explore the unknown..."
          type="text"
          className="bg-transparent focus:outline-none focus:ring-0 focus:border-none"
        />
      </div>
    </div>
  );
};

export default FilterSearch;
