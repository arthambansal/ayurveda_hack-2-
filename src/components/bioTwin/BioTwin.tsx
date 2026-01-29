import { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MedicalHuman } from './MedicalHuman';
import { BioTwin2D } from './BioTwin2D';
import type { BodyPartRisk, BodyPart } from '@/types/health';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
import { Box, Layers } from 'lucide-react';

interface BioTwinProps {
  risks: BodyPartRisk[];
}

export function BioTwin({ risks }: BioTwinProps) {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [modelBounds, setModelBounds] = useState<THREE.Box3 | null>(null);
  const [activePart, setActivePart] = useState<BodyPart | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!activePart || !cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const CAMERA_TARGETS: Record<BodyPart, THREE.Vector3> = {
      head: new THREE.Vector3(0, 1.8, 2.2),
      chest: new THREE.Vector3(0, 1.4, 2.6),
      stomach: new THREE.Vector3(0, 1.0, 2.8),
      joints: new THREE.Vector3(0.6, 1.1, 3.0),
    };

    const targetPos = CAMERA_TARGETS[activePart];
    camera.position.lerp(targetPos, 0.18);
    controls.target.lerp(new THREE.Vector3(0, targetPos.y, 0), 0.18);
    controls.update();
  }, [activePart]);

  useEffect(() => {
    if (!modelBounds || !cameraRef.current) return;

    const camera = cameraRef.current;
    const size = modelBounds.getSize(new THREE.Vector3());
    const center = modelBounds.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const framePadding = 1.5;
    const distance = (maxDim * framePadding) / (2 * Math.tan((camera.fov * Math.PI) / 360));

    camera.position.set(center.x, center.y, distance);
    const lookAtY = center.y;
    camera.lookAt(center.x, lookAtY, 0);
    camera.near = Math.max(0.1, distance / 50);
    camera.far = Math.min(1000, distance * 50);
    camera.updateProjectionMatrix();
  }, [modelBounds]);

  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && canvasContainerRef.current) {
        cameraRef.current.aspect = canvasContainerRef.current.clientWidth / canvasContainerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If 2D mode, render the 2D component
  if (viewMode === '2d') {
    return (
      <div className="relative w-full h-full flex flex-col">
        {/* View Toggle */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setViewMode('3d')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === '3d' 
                ? 'bg-primary text-background shadow-[0_0_15px_hsla(var(--primary)/0.5)]' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
            title="3D View"
          >
            <Box size={18} />
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === '2d' 
                ? 'bg-primary text-background shadow-[0_0_15px_hsla(var(--primary)/0.5)]' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
            title="2D View"
          >
            <Layers size={18} />
          </button>
        </div>
        <BioTwin2D risks={risks} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col glass-panel overflow-hidden">
      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => setViewMode('3d')}
          className={`p-2 rounded-lg transition-all ${
            viewMode === '3d' 
              ? 'bg-primary text-background shadow-[0_0_15px_hsla(var(--primary)/0.5)]' 
              : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
          }`}
          title="3D View"
        >
          <Box size={18} />
        </button>
        <button
          onClick={() => setViewMode('2d')}
          className={`p-2 rounded-lg transition-all ${
            viewMode === '2d' 
              ? 'bg-primary text-background shadow-[0_0_15px_hsla(var(--primary)/0.5)]' 
              : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
          }`}
          title="2D View"
        >
          <Layers size={18} />
        </button>
      </div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
          <span className="section-title">Bio-Twin Visualization</span>
        </div>
      </div>
      
      {/* Main 3D View */}
      <div 
        ref={canvasContainerRef}
        className="relative flex-1 min-h-[500px] w-full"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full max-h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsla(147, 50%, 55%, 0.1) 0%, transparent 60%)',
            }}
          />
        </div>
        
        {/* 3D Canvas Container */}
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-xs uppercase tracking-widest animate-pulse font-mono">
                Initializing Bio-Twin...
              </div>
            </div>
          }>
            <Canvas
              className="w-full h-full"
              camera={{
                fov: 50,
                position: [0, 1.5, 4],
                near: 0.1,
                far: 1000,
              }}
              dpr={[1, 2]}
              frameloop="always"
              onCreated={({ camera, gl, size }) => {
                const perspectiveCamera = camera as THREE.PerspectiveCamera;
                cameraRef.current = perspectiveCamera;
                
                if (camera instanceof THREE.PerspectiveCamera) {
                  perspectiveCamera.aspect = size.width / size.height;
                  const aspect = size.width / size.height;
                  if (aspect < 1) {
                    perspectiveCamera.position.y = 2.0;
                    perspectiveCamera.position.z = 3.5;
                  }
                  perspectiveCamera.updateProjectionMatrix();
                }
                gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
              }}
            >
              <fog attach="fog" args={['#0a0f0d', 2, 10]} />
              <ambientLight intensity={0.6} color="#50C878" />
              <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
              <pointLight position={[-3, 2, 2]} intensity={0.4} color="#50C878" />
              
              <MedicalHuman
                risks={risks}
                onPartClick={(part) => setActivePart(part)}
                onBoundsReady={(box) => setModelBounds(box)}
              />
              
              <OrbitControls
                ref={controlsRef}
                target={[0, 1, 0]}
                enableRotate={true}
                enablePan={false}
                enableZoom={true}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                minDistance={2}
                maxDistance={10}
                enableDamping={true}
                dampingFactor={0.1}
                rotateSpeed={0.8}
                zoomSpeed={0.8}
              />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>

      {/* Status Bar */}
      <motion.div 
        className="py-4 px-6 border-t border-primary/10 bg-background/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1 font-mono">
            Bio-Twin Status
          </div>
          <div className={`text-sm font-display font-bold tracking-wider ${
            risks.some(r => r.level === 'critical') 
              ? 'neon-text-red' 
              : risks.some(r => r.level === 'warning')
                ? 'neon-text-orange'
                : 'neon-text-emerald'
          }`}>
            {risks.some(r => r.level === 'critical') 
              ? '⚠ CRITICAL IMBALANCE DETECTED'
              : risks.some(r => r.level === 'warning')
                ? '⚡ WARNING: ELEVATED RISK'
                : '✓ SYSTEMS NOMINAL'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}