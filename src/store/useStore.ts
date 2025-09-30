import { create } from 'zustand'
import { TurbulenceData } from '@/types'

interface AppState {
  selectedTime: Date
  timeOffset: number // 분 단위
  isPlaying: boolean
  turbulenceData: TurbulenceData[]
  selectedAltitude: number
  selectedAirport: string | null

  setSelectedTime: (time: Date) => void
  setTimeOffset: (offset: number | ((prev: number) => number)) => void
  setIsPlaying: (playing: boolean) => void
  setTurbulenceData: (data: TurbulenceData[]) => void
  setSelectedAltitude: (altitude: number) => void
  setSelectedAirport: (airport: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  selectedTime: new Date(),
  timeOffset: 0,
  isPlaying: false,
  turbulenceData: [],
  selectedAltitude: 30000,
  selectedAirport: null,

  setSelectedTime: (time) => set({ selectedTime: time }),
  setTimeOffset: (offset) => set((state) => ({
    timeOffset: typeof offset === 'function' ? offset(state.timeOffset) : offset
  })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setTurbulenceData: (data) => set({ turbulenceData: data }),
  setSelectedAltitude: (altitude) => set({ selectedAltitude: altitude }),
  setSelectedAirport: (airport) => set({ selectedAirport: airport }),
}))