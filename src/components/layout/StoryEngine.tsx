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
  return (
    <div className="relative w-full flex flex-col items-center">
      {chapters.map((chapter, index) => (
        <ChapterScene key={index} chapter={chapter} />
      ))}
    </div>
  );
};

const ChapterScene = ({ chapter }: { chapter: typeof chapters[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={ref} className="h-screen w-full flex items-center justify-center px-4 py-20 relative">
      <motion.div 
        className="glass-panel p-6 sm:p-10 md:p-16 rounded-3xl max-w-[90%] md:max-w-3xl text-center relative overflow-hidden bg-black/20"
        style={{ opacity, scale, y }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 pointer-events-none" />
        <h2 className="text-3xl md:text-6xl font-heading text-primary mb-6 md:mb-8 relative z-10 drop-shadow-md">{chapter.title}</h2>
        <p className="text-lg md:text-3xl font-quotes text-white leading-relaxed relative z-10 drop-shadow-sm">{chapter.text}</p>
      </motion.div>
    </section>
  );
};
