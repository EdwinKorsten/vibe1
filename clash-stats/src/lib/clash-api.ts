import axios from 'axios';
import { Player, Clan, WarLog, LeagueRanking } from './types';

const API_BASE_URL = 'https://api.clashofclans.com/v1';

const clashApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.CLASH_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export class ClashAPI {
  static async getPlayer(playerTag: string): Promise<Player> {
    const encodedTag = encodeURIComponent(playerTag);
    const response = await clashApi.get(`/players/${encodedTag}`);
    return response.data;
  }

  static async getClan(clanTag: string): Promise<Clan> {
    const encodedTag = encodeURIComponent(clanTag);
    const response = await clashApi.get(`/clans/${encodedTag}`);
    return response.data;
  }

  static async getClanMembers(clanTag: string) {
    const encodedTag = encodeURIComponent(clanTag);
    const response = await clashApi.get(`/clans/${encodedTag}/members`);
    return response.data;
  }

  static async getClanWarLog(clanTag: string): Promise<WarLog[]> {
    const encodedTag = encodeURIComponent(clanTag);
    const response = await clashApi.get(`/clans/${encodedTag}/warlog`);
    return response.data.items;
  }

  static async searchClans(params: {
    name?: string;
    warFrequency?: string;
    locationId?: number;
    minMembers?: number;
    maxMembers?: number;
    minClanPoints?: number;
    minClanLevel?: number;
    limit?: number;
  }) {
    const response = await clashApi.get('/clans', { params });
    return response.data;
  }

  static async getLeagueRankings(leagueId: string): Promise<LeagueRanking[]> {
    const response = await clashApi.get(`/leagues/${leagueId}/seasons/2024-01/rankings/players`);
    return response.data.items;
  }

  static async getLocations() {
    const response = await clashApi.get('/locations');
    return response.data;
  }

  static async getLocationRankings(locationId: string) {
    const response = await clashApi.get(`/locations/${locationId}/rankings/players`);
    return response.data;
  }

  static async getLocationClanRankings(locationId: string) {
    const response = await clashApi.get(`/locations/${locationId}/rankings/clans`);
    return response.data;
  }
}

export default ClashAPI;