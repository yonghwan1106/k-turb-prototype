import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { departure, arrival, language = 'ko' } = await req.json()

    if (!departure || !arrival) {
      return NextResponse.json(
        { error: 'departure and arrival are required' },
        { status: 400 }
      )
    }

    // 현재 날짜/시간 정보 (KST)
    const now = new Date()
    const kstDate = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(now)

    const prompt =
      language === 'ko'
        ? `당신은 전문 항공기상 브리퍼입니다. ${departure}에서 ${arrival}로 가는 항로의 기상 브리핑을 작성해주세요.

**현재 시간: ${kstDate} (KST)**

다음 내용을 포함해주세요:
1. 현재 기상 상황 요약
2. 주요 난류 예상 구간 (위도/경도, 고도)
3. 난류 강도 및 위험도 평가
4. 조종사 권고사항
5. 대체 경로 제안 (필요시)

전문적이면서도 이해하기 쉽게 작성해주세요. 실제 기상 브리핑처럼 구체적인 수치와 함께 작성해주세요.
브리핑 발행시간은 반드시 ${kstDate}를 사용하세요.`
        : `You are a professional aviation meteorologist. Please provide a weather briefing for the route from ${departure} to ${arrival}.

**Current time: ${kstDate} (KST)**

Include:
1. Current weather summary
2. Expected turbulence areas (lat/lon, altitude)
3. Turbulence intensity assessment
4. Pilot recommendations
5. Alternative routes (if needed)

Write professionally with specific numbers and details.
Use ${kstDate} as the briefing issue time.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const briefingText = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ briefing: briefingText })
  } catch (error) {
    console.error('Briefing API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate briefing' },
      { status: 500 }
    )
  }
}