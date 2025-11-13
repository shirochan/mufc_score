import { Info } from 'lucide-react';

export default function MatchInfo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">データ提供について</p>
          <p>
            現在、無料プランのFootball-Data APIを使用しています。
            試合の基本情報（日時、スコア、チーム）は表示されますが、
            詳細な統計データ（ゴール詳細、カード、ラインナップなど）は有料プランで提供されます。
          </p>
        </div>
      </div>
    </div>
  );
}
