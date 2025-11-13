'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Trophy, ArrowLeft } from 'lucide-react';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import MatchStats from '@/components/match/MatchStats';
import GoalsList from '@/components/match/GoalsList';
import BookingsList from '@/components/match/BookingsList';
import MatchInfo from '@/components/match/MatchInfo';
import { useMatch } from '@/lib/hooks';
import { formatDate, getMatchStatusText } from '@/lib/utils';

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const matchId = parseInt(resolvedParams.id);
  const { match, isLoading, isError } = useMatch(matchId);

  if (isLoading) {
    return <Loading message="試合詳細を読み込み中..." fullScreen />;
  }

  if (isError || !match) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message="試合詳細の読み込みに失敗しました"
          details="試合情報が見つからないか、ネットワーク接続に問題がある可能性があります。"
        />
      </div>
    );
  }

  const isFinished = match.status === 'FINISHED';
  const hasScore = match.score.fullTime.home !== null && match.score.fullTime.away !== null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-mufc-red hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        ホームに戻る
      </Link>

      {/* Info Message */}
      <MatchInfo />

      {/* Match Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Competition */}
        <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
          {match.competition.emblem && (
            <Image
              src={match.competition.emblem}
              alt={match.competition.name}
              width={32}
              height={32}
              className="mr-3"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">{match.competition.name}</h2>
            <p className="text-sm text-gray-600">
              Matchday {match.matchday} • {match.stage}
            </p>
          </div>
        </div>

        {/* Date and Status */}
        <div className="flex items-center justify-center mb-6 text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="mr-4">{formatDate(match.utcDate)}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            match.status === 'IN_PLAY'
              ? 'bg-green-100 text-green-800'
              : match.status === 'FINISHED'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {getMatchStatusText(match.status)}
          </span>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold">{match.homeTeam.name}</h3>
            <p className="text-sm text-gray-600">{match.homeTeam.tla}</p>
          </div>

          {/* Score */}
          <div className="flex-1 text-center px-8">
            {hasScore ? (
              <div>
                <div className="text-6xl font-bold mb-2">
                  <span>{match.score.fullTime.home}</span>
                  <span className="text-gray-400 mx-4">-</span>
                  <span>{match.score.fullTime.away}</span>
                </div>
                {match.score.halfTime.home !== null && (
                  <p className="text-sm text-gray-600">
                    (ハーフタイム: {match.score.halfTime.home} - {match.score.halfTime.away})
                  </p>
                )}
              </div>
            ) : (
              <div className="text-4xl font-bold text-gray-400">vs</div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold">{match.awayTeam.name}</h3>
            <p className="text-sm text-gray-600">{match.awayTeam.tla}</p>
          </div>
        </div>

        {/* Venue */}
        {match.homeTeam.venue && (
          <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-200 text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{match.homeTeam.venue}</span>
          </div>
        )}
      </div>

      {/* Match Details */}
      {isFinished && (
        <div className="space-y-6">
          {/* Goals */}
          {match.goals && match.goals.length > 0 && (
            <GoalsList goals={match.goals} />
          )}

          {/* Match Statistics */}
          <MatchStats homeTeam={match.homeTeam} awayTeam={match.awayTeam} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bookings */}
            {match.bookings && match.bookings.length > 0 && (
              <BookingsList bookings={match.bookings} />
            )}

            {/* Referees */}
            {match.referees && match.referees.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">審判</h3>
                <ul className="space-y-2">
                  {match.referees.map((referee, index) => (
                    <li key={index} className="text-gray-700">
                      {referee.name}
                      {referee.nationality && (
                        <span className="text-gray-500 ml-2">({referee.nationality})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
