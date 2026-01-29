import { useRef,useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SharpPointsMaterial } from './SharpPointsMaterial';

import * as THREE from 'three';
import type { BodyPartRisk, BodyPart} from '@/types/health';
interface MedicalHumanProps {
  risks: BodyPartRisk[];
  onPartClick: (part: BodyPart, event: any) => void;
}
import { REGION_MAP } from './regionMap';
import { useFrame } from '@react-three/fiber';

export function MedicalHuman(
  { risks, onPartClick, onBoundsReady }:
  MedicalHumanProps & { onBoundsReady?: (box: THREE.Box3) => void }
) {
  const animatedMaterials = useRef<THREE.ShaderMaterial[]>([]);
  const bounds = useRef<THREE.Box3 | null>(null);
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/human.glb');
  
  // Clone and scale the scene immediately
  const scaledScene = useMemo(() => {
    const clonedScene = scene.clone();
    clonedScene.scale.set(9, 9, 9); // Scale at scene level, not primitive level
    return clonedScene;
  }, [scene]);

  useEffect(() => {
    if (!bounds.current) {
      // Calculate bounds on the scaled scene
      bounds.current = new THREE.Box3().setFromObject(scaledScene);
      onBoundsReady?.(bounds.current);
    }

    scaledScene.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;

      const mesh = obj as THREE.Mesh;
      
      let color = '#ffffff';
      let isCritical = false;

    risks.forEach((risk) => {
  const regionMeshes = REGION_MAP[risk.part];
  if (regionMeshes?.includes(mesh.name)) {
    if (risk.level === 'critical') {
      color = '#ff2d2d';
      isCritical = true; // 👈 mark it
    }
    if (risk.level === 'warning') {
      color = '#ffb020';
    }
  }
});


      mesh.geometry = BufferGeometryUtils.mergeVertices(mesh.geometry, 0.025);

      const material = SharpPointsMaterial.clone();
      material.uniforms.color.value = new THREE.Color(color);

if (isCritical) {
  const glowMaterial = SharpPointsMaterial.clone();

  glowMaterial.uniforms.color.value = new THREE.Color('#ff2d2d');
  glowMaterial.uniforms.size.value = 9.0;      // 👈 BIGGER points
  glowMaterial.uniforms.opacity.value = 0.9;   // 👈 stronger
  glowMaterial.uniforms.pulseStrength.value = 1;

  const glowPoints = new THREE.Points(mesh.geometry, glowMaterial);
  mesh.parent?.add(glowPoints);

  animatedMaterials.current.push(glowMaterial);
}



      const points = new THREE.Points(mesh.geometry, material);
      mesh.parent?.add(points);

      mesh.visible = false;

      (points as any).userData.part = Object.keys(REGION_MAP).find(
        part => REGION_MAP[part]?.includes(mesh.name)
      );
    });
  }, [scaledScene, risks]);

  useFrame((_, delta) => {
  animatedMaterials.current.forEach((mat) => {
    mat.uniforms.time.value += delta;
  });
});



  return (
    <primitive
      ref={group}
      object={scaledScene}
      position={[0, 1.1, 0]}
      rotation={[0, -Math.PI / 2, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        const mesh = e.object as any;
        if (mesh.userData.part) {
          onPartClick(mesh.userData.part, e);
        }
      }}
    />
  );
}