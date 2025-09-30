import { AirportWeather } from '@/types'
import { addHours } from 'date-fns'

// 공항별 모의 기상 데이터 생성
export function generateMockWeather(airportCode: string): AirportWeather {
  const airportNames: { [key: string]: string } = {
    ICN: '인천국제공항',
    GMP: '김포국제공항',
    CJU: '제주국제공항',
    PUS: '김해국제공항',
    TAE: '대구국제공항',
    CJJ: '청주국제공항',
    KWJ: '광주공항',
    RSU: '여수공항',
  }

  // 랜덤하지만 합리적인 범위의 기상 데이터
  const baseTemp = 15 + Math.random() * 15 // 15-30도
  const baseWind = 5 + Math.random() * 15 // 5-20 kt
  const windDir = Math.floor(Math.random() * 360)
  const visibility = 8000 + Math.random() * 2000 // 8-10km
  const ceiling = 1500 + Math.random() * 3000 // 1500-4500ft

  // 현재 난류 강도
  const currentTurbulence = Math.random() * 70 // 0-70

  // 24시간 예측 (1시간 간격)
  const forecast = []
  const now = new Date()
  for (let i = 0; i < 24; i++) {
    const time = addHours(now, i)
    // 시간에 따라 변화하는 패턴
    const level = Math.max(
      0,
      Math.min(100, currentTurbulence + Math.sin(i * 0.5) * 20 + (Math.random() - 0.5) * 15)
    )
    forecast.push({ time, level })
  }

  return {
    code: airportCode,
    name: airportNames[airportCode] || airportCode,
    weather: {
      temp: Math.round(baseTemp * 10) / 10,
      windSpeed: Math.round(baseWind),
      windDirection: windDir,
      visibility: Math.round(visibility),
      ceiling: Math.round(ceiling),
    },
    turbulence: {
      current: Math.round(currentTurbulence),
      forecast,
    },
  }
}

// 풍향을 방위로 변환
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}