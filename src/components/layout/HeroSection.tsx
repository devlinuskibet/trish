import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImages } from '../../utils/images';

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const images = getImages();
  const heroImage = images.length > 1 ? images[1] : images[0]; // Use second image if available

  return (
    <section ref={ref} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {heroImage && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, opacity }}
        >
          <img 
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </motion.div>
      )}

      <motion.div 
        className="relative z-10 text-center px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h1 className="text-5xl md:text-8xl font-heading text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          Happy Birthday,<br/>My Beautiful Queen
        </h1>
        <p className="text-xl md:text-2xl font-quotes text-secondary max-w-2xl">
          This website is my heart, translated into pixels.
        </p>
        
        <motion.div 
          className="mt-20 w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
