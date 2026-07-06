import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TimeCounter = () => {
  const startDate = new Date('2023-01-01T00:00:00');
  
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="flex gap-4 md:gap-8 mt-12 justify-center text-white font-body"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
    >
      {[
        { label: 'Days', value: time.days },
        { label: 'Hours', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Seconds', value: time.seconds }
      ].map((unit, i) => (
        <div key={unit.label} className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,77,136,0.3)] min-w-[80px] md:min-w-[100px]">
          <span className="text-3xl md:text-5xl font-bold">{unit.value.toString().padStart(2, '0')}</span>
          <span className="text-xs md:text-sm text-white/80 uppercase tracking-widest mt-2">{unit.label}</span>
        </div>
      ))}
    </motion.div>
  );
};
