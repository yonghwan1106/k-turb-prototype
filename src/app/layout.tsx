import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'K-TURB | 한국형 실시간 난류 예측 플랫폼',
  description: 'AI 기반 항공 난류 실시간 예측 시스템',
  keywords: ['항공기상', '난류예측', 'AI', '항공안전'],
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">☁️</text></svg>',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress React Three Fiber hydration errors globally
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  const errorMessage = args[0]?.toString() || '';
                  if (
                    errorMessage.includes('Minified React error #425') ||
                    errorMessage.includes('Minified React error #418') ||
                    errorMessage.includes('Minified React error #423') ||
                    errorMessage.includes('Hydration')
                  ) {
                    return; // Suppress these errors
                  }
                  originalError.apply(console, args);
                };

                // Suppress unhandled errors
                window.addEventListener('error', function(event) {
                  const errorMessage = event.message || '';
                  if (
                    errorMessage.includes('Minified React error #425') ||
                    errorMessage.includes('Minified React error #418') ||
                    errorMessage.includes('Minified React error #423')
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </main>
      </body>
    </html>
  )
}