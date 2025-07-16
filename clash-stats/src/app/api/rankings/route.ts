import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'global';
    const category = searchParams.get('category') || 'players';
    const locationId = searchParams.get('locationId') || 'global';

    let rankings;

    if (locationId === 'global') {
      if (category === 'players') {
        const leagueId = '29000022';
        rankings = await ClashAPI.getLeagueRankings(leagueId);
      } else {
        const locations = await ClashAPI.getLocations();
        rankings = locations.items;
      }
    } else {
      if (category === 'players') {
        rankings = await ClashAPI.getLocationRankings(locationId);
      } else {
        rankings = await ClashAPI.getLocationClanRankings(locationId);
      }
    }

    return NextResponse.json(rankings);
  } catch (error: any) {
    console.error('Error fetching rankings:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch rankings data' },
      { status: 500 }
    );
  }
}