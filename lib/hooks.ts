import useSWR from 'swr';
import {
  getTeam,
  getUpcomingMatches,
  getFinishedMatches,
  getStandings,
  getMatch,
} from './api';
import { SWR_CONFIG } from './constants';
import type { TeamResponse, Match, StandingsResponse } from '@/types/football';

/**
 * Hook to fetch team data
 */
export function useTeam(teamId: number) {
  const { data, error, isLoading } = useSWR<TeamResponse>(
    teamId ? `/teams/${teamId}` : null,
    () => getTeam(teamId),
    SWR_CONFIG
  );

  return {
    team: data,
    isLoading,
    isError: error,
  };
}

/**
 * Hook to fetch upcoming matches
 */
export function useUpcomingMatches(teamId: number) {
  const { data, error, isLoading } = useSWR<Match[]>(
    teamId ? `/teams/${teamId}/matches/upcoming` : null,
    () => getUpcomingMatches(teamId),
    SWR_CONFIG
  );

  return {
    matches: data,
    isLoading,
    isError: error,
  };
}

/**
 * Hook to fetch finished matches
 */
export function useFinishedMatches(teamId: number, limit?: number) {
  const { data, error, isLoading } = useSWR<Match[]>(
    teamId ? `/teams/${teamId}/matches/finished` : null,
    () => getFinishedMatches(teamId), // Always fetch all matches
    SWR_CONFIG
  );

  // Apply limit on the client side after fetching
  const limitedMatches = limit && data ? data.slice(0, limit) : data;

  return {
    matches: limitedMatches,
    isLoading,
    isError: error,
  };
}

/**
 * Hook to fetch competition standings
 */
export function useStandings(competitionId: string | number) {
  const { data, error, isLoading } = useSWR<StandingsResponse>(
    competitionId ? `/competitions/${competitionId}/standings` : null,
    () => getStandings(competitionId),
    {
      ...SWR_CONFIG,
      refreshInterval: 300000, // 5 minutes for standings
    }
  );

  return {
    standings: data,
    isLoading,
    isError: error,
  };
}

/**
 * Hook to fetch single match
 */
export function useMatch(matchId: number) {
  const { data, error, isLoading } = useSWR<Match>(
    matchId ? `/matches/${matchId}` : null,
    () => getMatch(matchId),
    {
      ...SWR_CONFIG,
      refreshInterval: 30000, // 30 seconds for live match data
    }
  );

  return {
    match: data,
    isLoading,
    isError: error,
  };
}
