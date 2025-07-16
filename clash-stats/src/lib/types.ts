export interface Player {
  tag: string;
  name: string;
  townHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel?: number;
  builderBaseTrophies?: number;
  donations: number;
  donationsReceived: number;
  clan?: {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
      large: string;
      medium: string;
    };
  };
  league?: {
    id: number;
    name: string;
    iconUrls: {
      small: string;
      tiny: string;
      medium: string;
    };
  };
  achievements: Achievement[];
  heroes: Hero[];
  troops: Troop[];
  spells: Spell[];
}

export interface Clan {
  tag: string;
  name: string;
  type: string;
  description: string;
  location?: {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode: string;
  };
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
  clanLevel: number;
  clanPoints: number;
  clanVersusPoints: number;
  requiredTrophies: number;
  warFrequency: string;
  warWinStreak: number;
  warWins: number;
  warTies: number;
  warLosses: number;
  isWarLogPublic: boolean;
  memberCount: number;
  members: ClanMember[];
}

export interface ClanMember {
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  league?: {
    id: number;
    name: string;
    iconUrls: {
      small: string;
      tiny: string;
      medium: string;
    };
  };
  trophies: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
}

export interface Achievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: string;
  village: string;
}

export interface Hero {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface Troop {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface Spell {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface WarLog {
  result: string;
  endTime: string;
  teamSize: number;
  attacksPerMember: number;
  clan: {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
      large: string;
      medium: string;
    };
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
  };
  opponent: {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
      large: string;
      medium: string;
    };
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
  };
}

export interface LeagueRanking {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  attackWins: number;
  defenseWins: number;
  rank: number;
  previousRank: number;
  clan?: {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
      large: string;
      medium: string;
    };
  };
}