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
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <img 
                src="/images/logo.svg" 
                alt="ClashStats Logo" 
                className="h-24 w-auto drop-shadow-2xl animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Welcome to ClashStats
          </h1>
          <p className="text-xl text-gray-700 mb-8 font-medium">
            🏆 Track your Clash of Clans stats and compete with players worldwide! ⚔️
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200">
            <SearchBar onSearch={handleSearch} />
            {isSearching && (
              <div className="mt-4 text-blue-600 font-medium flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Searching...
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl border-2 border-yellow-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <img 
                src="/images/trophy-icon.svg" 
                alt="Trophy" 
                className="h-16 w-16 mx-auto drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-yellow-300 opacity-20 rounded-full blur-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Player Stats</h3>
            <p className="text-gray-700">Search for any player by their tag to view detailed statistics, achievements, and progress.</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <img 
                src="/images/shield-icon.svg" 
                alt="Shield" 
                className="h-16 w-16 mx-auto drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-blue-300 opacity-20 rounded-full blur-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Clan Information</h3>
            <p className="text-gray-700">Explore clan details, member lists, war logs, and clan statistics.</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border-2 border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <Star className="h-16 w-16 text-purple-500 mx-auto drop-shadow-lg" />
              <div className="absolute inset-0 bg-purple-300 opacity-20 rounded-full blur-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Rankings</h3>
            <p className="text-gray-700">View global and local leaderboards for players and clans.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white via-blue-50 to-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
            How to use ClashStats
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">🔍 Search for a player or clan</h3>
                <p className="text-gray-700">Enter a player tag (e.g., #2PP) or clan tag (e.g., #2Y0YVV2) in the search bar above.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">📊 View detailed stats</h3>
                <p className="text-gray-700">Explore comprehensive statistics, achievements, and progress tracking.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">⚔️ Compare and analyze</h3>
                <p className="text-gray-700">Use the data to track progress and make strategic decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}