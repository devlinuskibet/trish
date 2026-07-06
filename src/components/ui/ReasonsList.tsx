import { useState } from 'react';
import { motion } from 'framer-motion';

const reasons = [
  "Your beautiful smile that lights up my world.",
  "The way you care about the little things.",
  "Your incredible strength and resilience.",
  "How you make every day feel like an adventure.",
  "The comforting warmth of your hugs.",
  "Your passion for everything you do."
];

export const ReasonsList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 w-full flex flex-col items-center justify-center min-h-[70vh] relative z-10 px-4">
      <h2 className="text-4xl md:text-6xl font-heading text-white mb-16 text-center drop-shadow-md">
        Reasons I Love You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            className="relative cursor-pointer h-48 [perspective:1000px]"
            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
          >
            <motion.div 
              className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
              animate={{ rotateY: activeIndex === idx ? 180 : 0 }}
            >
              <div className="absolute inset-0 [backface-visibility:hidden] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col items-center justify-center shadow-lg hover:shadow-primary/30 transition-shadow">
                <span className="text-5xl font-heading text-primary/80">#{idx + 1}</span>
                <p className="mt-2 text-white/60 font-body text-sm uppercase tracking-widest">Tap to reveal</p>
              </div>
              <div className="absolute inset-0 [backface-visibility:hidden] bg-primary/20 backdrop-blur-md rounded-2xl border border-primary/50 flex items-center justify-center p-6 shadow-[0_0_20px_rgba(255,77,136,0.3)]" style={{ transform: 'rotateY(180deg)' }}>
                <p className="text-white text-lg md:text-xl font-quotes text-center leading-relaxed">
                  "{reason}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
