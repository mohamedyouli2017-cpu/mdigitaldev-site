'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';

const COUNTRIES_URL =
  'https://cdn.jsdelivr.net/gh/vasturiano/react-globe.gl@master/example/datasets/ne_110m_admin_0_countries.geojson';

type Arc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
};

const CITIES: Array<[number, number]> = [
  [40.7128, -74.006],    // NYC
  [51.5074, -0.1278],    // London
  [35.6762, 139.6503],   // Tokyo
  [25.2048, 55.2708],    // Dubai
  [-33.8688, 151.2093],  // Sydney
  [33.5731, -7.5898],    // Casablanca
  [-23.5505, -46.6333],  // São Paulo
  [1.3521, 103.8198],    // Singapore
  [19.076, 72.8777],     // Mumbai
  [34.0522, -118.2437],  // LA
  [48.8566, 2.3522],     // Paris
  [55.7558, 37.6173],    // Moscow
];

function buildArcs(): Arc[] {
  const arcs: Arc[] = [];
  for (let i = 0; i < 18; i++) {
    const a = CITIES[Math.floor(Math.random() * CITIES.length)];
    let b = CITIES[Math.floor(Math.random() * CITIES.length)];
    while (b === a) b = CITIES[Math.floor(Math.random() * CITIES.length)];
    arcs.push({
      startLat: a[0],
      startLng: a[1],
      endLat: b[0],
      endLng: b[1],
      color: ['#00FFFF', '#0088FF'],
    });
  }
  return arcs;
}

function GlobeObject({ countries }: { countries: { features: object[] } }) {
  const arcs = useMemo(buildArcs, []);

  const globe = useMemo(() => {
    const g = new ThreeGlobe({ animateIn: true })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => '#00E5FF')
      .showAtmosphere(true)
      .atmosphereColor('#00CCFF')
      .atmosphereAltitude(0.25)
      .arcsData(arcs)
      .arcColor((d: object) => (d as Arc).color)
      .arcDashLength(0.45)
      .arcDashGap(3)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(2200)
      .arcStroke(0.45)
      .arcAltitudeAutoScale(0.45)
      .pointsData(CITIES.map(([lat, lng]) => ({ lat, lng })))
      .pointColor(() => '#00FFFF')
      .pointAltitude(0.01)
      .pointRadius(0.35);

    const mat = g.globeMaterial() as THREE.MeshPhongMaterial;
    mat.color = new THREE.Color('#050B1F');
    mat.emissive = new THREE.Color('#0A1A3D');
    mat.emissiveIntensity = 0.35;
    mat.shininess = 0.8;
    mat.transparent = true;
    mat.opacity = 0.95;

    return g;
  }, [countries, arcs]);

  useFrame((_, delta) => {
    globe.rotation.y += delta * 0.12;
  });

  return <primitive object={globe} />;
}

export default function GlobeScene() {
  const [countries, setCountries] = useState<{ features: object[] }>({ features: [] });

  useEffect(() => {
    let cancelled = false;
    fetch(COUNTRIES_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setCountries(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 300], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[1, 1, 1]} intensity={0.9} color="#ffffff" />
      <pointLight position={[200, 120, 150]} intensity={1.6} color="#00CCFF" />
      <pointLight position={[-200, -120, -150]} intensity={0.9} color="#0066FF" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
          <GlobeObject countries={countries} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
