import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Match } from '@/types/football';
import { formatDate, getMatchStatusText, isUpcoming } from '@/lib/utils';
import { MANCHESTER_UNITED_ID } from '@/lib/constants';

interface MatchCardProps {
  match: Match;
  showCompetition?: boolean;
}

export default function MatchCard({ match, showCompetition = false }: MatchCardProps) {
  const isHome = match.homeTeam.id === MANCHESTER_UNITED_ID;
  const isMUFC = isHome || match.awayTeam.id === MANCHESTER_UNITED_ID;
  const isMatchUpcoming = isUpcoming(match.utcDate);
  const isFinished = match.status === 'FINISHED';

  return (
    <Link
      href={`/match/${match.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden"
    >
      {/* Competition Badge */}
      {showCompetition && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
          {match.competition.emblem && (
            <Image
              src={match.competition.emblem}
              alt={match.competition.name}
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          <span className="text-sm text-gray-600">{match.competition.name}</span>
        </div>
      )}

      <div className="p-4">
        {/* Date and Time */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(match.utcDate)}</span>
          <span className="mx-2">•</span>
          <span className={`font-medium ${
            match.status === 'IN_PLAY' ? 'text-green-600 animate-pulse' : ''
          }`}>
            {getMatchStatusText(match.status)}
          </span>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex-1 flex items-center">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className={`font-semibold truncate ${
                match.homeTeam.id === MANCHESTER_UNITED_ID ? 'text-mufc-red' : ''
              }`}>
                {match.homeTeam.shortName || match.homeTeam.name}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="mx-4 text-center min-w-[60px]">
            {isFinished ? (
              <div className="text-2xl font-bold">
                <span>{match.score.fullTime.home}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span>{match.score.fullTime.away}</span>
              </div>
            ) : isMatchUpcoming ? (
              <div className="text-sm text-gray-500">
                <Clock className="w-5 h-5 mx-auto mb-1" />
                <span>vs</span>
              </div>
            ) : (
              <div className="text-xl font-bold">
                <span>{match.score.fullTime.home ?? 0}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span>{match.score.fullTime.away ?? 0}</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex items-center justify-end">
            <div className="mr-3 flex-1 min-w-0 text-right">
              <p className={`font-semibold truncate ${
                match.awayTeam.id === MANCHESTER_UNITED_ID ? 'text-mufc-red' : ''
              }`}>
                {match.awayTeam.shortName || match.awayTeam.name}
              </p>
            </div>
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Match Info */}
        {match.homeTeam.venue && (
          <div className="flex items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{match.homeTeam.venue}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
