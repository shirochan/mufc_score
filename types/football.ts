// Football-Data API Types

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: Team | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

export interface Person {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber: number | null;
}

export interface Score {
  winner: string | null;
  duration: string;
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}

export interface Goal {
  minute: number;
  injuryTime: number | null;
  type: string;
  team: {
    id: number;
    name: string;
  };
  scorer: {
    id: number;
    name: string;
  };
  assist: {
    id: number;
    name: string;
  } | null;
  score: {
    home: number;
    away: number;
  };
}

export interface Booking {
  minute: number;
  team: {
    id: number;
    name: string;
  };
  player: {
    id: number;
    name: string;
  };
  card: 'YELLOW_CARD' | 'RED_CARD';
}

export interface Substitution {
  minute: number;
  team: {
    id: number;
    name: string;
  };
  playerOut: {
    id: number;
    name: string;
  };
  playerIn: {
    id: number;
    name: string;
  };
}

export interface TeamStatistics {
  corner_kicks?: number;
  free_kicks?: number;
  goal_kicks?: number;
  offsides?: number;
  fouls?: number;
  ball_possession?: number;
  saves?: number;
  throw_ins?: number;
  shots?: number;
  shots_on_goal?: number;
  shots_off_goal?: number;
  yellow_cards?: number;
  red_cards?: number;
}

export interface Match {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'TIMED' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'SUSPENDED' | 'POSTPONED' | 'CANCELLED';
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;
  competition: Competition;
  season: Season;
  homeTeam: Team & { statistics?: TeamStatistics };
  awayTeam: Team & { statistics?: TeamStatistics };
  score: Score;
  goals?: Goal[];
  bookings?: Booking[];
  substitutions?: Substitution[];
  referees: Person[];
}

export interface Standing {
  position: number;
  team: Team;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface StandingTable {
  stage: string;
  type: string;
  group: string | null;
  table: Standing[];
}

export interface SquadMember {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

// API Response Types
export interface MatchesResponse {
  filters: any;
  resultSet: {
    count: number;
    first: string;
    last: string;
    played: number;
  };
  matches: Match[];
}

export interface StandingsResponse {
  filters: any;
  area: Area;
  competition: Competition;
  season: Season;
  standings: StandingTable[];
}

export interface TeamResponse {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  squad: SquadMember[];
  staff: Person[];
  lastUpdated: string;
}
