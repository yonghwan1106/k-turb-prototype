'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Plane } from 'lucide-react'

export default function AIBriefing() {
  const [briefing, setBriefing] = useState('')
  const [loading, setLoading] = useState(false)
  const [departure, setDeparture] = useState('ICN')
  const [arrival, setArrival] = useState('CJU')

  async function generateBriefing() {
    setLoading(true)
    setBriefing('')

    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departure,
          arrival,
          language: 'ko',
        }),
      })

      const data = await response.json()

      if (data.error) {
        setBriefing('브리핑 생성 중 오류가 발생했습니다.')
        setLoading(false)
        return
      }

      // 타이핑 효과
      const text = data.briefing
      let index = 0

      const interval = setInterval(() => {
        if (index < text.length) {
          setBriefing((prev) => prev + text[index])
          index++
        } else {
          clearInterval(interval)
          setLoading(false)
        }
      }, 20)
    } catch (error) {
      console.error(error)
      setBriefing('브리핑 생성 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">AI 기상 브리핑</h3>
      </div>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              출발지
            </label>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turb-blue"
            >
              <option value="ICN">인천 (ICN)</option>
              <option value="GMP">김포 (GMP)</option>
              <option value="CJU">제주 (CJU)</option>
              <option value="PUS">부산 (PUS)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              도착지
            </label>
            <select
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turb-blue"
            >
              <option value="CJU">제주 (CJU)</option>
              <option value="ICN">인천 (ICN)</option>
              <option value="GMP">김포 (GMP)</option>
              <option value="PUS">부산 (PUS)</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateBriefing}
          disabled={loading}
          className="w-full bg-turb-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              브리핑 생성 중...
            </>
          ) : (
            <>
              <Plane className="w-5 h-5" />
              브리핑 생성
            </>
          )}
        </button>
      </div>

      {briefing && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {briefing}
            </div>
          </div>
        </div>
      )}

      {!briefing && !loading && (
        <div className="text-center text-gray-400 py-8">
          <Plane className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">항로를 선택하고 브리핑을 생성해보세요</p>
        </div>
      )}
    </div>
  )
}