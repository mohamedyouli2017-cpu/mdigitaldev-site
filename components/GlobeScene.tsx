'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const R     = 1.2;   // base sphere radius
const R_DOT = 1.21;  // dots sit just above surface

function ll(lat: number, lng: number, r = R_DOT): [number, number, number] {
  const lr  = (lat * Math.PI) / 180;
  const lgr = (lng * Math.PI) / 180;
  return [r * Math.cos(lr) * Math.cos(lgr), r * Math.sin(lr), r * Math.cos(lr) * Math.sin(lgr)];
}

const REGIONS = [
  { lat: [-35,  37], lng: [ 10,   51], n: 400 }, // Africa
  { lat: [ 36,  71], lng: [-10,   40], n: 200 }, // Europe
  { lat: [  0,  70], lng: [ 25,  145], n: 600 }, // Asia
  { lat: [ 15,  72], lng: [-168, -52], n: 400 }, // North America
  { lat: [-56,  13], lng: [-82,  -34], n: 300 }, // South America
  { lat: [-39, -10], lng: [112,  154], n: 150 }, // Australia
  { lat: [-90, -70], lng: [-180, 180], n: 100 }, // Antarctica
];

function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastPos  = useRef({ x: 0, y: 0 });
  const vel      = useRef({ x: 0, y: 0 });

  // ── lat/lng wireframe grid ────────────────────────────────────────────────
  const gridGeo = useMemo(() => {
    const v: number[] = [];
    const N = 64;

    // 9 latitude rings: -80 to 80, step 20
    for (let lat = -80; lat <= 80; lat += 20) {
      const lr = (lat * Math.PI) / 180;
      const y  = R * Math.sin(lr);
      const rr = R * Math.cos(lr);
      for (let j = 0; j < N; j++) {
        const a1 = (j / N) * Math.PI * 2, a2 = ((j + 1) / N) * Math.PI * 2;
        v.push(rr * Math.cos(a1), y, rr * Math.sin(a1), rr * Math.cos(a2), y, rr * Math.sin(a2));
      }
    }

    // 12 longitude lines: 0 to 360, step 30
    for (let lng = 0; lng < 360; lng += 30) {
      const lgr = (lng * Math.PI) / 180;
      for (let j = 0; j < N; j++) {
        const p1 = ((-90 + (j / N) * 180) * Math.PI) / 180;
        const p2 = ((-90 + ((j + 1) / N) * 180) * Math.PI) / 180;
        v.push(
          R * Math.cos(p1) * Math.cos(lgr), R * Math.sin(p1), R * Math.cos(p1) * Math.sin(lgr),
          R * Math.cos(p2) * Math.cos(lgr), R * Math.sin(p2), R * Math.cos(p2) * Math.sin(lgr),
        );
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    return geo;
  }, []);

  // ── continent dots ────────────────────────────────────────────────────────
  const dotGeo = useMemo(() => {
    const positions: number[] = [];
    for (const { lat, lng, n } of REGIONS) {
      for (let i = 0; i < n; i++) {
        const la = lat[0] + Math.random() * (lat[1] - lat[0]);
        const lg = lng[0] + Math.random() * (lng[1] - lng[0]);
        positions.push(...ll(la, lg));
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  // ── drag / touch handlers ─────────────────────────────────────────────────
  useEffect(() => {
    const dn = (e: MouseEvent) => { dragging.current = true; lastPos.current = { x: e.clientX, y: e.clientY }; vel.current = { x: 0, y: 0 }; };
    const mv = (e: MouseEvent) => {
      if (!dragging.current) return;
      vel.current = { x: (e.clientY - lastPos.current.y) * 0.008, y: (e.clientX - lastPos.current.x) * 0.008 };
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => { dragging.current = false; };
    const ts = (e: TouchEvent) => { dragging.current = true; lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; vel.current = { x: 0, y: 0 }; };
    const tm = (e: TouchEvent) => {
      if (!dragging.current) return;
      vel.current = { x: (e.touches[0].clientY - lastPos.current.y) * 0.008, y: (e.touches[0].clientX - lastPos.current.x) * 0.008 };
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const te = () => { dragging.current = false; };

    window.addEventListener('mousedown', dn); window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up);
    window.addEventListener('touchstart', ts, { passive: true }); window.addEventListener('touchmove', tm, { passive: true }); window.addEventListener('touchend', te);
    return () => {
      window.removeEventListener('mousedown', dn); window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up);
      window.removeEventListener('touchstart', ts); window.removeEventListener('touchmove', tm); window.removeEventListener('touchend', te);
    };
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    if (dragging.current) {
      g.rotation.y += vel.current.y;
      g.rotation.x += vel.current.x;
    } else {
      const s = Math.abs(vel.current.x) + Math.abs(vel.current.y);
      if (s > 0.0003) {
        g.rotation.y += vel.current.y; g.rotation.x += vel.current.x;
        vel.current.x *= 0.95; vel.current.y *= 0.95;
      } else {
        g.rotation.y += 0.003;
        vel.current = { x: 0, y: 0 };
      }
    }
    g.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, g.rotation.x));
  });

  return (
    <group ref={groupRef}>
      {/* Base sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial color="#001133" emissive="#0044AA" emissiveIntensity={0.4} transparent opacity={0.9} />
      </mesh>

      {/* Lat/lng wireframe */}
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#00AAFF" transparent opacity={0.4} />
      </lineSegments>

      {/* Continent dots */}
      <points geometry={dotGeo}>
        <pointsMaterial color="#00DDFF" size={0.022} sizeAttenuation transparent opacity={0.9} />
      </points>

      {/* Atmosphere — 3 layers */}
      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshStandardMaterial color="#0088FF" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshStandardMaterial color="#0044FF" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#0022AA" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 2, 4]}   intensity={4} color="#00AAFF" />
      <pointLight position={[-3, -1, -2]} intensity={2} color="#0044FF" />
      <pointLight position={[0, 3, 0]}   intensity={1} color="#ffffff" />
      <Suspense fallback={null}>
        <GlobeGroup />
      </Suspense>
    </Canvas>
  );
}
