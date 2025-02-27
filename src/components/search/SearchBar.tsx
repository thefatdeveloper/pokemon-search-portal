'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { cn, debounce } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search Pokémon...',
  initialValue = '',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  // Create a debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((...args: unknown[]) => {
      onSearch(args[0] as string);
    }, 300),
    [onSearch]
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Handle clear button
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  // Update search when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  return (
    <div
      className={cn(
        'relative flex items-center w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-all',
        isFocused ? 'ring-2 ring-red-500 dark:ring-red-400 border-transparent' : '',
        className
      )}
    >
      <div className="flex items-center justify-center pl-3 text-gray-500 dark:text-gray-400">
        <Search size={20} />
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={18} />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
}