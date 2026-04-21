'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const R      = 1.2;
const R_GRID = 1.204; // tiny offset above sphere to prevent Z-fighting

// ── Canvas-generated holographic Earth texture ─────────────────────────────
function generateEarthTexture(): HTMLCanvasElement {
  const W = 1024, H = 512;
  const el  = document.createElement('canvas');
  el.width  = W;
  el.height = H;
  const ctx = el.getContext('2d')!;

  // helpers
  const px = (lng: number) => ((lng + 180) / 360) * W;
  const py = (lat: number) => ((90  - lat) / 180) * H;

  const fill = (pts: [number, number][]) => {
    ctx.beginPath();
    ctx.moveTo(px(pts[0][0]), py(pts[0][1]));
    for (let i = 1; i < pts.length; i++) ctx.lineTo(px(pts[i][0]), py(pts[i][1]));
    ctx.closePath();
    // outer glow pass
    ctx.save();
    ctx.shadowBlur  = 22;
    ctx.shadowColor = '#00FFFF';
    ctx.fillStyle   = 'rgba(0,204,255,0.35)';
    ctx.fill();
    ctx.restore();
    // solid fill pass
    ctx.save();
    ctx.shadowBlur  = 8;
    ctx.shadowColor = '#00FFFF';
    ctx.fillStyle   = 'rgba(0,200,255,0.72)';
    ctx.fill();
    ctx.restore();
  };

  // ── background ────────────────────────────────────────────────────────────
  ctx.fillStyle = '#000B1A';
  ctx.fillRect(0, 0, W, H);

  // ── continents ───────────────────────────────────────────────────────────
  // Africa
  fill([[15,-35],[50,-35],[52,12],[44,12],[42,18],[37,37],[10,37],[10,5],[-5,5],[-17,-11]]);
  // Europe
  fill([[-8,36],[40,36],[40,58],[28,58],[28,46],[5,58],[19,70],[28,71],[-10,58]]);
  // Asia
  fill([[26,37],[145,37],[145,70],[28,71]]);
  // North America
  fill([[-168,70],[-52,70],[-52,45],[-65,45],[-80,25],[-87,15],[-77,8],[-60,8],[-77,25]]);
  // South America
  fill([[-82,12],[-72,12],[-60,8],[-77,8],[-80,-12],[-68,-55],[-35,-57],[-34,-5]]);
  // Australia
  fill([[114,-17],[154,-17],[154,-38],[138,-38],[130,-17]]);
  // Greenland
  fill([[-50,76],[-18,76],[-18,83],[-50,83]]);

  // ── lat / lng grid ────────────────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(0,170,255,0.35)';
  ctx.lineWidth   = 0.7;
  for (let lat = -80; lat <= 80; lat += 20) {
    ctx.beginPath(); ctx.moveTo(0, py(lat)); ctx.lineTo(W, py(lat)); ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    ctx.beginPath(); ctx.moveTo(px(lng), 0); ctx.lineTo(px(lng), H); ctx.stroke();
  }

  return el;
}

// ── Globe group ─────────────────────────────────────────────────────────────
function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastPos  = useRef({ x: 0, y: 0 });
  const vel      = useRef({ x: 0, y: 0 });

  // Canvas-generated texture (client-only, runs after mount)
  const earthTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(generateEarthTexture());
    tex.needsUpdate = true;
    return tex;
  }, []);

  // 3D grid overlay
  const gridGeo = useMemo(() => {
    const v: number[] = [];
    const N = 64;
    for (let lat = -80; lat <= 80; lat += 20) {
      const lr = (lat * Math.PI) / 180;
      const y  = R_GRID * Math.sin(lr);
      const rr = R_GRID * Math.cos(lr);
      for (let j = 0; j < N; j++) {
        const a1 = (j / N) * Math.PI * 2, a2 = ((j + 1) / N) * Math.PI * 2;
        v.push(rr * Math.cos(a1), y, rr * Math.sin(a1), rr * Math.cos(a2), y, rr * Math.sin(a2));
      }
    }
    for (let lng = 0; lng < 360; lng += 30) {
      const lgr = (lng * Math.PI) / 180;
      for (let j = 0; j < N; j++) {
        const p1 = ((-90 + (j       / N) * 180) * Math.PI) / 180;
        const p2 = ((-90 + ((j + 1) / N) * 180) * Math.PI) / 180;
        v.push(
          R_GRID * Math.cos(p1) * Math.cos(lgr), R_GRID * Math.sin(p1), R_GRID * Math.cos(p1) * Math.sin(lgr),
          R_GRID * Math.cos(p2) * Math.cos(lgr), R_GRID * Math.sin(p2), R_GRID * Math.cos(p2) * Math.sin(lgr),
        );
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    return geo;
  }, []);

  // Drag + touch handlers
  useEffect(() => {
    const dn = (e: MouseEvent) => { dragging.current = true;  lastPos.current = { x: e.clientX, y: e.clientY };              vel.current = { x: 0, y: 0 }; };
    const mv = (e: MouseEvent) => { if (!dragging.current) return; vel.current = { x: (e.clientY - lastPos.current.y) * 0.008, y: (e.clientX - lastPos.current.x) * 0.008 }; lastPos.current = { x: e.clientX, y: e.clientY }; };
    const up = () => { dragging.current = false; };
    const ts = (e: TouchEvent) => { dragging.current = true;  lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; vel.current = { x: 0, y: 0 }; };
    const tm = (e: TouchEvent) => { if (!dragging.current) return; vel.current = { x: (e.touches[0].clientY - lastPos.current.y) * 0.008, y: (e.touches[0].clientX - lastPos.current.x) * 0.008 }; lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
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
      g.rotation.y += vel.current.y; g.rotation.x += vel.current.x;
    } else {
      const s = Math.abs(vel.current.x) + Math.abs(vel.current.y);
      if (s > 0.0003) {
        g.rotation.y += vel.current.y; g.rotation.x += vel.current.x;
        vel.current.x *= 0.95; vel.current.y *= 0.95;
      } else {
        g.rotation.y += 0.003; vel.current = { x: 0, y: 0 };
      }
    }
    g.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, g.rotation.x));
  });

  return (
    <group ref={groupRef}>
      {/* Textured base sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          emissive="#001A4D"
          emissiveIntensity={0.4}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* 3D grid overlay — sits 0.004 above surface */}
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#00CCFF" transparent opacity={0.55} />
      </lineSegments>

      {/* Atmosphere — 3 layers */}
      <mesh>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshStandardMaterial color="#00AAFF" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#0066FF" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial color="#0033FF" transparent opacity={0.04} side={THREE.BackSide} />
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
      <pointLight position={[2, 1, 3]}   intensity={6} color="#00CCFF" />
      <pointLight position={[-2, 0, -2]} intensity={3} color="#00FFFF" />
      <Suspense fallback={null}>
        <GlobeGroup />
      </Suspense>
    </Canvas>
  );
}
