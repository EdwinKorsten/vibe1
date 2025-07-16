import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'players';
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json(
        { error: 'Location ID is required' },
        { status: 400 }
      );
    }

    let rankings;

    if (category === 'players') {
      rankings = await ClashAPI.getLocationRankings(locationId);
    } else {
      rankings = await ClashAPI.getLocationClanRankings(locationId);
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