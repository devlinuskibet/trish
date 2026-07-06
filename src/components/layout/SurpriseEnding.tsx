import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getImages } from '../../utils/images';

export const SurpriseEnding = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      const runEnding = async () => {
        await new Promise(r => setTimeout(r, 2000));
        setStep(1); // Wait...
        await new Promise(r => setTimeout(r, 3000));
        setStep(2); // I still have something...
        await new Promise(r => setTimeout(r, 3000));
        setStep(3); // I'll choose you.
        await new Promise(r => setTimeout(r, 2000));
        setStep(4); // Tomorrow.
        await new Promise(r => setTimeout(r, 2000));
        setStep(5); // The day after.
        await new Promise(r => setTimeout(r, 2000));
        setStep(6); // And every day after that.
        await new Promise(r => setTimeout(r, 2000));
        setStep(7); // Fireworks!
        
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      };
      runEnding();
    }
  }, [isInView]);

  const images = getImages();

  return (
    <section ref={ref} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black z-50">
      {step >= 7 && images.length > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
          {images.slice(0, 5).map((img, idx) => (
            <motion.img 
              key={idx}
              src={img}
              className="absolute object-cover rounded-xl shadow-2xl"
              style={{
                width: `${Math.random() * 20 + 15}vw`,
                top: `${Math.random() * 70 + 5}%`,
                left: `${Math.random() * 70 + 5}%`,
                rotate: `${Math.random() * 40 - 20}deg`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 4, delay: idx * 0.7 }}
            />
          ))}
        </div>
      )}

      <motion.div 
        className="text-center text-3xl md:text-6xl font-quotes text-white space-y-8 px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {step >= 1 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>Wait...</motion.p>}
        {step >= 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>I still have something...</motion.p>}
        
        <div className="mt-20 space-y-4 text-primary font-heading text-4xl sm:text-5xl md:text-8xl glow-text px-4">
          {step >= 3 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>I'll choose you.</motion.p>}
          {step >= 4 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>Tomorrow.</motion.p>}
          {step >= 5 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>The day after.</motion.p>}
          {step >= 6 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>And every day after that.</motion.p>}
        </div>
      </motion.div>
    </section>
  );
};
