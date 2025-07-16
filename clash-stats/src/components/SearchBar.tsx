import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: 'player' | 'clan') => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search players or clans..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'player' | 'clan'>('player');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center justify-center mt-4 space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="searchType"
            value="player"
            checked={searchType === 'player'}
            onChange={(e) => setSearchType(e.target.value as 'player' | 'clan')}
            className="mr-2"
          />
          Player
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="searchType"
            value="clan"
            checked={searchType === 'clan'}
            onChange={(e) => setSearchType(e.target.value as 'player' | 'clan')}
            className="mr-2"
          />
          Clan
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}