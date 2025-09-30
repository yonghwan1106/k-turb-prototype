import dynamic from 'next/dynamic'
import TimeSlider from '@/components/dashboard/TimeSlider'
import AIBriefing from '@/components/briefing/AIBriefing'

// 3D 컴포넌트는 클라이언트 사이드에서만 렌더링
const Korea3DMap = dynamic(() => import('@/components/map/Korea3DMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turb-blue mx-auto mb-4"></div>
        <p className="text-gray-600">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          K-TURB 실시간 난류 예측
        </h1>
        <p className="text-gray-600">
          한국형 AI 기반 항공 난류 예측 플랫폼
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 메인 지도 영역 */}
        <div className="lg:col-span-2 space-y-6">
          <Korea3DMap />
          <TimeSlider />
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          <AIBriefing />

          {/* 난류 레전드 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-900">난류 강도</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-turb-green"></div>
                <div>
                  <div className="font-semibold text-sm">약함</div>
                  <div className="text-xs text-gray-500">안전한 비행 가능</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-turb-yellow"></div>
                <div>
                  <div className="font-semibold text-sm">보통</div>
                  <div className="text-xs text-gray-500">주의 필요</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-turb-red"></div>
                <div>
                  <div className="font-semibold text-sm">강함</div>
                  <div className="text-xs text-gray-500">우회 권장</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}