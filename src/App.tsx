import { ScrollManager } from './components/layout/ScrollManager';
import { MusicEngine } from './components/audio/MusicEngine';
import { CanvasLayer } from './components/canvas/CanvasLayer';
import { CustomCursor } from './components/ui/CustomCursor';
import { CinematicIntro } from './components/ui/CinematicIntro';
import { HeroSection } from './components/layout/HeroSection';
import { StoryEngine } from './components/layout/StoryEngine';
import { LuxuryGallery } from './components/layout/LuxuryGallery';
import { LoveMeter } from './components/ui/LoveMeter';
import { SurpriseEnding } from './components/layout/SurpriseEnding';
import { useStore } from './store/useStore';

function App() {
  const { isIntroComplete } = useStore();

  return (
    <ScrollManager>
      <CustomCursor />
      <MusicEngine />
      <CanvasLayer />
      <CinematicIntro />
      
      <main className="relative z-10 w-full min-h-screen">
        {isIntroComplete && (
          <>
            <HeroSection />
            <StoryEngine />
            <LuxuryGallery />
            <LoveMeter />
            <SurpriseEnding />
          </>
        )}
      </main>
    </ScrollManager>
  );
}

export default App;
