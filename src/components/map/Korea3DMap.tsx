'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { KOREAN_AIRPORTS } from '@/data/airports'
import * as THREE from 'three'

export default function Korea3DMap() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg overflow-hidden shadow-xl">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 80, 120]} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={50}
          maxDistance={200}
          maxPolarAngle={Math.PI / 2}
        />

        {/* 조명 */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 5, -5]} intensity={0.3} />

        <Suspense fallback={null}>
          <KoreaMapMesh />
          <TurbulenceLayer />
          <AirportMarkers />
        </Suspense>
      </Canvas>
    </div>
  )
}

// 한반도 지형 메쉬
function KoreaMapMesh() {
  return (
    <group>
      {/* 기본 지형 평면 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 150, 30, 40]} />
        <meshStandardMaterial
          color="#A5D6A7"
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 바다 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#81D4FA" opacity={0.6} transparent />
      </mesh>
    </group>
  )
}

// 난류 레이어
function TurbulenceLayer() {
  return (
    <group>
      {/* 여러 고도의 난류 영역 시뮬레이션 */}
      {[15, 20, 25].map((height, idx) => (
        <mesh key={idx} position={[10, height, -10]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[15, 32]} />
          <meshStandardMaterial
            color={idx === 0 ? '#F44336' : idx === 1 ? '#FFC107' : '#4CAF50'}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* 추가 난류 영역 */}
      <mesh position={[-20, 18, 30]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial
          color="#FFC107"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// 공항 마커
function AirportMarkers() {
  return (
    <group>
      {KOREAN_AIRPORTS.map((airport) => {
        // 위경도를 3D 좌표로 변환 (간단한 변환)
        const x = (airport.lon - 127) * 8
        const z = (37.5 - airport.lat) * 8
        const y = 1

        return (
          <group key={airport.code} position={[x, y, z]}>
            {/* 마커 구체 */}
            <mesh>
              <sphereGeometry args={[1.5, 16, 16]} />
              <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.3} />
            </mesh>

            {/* 마커 기둥 */}
            <mesh position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
              <meshStandardMaterial color="#1976D2" />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}