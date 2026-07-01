import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';

export const CanvasLayer = () => {

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff4d88" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffd700" />
        
        {/* Layer 1: Background Universe (Always present but opacity can change) */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        
        {/* Layer 2: Floating Particles */}
        <Float speed={1} rotationIntensity={1} floatIntensity={2}>
          <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.3} color="#ffccd9" />
        </Float>
      </Canvas>
    </div>
  );
};
