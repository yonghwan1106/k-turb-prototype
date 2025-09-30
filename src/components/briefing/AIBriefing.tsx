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

      // 타이핑 효과 (더 빠르게)
      const text = data.briefing
      let index = 0

      const interval = setInterval(() => {
        if (index < text.length) {
          // 한 번에 3글자씩 추가하여 3배 빠르게
          const chunk = text.substring(index, index + 3)
          setBriefing((prev) => prev + chunk)
          index += 3
        } else {
          clearInterval(interval)
          setLoading(false)
        }
      }, 10)
    } catch (error) {
      console.error(error)
      setBriefing('브리핑 생성 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">AI 기상 브리핑</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              출발지
            </label>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turb-blue focus:border-turb-blue bg-white text-gray-900 font-medium"
            >
              <option value="ICN">인천 (ICN)</option>
              <option value="GMP">김포 (GMP)</option>
              <option value="CJU">제주 (CJU)</option>
              <option value="PUS">부산 (PUS)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              도착지
            </label>
            <select
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turb-blue focus:border-turb-blue bg-white text-gray-900 font-medium"
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
          className="w-full bg-gradient-to-r from-turb-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              브리핑 생성 중...
            </>
          ) : (
            <>
              <Plane className="w-6 h-6" />
              브리핑 생성
            </>
          )}
        </button>
      </div>

      {briefing && (
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200 shadow-inner">
          <div className="prose prose-sm max-w-none">
            <div
              className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{
                __html: briefing
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
                  .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
                  .replace(/\n/g, '<br>')
              }}
            />
          </div>
        </div>
      )}

      {!briefing && !loading && (
        <div className="mt-6 text-center text-gray-400 py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <Plane className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">항로를 선택하고 브리핑을 생성해보세요</p>
        </div>
      )}
    </div>
  )
}