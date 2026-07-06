import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveMeter = () => {
  const [percent, setPercent] = useState(0);
  const [isInfinity, setIsInfinity] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !isInfinity) {
      const interval = setInterval(() => {
        setPercent(prev => {
          if (prev >= 99) {
            clearInterval(interval);
            setTimeout(() => {
              setIsInfinity(true);
              confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d88', '#ffffff', '#ff99bb']
              });
            }, 1000);
            return 99;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView, isInfinity]);

  return (
    <section ref={ref} className="py-32 w-full flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-3xl md:text-5xl font-heading text-secondary mb-12 text-center px-4">Measuring My Love For You</h2>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-white/10"
          animate={{ scale: isInfinity ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 2, repeat: isInfinity ? Infinity : 0 }}
        />
        
        <svg className="w-full h-full transform -rotate-90 absolute inset-0">
          <circle 
            cx="128" cy="128" r="120" 
            className="stroke-primary" 
            strokeWidth="8" fill="none" 
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={isInfinity ? 0 : 2 * Math.PI * 120 * (1 - percent / 100)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Heart className={`w-12 h-12 text-primary mb-2 ${isInfinity ? 'animate-ping' : ''}`} fill="#ff4d88" />
          <span className="text-5xl font-bold font-body">
            {isInfinity ? '∞' : `${percent}%`}
          </span>
        </div>
      </div>
      
      {isInfinity && (
        <motion.p 
          className="mt-8 text-xl font-quotes text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Love like this cannot be measured.
        </motion.p>
      )}
    </section>
  );
};
