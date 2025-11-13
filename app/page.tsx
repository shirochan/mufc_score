'use client';

import { Calendar, TrendingUp, Trophy } from 'lucide-react';
import MatchCard from '@/components/match/MatchCard';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useUpcomingMatches, useFinishedMatches, useStandings } from '@/lib/hooks';
import { MANCHESTER_UNITED_ID, PREMIER_LEAGUE_CODE } from '@/lib/constants';
import Link from 'next/link';

export default function Home() {
  const { matches: upcomingMatches, isLoading: upcomingLoading, isError: upcomingError } =
    useUpcomingMatches(MANCHESTER_UNITED_ID);
  const { matches: finishedMatches, isLoading: finishedLoading, isError: finishedError } =
    useFinishedMatches(MANCHESTER_UNITED_ID, 3);
  const { standings, isLoading: standingsLoading, isError: standingsError } =
    useStandings(PREMIER_LEAGUE_CODE);

  const nextMatch = upcomingMatches?.[0];
  const mufcStanding = standings?.standings[0]?.table.find(
    (s) => s.team.id === MANCHESTER_UNITED_ID
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-mufc-red to-red-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to MUFC Score
        </h1>
        <p className="text-lg md:text-xl text-red-100 mb-6">
          マンチェスター・ユナイテッドの最新情報をお届けします
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Trophy className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">順位</span>
            </div>
            {standingsLoading ? (
              <p className="text-2xl font-bold">...</p>
            ) : mufcStanding ? (
              <p className="text-3xl font-bold">{mufcStanding.position}位</p>
            ) : (
              <p className="text-sm">データなし</p>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">勝点</span>
            </div>
            {standingsLoading ? (
              <p className="text-2xl font-bold">...</p>
            ) : mufcStanding ? (
              <p className="text-3xl font-bold">{mufcStanding.points}点</p>
            ) : (
              <p className="text-sm">データなし</p>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">次の試合</span>
            </div>
            {upcomingLoading ? (
              <p className="text-sm">読み込み中...</p>
            ) : nextMatch ? (
              <p className="text-sm font-medium truncate">
                vs {nextMatch.homeTeam.id === MANCHESTER_UNITED_ID
                  ? nextMatch.awayTeam.shortName
                  : nextMatch.homeTeam.shortName}
              </p>
            ) : (
              <p className="text-sm">予定なし</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Next Match */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-mufc-red" />
                次の試合
              </h2>
              <Link
                href="/fixtures"
                className="text-sm text-mufc-red hover:underline font-medium"
              >
                すべて見る →
              </Link>
            </div>

            {upcomingLoading ? (
              <Loading message="試合予定を読み込み中..." />
            ) : upcomingError ? (
              <ErrorMessage message="試合予定の読み込みに失敗しました" />
            ) : nextMatch ? (
              <MatchCard match={nextMatch} showCompetition />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>予定されている試合はありません</p>
              </div>
            )}
          </section>

          {/* Recent Results */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-mufc-red" />
                最近の試合結果
              </h2>
              <Link
                href="/results"
                className="text-sm text-mufc-red hover:underline font-medium"
              >
                すべて見る →
              </Link>
            </div>

            {finishedLoading ? (
              <Loading message="試合結果を読み込み中..." />
            ) : finishedError ? (
              <ErrorMessage message="試合結果の読み込みに失敗しました" />
            ) : finishedMatches && finishedMatches.length > 0 ? (
              <div className="space-y-4">
                {finishedMatches.slice(0, 3).map((match) => (
                  <MatchCard key={match.id} match={match} showCompetition />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>試合結果がありません</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column - League Position */}
        <div className="lg:col-span-1">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-mufc-red" />
                リーグ順位
              </h2>
              <Link
                href="/standings"
                className="text-sm text-mufc-red hover:underline font-medium"
              >
                詳細 →
              </Link>
            </div>

            {standingsLoading ? (
              <Loading message="順位表を読み込み中..." />
            ) : standingsError ? (
              <ErrorMessage message="順位表の読み込みに失敗しました" />
            ) : mufcStanding ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-mufc-red mb-2">
                    {mufcStanding.position}
                  </div>
                  <p className="text-gray-600">プレミアリーグ順位</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mufcStanding.playedGames}
                    </p>
                    <p className="text-xs text-gray-600">試合</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {mufcStanding.won}
                    </p>
                    <p className="text-xs text-gray-600">勝</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">
                      {mufcStanding.lost}
                    </p>
                    <p className="text-xs text-gray-600">敗</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">得失点差</span>
                    <span className={`text-lg font-bold ${
                      mufcStanding.goalDifference > 0
                        ? 'text-green-600'
                        : mufcStanding.goalDifference < 0
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}>
                      {mufcStanding.goalDifference > 0 ? '+' : ''}
                      {mufcStanding.goalDifference}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">勝点</span>
                    <span className="text-2xl font-bold text-mufc-red">
                      {mufcStanding.points}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>順位情報がありません</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
