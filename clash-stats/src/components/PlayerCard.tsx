import { Player } from '@/lib/types';
import { Trophy, Star, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
            <p className="text-sm text-gray-500">{player.tag}</p>
          </div>
        </div>
        {player.league && (
          <div className="flex items-center space-x-2">
            <img
              src={player.league.iconUrls.medium}
              alt={player.league.name}
              className="w-8 h-8"
            />
            <span className="text-sm text-gray-600">{player.league.name}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-700">{player.trophies.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-700">Level {player.expLevel}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-gray-700">TH {player.townHallLevel}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-purple-500" />
          <span className="text-sm text-gray-700">{player.warStars} war stars</span>
        </div>
      </div>

      {player.clan && (
        <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
          <img
            src={player.clan.badgeUrls.medium}
            alt={player.clan.name}
            className="w-6 h-6"
          />
          <span className="text-sm text-gray-700">{player.clan.name}</span>
        </div>
      )}

      <Link
        href={`/player/${encodeURIComponent(player.tag)}`}
        className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}