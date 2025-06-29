/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook to manage search functionality within the app.
 * Provides utilities for performing search via keyboard or form submission,
 * managing URL search parameters, and navigating to search results page.
 * Supports customizable search path and query parameter name.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface UseSearchOptions {
  searchPath?: string;
  searchParam?: string;
}

export const useSearch = ({
  searchPath = '/blogs',
  searchParam = 'search',
}: UseSearchOptions = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const performSearch = (query: string) => {
    if (!query.trim()) return;

    if (location.pathname === searchPath) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        [searchParam]: query,
      });
    } else {
      // Navigate to search page with query //
      navigate(`${searchPath}?${searchParam}=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyboardSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value;
      performSearch(query);
    }
  };

  const handleFormSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get(searchParam) as string;
    performSearch(query);
  };

  const getCurrentSearchQuery = () => {
    return searchParams.get(searchParam) || '';
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(searchParam);
    setSearchParams(newParams);
  };

  return {
    performSearch,
    handleKeyboardSearch,
    handleFormSearch,
    getCurrentSearchQuery,
    clearSearch,
    isOnSearchPage: location.pathname === searchPath,
  };
};
