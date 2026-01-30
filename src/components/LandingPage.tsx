import { Button } from '@/components/ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Meeting Bingo
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 font-medium">
            Turn boring meetings into fun!
          </p>
        </div>

        {/* Description */}
        <div className="space-y-3 text-gray-500">
          <p className="text-base sm:text-lg">
            Meeting Bingo listens to your meetings and automatically detects
            common buzzwords and phrases.
          </p>
          <p className="text-base sm:text-lg">
            Mark off squares as they happen and see how quickly you can get
            Bingo!
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
            Start Playing
          </Button>
        </div>
      </div>
    </div>
  );
}
