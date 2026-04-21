'use client';

import { Component, useRef, useMemo, useEffect, Suspense, type ReactNode } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.5;
const EARTH_URL = 'https://unpkg.com/three-globe/example/img/earth-night.jpg';

// ── Error boundary so a failed texture load shows the fallback ──────────────
class Catch extends Component<
  { fallback: ReactNode; children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

// ── Fallback: dark sphere + cyan dots + faint connecting lines ───────────────
function FallbackGlobe() {
  const dotGeo = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const phi   = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      pos[i * 3]     = RADIUS * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = RADIUS * Math.cos(phi);
      pos[i * 3 + 2] = RADIUS * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const lineGeo = useMemo(() => {
    const attr = dotGeo.getAttribute('position') as THREE.BufferAttribute;
    const verts: number[] = [];
    for (let i = 0; i < 80; i++) {
      const a = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      verts.push(attr.getX(a), attr.getY(a), attr.getZ(a));
      verts.push(attr.getX(b), attr.getY(b), attr.getZ(b));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [dotGeo]);

  return (
    <>
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshStandardMaterial color="#001122" emissive="#001a33" emissiveIntensity={0.8} />
      </mesh>
      <points geometry={dotGeo}>
        <pointsMaterial color="#00D4FF" size={0.04} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

// ── Textured globe — suspends until texture is ready ────────────────────────
function GlobeWithTexture() {
  const texture = useLoader(THREE.TextureLoader, EARTH_URL);
  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial map={texture} emissive="#112244" emissiveIntensity={0.08} />
    </mesh>
  );
}

// ── Drag rotation wrapper ────────────────────────────────────────────────────
function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      velocity.current = { x: dy * 0.008, y: dx * 0.008 };
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { isDragging.current = false; };

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      velocity.current = { x: 0, y: 0 };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - lastPos.current.x;
      const dy = e.touches[0].clientY - lastPos.current.y;
      velocity.current = { x: dy * 0.008, y: dx * 0.008 };
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDragging.current = false; };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    if (isDragging.current) {
      g.rotation.y += velocity.current.y;
      g.rotation.x += velocity.current.x;
    } else {
      const speed = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
      if (speed > 0.0003) {
        g.rotation.y += velocity.current.y;
        g.rotation.x += velocity.current.x;
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;
      } else {
        g.rotation.y += 0.003;
        velocity.current = { x: 0, y: 0 };
      }
    }
    g.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, g.rotation.x));
  });

  return (
    <group ref={groupRef}>
      <Catch fallback={<FallbackGlobe />}>
        <Suspense fallback={<FallbackGlobe />}>
          <GlobeWithTexture />
        </Suspense>
      </Catch>
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 3]} intensity={3} color="#00D4FF" />
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  );
}
