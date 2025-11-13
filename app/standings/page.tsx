'use client';

import { TrendingUp } from 'lucide-react';
import StandingsTable from '@/components/team/StandingsTable';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useStandings } from '@/lib/hooks';
import { PREMIER_LEAGUE_CODE } from '@/lib/constants';

export default function StandingsPage() {
  const { standings, isLoading, isError } = useStandings(PREMIER_LEAGUE_CODE);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-mufc-red" />
          プレミアリーグ順位表
        </h1>
        <p className="text-gray-600">
          {standings?.season && (
            <span>
              {standings.season.startDate.substring(0, 4)}/
              {standings.season.endDate.substring(0, 4)} シーズン
            </span>
          )}
        </p>
      </div>

      {/* Standings Table */}
      {isLoading ? (
        <Loading message="順位表を読み込み中..." />
      ) : isError ? (
        <ErrorMessage
          message="順位表の読み込みに失敗しました"
          details="ネットワーク接続を確認して、もう一度お試しください。"
        />
      ) : standings?.standings && standings.standings.length > 0 ? (
        <div className="space-y-6">
          {standings.standings.map((standingGroup, index) => (
            <div key={index}>
              {standingGroup.type && standingGroup.type !== 'TOTAL' && (
                <h2 className="text-xl font-bold mb-4">
                  {standingGroup.type === 'HOME' ? 'ホーム' : 'アウェイ'}
                </h2>
              )}
              <StandingsTable standings={standingGroup.table} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            順位表データがありません
          </h3>
          <p className="text-gray-500">
            順位表を表示できません。
          </p>
        </div>
      )}
    </div>
  );
}
