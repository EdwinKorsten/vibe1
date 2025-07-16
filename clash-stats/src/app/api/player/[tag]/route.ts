import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  try {
    const playerTag = decodeURIComponent(params.tag);
    const player = await ClashAPI.getPlayer(playerTag);
    
    return NextResponse.json(player);
  } catch (error: any) {
    console.error('Error fetching player:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch player data' },
      { status: 500 }
    );
  }
}