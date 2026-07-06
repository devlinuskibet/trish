import { Heart } from 'lucide-react';

export const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 text-white/80 font-body">
          <span>Made with</span>
          <Heart className="w-5 h-5 text-primary animate-pulse" fill="#ff4d88" />
          <span>for Trish &copy; {year}</span>
        </div>
        <p className="mt-4 text-sm text-white/40 font-quotes text-center max-w-md">
          A digital monument to a love that transcends time and space.
        </p>
      </div>
    </footer>
  );
};
