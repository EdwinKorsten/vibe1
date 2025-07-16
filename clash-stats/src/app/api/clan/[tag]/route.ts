import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  try {
    const clanTag = decodeURIComponent(params.tag);
    const clan = await ClashAPI.getClan(clanTag);
    
    return NextResponse.json(clan);
  } catch (error: any) {
    console.error('Error fetching clan:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Clan not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch clan data' },
      { status: 500 }
    );
  }
}