'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { Clan, WarLog } from '@/lib/types';
import { Trophy, Star, Shield, Users, Award, MapPin, Calendar, Sword } from 'lucide-react';
import Link from 'next/link';

export default function ClanPage() {
  const params = useParams();
  const [clan, setClan] = useState<Clan | null>(null);
  const [warLog, setWarLog] = useState<WarLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClanData = async () => {
      try {
        setLoading(true);
        
        const [clanResponse, warLogResponse] = await Promise.allSettled([
          fetch(`/api/clan/${params.tag}`),
          fetch(`/api/clan/${params.tag}/warlog`)
        ]);

        if (clanResponse.status === 'fulfilled' && clanResponse.value.ok) {
          const clanData = await clanResponse.value.json();
          setClan(clanData);
        } else {
          throw new Error('Clan not found');
        }

        if (warLogResponse.status === 'fulfilled' && warLogResponse.value.ok) {
          const warLogData = await warLogResponse.value.json();
          setWarLog(warLogData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch clan');
      } finally {
        setLoading(false);
      }
    };

    if (params.tag) {
      fetchClanData();
    }
  }, [params.tag]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !clan) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Clan Not Found</h2>
          <p className="text-gray-600">{error || 'The clan you are looking for does not exist.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={clan.badgeUrls.large}
                alt={clan.name}
                className="w-16 h-16"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{clan.name}</h1>
                <p className="text-gray-500">{clan.tag}</p>
                {clan.location && (
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{clan.location.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Clan Level</p>
              <p className="text-2xl font-bold text-gray-900">{clan.clanLevel}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{clan.clanPoints.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Clan Points</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{clan.memberCount}/50</p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Sword className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{clan.warWins}</p>
              <p className="text-sm text-gray-600">War Wins</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{clan.warWinStreak}</p>
              <p className="text-sm text-gray-600">Win Streak</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">War Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">War Wins:</span>
                  <span className="font-medium">{clan.warWins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">War Losses:</span>
                  <span className="font-medium">{clan.warLosses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">War Ties:</span>
                  <span className="font-medium">{clan.warTies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Win Rate:</span>
                  <span className="font-medium">
                    {clan.warWins + clan.warLosses > 0 
                      ? `${((clan.warWins / (clan.warWins + clan.warLosses)) * 100).toFixed(1)}%`
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Clan Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{clan.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">War Frequency:</span>
                  <span className="font-medium">{clan.warFrequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required Trophies:</span>
                  <span className="font-medium">{clan.requiredTrophies.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">War Log:</span>
                  <span className="font-medium">{clan.isWarLogPublic ? 'Public' : 'Private'}</span>
                </div>
              </div>
            </div>
          </div>

          {clan.description && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{clan.description}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Members ({clan.memberCount})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Role</th>
                  <th className="text-left py-2 px-4">Level</th>
                  <th className="text-left py-2 px-4">Trophies</th>
                  <th className="text-left py-2 px-4">Donations</th>
                  <th className="text-left py-2 px-4">Received</th>
                </tr>
              </thead>
              <tbody>
                {clan.members && Array.isArray(clan.members) && clan.members.length > 0 ? (
                  clan.members.map((member) => (
                    <tr key={member.tag} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">
                        <Link 
                          href={`/player/${encodeURIComponent(member.tag)}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {member.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.role === 'leader' ? 'bg-red-100 text-red-800' :
                          member.role === 'coLeader' ? 'bg-orange-100 text-orange-800' :
                          member.role === 'elder' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="py-2 px-4">{member.expLevel}</td>
                      <td className="py-2 px-4">{member.trophies.toLocaleString()}</td>
                      <td className="py-2 px-4">{member.donations.toLocaleString()}</td>
                      <td className="py-2 px-4">{member.donationsReceived.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No members data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {warLog.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent War Log</h2>
            <div className="space-y-4">
              {warLog.slice(0, 10).map((war, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        war.result === 'win' ? 'bg-green-100 text-green-800' :
                        war.result === 'lose' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {war.result?.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {war.teamSize}v{war.teamSize}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(war.endTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={war.clan.badgeUrls.medium}
                        alt={war.clan.name}
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-medium">{war.clan.name}</p>
                        <p className="text-sm text-gray-600">
                          {war.clan.stars} ⭐ ({war.clan.destructionPercentage.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <img
                        src={war.opponent.badgeUrls.medium}
                        alt={war.opponent.name}
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-medium">{war.opponent.name}</p>
                        <p className="text-sm text-gray-600">
                          {war.opponent.stars} ⭐ ({war.opponent.destructionPercentage.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}