import { Booking } from '@/types/football';
import { MANCHESTER_UNITED_ID } from '@/lib/constants';

interface BookingsListProps {
  bookings: Booking[];
}

export default function BookingsList({ bookings }: BookingsListProps) {
  if (!bookings || bookings.length === 0) {
    return null;
  }

  // Sort bookings by minute
  const sortedBookings = [...bookings].sort((a, b) => a.minute - b.minute);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">イエロー/レッドカード</h3>

      <div className="space-y-2">
        {sortedBookings.map((booking, index) => {
          const isMUFC = booking.team.id === MANCHESTER_UNITED_ID;
          const isYellow = booking.card === 'YELLOW_CARD';

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isMUFC ? 'bg-red-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-6 rounded ${
                    isYellow ? 'bg-yellow-400' : 'bg-red-600'
                  }`}
                  title={isYellow ? 'イエローカード' : 'レッドカード'}
                />
                <div>
                  <div className="font-semibold">{booking.player.name}</div>
                  <div className="text-xs text-gray-500">{booking.team.name}</div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {booking.minute}'
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
