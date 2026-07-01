"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── Stylized DSLR Camera (geometric primitives) ── */
function CameraModel() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.3 + Math.sin(t * 0.3) * 0.1,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * -0.15 + Math.cos(t * 0.25) * 0.05,
      0.05
    );
  });

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D4AF37"),
        metalness: 0.85,
        roughness: 0.15,
      }),
    []
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a2e"),
        metalness: 0.4,
        roughness: 0.5,
      }),
    []
  );

  const lensMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0d0d1a"),
        metalness: 0.7,
        roughness: 0.2,
      }),
    []
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a2a4a"),
        metalness: 0.0,
        roughness: 0.0,
        transmission: 0.6,
        thickness: 0.2,
        ior: 1.5,
      }),
    []
  );

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={group} scale={1.3}>
        {/* Camera body */}
        <mesh material={bodyMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.4, 1.1]} />
        </mesh>

        {/* Viewfinder hump */}
        <mesh material={bodyMaterial} position={[0, 0.85, -0.05]}>
          <boxGeometry args={[0.8, 0.4, 0.7]} />
        </mesh>

        {/* Gold accent stripe */}
        <mesh material={goldMaterial} position={[0, 0.15, 0.56]}>
          <boxGeometry args={[2.02, 0.08, 0.01]} />
        </mesh>

        {/* Lens barrel outer */}
        <mesh material={lensMaterial} position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.55, 0.7, 32]} />
        </mesh>

        {/* Lens barrel inner */}
        <mesh material={lensMaterial} position={[0, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.48, 0.4, 32]} />
        </mesh>

        {/* Lens glass */}
        <mesh material={glassMaterial} position={[0, 0, 1.48]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
        </mesh>

        {/* Gold lens ring */}
        <mesh material={goldMaterial} position={[0, 0, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52, 0.03, 16, 32]} />
        </mesh>

        {/* Shutter button */}
        <mesh material={goldMaterial} position={[0.6, 0.78, 0.2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        </mesh>

        {/* Mode dial */}
        <mesh material={bodyMaterial} position={[-0.55, 0.78, 0.2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
        </mesh>

        {/* Grip */}
        <mesh material={bodyMaterial} position={[1.05, -0.05, 0.1]}>
          <boxGeometry args={[0.25, 1.2, 0.9]} />
        </mesh>
        <mesh material={goldMaterial} position={[1.05, -0.05, 0.56]}>
          <boxGeometry args={[0.26, 1.22, 0.01]} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating Particles ── */
function Particles() {
  const count = 120;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const gold = new THREE.Color("#D4AF37");
    const white = new THREE.Color("#F8FAFC");
    for (let i = 0; i < count; i++) {
      const c = Math.random() > 0.3 ? gold : white;
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Floating Lens Elements ── */
function FloatingLens({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.2 + position[0];
    ref.current.rotation.z = t * 0.15 + position[1];
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

/* ── Main Scene ── */
export function CameraScene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#D4AF37" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#F8FAFC" />
        <spotLight
          position={[0, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#D4AF37"
        />

        <CameraModel />
        <Particles />

        <FloatingLens position={[-3.5, 2, -2]} />
        <FloatingLens position={[4, -2.5, -3]} />
        <FloatingLens position={[-2, -3, -1.5]} />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
