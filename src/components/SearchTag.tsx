/**
 * @author: Joel Deon Dsouza
 * @description: Search input component with icon. Handles keyboard events to trigger search using a custom hook.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useSearch } from '../hooks/useSearch';

const SearchTag = () => {
  const { handleKeyboardSearch } = useSearch();

  return (
    <div className="bg-white box-shadow p-2 rounded-md flex items-center gap-2">
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
        onKeyDown={handleKeyboardSearch}
      />
    </div>
  );
};

export default SearchTag;
