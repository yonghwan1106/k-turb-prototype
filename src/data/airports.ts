import { Airport } from '@/types'

export const KOREAN_AIRPORTS: Airport[] = [
  {
    code: 'ICN',
    name: '인천국제공항',
    nameEn: 'Incheon International Airport',
    lat: 37.4602,
    lon: 126.4407,
    elevation: 23
  },
  {
    code: 'GMP',
    name: '김포국제공항',
    nameEn: 'Gimpo International Airport',
    lat: 37.5583,
    lon: 126.7906,
    elevation: 18
  },
  {
    code: 'CJU',
    name: '제주국제공항',
    nameEn: 'Jeju International Airport',
    lat: 33.5113,
    lon: 126.4930,
    elevation: 36
  },
  {
    code: 'PUS',
    name: '김해국제공항',
    nameEn: 'Gimhae International Airport',
    lat: 35.1795,
    lon: 128.9382,
    elevation: 2
  },
  {
    code: 'TAE',
    name: '대구국제공항',
    nameEn: 'Daegu International Airport',
    lat: 35.8941,
    lon: 128.6589,
    elevation: 116
  },
  {
    code: 'CJJ',
    name: '청주국제공항',
    nameEn: 'Cheongju International Airport',
    lat: 36.7166,
    lon: 127.4991,
    elevation: 191
  },
  {
    code: 'KWJ',
    name: '광주공항',
    nameEn: 'Gwangju Airport',
    lat: 35.1264,
    lon: 126.8086,
    elevation: 39
  },
  {
    code: 'RSU',
    name: '여수공항',
    nameEn: 'Yeosu Airport',
    lat: 34.8423,
    lon: 127.6169,
    elevation: 53
  }
]

export function getAirportByCode(code: string): Airport | undefined {
  return KOREAN_AIRPORTS.find(airport => airport.code === code)
}