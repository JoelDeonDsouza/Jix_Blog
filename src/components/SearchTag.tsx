const SearchTag = () => {
  return (
    <div className="bg-white p-2 rounded-md flex items-center gap-2">
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
  );
};

export default SearchTag;
