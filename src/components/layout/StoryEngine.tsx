import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const chapters = [
  {
    title: "Destiny",
    text: "Out of billions of people in this universe, somehow fate decided our paths should cross. That single decision became my favorite miracle.",
  },
  {
    title: "The Smile",
    text: "There are smiles that brighten a room... then there is yours. Yours somehow brightened my entire life.",
  },
  {
    title: "The Moments",
    text: "Every memory with you is a treasure I keep locked in my heart.",
  },
  {
    title: "The Future",
    text: "Every tomorrow becomes exciting because it holds another chance to create memories with you.",
  }
];

export const StoryEngine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center py-20">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full hidden md:block" />
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full shadow-[0_0_10px_rgba(255,77,136,0.5)] z-0 hidden md:block"
        style={{ height: lineHeight }}
      />
      {chapters.map((chapter, index) => (
        <ChapterScene key={index} chapter={chapter} index={index} />
      ))}
    </div>
  );
};

const ChapterScene = ({ chapter, index }: { chapter: typeof chapters[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="min-h-screen w-full flex items-center justify-center px-4 py-20 relative z-10">
      <motion.div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(255,77,136,1)] z-20 hidden md:block"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0, 1.5, 1], opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
      />
      
      <div className={`w-full max-w-6xl flex justify-center md:${isEven ? 'justify-start' : 'justify-end'} relative`}>
        <motion.div 
          className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl w-full md:w-[45%] text-center md:text-left relative overflow-hidden bg-black/40 border border-white/10 hover:border-primary/50 transition-colors duration-500"
          style={{ opacity, scale, y }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-heading text-primary mb-6 md:mb-8 relative z-10 drop-shadow-md">{chapter.title}</h2>
          <p className="text-lg md:text-2xl font-quotes text-white leading-relaxed relative z-10 drop-shadow-sm">{chapter.text}</p>
        </motion.div>
      </div>
    </section>
  );
};
