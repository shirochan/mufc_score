import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date, formatStr: string = 'yyyy年MM月dd日 HH:mm'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ja });
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ja });
}

/**
 * Check if match is upcoming
 */
export function isUpcoming(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj > new Date();
}

/**
 * Get match status display text
 */
export function getMatchStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    SCHEDULED: '予定',
    TIMED: '予定',
    IN_PLAY: '試合中',
    PAUSED: '中断',
    FINISHED: '終了',
    SUSPENDED: '延期',
    POSTPONED: '延期',
    CANCELLED: '中止',
  };
  return statusMap[status] || status;
}

/**
 * Get match result class
 */
export function getResultClass(isHomeTeam: boolean, winner: string | null): string {
  if (!winner) return 'text-gray-500';

  if (winner === 'DRAW') return 'text-yellow-500';

  const isWinner = (isHomeTeam && winner === 'HOME_TEAM') ||
                   (!isHomeTeam && winner === 'AWAY_TEAM');

  return isWinner ? 'text-green-500' : 'text-red-500';
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Get position display text
 */
export function getPositionText(position: string): string {
  const positionMap: Record<string, string> = {
    Goalkeeper: 'GK',
    Defender: 'DF',
    Midfielder: 'MF',
    Forward: 'FW',
    Offence: 'FW',
  };
  return positionMap[position] || position;
}

/**
 * Sort players by position
 */
export function sortByPosition(players: any[]): any[] {
  const positionOrder = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Offence'];

  return players.sort((a, b) => {
    const posA = positionOrder.indexOf(a.position);
    const posB = positionOrder.indexOf(b.position);

    if (posA !== posB) {
      return posA - posB;
    }

    return a.name.localeCompare(b.name);
  });
}
