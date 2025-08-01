'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { Player } from '@/lib/types';
import { Trophy, Star, Shield, Zap, Users, Award, Target, Sword, Crown, Flame, Sparkles, Bot, Hammer, Crosshair, Skull, Heart, Bolt, Eye, ArrowUp, Snowflake } from 'lucide-react';

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClanClick = () => {
    if (player?.clan?.tag) {
      router.push(`/clan/${encodeURIComponent(player.clan.tag)}`);
    }
  };

  const getTroopIcon = (troopName: string) => {
    const name = troopName.toLowerCase();
    
    if (name.includes('barbarian') || name.includes('archer') || name.includes('giant') || name.includes('goblin')) {
      return <Users className="h-6 w-6 text-orange-500" />;
    }
    if (name.includes('wizard') || name.includes('witch') || name.includes('bowler')) {
      return <Sparkles className="h-6 w-6 text-purple-500" />;
    }
    if (name.includes('dragon') || name.includes('phoenix') || name.includes('fire')) {
      return <Flame className="h-6 w-6 text-red-500" />;
    }
    if (name.includes('pekka') || name.includes('golem') || name.includes('lava')) {
      return <Bot className="h-6 w-6 text-gray-600" />;
    }
    if (name.includes('miner') || name.includes('wall') || name.includes('breaker')) {
      return <Hammer className="h-6 w-6 text-amber-600" />;
    }
    if (name.includes('hog') || name.includes('rider') || name.includes('cavalry')) {
      return <Target className="h-6 w-6 text-blue-500" />;
    }
    if (name.includes('balloon') || name.includes('minion') || name.includes('baby')) {
      return <Zap className="h-6 w-6 text-yellow-500" />;
    }
    if (name.includes('valkyrie') || name.includes('electro') || name.includes('super')) {
      return <Crown className="h-6 w-6 text-yellow-600" />;
    }
    if (name.includes('yeti') || name.includes('ice') || name.includes('snow')) {
      return <Snowflake className="h-6 w-6 text-blue-400" />;
    }
    if (name.includes('headhunter') || name.includes('assassin')) {
      return <Crosshair className="h-6 w-6 text-red-600" />;
    }
    
    // Default icon
    return <Sword className="h-6 w-6 text-gray-500" />;
  };

  const getSpellIcon = (spellName: string) => {
    const name = spellName.toLowerCase();
    
    if (name.includes('lightning') || name.includes('bolt') || name.includes('electric')) {
      return <Bolt className="h-6 w-6 text-yellow-500" />;
    }
    if (name.includes('healing') || name.includes('heal') || name.includes('heart')) {
      return <Heart className="h-6 w-6 text-green-500" />;
    }
    if (name.includes('rage') || name.includes('anger') || name.includes('fury')) {
      return <Flame className="h-6 w-6 text-red-500" />;
    }
    if (name.includes('jump') || name.includes('leap') || name.includes('up')) {
      return <ArrowUp className="h-6 w-6 text-blue-500" />;
    }
    if (name.includes('freeze') || name.includes('ice') || name.includes('cold')) {
      return <Snowflake className="h-6 w-6 text-cyan-500" />;
    }
    if (name.includes('clone') || name.includes('duplicate') || name.includes('copy')) {
      return <Users className="h-6 w-6 text-purple-500" />;
    }
    if (name.includes('invisibility') || name.includes('invisible') || name.includes('stealth')) {
      return <Eye className="h-6 w-6 text-gray-500" />;
    }
    if (name.includes('poison') || name.includes('toxic') || name.includes('venom')) {
      return <Skull className="h-6 w-6 text-green-600" />;
    }
    if (name.includes('skeleton') || name.includes('bone') || name.includes('skull')) {
      return <Skull className="h-6 w-6 text-gray-400" />;
    }
    if (name.includes('bat') || name.includes('wing') || name.includes('fly')) {
      return <Zap className="h-6 w-6 text-purple-600" />;
    }
    if (name.includes('haste') || name.includes('speed') || name.includes('fast')) {
      return <Target className="h-6 w-6 text-orange-500" />;
    }
    
    // Default icon
    return <Sparkles className="h-6 w-6 text-blue-500" />;
  };

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/player/${params.tag}`);
        
        if (!response.ok) {
          throw new Error('Player not found');
        }
        
        const playerData = await response.json();
        setPlayer(playerData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch player');
      } finally {
        setLoading(false);
      }
    };

    if (params.tag) {
      fetchPlayer();
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

  if (error || !player) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Player Not Found</h2>
          <p className="text-gray-600">{error || 'The player you are looking for does not exist.'}</p>
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{player.name}</h1>
                <p className="text-gray-500">{player.tag}</p>
              </div>
            </div>
            {player.league && (
              <div className="flex items-center space-x-3">
                <img
                  src={player.league.iconUrls.medium}
                  alt={player.league.name}
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-semibold text-gray-900">{player.league.name}</p>
                  <p className="text-sm text-gray-500">League</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{player.trophies.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Current Trophies</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{player.expLevel}</p>
              <p className="text-sm text-gray-600">Experience Level</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{player.townHallLevel}</p>
              <p className="text-sm text-gray-600">Town Hall</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{player.warStars}</p>
              <p className="text-sm text-gray-600">War Stars</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Combat Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Attack Wins:</span>
                  <span className="font-medium">{player.attackWins.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Defense Wins:</span>
                  <span className="font-medium">{player.defenseWins.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Trophies:</span>
                  <span className="font-medium">{player.bestTrophies.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Donations</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donated:</span>
                  <span className="font-medium">{player.donations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Received:</span>
                  <span className="font-medium">{player.donationsReceived.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ratio:</span>
                  <span className="font-medium">
                    {player.donationsReceived > 0 
                      ? (player.donations / player.donationsReceived).toFixed(2)
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {player.clan && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Clan Information</h2>
            <div className="flex items-center space-x-4">
              <img
                src={player.clan.badgeUrls.medium}
                alt={player.clan.name}
                className="w-12 h-12"
              />
              <div>
                <h3 
                  className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={handleClanClick}
                >
                  {player.clan.name}
                </h3>
                <p 
                  className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={handleClanClick}
                >
                  {player.clan.tag}
                </p>
              </div>
            </div>
          </div>
        )}

        {player.heroes && player.heroes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Heroes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {player.heroes.map((hero, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{hero.name}</h3>
                  <p className="text-gray-600">Level {hero.level} / {hero.maxLevel}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(hero.level / hero.maxLevel) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {player.troops && player.troops.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Army Troops</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {player.troops.map((troop, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    {getTroopIcon(troop.name)}
                    <h3 className="font-semibold text-gray-900 text-sm">{troop.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Level</span>
                      <span className="font-bold text-blue-600">{troop.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Max Level</span>
                      <span className="text-xs text-gray-500">{troop.maxLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(troop.level / troop.maxLevel) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500">
                        {Math.round((troop.level / troop.maxLevel) * 100)}% upgraded
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {player.spells && player.spells.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Spells</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {player.spells.map((spell, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    {getSpellIcon(spell.name)}
                    <h3 className="font-semibold text-gray-900 text-sm">{spell.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Level</span>
                      <span className="font-bold text-purple-600">{spell.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Max Level</span>
                      <span className="text-xs text-gray-500">{spell.maxLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(spell.level / spell.maxLevel) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500">
                        {Math.round((spell.level / spell.maxLevel) * 100)}% upgraded
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {player.achievements && player.achievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {player.achievements.slice(0, 8).map((achievement, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < achievement.stars ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.info}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {achievement.value.toLocaleString()} / {achievement.target.toLocaleString()}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((achievement.value / achievement.target) * 100, 100)}%` }}
                          ></div>
                        </div>
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