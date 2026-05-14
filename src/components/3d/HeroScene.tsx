'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnot({ mousePos }: { mousePos: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1 + mousePos.current[1] * 0.3;
    meshRef.current.rotation.y = t * 0.15 + mousePos.current[0] * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
      <MeshDistortMaterial
        color="#06b6d4"
        emissive="#0a4f5a"
        metalness={0.8}
        roughness={0.1}
        distort={0.3}
        speed={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function FloatingSpheres() {
  const positions: [number, number, number][] = [
    [-3.5, 1.5, -2],
    [3.5, -1.5, -1.5],
    [-2.5, -2, -1],
    [3, 2, -2.5],
    [-4, -0.5, -3],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={pos}>
            <sphereGeometry args={[0.18 + i * 0.04, 32, 32]} />
            <MeshDistortMaterial
              color={i % 2 === 0 ? '#a855f7' : '#06b6d4'}
              emissive={i % 2 === 0 ? '#3b0764' : '#0a4f5a'}
              metalness={0.9}
              roughness={0.05}
              distort={0.4}
              speed={3}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function SceneCamera() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.z = 5;
  });
  return null;
}

export default function HeroScene() {
  const mousePos = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = -(e.clientY / window.innerHeight - 0.5) * 2;
    mousePos.current = [x, y];
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneCamera />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#06b6d4" intensity={2} />
        <pointLight position={[-5, -5, 3]} color="#a855f7" intensity={1.5} />
        <TorusKnot mousePos={mousePos} />
        <FloatingSpheres />
        <ParticleField />
        <Sparkles
          count={80}
          scale={12}
          size={1.5}
          speed={0.3}
          color="#22d3ee"
          opacity={0.5}
        />
      </Canvas>
    </div>
  );
}
