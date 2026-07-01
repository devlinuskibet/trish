import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { getImages } from '../../utils/images';

const texts = [
  "Some stories are written by authors.",
  "Some are written by destiny.",
  "Ours was written by both."
];

export const CinematicIntro = () => {
  const { isIntroComplete, setIntroComplete, setAudio } = useStore();
  const [step, setStep] = useState(0);
  const images = getImages();

  useEffect(() => {
    if (isIntroComplete) return;

    const sequence = async () => {
      // Step 0: Dark screen, heartbeat plays (audio context needed, might need user interaction)
      // Step 1-3: Text fades
      for (let i = 0; i < texts.length; i++) {
        setStep(i + 1);
        await new Promise(r => setTimeout(r, 4500)); // 2s enter + 2.5s reading time
        setStep(0);
        await new Promise(r => setTimeout(r, 2500)); // 2s exit + 0.5s pause
      }
      
      // Step 4: Show image & heart
      setStep(4);
      setAudio(true); // Start music
      await new Promise(r => setTimeout(r, 5000));
      
      setIntroComplete(true);
    };

    sequence();
  }, [isIntroComplete, setIntroComplete, setAudio]);

  if (isIntroComplete) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
    >
      <AnimatePresence mode="wait">
        {step > 0 && step <= 3 && (
          <motion.h1
            key={`text-${step}`}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="text-3xl md:text-5xl text-white font-quotes text-center max-w-2xl px-6"
          >
            {texts[step - 1]}
          </motion.h1>
        )}
        
        {step === 4 && (
          <motion.div
            key="final-intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="relative w-full h-full flex flex-col items-center justify-center"
          >
            {images.length > 0 && (
              <motion.img 
                src={images[0]} 
                alt="First memory"
                className="w-[300px] md:w-[500px] aspect-[4/5] object-cover rounded-xl shadow-[0_0_50px_rgba(255,77,136,0.5)]"
                initial={{ filter: 'blur(20px)' }}
                animate={{ filter: 'blur(0px)' }}
                transition={{ duration: 3 }}
              />
            )}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
            />
            <motion.h2
              className="absolute bottom-20 text-4xl md:text-6xl text-primary font-heading glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 2 }}
            >
              The movie begins...
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
