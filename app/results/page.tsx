'use client';

import { Trophy } from 'lucide-react';
import MatchCard from '@/components/match/MatchCard';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useFinishedMatches } from '@/lib/hooks';
import { MANCHESTER_UNITED_ID } from '@/lib/constants';

export default function ResultsPage() {
  const { matches, isLoading, isError } = useFinishedMatches(MANCHESTER_UNITED_ID);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-mufc-red" />
          試合結果
        </h1>
        <p className="text-gray-600">
          マンチェスター・ユナイテッドの過去の試合結果
        </p>
      </div>

      {/* Matches List */}
      {isLoading ? (
        <Loading message="試合結果を読み込み中..." />
      ) : isError ? (
        <ErrorMessage
          message="試合結果の読み込みに失敗しました"
          details="ネットワーク接続を確認して、もう一度お試しください。"
        />
      ) : matches && matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} showCompetition />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            試合結果がありません
          </h3>
          <p className="text-gray-500">
            表示できる試合結果がありません。
          </p>
        </div>
      )}
    </div>
  );
}
