import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 16 + Math.random() * 24
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%]"
          style={{ left: heart.left }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ 
            y: '-120vh', 
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.8],
            x: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay,
            ease: "linear"
          }}
        >
          <Heart size={heart.size} fill="#ff4d88" className="text-primary/50" />
        </motion.div>
      ))}
    </div>
  );
};
