import { NextRequest, NextResponse } from 'next/server';
import { ClashAPI } from '@/lib/clash-api';

export async function GET(request: NextRequest) {
  try {
    const locations = await ClashAPI.getLocations();
    
    // Filter out locations where isCountry is false, as they don't have rankings
    const filteredLocations = {
      ...locations,
      items: locations.items.filter((location: any) => location.isCountry === true)
    };
    
    return NextResponse.json(filteredLocations);
  } catch (error: any) {
    console.error('Error fetching locations:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch locations data' },
      { status: 500 }
    );
  }
}