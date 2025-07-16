import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  try {
    const clanTag = decodeURIComponent(params.tag);
    const warlog = await ClashAPI.getClanWarLog(clanTag);
    
    return NextResponse.json(warlog);
  } catch (error: any) {
    console.error('Error fetching clan war log:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Clan not found or war log is private' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch clan war log' },
      { status: 500 }
    );
  }
}