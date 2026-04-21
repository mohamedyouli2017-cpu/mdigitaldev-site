'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GLOBE_R = 1.8;

function ll(lat: number, lng: number, r = GLOBE_R): [number, number, number] {
  const lr  = (lat * Math.PI) / 180;
  const lgr = (lng * Math.PI) / 180;
  return [r * Math.cos(lr) * Math.cos(lgr), r * Math.sin(lr), r * Math.cos(lr) * Math.sin(lgr)];
}

const CONTINENTS: [number, number][][] = [
  [[5,15],[0,20],[5,35],[-5,38],[-15,35],[-25,30],[-30,25],[-20,15],[-10,10],[5,10]],
  [[45,5],[50,10],[55,15],[50,25],[45,28],[40,20],[40,10],[45,5]],
  [[25,55],[30,65],[40,75],[45,90],[35,105],[25,115],[10,105],[5,100],[15,75],[25,55]],
  [[45,-75],[35,-80],[20,-87],[5,-77],[-15,-65],[-25,-55],[-35,-58],[-55,-68]],
  [[-25,130],[-30,135],[-35,138],[-32,148],[-22,148],[-15,130],[-25,130]],
];

// ── Stars ──────────────────────────────────────────────────────────────────
function Stars() {
  const COUNT = 300;
  const ref = useRef<THREE.Points>(null);

  const { geo, data } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const d = Array.from({ length: COUNT }, (_, i) => {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = 1;
      return {
        x, y,
        dx: (Math.random() - 0.5) * 0.0002,
        dy: (Math.random() - 0.5) * 0.0002,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 2,
      };
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    return { geo: g, data: d };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t   = clock.elapsedTime;
    const pos = geo.attributes.position.array as Float32Array;
    const col = geo.attributes.color.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const s = data[i];
      s.x += s.dx; s.y += s.dy;
      if (s.x >  15) s.x = -15; else if (s.x < -15) s.x =  15;
      if (s.y >  15) s.y = -15; else if (s.y < -15) s.y =  15;
      pos[i * 3] = s.x; pos[i * 3 + 1] = s.y;
      const b = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = b;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate    = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.06} sizeAttenuation vertexColors transparent opacity={1} />
    </points>
  );
}

// ── Globe ──────────────────────────────────────────────────────────────────
function Globe({ px, scale }: { px: number; scale: number }) {
  const groupRef  = useRef<THREE.Group>(null);
  const dragging  = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const vel       = useRef({ x: 0, y: 0 });

  // Latitude / longitude wireframe grid
  const gridGeo = useMemo(() => {
    const v: number[] = [];
    const N = 64;
    // 8 latitude rings
    for (const lat of [-70,-50,-30,-10,10,30,50,70]) {
      const lr = (lat * Math.PI) / 180;
      const y  = GLOBE_R * Math.sin(lr);
      const rr = GLOBE_R * Math.cos(lr);
      for (let j = 0; j < N; j++) {
        const a1 = (j / N) * Math.PI * 2, a2 = ((j + 1) / N) * Math.PI * 2;
        v.push(rr * Math.cos(a1), y, rr * Math.sin(a1), rr * Math.cos(a2), y, rr * Math.sin(a2));
      }
    }
    // 12 longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const lgr = (lng * Math.PI) / 180;
      for (let j = 0; j < N; j++) {
        const p1 = ((-90 + (j / N) * 180) * Math.PI) / 180;
        const p2 = ((-90 + ((j + 1) / N) * 180) * Math.PI) / 180;
        v.push(
          GLOBE_R * Math.cos(p1) * Math.cos(lgr), GLOBE_R * Math.sin(p1), GLOBE_R * Math.cos(p1) * Math.sin(lgr),
          GLOBE_R * Math.cos(p2) * Math.cos(lgr), GLOBE_R * Math.sin(p2), GLOBE_R * Math.cos(p2) * Math.sin(lgr),
        );
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    return geo;
  }, []);

  // Continent dots + connection lines
  const { dotGeo, lineGeo } = useMemo(() => {
    const dots: number[] = [], lines: number[] = [];
    for (const cont of CONTINENTS) {
      const pts = cont.map(([lat, lng]) => ll(lat, lng, GLOBE_R + 0.01));
      for (const p of pts) dots.push(...p);
      for (let k = 0; k < Math.ceil(pts.length * 1.5); k++) {
        const a = Math.floor(Math.random() * pts.length);
        const b = Math.floor(Math.random() * pts.length);
        if (a !== b) lines.push(...pts[a], ...pts[b]);
      }
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(dots, 3));
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
    return { dotGeo: dg, lineGeo: lg };
  }, []);

  // Drag rotation
  useEffect(() => {
    const dn = (e: MouseEvent) => { dragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; vel.current = { x: 0, y: 0 }; };
    const mv = (e: MouseEvent) => {
      if (!dragging.current) return;
      vel.current = { x: (e.clientY - lastMouse.current.y) * 0.008, y: (e.clientX - lastMouse.current.x) * 0.008 };
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => { dragging.current = false; };
    const ts = (e: TouchEvent) => { dragging.current = true; lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; vel.current = { x: 0, y: 0 }; };
    const tm = (e: TouchEvent) => {
      if (!dragging.current) return;
      vel.current = { x: (e.touches[0].clientY - lastMouse.current.y) * 0.008, y: (e.touches[0].clientX - lastMouse.current.x) * 0.008 };
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
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
    <group ref={groupRef} position={[px, 0, 0]} scale={scale}>
      {/* Base sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_R, 64, 64]} />
        <meshStandardMaterial color="#020B18" emissive="#003366" emissiveIntensity={0.3} />
      </mesh>

      {/* Lat/lng wireframe */}
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.15} />
      </lineSegments>

      {/* Continent dots */}
      <points geometry={dotGeo}>
        <pointsMaterial color="#00FFFF" size={0.045} sizeAttenuation />
      </points>

      {/* Continent connecting lines */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.3} />
      </lineSegments>

      {/* Atmosphere glow — inner face of slightly larger sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_R + 0.05, 32, 32]} />
        <meshStandardMaterial color="#00AAFF" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ── Scene — positions globe based on actual viewport width ─────────────────
function Scene() {
  const { viewport } = useThree();
  const px    = viewport.width * 0.24;
  const scale = Math.min(1.1, Math.max(0.5, viewport.width * 0.13));

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 3]} intensity={3} color="#00D4FF" />
      <Stars />
      <Globe px={px} scale={scale} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
