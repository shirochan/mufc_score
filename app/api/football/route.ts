import { NextRequest, NextResponse } from 'next/server';
import {
  getCachedMatches,
  updateMatchCache,
  shouldUpdateCache,
  readMatchCache,
} from '@/lib/cache';
import { MatchesResponse } from '@/types/football';

const FOOTBALL_API_BASE_URL = 'https://api.football-data.org/v4';
const FOOTBALL_API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || '';

/**
 * Check if endpoint is for finished matches
 */
function isFinishedMatchesRequest(endpoint: string): { isFinished: boolean; teamId: number | null } {
  // Pattern: /teams/{teamId}/matches?status=FINISHED
  const match = endpoint.match(/\/teams\/(\d+)\/matches\?status=FINISHED/);
  if (match) {
    return { isFinished: true, teamId: parseInt(match[1]) };
  }
  return { isFinished: false, teamId: null };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json(
      { error: 'Endpoint parameter is required' },
      { status: 400 }
    );
  }

  if (!FOOTBALL_API_KEY) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  // Check if this is a finished matches request
  const { isFinished, teamId } = isFinishedMatchesRequest(endpoint);

  if (isFinished && teamId) {
    try {
      // Try to get cached matches
      const cache = readMatchCache(teamId);

      if (cache && !shouldUpdateCache(cache.lastChecked)) {
        // Cache is fresh, return it
        console.log(`📦 Returning ${cache.matches.length} cached matches for team ${teamId}`);

        const response: MatchesResponse = {
          filters: {},
          resultSet: {
            count: cache.matches.length,
            first: cache.matches[0]?.utcDate || '',
            last: cache.matches[cache.matches.length - 1]?.utcDate || '',
            played: cache.matches.length,
          },
          matches: cache.matches,
        };

        return NextResponse.json(response, {
          headers: {
            'X-Cache': 'HIT',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        });
      }

      // Cache is old or doesn't exist, fetch from API
      console.log(`🔄 Fetching fresh data from API for team ${teamId}`);

      const url = `${FOOTBALL_API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'X-Auth-Token': FOOTBALL_API_KEY,
        },
      });

      if (!response.ok) {
        // If API fails but we have cache, return cache
        if (cache) {
          console.log(`⚠️ API failed, returning stale cache for team ${teamId}`);
          const fallbackResponse: MatchesResponse = {
            filters: {},
            resultSet: {
              count: cache.matches.length,
              first: cache.matches[0]?.utcDate || '',
              last: cache.matches[cache.matches.length - 1]?.utcDate || '',
              played: cache.matches.length,
            },
            matches: cache.matches,
          };

          return NextResponse.json(fallbackResponse, {
            headers: {
              'X-Cache': 'STALE',
              'Cache-Control': 'public, s-maxage=300',
            },
          });
        }

        return NextResponse.json(
          { error: `API Error: ${response.status} ${response.statusText}` },
          { status: response.status }
        );
      }

      const data: MatchesResponse = await response.json();

      // Update cache
      if (data.matches && data.matches.length > 0) {
        const updatedMatches = updateMatchCache(teamId, data.matches);

        // Return updated data
        data.matches = updatedMatches;
        data.resultSet.count = updatedMatches.length;
      }

      return NextResponse.json(data, {
        headers: {
          'X-Cache': 'MISS',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      });
    } catch (error) {
      console.error('Cache/API Error:', error);

      // Try to return cache as fallback
      const cache = readMatchCache(teamId);
      if (cache) {
        console.log(`⚠️ Error occurred, returning cache for team ${teamId}`);
        const fallbackResponse: MatchesResponse = {
          filters: {},
          resultSet: {
            count: cache.matches.length,
            first: cache.matches[0]?.utcDate || '',
            last: cache.matches[cache.matches.length - 1]?.utcDate || '',
            played: cache.matches.length,
          },
          matches: cache.matches,
        };

        return NextResponse.json(fallbackResponse, {
          headers: {
            'X-Cache': 'ERROR-FALLBACK',
          },
        });
      }

      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
      );
    }
  }

  // For non-finished matches requests, use normal API call
  try {
    const url = `${FOOTBALL_API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,
      },
      next: {
        revalidate: 60, // Cache for 60 seconds
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Football API' },
      { status: 500 }
    );
  }
}
