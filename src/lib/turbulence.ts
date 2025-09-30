import { addMinutes } from 'date-fns'
import { TurbulenceData, TurbulenceLevel } from '@/types'

export function generateTurbulenceData(
  baseTime: Date,
  forecastHours: number = 6
): TurbulenceData[] {
  const data: TurbulenceData[] = []
  const intervals = (forecastHours * 60) / 10 // 10분 간격

  for (let i = 0; i < intervals; i++) {
    const time = addMinutes(baseTime, i * 10)

    // 한국 주요 지점에 난류 시뮬레이션
    const points = [
      { lat: 37.5, lon: 127.0, name: '서울 상공' },
      { lat: 35.1, lon: 129.0, name: '부산 상공' },
      { lat: 33.5, lon: 126.5, name: '제주 상공' },
      { lat: 36.3, lon: 127.4, name: '대전 상공' },
      { lat: 35.9, lon: 128.6, name: '대구 상공' },
    ]

    points.forEach((point, idx) => {
      // 시간과 위치에 따른 패턴 있는 난류 생성
      const timePattern = Math.sin(i * 0.1 + idx) * 30 + 40
      const noise = Math.random() * 20
      const intensity = Math.max(0, Math.min(100, timePattern + noise))

      // 고도별로 여러 데이터 포인트 생성
      const altitudes = [25000, 30000, 35000, 40000]
      altitudes.forEach(altitude => {
        const altitudeVariation = (Math.random() - 0.5) * 10

        data.push({
          id: `turb-${i}-${idx}-${altitude}`,
          lat: point.lat + (Math.random() - 0.5) * 2,
          lon: point.lon + (Math.random() - 0.5) * 2,
          altitude: altitude,
          intensity: Math.max(0, Math.min(100, intensity + altitudeVariation)),
          timestamp: time,
          confidence: 0.7 + Math.random() * 0.3 // 70-100% 신뢰도
        })
      })
    })
  }

  return data
}

export function getTurbulenceLevel(intensity: number): TurbulenceLevel {
  if (intensity < 30) {
    return {
      level: '약함',
      color: '#4CAF50',
      description: '안전한 비행 가능'
    }
  }
  if (intensity < 60) {
    return {
      level: '보통',
      color: '#FFC107',
      description: '주의 필요'
    }
  }
  return {
    level: '강함',
    color: '#F44336',
    description: '우회 권장'
  }
}

export function filterTurbulenceByTime(
  data: TurbulenceData[],
  targetTime: Date
): TurbulenceData[] {
  return data.filter(point => {
    const timeDiff = Math.abs(point.timestamp.getTime() - targetTime.getTime())
    return timeDiff < 10 * 60 * 1000 // 10분 이내
  })
}

export function filterTurbulenceByAltitude(
  data: TurbulenceData[],
  minAltitude: number,
  maxAltitude: number
): TurbulenceData[] {
  return data.filter(
    point => point.altitude >= minAltitude && point.altitude <= maxAltitude
  )
}

export function getAverageTurbulence(data: TurbulenceData[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, point) => acc + point.intensity, 0)
  return sum / data.length
}