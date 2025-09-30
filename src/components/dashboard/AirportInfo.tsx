'use client'

import { useState, useEffect } from 'react'
import { Plane, Wind, Eye, Cloud, Gauge, TrendingUp } from 'lucide-react'
import { KOREAN_AIRPORTS } from '@/data/airports'
import { generateMockWeather, getWindDirection } from '@/lib/mockWeather'
import { getTurbulenceLevel } from '@/lib/turbulence'
import { AirportWeather } from '@/types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function AirportInfo() {
  const [selectedAirport, setSelectedAirport] = useState('ICN')
  const [airportData, setAirportData] = useState<AirportWeather | null>(null)

  useEffect(() => {
    // 선택된 공항의 모의 기상 데이터 생성
    const data = generateMockWeather(selectedAirport)
    setAirportData(data)
  }, [selectedAirport])

  if (!airportData) return null

  const turbLevel = getTurbulenceLevel(airportData.turbulence.current)
  const windDir = getWindDirection(airportData.weather.windDirection)

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-6 h-6 text-turb-blue" />
        <h3 className="text-xl font-bold text-gray-900">공항 상세 정보</h3>
      </div>

      {/* 공항 선택 드롭다운 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">공항 선택</label>
        <select
          value={selectedAirport}
          onChange={(e) => setSelectedAirport(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turb-blue"
        >
          {KOREAN_AIRPORTS.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.name} ({airport.code})
            </option>
          ))}
        </select>
      </div>

      {/* 기상 정보 카드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* 기온 */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Cloud className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">기온</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {airportData.weather.temp}°C
          </div>
        </div>

        {/* 풍속/풍향 */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">풍속/풍향</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {airportData.weather.windSpeed} kt
          </div>
          <div className="text-xs text-gray-500">{windDir} ({airportData.weather.windDirection}°)</div>
        </div>

        {/* 가시거리 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-600">가시거리</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(airportData.weather.visibility / 1000).toFixed(1)} km
          </div>
        </div>

        {/* 운고 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">운고</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {airportData.weather.ceiling} ft
          </div>
        </div>
      </div>

      {/* 난류 위험도 */}
      <div
        className="p-4 rounded-lg mb-6"
        style={{ backgroundColor: turbLevel.color + '20' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Gauge className="w-5 h-5" style={{ color: turbLevel.color }} />
          <span className="font-semibold text-gray-900">난류 위험도</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold" style={{ color: turbLevel.color }}>
              {airportData.turbulence.current}
            </div>
            <div className="text-sm text-gray-600">{turbLevel.level}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">{turbLevel.description}</div>
          </div>
        </div>
      </div>

      {/* 24시간 예측 그래프 (간단한 바 차트) */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">24시간 난류 예측</h4>
        <div className="space-y-2">
          {airportData.turbulence.forecast.slice(0, 12).map((item, idx) => {
            const level = getTurbulenceLevel(item.level)
            const width = `${item.level}%`

            return (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-16 text-xs text-gray-600">
                  {format(item.time, 'HH:mm', { locale: ko })}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                  <div
                    className="h-6 rounded-full transition-all duration-300"
                    style={{
                      width,
                      backgroundColor: level.color,
                    }}
                  />
                </div>
                <div className="w-12 text-xs text-gray-600 text-right">
                  {Math.round(item.level)}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 text-xs text-gray-500 text-center">
          다음 12시간 예측 (1시간 간격)
        </div>
      </div>
    </div>
  )
}