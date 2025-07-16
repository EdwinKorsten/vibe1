'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Trophy, Users, Medal, MapPin, Crown } from 'lucide-react';
import Link from 'next/link';

interface RankingItem {
  tag: string;
  name: string;
  trophies?: number;
  clanPoints?: number;
  expLevel?: number;
  rank: number;
  clan?: {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
      medium: string;
      large: string;
    };
  };
  badgeUrls?: {
    small: string;
    medium: string;
    large: string;
  };
  memberCount?: number;
  clanLevel?: number;
}

interface Location {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode: string;
}

export default function RankingsPage() {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<'players' | 'clans'>('players');
  const [selectedLocation, setSelectedLocation] = useState<string>('global');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (response.ok) {
          const data = await response.json();
          setLocations(data.items || []);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/rankings?category=${category}&locationId=${selectedLocation}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setRankings(data.items || data || []);
        }
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [category, selectedLocation]);

  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rankings & Leaderboards</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCategory('players')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    category === 'players'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Trophy className="h-4 w-4 inline mr-2" />
                  Players
                </button>
                <button
                  onClick={() => setCategory('clans')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    category === 'clans'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  Clans
                </button>
              </div>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="global">Global</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id.toString()}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Name</th>
                      {category === 'players' && (
                        <>
                          <th className="text-left py-3 px-4">Level</th>
                          <th className="text-left py-3 px-4">Trophies</th>
                          <th className="text-left py-3 px-4">Clan</th>
                        </>
                      )}
                      {category === 'clans' && (
                        <>
                          <th className="text-left py-3 px-4">Level</th>
                          <th className="text-left py-3 px-4">Points</th>
                          <th className="text-left py-3 px-4">Members</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.slice(0, 50).map((item, index) => (
                      <tr key={item.tag} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {index < 3 && (
                              <Crown className={`h-5 w-5 ${
                                index === 0 ? 'text-yellow-500' :
                                index === 1 ? 'text-gray-400' :
                                'text-orange-500'
                              }`} />
                            )}
                            <span className="font-semibold">#{item.rank || index + 1}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            {item.badgeUrls && (
                              <img
                                src={item.badgeUrls.medium}
                                alt={item.name}
                                className="w-8 h-8"
                              />
                            )}
                            <div>
                              <Link
                                href={`/${category === 'players' ? 'player' : 'clan'}/${encodeURIComponent(item.tag)}`}
                                className="font-medium text-blue-600 hover:text-blue-800"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-500">{item.tag}</p>
                            </div>
                          </div>
                        </td>
                        {category === 'players' && (
                          <>
                            <td className="py-3 px-4">{item.expLevel}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span>{item.trophies?.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {item.clan ? (
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={item.clan.badgeUrls.medium}
                                    alt={item.clan.name}
                                    className="w-6 h-6"
                                  />
                                  <Link
                                    href={`/clan/${encodeURIComponent(item.clan.tag)}`}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    {item.clan.name}
                                  </Link>
                                </div>
                              ) : (
                                <span className="text-gray-400">No clan</span>
                              )}
                            </td>
                          </>
                        )}
                        {category === 'clans' && (
                          <>
                            <td className="py-3 px-4">{item.clanLevel}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span>{item.clanPoints?.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span>{item.memberCount}/50</span>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}