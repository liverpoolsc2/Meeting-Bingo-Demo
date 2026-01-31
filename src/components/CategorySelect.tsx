import { CATEGORIES } from '@/data/categories';
import { CategoryId } from '@/types';
import { cn } from '@/lib/utils';
import { Card } from './ui/Card';

interface CategorySelectProps {
  onSelect: (categoryId: CategoryId) => void;
}

/**
 * Category selection screen for Meeting Bingo
 * Displays 3 category cards for users to choose from
 */
export function CategorySelect({
  onSelect,
}: CategorySelectProps): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb-purple w-96 h-96 -top-48 left-1/4 animate-float-slow" />
      <div className="orb-cyan w-80 h-80 bottom-0 right-1/4 animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-down">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Choose Your Category
          </h2>
          <p className="text-white/60 text-lg">
            Select a buzzword category to generate your bingo card
          </p>
        </div>

        {/* Category Cards Grid */}
        <div
          className={cn(
            'grid gap-6',
            'grid-cols-1 md:grid-cols-3'
          )}
        >
          {CATEGORIES.map((category, index) => (
            <Card
              key={category.id}
              onClick={() => onSelect(category.id)}
              variant="glass"
              className={cn(
                'p-6',
                'animate-slide-up opacity-0',
                'hover:border-purple-400/40',
                'group'
              )}
              style={{
                animationDelay: `${index * 0.1 + 0.2}s`,
                animationFillMode: 'forwards',
              } as React.CSSProperties}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon with glow effect on hover */}
                <span
                  className={cn(
                    'text-5xl mb-4',
                    'transition-transform duration-300',
                    'group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                  )}
                  role="img"
                  aria-hidden="true"
                >
                  {category.icon}
                </span>

                {/* Category name */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Word count badge */}
                <span
                  className={cn(
                    'inline-flex items-center',
                    'px-4 py-1.5 rounded-full',
                    'bg-purple-500/20 text-purple-300',
                    'border border-purple-400/30',
                    'text-xs font-medium',
                    'transition-all duration-300',
                    'group-hover:bg-purple-500/30 group-hover:border-purple-400/50'
                  )}
                >
                  {category.words.length} words
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
