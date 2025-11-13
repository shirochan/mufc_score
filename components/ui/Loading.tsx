import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({ message = '読み込み中...', fullScreen = false }: LoadingProps) {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-mufc-red mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
