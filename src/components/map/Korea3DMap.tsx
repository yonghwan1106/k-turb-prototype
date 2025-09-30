'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Environment } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import { KOREAN_AIRPORTS } from '@/data/airports'
import * as THREE from 'three'

export default function Korea3DMap() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 via-blue-900 to-blue-800 rounded-lg overflow-hidden shadow-xl">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 100, 150]} fov={60} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={80}
          maxDistance={250}
          maxPolarAngle={Math.PI / 2.2}
        />

        {/* 향상된 조명 시스템 */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[50, 100, 50]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-50, 50, -50]} intensity={0.5} color="#4FC3F7" />
        <pointLight position={[0, 50, 0]} intensity={0.5} color="#FFF9C4" />

        {/* 환경광 */}
        <hemisphereLight args={['#87CEEB', '#2E7D32', 0.6]} />

        {/* 배경 별 */}
        <Stars radius={300} depth={50} count={1000} factor={3} fade speed={0.5} />

        <Suspense fallback={null}>
          <KoreaMapMesh />
          <TurbulenceLayer />
          <AirportMarkers />
          <FlightPaths />
        </Suspense>

        {/* 그리드 헬퍼 */}
        <gridHelper args={[300, 30, '#424242', '#212121']} position={[0, -2, 0]} />
      </Canvas>
    </div>
  )
}

// 한반도 지형 메쉬 - 향상된 버전
function KoreaMapMesh() {
  const terrainRef = useRef<THREE.Mesh>(null)

  // 지형 높이 맵 생성
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 160, 60, 80)
    const positions = geo.attributes.position.array as Float32Array

    // 랜덤한 지형 높이 생성 (산맥 시뮬레이션)
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]

      // 노이즈 패턴으로 지형 생성
      const wave1 = Math.sin(x * 0.05) * Math.cos(y * 0.03) * 3
      const wave2 = Math.sin(x * 0.1 + y * 0.1) * 2
      const noise = (Math.random() - 0.5) * 0.5

      positions[i + 2] = wave1 + wave2 + noise
    }

    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <group>
      {/* 한반도 지형 */}
      <mesh
        ref={terrainRef}
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color="#66BB6A"
          roughness={0.8}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 바다 - 애니메이션 효과 */}
      <Ocean />

      {/* 해안선 강조 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <ringGeometry args={[60, 62, 64]} />
        <meshBasicMaterial color="#1976D2" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// 애니메이션 바다
function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2 - 1
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[300, 300, 50, 50]} />
      <meshStandardMaterial
        color="#0277BD"
        roughness={0.3}
        metalness={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// 난류 레이어 - 애니메이션 추가
function TurbulenceLayer() {
  return (
    <group>
      {/* 여러 고도의 난류 영역 */}
      <AnimatedTurbulenceZone position={[10, 20, -10]} color="#F44336" size={18} />
      <AnimatedTurbulenceZone position={[25, 25, 15]} color="#FFC107" size={15} />
      <AnimatedTurbulenceZone position={[-20, 18, 30]} color="#4CAF50" size={20} />
      <AnimatedTurbulenceZone position={[-15, 22, -25]} color="#FFC107" size={12} />
      <AnimatedTurbulenceZone position={[35, 28, -5]} color="#FF5722" size={14} />
    </group>
  )
}

// 애니메이션 난류 구역
function AnimatedTurbulenceZone({
  position,
  color,
  size,
}: {
  position: [number, number, number]
  color: string
  size: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      // 펄스 애니메이션
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
      meshRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[size, size * 0.15, 16, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// 공항 마커 - 향상된 버전
function AirportMarkers() {
  return (
    <group>
      {KOREAN_AIRPORTS.map((airport) => {
        const x = (airport.lon - 127) * 8
        const z = (37.5 - airport.lat) * 8
        const y = 2

        return <AnimatedAirportMarker key={airport.code} position={[x, y, z]} airport={airport} />
      })}
    </group>
  )
}

function AnimatedAirportMarker({
  position,
  airport,
}: {
  position: [number, number, number]
  airport: { code: string; name: string }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const beamRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
    if (beamRef.current && beamRef.current.material && !Array.isArray(beamRef.current.material)) {
      beamRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position}>
      {/* 공항 플랫폼 */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.3, 32]} />
        <meshStandardMaterial color="#37474F" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 회전하는 마커 */}
      <group ref={groupRef}>
        <mesh castShadow>
          <coneGeometry args={[1.5, 3, 6]} />
          <meshStandardMaterial
            color="#2196F3"
            emissive="#2196F3"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 빛 기둥 */}
      <mesh ref={beamRef} position={[0, 20, 0]}>
        <cylinderGeometry args={[0.3, 1, 40, 16]} />
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.3} />
      </mesh>

      {/* 링 이펙트 */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.5, 32]} />
        <meshBasicMaterial color="#00BCD4" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// 항공로 표시
function FlightPaths() {
  const routes = [
    { from: [0, 15, 20], to: [0, 15, -40], color: '#2196F3' },
    { from: [-20, 18, 0], to: [25, 18, 0], color: '#4CAF50' },
    { from: [15, 20, 30], to: [-15, 20, -30], color: '#FF9800' },
  ]

  return (
    <group>
      {routes.map((route, idx) => (
        <FlightPath key={idx} from={route.from} to={route.to} color={route.color} />
      ))}
    </group>
  )
}

function FlightPath({
  from,
  to,
  color,
}: {
  from: number[]
  to: number[]
  color: string
}) {
  const points = []
  points.push(new THREE.Vector3(from[0], from[1], from[2]))

  // 곡선 경로 생성
  const mid = new THREE.Vector3(
    (from[0] + to[0]) / 2,
    Math.max(from[1], to[1]) + 10,
    (from[2] + to[2]) / 2
  )
  points.push(mid)
  points.push(new THREE.Vector3(to[0], to[1], to[2]))

  const curve = new THREE.CatmullRomCurve3(points)
  const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.3, 8, false)

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}