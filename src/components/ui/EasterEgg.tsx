import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const EasterEgg = () => {
  const [input, setInput] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  
  const SECRET_CODE = 'TRISH';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (!/^[A-Z]$/.test(key)) return;
      
      setInput((prev) => {
        const next = (prev + key).slice(-SECRET_CODE.length);
        if (next === SECRET_CODE) {
          setShowSecret(true);
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showSecret && (
        <motion.div 
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setShowSecret(false)}
          >
            Close
          </button>
          <div className="text-center px-4 max-w-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <Heart className="w-24 h-24 text-primary mx-auto mb-8 animate-pulse" fill="#ff4d88" />
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-heading text-white mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              You found the secret!
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl font-quotes text-white/80 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              "No matter how many days pass, my heart always beats a little faster when I see you. You are my forever and always."
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
