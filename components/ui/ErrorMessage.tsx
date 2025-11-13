import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  details?: string;
}

export default function ErrorMessage({
  message = 'エラーが発生しました',
  details,
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">{message}</h3>
            {details && <p className="text-sm text-red-600">{details}</p>}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              再読み込み
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
