import {
  MatchesResponse,
  StandingsResponse,
  TeamResponse,
  Match,
} from '@/types/football';

// Base fetch function using internal API route to avoid CORS issues
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `/api/football?endpoint=${encodeURIComponent(endpoint)}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60, // Revalidate every minute
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get team information including squad
 */
export async function getTeam(teamId: number): Promise<TeamResponse> {
  return fetchFromAPI<TeamResponse>(`/teams/${teamId}`);
}

/**
 * Get team matches (upcoming and past)
 */
export async function getTeamMatches(
  teamId: number,
  status?: 'SCHEDULED' | 'FINISHED'
): Promise<MatchesResponse> {
  const statusParam = status ? `?status=${status}` : '';
  return fetchFromAPI<MatchesResponse>(`/teams/${teamId}/matches${statusParam}`);
}

/**
 * Get upcoming matches for a team
 */
export async function getUpcomingMatches(teamId: number): Promise<Match[]> {
  const response = await getTeamMatches(teamId, 'SCHEDULED');
  return response.matches || [];
}

/**
 * Get finished matches for a team
 */
export async function getFinishedMatches(teamId: number): Promise<Match[]> {
  const response = await getTeamMatches(teamId, 'FINISHED');
  const matches = response.matches || [];

  // Sort by date descending (newest first)
  const sortedMatches = matches.sort((a, b) => {
    return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
  });

  return sortedMatches;
}

/**
 * Get single match by ID
 */
export async function getMatch(matchId: number): Promise<Match> {
  return fetchFromAPI<Match>(`/matches/${matchId}`);
}

/**
 * Get competition standings
 */
export async function getStandings(competitionId: string | number): Promise<StandingsResponse> {
  return fetchFromAPI<StandingsResponse>(`/competitions/${competitionId}/standings`);
}

/**
 * Get matches for a specific date range
 */
export async function getMatchesByDateRange(
  teamId: number,
  dateFrom: string,
  dateTo: string
): Promise<MatchesResponse> {
  return fetchFromAPI<MatchesResponse>(
    `/teams/${teamId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
  );
}

/**
 * Get all matches for current season
 */
export async function getAllMatches(teamId: number): Promise<Match[]> {
  const response = await fetchFromAPI<MatchesResponse>(`/teams/${teamId}/matches`);
  return response.matches || [];
}
