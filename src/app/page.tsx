import dynamic from 'next/dynamic'
import TimeSlider from '@/components/dashboard/TimeSlider'
import AIBriefing from '@/components/briefing/AIBriefing'
import AirportInfo from '@/components/dashboard/AirportInfo'
import { Activity, AlertTriangle, CheckCircle, CloudRain } from 'lucide-react'

// 3D 컴포넌트는 클라이언트 사이드에서만 렌더링
const Korea3DMap = dynamic(() => import('@/components/map/Korea3DMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[700px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-turb-blue mx-auto mb-6"></div>
        <p className="text-white text-lg font-medium">3D 지도 로딩 중...</p>
        <p className="text-gray-400 text-sm mt-2">잠시만 기다려주세요</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
                K-TURB 실시간 난류 예측
              </h1>
              <p className="text-blue-100 text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" />
                한국형 AI 기반 항공 난류 예측 플랫폼
              </p>
            </div>
            <div className="hidden lg:flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-sm text-blue-200">실시간 모니터링</div>
                <div className="text-2xl font-bold">24/7</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-sm text-blue-200">AI 정확도</div>
                <div className="text-2xl font-bold">95%+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* 상태 요약 배너 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8" />
              <span className="text-3xl font-bold">62%</span>
            </div>
            <div className="text-lg font-semibold">안전 구역</div>
            <div className="text-green-100 text-sm">현재 한반도 상공</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8" />
              <span className="text-3xl font-bold">28%</span>
            </div>
            <div className="text-lg font-semibold">주의 구역</div>
            <div className="text-yellow-100 text-sm">경미한 난류 발생</div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CloudRain className="w-8 h-8" />
              <span className="text-3xl font-bold">10%</span>
            </div>
            <div className="text-lg font-semibold">위험 구역</div>
            <div className="text-red-100 text-sm">우회 권장 지역</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 지도 영역 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <Korea3DMap />
            </div>
            <TimeSlider />
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            <AIBriefing />
            <AirportInfo />

            {/* 난류 레전드 - 개선된 디자인 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-turb-blue" />
                난류 강도 범례
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-turb-green to-emerald-600 shadow-md"></div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">약함 (0-30)</div>
                    <div className="text-xs text-gray-600">안전한 비행 가능</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-turb-yellow to-orange-500 shadow-md"></div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">보통 (30-60)</div>
                    <div className="text-xs text-gray-600">주의 필요</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-turb-red to-rose-600 shadow-md"></div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">강함 (60-100)</div>
                    <div className="text-xs text-gray-600">우회 권장</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}