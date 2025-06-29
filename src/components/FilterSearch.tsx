/**
 * @author: Joel Deon Dsouza
 * @description: Renders a horizontal filter bar with category-based blog links and a search component for browsing and narrowing blog content.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { Link } from 'react-router-dom';
import SearchTag from './SearchTag';

const FilterSearch = () => {
  return (
    <div className="hidden md:flex bg-white rounded-2xl  p-4 box-shadow items-center justify-center gap-8">
      <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
        <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
          <Link to="/blogs" className="bg-jix">
            Hot Feeds
          </Link>
          <Link to="/blogs?cat=time-capsules" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
            Time Capsules
          </Link>
          <Link to="/blogs?cat=travel" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
            Travel
          </Link>
          <Link to="/blogs?cat=technology" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
            Technology
          </Link>
          <Link to="/blogs?cat=lifestyle" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
            Lifestyle
          </Link>
          <Link to="/blogs?cat=lost-hours" className="hover:bg-blue-100 rounded-2xl px-4 py-2">
            Lost Hours
          </Link>
        </div>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* Search */}
      <SearchTag />
    </div>
  );
};

export default FilterSearch;
