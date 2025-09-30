import { Cloud, Zap, Brain, Shield, Globe, TrendingUp, Activity, CheckCircle, Target, Layers, Users, Rocket } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Cloud className="w-24 h-24" />
          </div>
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">K-TURB</h1>
          <p className="text-2xl mb-4 text-blue-100">Korean Turbulence Real-time Prediction Platform</p>
          <p className="text-xl mb-6">한국형 실시간 난류 예측 플랫폼</p>
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg">
            2025년 항공기상 아이디업 공모전
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* 핵심 성과 지표 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            🎯 핵심 성과 지표
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-6xl font-bold mb-3">88%</div>
              <div className="text-xl font-medium">예측 정확도</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-6xl font-bold mb-3">30%</div>
              <div className="text-xl font-medium">사고율 감소</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-6xl font-bold mb-3">200억</div>
              <div className="text-xl font-medium">연간 연료비 절감</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-6xl font-bold mb-3">10분</div>
              <div className="text-xl font-medium">예측 갱신 주기</div>
            </div>
          </div>
        </div>

        {/* 시스템 아키텍처 */}
        <div className="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-10 shadow-xl border border-blue-200">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 flex items-center justify-center gap-3">
            <Layers className="w-10 h-10 text-blue-600" />
            시스템 아키텍처
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
              <div className="font-bold text-xl mb-2 text-gray-900">프레젠테이션 계층</div>
              <p className="text-gray-600">3D 웹 대시보드, 모바일 앱, API 게이트웨이</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600">
              <div className="font-bold text-xl mb-2 text-gray-900">AI 예측 엔진</div>
              <p className="text-gray-600">LSTM + CNN 하이브리드 모델, 실시간 추론 서버</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
              <div className="font-bold text-xl mb-2 text-gray-900">데이터 처리 계층</div>
              <p className="text-gray-600">실시간 스트림 처리, 데이터 융합, 전처리 파이프라인</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-600">
              <div className="font-bold text-xl mb-2 text-gray-900">데이터 수집 계층</div>
              <p className="text-gray-600">레이더, 위성, 지상관측소, 항공기 QAR 데이터</p>
            </div>
          </div>
        </div>

        {/* 기존 시스템 대비 성능 비교 */}
        <div className="mb-16 bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
            📊 기존 시스템 대비 성능 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <th className="p-4 text-left rounded-tl-xl">비교 항목</th>
                  <th className="p-4 text-center">기존 SIGMET</th>
                  <th className="p-4 text-center">해외 시스템</th>
                  <th className="p-4 text-center bg-green-600 rounded-tr-xl">K-TURB</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold">예측 정확도</td>
                  <td className="p-4 text-center">65-70%</td>
                  <td className="p-4 text-center">86%</td>
                  <td className="p-4 text-center font-bold text-green-700">88%+</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-gray-50">
                  <td className="p-4 font-bold">갱신 주기</td>
                  <td className="p-4 text-center">6시간</td>
                  <td className="p-4 text-center">실시간</td>
                  <td className="p-4 text-center font-bold text-green-700">10분</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold">지형 특화</td>
                  <td className="p-4 text-center">일반화</td>
                  <td className="p-4 text-center">일본 특화</td>
                  <td className="p-4 text-center font-bold text-green-700">한국 특화</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-gray-50">
                  <td className="p-4 font-bold">시각화</td>
                  <td className="p-4 text-center">2D 텍스트</td>
                  <td className="p-4 text-center">기본 GUI</td>
                  <td className="p-4 text-center font-bold text-green-700">3D 웹 대시보드</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold">다국어 지원</td>
                  <td className="p-4 text-center">영어</td>
                  <td className="p-4 text-center">일본어, 영어</td>
                  <td className="p-4 text-center font-bold text-green-700">한국어, 영어</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 혁신 포인트 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center gap-3">
            <Rocket className="w-10 h-10 text-orange-600" />
            혁신 포인트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl p-8 shadow-xl hover:scale-105 transition-transform">
              <Activity className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">실시간 처리</h3>
              <p className="text-sm leading-relaxed">기존 6시간 주기 대비 10분 간격으로 36배 향상된 실시간성</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-8 shadow-xl hover:scale-105 transition-transform">
              <Target className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">한국 특화</h3>
              <p className="text-sm leading-relaxed">태백산맥, 한라산 등 한국 고유 지형의 난류 패턴 학습</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-8 shadow-xl hover:scale-105 transition-transform">
              <Brain className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">지속 학습</h3>
              <p className="text-sm leading-relaxed">실제 난류 데이터로 모델이 지속적으로 학습하고 개선</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-8 shadow-xl hover:scale-105 transition-transform">
              <Globe className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">웹 네이티브</h3>
              <p className="text-sm leading-relaxed">별도 설치 없이 웹 브라우저만으로 접근 가능</p>
            </div>
          </div>
        </div>

        {/* 예상 효과 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            📈 예상 효과 분석
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: "항공 안전",
                items: ["난류 관련 사고 30% 감소", "승객 부상률 40% 감소", "조종사 업무 부담 경감"]
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "경제적 효과",
                items: ["연료비 항공편당 5-8% 절감", "우회 비행 횟수 50% 감소", "연간 총 절감액 200억원"]
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "환경 효과",
                items: ["CO2 배출량 연간 15,000톤 감소", "최적 항로 운항으로 환경 보호", "탄소중립 정책 기여"]
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "기술 혁신",
                items: ["세계 3번째 실시간 난류 예측", "한국형 기상 AI 원천기술", "국제 표준화 선도"]
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <div className="text-blue-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 핵심 기술 스택 */}
        <div className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 shadow-xl border border-indigo-200">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            💻 핵심 기술 스택
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-600" />
                AI/ML 엔진
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["TensorFlow", "PyTorch", "LSTM", "CNN", "XGBoost"].map((tech) => (
                  <span key={tech} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">딥러닝 모델 개발과 실시간 추론을 위한 핵심 기술</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Globe className="w-8 h-8 text-blue-600" />
                웹 프론트엔드
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Next.js", "React", "Three.js", "WebGL", "Tailwind"].map((tech) => (
                  <span key={tech} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">3D 시각화와 반응형 웹 인터페이스 구현 기술</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Zap className="w-8 h-8 text-orange-600" />
                백엔드 시스템
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["FastAPI", "Redis", "PostgreSQL", "Kafka", "Docker"].map((tech) => (
                  <span key={tech} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">고성능 실시간 데이터 처리와 API 서비스 제공</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Cloud className="w-8 h-8 text-green-600" />
                클라우드 인프라
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["AWS", "Kubernetes", "Auto Scaling", "CDN"].map((tech) => (
                  <span key={tech} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">확장 가능하고 안정적인 서비스 운영 인프라</p>
            </div>
          </div>
        </div>

        {/* 제작자 정보 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Users className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h2 className="text-4xl font-bold mb-2">제작자 정보</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
          </div>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-300">제작자</div>
                  <div className="text-xl font-bold">박용환</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-300">소속</div>
                  <div className="text-xl font-bold">크리에이티브 넥서스</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-300">연락처</div>
                  <div className="text-xl font-bold">010-7939-3123</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-300">이메일</div>
                  <div className="text-lg font-bold">sanoramyun8@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 text-lg">
              📧 문의사항이 있으시면 언제든지 연락주세요
            </p>
            <p className="text-gray-400 text-sm mt-2">
              © 2025 K-TURB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}