import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MUFC Score - マンチェスター・ユナイテッド試合情報',
  description: 'マンチェスター・ユナイテッドの試合予定、結果、順位表などの情報を提供するファンサイト',
  keywords: 'マンチェスター・ユナイテッド, Manchester United, サッカー, プレミアリーグ, 試合結果',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
