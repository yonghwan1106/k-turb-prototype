export interface TurbulenceData {
  id: string
  lat: number
  lon: number
  altitude: number // feet
  intensity: number // 0-100
  timestamp: Date
  confidence: number // 0-1
}

export interface Airport {
  code: string
  name: string
  nameEn: string
  lat: number
  lon: number
  elevation: number
}

export interface WeatherCondition {
  temperature: number
  windSpeed: number
  windDirection: number
  visibility: number
  ceiling: number
}

export interface FlightPath {
  id: string
  departure: string
  arrival: string
  waypoints: { lat: number; lon: number }[]
  turbulenceZones: TurbulenceData[]
}

export interface TurbulenceLevel {
  level: string
  color: string
  description: string
}