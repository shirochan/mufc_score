'use client';

import Image from 'next/image';
import { Users } from 'lucide-react';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useTeam } from '@/lib/hooks';
import { MANCHESTER_UNITED_ID } from '@/lib/constants';
import { getPositionText, sortByPosition } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

export default function SquadPage() {
  const { team, isLoading, isError } = useTeam(MANCHESTER_UNITED_ID);

  const players = team?.squad ? sortByPosition(team.squad) : [];
  const groupedPlayers = players.reduce((acc, player) => {
    const pos = player.position || 'Unknown';
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(player);
    return acc;
  }, {} as Record<string, typeof players>);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
          <Users className="w-8 h-8 mr-3 text-mufc-red" />
          チーム情報
        </h1>
        <p className="text-gray-600">
          マンチェスター・ユナイテッドの選手一覧
        </p>
      </div>

      {isLoading ? (
        <Loading message="チーム情報を読み込み中..." />
      ) : isError ? (
        <ErrorMessage
          message="チーム情報の読み込みに失敗しました"
          details="ネットワーク接続を確認して、もう一度お試しください。"
        />
      ) : team ? (
        <div>
          {/* Team Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center">
              <div className="relative w-20 h-20 mr-6">
                <Image
                  src={team.crest}
                  alt={team.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-mufc-red mb-2">{team.name}</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">設立:</span> {team.founded}年
                  </div>
                  <div>
                    <span className="font-medium">ホームスタジアム:</span> {team.venue}
                  </div>
                  <div>
                    <span className="font-medium">チームカラー:</span> {team.clubColors}
                  </div>
                  {team.website && (
                    <div>
                      <a
                        href={team.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mufc-red hover:underline"
                      >
                        公式サイト →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Squad by Position */}
          {(Object.entries(groupedPlayers) as [string, typeof players][]).map(([position, positionPlayers]) => (
            <div key={position} className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-mufc-red mr-2">{getPositionText(position)}</span>
                <span className="text-gray-400 text-lg">({positionPlayers.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {positionPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{player.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">国籍:</span>
                            <span>{player.nationality}</span>
                          </div>
                          {player.dateOfBirth && (
                            <div className="flex items-center">
                              <span className="font-medium mr-2">生年月日:</span>
                              <span>
                                {format(parseISO(player.dateOfBirth), 'yyyy/MM/dd')}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <span className="font-medium mr-2">ポジション:</span>
                            <span>{getPositionText(player.position)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {players.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                選手情報がありません
              </h3>
              <p className="text-gray-500">
                現在、選手情報を表示できません。
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
