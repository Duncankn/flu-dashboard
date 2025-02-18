import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://www.chp.gov.hk/files/misc/flux_data.csv');
    const data = await response.text();
    
    return new NextResponse(data, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    console.error('Error fetching flu data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch flu data' },
      { status: 500 }
    );
  }
}