import { Goal } from '@/types/football';
import { MANCHESTER_UNITED_ID } from '@/lib/constants';

interface GoalsListProps {
  goals: Goal[];
}

export default function GoalsList({ goals }: GoalsListProps) {
  if (!goals || goals.length === 0) {
    return null;
  }

  // Sort goals by minute
  const sortedGoals = [...goals].sort((a, b) => a.minute - b.minute);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">ゴール</h3>

      <div className="space-y-3">
        {sortedGoals.map((goal, index) => {
          const isMUFC = goal.team.id === MANCHESTER_UNITED_ID;
          const minuteDisplay = goal.injuryTime
            ? `${goal.minute}+${goal.injuryTime}'`
            : `${goal.minute}'`;

          return (
            <div
              key={index}
              className={`flex items-center p-3 rounded-lg ${
                isMUFC ? 'bg-red-50 border-l-4 border-mufc-red' : 'bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-mufc-red">{minuteDisplay}</span>
                  <span className="font-semibold">{goal.scorer.name}</span>
                  {goal.assist && (
                    <span className="text-sm text-gray-600">
                      (アシスト: {goal.assist.name})
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{goal.team.name}</div>
              </div>
              <div className="text-lg font-bold text-gray-700">
                {goal.score.home} - {goal.score.away}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
