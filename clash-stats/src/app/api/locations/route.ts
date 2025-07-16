import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(request: NextRequest) {
  try {
    const locations = await ClashAPI.getLocations();
    return NextResponse.json(locations);
  } catch (error: any) {
    console.error('Error fetching locations:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch locations data' },
      { status: 500 }
    );
  }
}