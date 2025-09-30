'use client'

import { useState, useEffect, useMemo } from 'react'
import { Play, Pause } from 'lucide-react'
import { format, addMinutes } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useStore } from '@/store/useStore'

export default function TimeSlider() {
  const { timeOffset, isPlaying, setTimeOffset, setIsPlaying, setSelectedTime } = useStore()
  const [baseTime] = useState(new Date())
  const currentTime = useMemo(() => addMinutes(baseTime, timeOffset), [baseTime, timeOffset])
  const maxOffset = 6 * 60 // 6시간

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTimeOffset((prev: number) => {
          const next = prev + 10
          if (next > maxOffset) {
            setIsPlaying(false)
            return maxOffset
          }
          return next
        })
      }, 1000) // 1초마다 10분씩 증가

      return () => clearInterval(interval)
    }
  }, [isPlaying, setTimeOffset, setIsPlaying, maxOffset])

  useEffect(() => {
    setSelectedTime(currentTime)
  }, [timeOffset, setSelectedTime, currentTime])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setTimeOffset(value)
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-turb-blue to-indigo-600 text-white rounded-xl p-4 shadow-lg">
            <div className="text-xs font-medium opacity-90 mb-1">예측 시각</div>
            <div className="text-3xl font-bold">
              {format(currentTime, 'HH:mm', { locale: ko })}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {format(currentTime, 'yyyy-MM-dd (E)', { locale: ko })}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-4 rounded-xl transition-all shadow-lg ${
            isPlaying
              ? 'bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white scale-105'
              : 'bg-gradient-to-br from-turb-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>
      </div>

      <div className="relative mt-2">
        <div className="bg-gradient-to-r from-turb-blue/10 via-turb-blue/20 to-turb-blue/10 rounded-full p-1">
          <input
            type="range"
            min="0"
            max={maxOffset}
            step="10"
            value={timeOffset}
            onChange={handleSliderChange}
            className="w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer accent-turb-blue"
            style={{
              background: `linear-gradient(to right, #2196F3 0%, #2196F3 ${(timeOffset / maxOffset) * 100}%, #E0E0E0 ${(timeOffset / maxOffset) * 100}%, #E0E0E0 100%)`
            }}
          />
        </div>

        <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
          <span className="bg-gray-100 px-2 py-1 rounded">현재</span>
          <span className="bg-gray-100 px-2 py-1 rounded">+3시간</span>
          <span className="bg-gray-100 px-2 py-1 rounded">+6시간</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
        <span className="text-sm font-medium text-gray-700">시간 오프셋</span>
        <span className="text-lg font-bold text-turb-blue">
          +{Math.floor(timeOffset / 60)}h {timeOffset % 60}m
        </span>
      </div>
    </div>
  )
}