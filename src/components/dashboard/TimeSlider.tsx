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
        setTimeOffset(prev => {
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
  }, [timeOffset, setSelectedTime])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setTimeOffset(value)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-gray-500">예측 시각</div>
          <div className="text-2xl font-bold text-gray-900">
            {format(currentTime, 'HH:mm', { locale: ko })}
          </div>
          <div className="text-xs text-gray-400">
            {format(currentTime, 'yyyy-MM-dd (E)', { locale: ko })}
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-3 rounded-full transition-colors ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-turb-blue hover:bg-blue-600 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max={maxOffset}
          step="10"
          value={timeOffset}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-turb-blue"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>현재</span>
          <span>+3시간</span>
          <span>+6시간</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <span className="font-semibold">시간 오프셋:</span> +{timeOffset}분 (
        {Math.floor(timeOffset / 60)}시간 {timeOffset % 60}분)
      </div>
    </div>
  )
}