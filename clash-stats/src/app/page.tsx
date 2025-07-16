'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import { Shield, Trophy, Users, Star } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string, type: 'player' | 'clan') => {
    setIsSearching(true);
    try {
      if (type === 'player') {
        router.push(`/player/${encodeURIComponent(query)}`);
      } else {
        router.push(`/clan/${encodeURIComponent(query)}`);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ClashStats
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Track your Clash of Clans stats and progress
          </p>
          <SearchBar onSearch={handleSearch} />
          {isSearching && (
            <div className="mt-4 text-gray-500">Searching...</div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Player Stats</h3>
            <p className="text-gray-600">Search for any player by their tag to view detailed statistics, achievements, and progress.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clan Information</h3>
            <p className="text-gray-600">Explore clan details, member lists, war logs, and clan statistics.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rankings</h3>
            <p className="text-gray-600">View global and local leaderboards for players and clans.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Search for a player or clan</h3>
                <p className="text-gray-600">Enter a player tag (e.g., #2PP) or clan tag (e.g., #2Y0YVV2) in the search bar above.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View detailed stats</h3>
                <p className="text-gray-600">Explore comprehensive statistics, achievements, and progress tracking.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Compare and analyze</h3>
                <p className="text-gray-600">Use the data to track progress and make strategic decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}