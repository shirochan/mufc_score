import Image from 'next/image';
import { Standing } from '@/types/football';
import { MANCHESTER_UNITED_ID } from '@/lib/constants';

interface StandingsTableProps {
  standings: Standing[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                順位
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                チーム
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                試合数
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                勝
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                分
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                敗
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                得点
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                失点
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                得失差
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                勝点
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {standings.map((standing) => {
              const isMUFC = standing.team.id === MANCHESTER_UNITED_ID;
              const isTopFour = standing.position <= 4;
              const isRelegation = standing.position >= standings.length - 2;

              return (
                <tr
                  key={standing.team.id}
                  className={`${
                    isMUFC
                      ? 'bg-red-50 font-semibold'
                      : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  {/* Position */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold ${
                        isMUFC ? 'text-mufc-red' : 'text-gray-900'
                      }`}>
                        {standing.position}
                      </span>
                      {isTopFour && (
                        <div className="ml-2 w-2 h-2 rounded-full bg-blue-500" title="UCL出場圏" />
                      )}
                      {isRelegation && (
                        <div className="ml-2 w-2 h-2 rounded-full bg-red-500" title="降格圏" />
                      )}
                    </div>
                  </td>

                  {/* Team */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image
                          src={standing.team.crest}
                          alt={standing.team.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className={`ml-3 text-sm ${
                        isMUFC ? 'text-mufc-red font-bold' : 'text-gray-900'
                      }`}>
                        {standing.team.shortName || standing.team.name}
                      </span>
                    </div>
                  </td>

                  {/* Stats */}
                  <td className="px-2 py-3 text-center text-sm text-gray-900">
                    {standing.playedGames}
                  </td>
                  <td className="px-2 py-3 text-center text-sm text-gray-900">
                    {standing.won}
                  </td>
                  <td className="px-2 py-3 text-center text-sm text-gray-900">
                    {standing.draw}
                  </td>
                  <td className="px-2 py-3 text-center text-sm text-gray-900">
                    {standing.lost}
                  </td>
                  <td className="px-2 py-3 text-center text-sm text-gray-900">
                    {standing.goalsFor}
                  </td>
                  <td className="px-2 py-3 text-center text-sm text-gray-900">
                    {standing.goalsAgainst}
                  </td>
                  <td className={`px-2 py-3 text-center text-sm font-medium ${
                    standing.goalDifference > 0
                      ? 'text-green-600'
                      : standing.goalDifference < 0
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}>
                    {standing.goalDifference > 0 ? '+' : ''}
                    {standing.goalDifference}
                  </td>

                  {/* Points */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${
                      isMUFC ? 'text-mufc-red' : 'text-gray-900'
                    }`}>
                      {standing.points}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
            <span>UCL出場圏</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
            <span>降格圏</span>
          </div>
        </div>
      </div>
    </div>
  );
}
