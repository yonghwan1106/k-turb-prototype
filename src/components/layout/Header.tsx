'use client'

import { Cloud } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="w-8 h-8 text-turb-blue" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">K-TURB</h1>
            <p className="text-xs text-gray-500">실시간 난류 예측</p>
          </div>
        </div>
        <nav className="flex gap-6">
          <a href="/" className="text-gray-600 hover:text-turb-blue transition-colors">
            대시보드
          </a>
          <a href="/about" className="text-gray-600 hover:text-turb-blue transition-colors">
            소개
          </a>
        </nav>
      </div>
    </header>
  )
}