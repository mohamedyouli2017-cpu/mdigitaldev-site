'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.5;

// lat/lng → XYZ so Europe/Africa face the camera (lng=0 → +Z)
function ll2xyz(lat: number, lng: number, r = RADIUS): [number, number, number] {
  const lr = (lat * Math.PI) / 180;
  const lgr = (lng * Math.PI) / 180;
  return [
    r * Math.cos(lr) * Math.sin(lgr),
    r * Math.sin(lr),
    r * Math.cos(lr) * Math.cos(lgr),
  ];
}

const CONTINENTS: [number, number][][] = [
  // Africa
  [[37,10],[37,37],[11,42],[12,51],[-12,51],[-26,33],[-35,19],[-35,-17],[-17,-11],[5,-8],[5,2],[4,9],[15,15],[30,32],[37,10]],
  // Europe
  [[71,28],[70,19],[58,5],[44,-8],[36,-5],[36,28],[46,30],[58,28],[71,28]],
  // North America
  [[70,-140],[70,-60],[45,-52],[25,-80],[15,-85],[8,-77],[8,-60],[25,-77],[45,-65],[70,-60]],
  // South America
  [[12,-72],[8,-60],[0,-50],[-10,-37],[-35,-57],[-55,-68],[-55,-45],[-20,-40],[-5,-35],[12,-72]],
  // Asia
  [[70,28],[70,140],[50,140],[30,120],[22,114],[1,104],[10,77],[28,77],[28,57],[37,37],[71,28]],
  // Australia
  [[-17,122],[-22,114],[-35,117],[-38,146],[-22,150],[-12,136],[-17,122]],
];

// Major cities [lat, lng]
const CITIES: [number, number][] = [
  [51.5, -0.1],   // London
  [40.7, -74.0],  // New York
  [35.7, 139.7],  // Tokyo
  [39.9, 116.4],  // Beijing
  [19.1, 72.9],   // Mumbai
  [-23.5, -46.6], // São Paulo
  [30.1, 31.2],   // Cairo
  [-33.9, 151.2], // Sydney
  [55.8, 37.6],   // Moscow
  [6.5, 3.4],     // Lagos
  [25.2, 55.3],   // Dubai
  [1.3, 103.8],   // Singapore
];

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // One shared material for all continent lines
  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#00D4FF', transparent: true, opacity: 0.8 }),
    [],
  );

  const continentLines = useMemo(
    () =>
      CONTINENTS.map((pts) => {
        const verts = pts.flatMap(([lat, lng]) => ll2xyz(lat, lng));
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        return new THREE.Line(geo, lineMat);
      }),
    [lineMat],
  );

  const cityPositions = useMemo(
    () => CITIES.map(([lat, lng]) => ll2xyz(lat, lng, RADIUS + 0.025)),
    [],
  );

  // Mouse + touch drag handlers
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
        // Inertia — decelerates after release
        g.rotation.y += velocity.current.y;
        g.rotation.x += velocity.current.x;
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;
      } else {
        // Auto-rotate once inertia is spent
        g.rotation.y += 0.003;
        velocity.current = { x: 0, y: 0 };
      }
    }
    // Clamp tilt so globe stays readable
    g.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, g.rotation.x));
  });

  return (
    <group ref={groupRef}>
      {/* Dark navy base */}
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshStandardMaterial color="#0a1628" emissive="#00D4FF" emissiveIntensity={0.15} />
      </mesh>

      {/* Continent outlines */}
      {continentLines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      {/* City dots */}
      {cityPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#ffffff' : '#00D4FF'} />
        </mesh>
      ))}
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
