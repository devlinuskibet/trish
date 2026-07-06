import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImages } from '../../utils/images';

export const LuxuryGallery = () => {
  const images = getImages();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  if (images.length === 0) return null;

  return (
    <section ref={ref} className="py-32 w-full flex flex-col items-center relative overflow-hidden">
      <h2 className="text-4xl md:text-7xl font-heading text-secondary mb-16 md:mb-20 drop-shadow-lg text-center px-4">
        The Exhibition of Us
      </h2>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {images.map((src, idx) => (
          <motion.div 
            key={idx}
            className={`relative group w-full ${idx % 2 === 0 ? 'mt-0' : 'md:mt-24'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: idx * 0.2 }}
            style={{ y: idx % 2 === 0 ? y : useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors duration-500 rounded-sm" />
            <div className={`bg-white p-4 pb-16 relative z-10 transform transition-all duration-700 shadow-2xl ${idx % 2 === 0 ? 'rotate-[-3deg] hover:rotate-[2deg]' : 'rotate-[3deg] hover:rotate-[-2deg]'} group-hover:scale-105 group-hover:z-20`}>
              <img 
                src={src} 
                alt={`Memory ${idx}`} 
                className="w-full aspect-[4/5] object-cover shadow-inner brightness-90 group-hover:brightness-100 transition-all duration-500"
              />
              <p className="absolute bottom-4 left-0 right-0 font-quotes text-center text-gray-800 text-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                Forever #{idx + 1}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
