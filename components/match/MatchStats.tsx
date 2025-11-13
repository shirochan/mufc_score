import { TeamStatistics } from '@/types/football';

interface MatchStatsProps {
  homeTeam: {
    name: string;
    statistics?: TeamStatistics;
  };
  awayTeam: {
    name: string;
    statistics?: TeamStatistics;
  };
}

interface StatRow {
  label: string;
  homeValue: number | string;
  awayValue: number | string;
  key: keyof TeamStatistics;
}

export default function MatchStats({ homeTeam, awayTeam }: MatchStatsProps) {
  const homeStats = homeTeam.statistics;
  const awayStats = awayTeam.statistics;

  if (!homeStats || !awayStats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">試合統計</h3>
        <div className="text-center text-gray-500 py-8">
          <p className="mb-2">試合統計は現在利用できません</p>
          <p className="text-xs">
            詳細な統計データはFootball-Data APIの有料プランで提供されます
          </p>
        </div>
      </div>
    );
  }

  const stats: StatRow[] = [
    {
      label: 'ボール支配率',
      homeValue: homeStats.ball_possession ? `${homeStats.ball_possession}%` : '-',
      awayValue: awayStats.ball_possession ? `${awayStats.ball_possession}%` : '-',
      key: 'ball_possession',
    },
    {
      label: 'シュート',
      homeValue: homeStats.shots ?? '-',
      awayValue: awayStats.shots ?? '-',
      key: 'shots',
    },
    {
      label: '枠内シュート',
      homeValue: homeStats.shots_on_goal ?? '-',
      awayValue: awayStats.shots_on_goal ?? '-',
      key: 'shots_on_goal',
    },
    {
      label: '枠外シュート',
      homeValue: homeStats.shots_off_goal ?? '-',
      awayValue: awayStats.shots_off_goal ?? '-',
      key: 'shots_off_goal',
    },
    {
      label: 'コーナーキック',
      homeValue: homeStats.corner_kicks ?? '-',
      awayValue: awayStats.corner_kicks ?? '-',
      key: 'corner_kicks',
    },
    {
      label: 'オフサイド',
      homeValue: homeStats.offsides ?? '-',
      awayValue: awayStats.offsides ?? '-',
      key: 'offsides',
    },
    {
      label: 'ファウル',
      homeValue: homeStats.fouls ?? '-',
      awayValue: awayStats.fouls ?? '-',
      key: 'fouls',
    },
    {
      label: 'セーブ',
      homeValue: homeStats.saves ?? '-',
      awayValue: awayStats.saves ?? '-',
      key: 'saves',
    },
    {
      label: 'イエローカード',
      homeValue: homeStats.yellow_cards ?? '-',
      awayValue: awayStats.yellow_cards ?? '-',
      key: 'yellow_cards',
    },
    {
      label: 'レッドカード',
      homeValue: homeStats.red_cards ?? '-',
      awayValue: awayStats.red_cards ?? '-',
      key: 'red_cards',
    },
  ];

  // Calculate bar widths for visual comparison
  const getBarWidth = (homeVal: number, awayVal: number, isHome: boolean): number => {
    if (homeVal === 0 && awayVal === 0) return 50;
    const total = homeVal + awayVal;
    const percentage = isHome ? (homeVal / total) * 100 : (awayVal / total) * 100;
    return Math.max(5, Math.min(95, percentage)); // Ensure at least 5% and max 95%
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-6">試合統計</h3>

      <div className="space-y-6">
        {stats.map((stat) => {
          const homeNum = typeof stat.homeValue === 'number' ? stat.homeValue : 0;
          const awayNum = typeof stat.awayValue === 'number' ? stat.awayValue : 0;
          const homeWidth = getBarWidth(homeNum, awayNum, true);
          const awayWidth = getBarWidth(homeNum, awayNum, false);

          return (
            <div key={stat.key}>
              {/* Labels and values */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 w-16 text-right">
                  {stat.homeValue}
                </span>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex-1 text-center px-4">
                  {stat.label}
                </span>
                <span className="text-sm font-medium text-gray-700 w-16 text-left">
                  {stat.awayValue}
                </span>
              </div>

              {/* Visual bars */}
              {homeNum > 0 || awayNum > 0 ? (
                <div className="flex items-center gap-1 h-2">
                  <div
                    className="h-full bg-mufc-red rounded-l transition-all"
                    style={{ width: `${homeWidth}%` }}
                  />
                  <div
                    className="h-full bg-blue-500 rounded-r transition-all"
                    style={{ width: `${awayWidth}%` }}
                  />
                </div>
              ) : (
                <div className="h-2 bg-gray-200 rounded" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
