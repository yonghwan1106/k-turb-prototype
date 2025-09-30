'use client'

import { Cloud, Activity, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <Cloud className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">K-TURB</h1>
              <div className="flex items-center gap-1 text-xs text-blue-100">
                <Activity className="w-3 h-3" />
                <span>실시간 난류 예측</span>
              </div>
            </div>
          </a>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-2">
            <a
              href="/"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              대시보드
            </a>
            <a
              href="/about"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              소개
            </a>
            <div className="ml-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
              <div className="text-xs text-blue-200">상태</div>
              <div className="text-sm font-bold text-white flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                정상 운영
              </div>
            </div>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 space-y-2">
            <a
              href="/"
              className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              대시보드
            </a>
            <a
              href="/about"
              className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              소개
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}