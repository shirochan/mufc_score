// API Configuration
export const FOOTBALL_API_BASE_URL = 'https://api.football-data.org/v4';
export const FOOTBALL_API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || '';

// Team IDs
export const MANCHESTER_UNITED_ID = 66;

// Competition IDs
export const PREMIER_LEAGUE_ID = 'PL';
export const PREMIER_LEAGUE_CODE = 2021;

// Match Status
export const MATCH_STATUS = {
  SCHEDULED: 'SCHEDULED',
  TIMED: 'TIMED',
  IN_PLAY: 'IN_PLAY',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
  SUSPENDED: 'SUSPENDED',
  POSTPONED: 'POSTPONED',
  CANCELLED: 'CANCELLED',
} as const;

// SWR Configuration
export const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 60000, // 1 minute
  dedupingInterval: 10000, // 10 seconds
};
