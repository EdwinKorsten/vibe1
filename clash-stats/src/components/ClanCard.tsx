import { Clan } from '@/lib/types';
import { Users, Trophy, Star, Shield } from 'lucide-react';
import Link from 'next/link';

interface ClanCardProps {
  clan: Clan;
}

export default function ClanCard({ clan }: ClanCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={clan.badgeUrls.medium}
            alt={clan.name}
            className="w-12 h-12"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{clan.name}</h3>
            <p className="text-sm text-gray-500">{clan.tag}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-600">Level {clan.clanLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-700">{clan.clanPoints.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-700">{clan.memberCount}/50</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-700">{clan.warWins} wins</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-purple-500" />
          <span className="text-sm text-gray-700">{clan.warWinStreak} streak</span>
        </div>
      </div>

      {clan.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{clan.description}</p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Type: {clan.type}</span>
        <span>Frequency: {clan.warFrequency}</span>
      </div>

      <Link
        href={`/clan/${encodeURIComponent(clan.tag)}`}
        className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}