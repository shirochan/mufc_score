import fs from 'fs';
import path from 'path';
import { Match } from '@/types/football';

const CACHE_DIR = path.join(process.cwd(), 'cache', 'matches');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface MatchCache {
  lastChecked: string;
  teamId: number;
  matches: Match[];
}

/**
 * Ensure cache directory exists
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Get cache file path for a team
 */
function getCacheFilePath(teamId: number): string {
  return path.join(CACHE_DIR, `${teamId}_finished.json`);
}

/**
 * Check if cache needs update
 */
export function shouldUpdateCache(lastChecked: string): boolean {
  const lastCheckedTime = new Date(lastChecked).getTime();
  const now = Date.now();
  return now - lastCheckedTime > CACHE_DURATION;
}

/**
 * Read cached matches for a team
 */
export function readMatchCache(teamId: number): MatchCache | null {
  try {
    const cachePath = getCacheFilePath(teamId);

    if (!fs.existsSync(cachePath)) {
      return null;
    }

    const data = fs.readFileSync(cachePath, 'utf-8');
    const cache: MatchCache = JSON.parse(data);

    return cache;
  } catch (error) {
    console.error('Error reading match cache:', error);
    return null;
  }
}

/**
 * Write matches to cache
 */
export function writeMatchCache(teamId: number, matches: Match[]): void {
  try {
    ensureCacheDir();

    const cache: MatchCache = {
      lastChecked: new Date().toISOString(),
      teamId,
      matches: matches.sort((a, b) =>
        new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
      ),
    };

    const cachePath = getCacheFilePath(teamId);
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');

    console.log(`✅ Cached ${matches.length} matches for team ${teamId}`);
  } catch (error) {
    console.error('Error writing match cache:', error);
  }
}

/**
 * Merge new matches with cached matches
 */
export function mergeMatches(cachedMatches: Match[], newMatches: Match[]): Match[] {
  const matchMap = new Map<number, Match>();

  // Add cached matches
  cachedMatches.forEach(match => {
    matchMap.set(match.id, match);
  });

  // Add or update with new matches
  newMatches.forEach(match => {
    matchMap.set(match.id, match);
  });

  // Convert back to array and sort by date (newest first)
  return Array.from(matchMap.values()).sort((a, b) =>
    new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
  );
}

/**
 * Get cached matches or return null if cache is invalid
 */
export function getCachedMatches(teamId: number): Match[] | null {
  const cache = readMatchCache(teamId);

  if (!cache) {
    return null;
  }

  // If cache is recent, return it
  if (!shouldUpdateCache(cache.lastChecked)) {
    console.log(`📦 Using cached matches for team ${teamId} (${cache.matches.length} matches)`);
    return cache.matches;
  }

  // Cache is old but return it anyway (will be updated in background)
  console.log(`⏰ Cache is old for team ${teamId}, will update`);
  return cache.matches;
}

/**
 * Update cache with new matches
 */
export function updateMatchCache(teamId: number, newMatches: Match[]): Match[] {
  const cache = readMatchCache(teamId);

  let mergedMatches: Match[];

  if (cache) {
    // Merge with existing cache
    mergedMatches = mergeMatches(cache.matches, newMatches);
    const newMatchCount = mergedMatches.length - cache.matches.length;

    if (newMatchCount > 0) {
      console.log(`🆕 Found ${newMatchCount} new matches for team ${teamId}`);
    }
  } else {
    // No existing cache
    mergedMatches = newMatches;
    console.log(`📝 Creating new cache for team ${teamId} with ${newMatches.length} matches`);
  }

  // Write updated cache
  writeMatchCache(teamId, mergedMatches);

  return mergedMatches;
}
