import { Github, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">MUFC Score</h3>
            <p className="text-sm">
              マンチェスター・ユナイテッドの試合情報、結果、順位表などを提供するファンサイトです。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">リンク</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.manutd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mufc-red transition-colors"
                >
                  公式サイト
                </a>
              </li>
              <li>
                <a
                  href="https://www.football-data.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mufc-red transition-colors"
                >
                  Football-Data API
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white font-bold mb-4">免責事項</h3>
            <p className="text-sm">
              このサイトはマンチェスター・ユナイテッドFCの非公式ファンサイトです。
              データはFootball-Data APIより取得しています。
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-mufc-red" /> by MUFC Fans
          </p>
          <p className="text-sm mt-4 md:mt-0">
            © {currentYear} MUFC Score. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
