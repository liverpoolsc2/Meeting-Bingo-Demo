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
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Category
        </h2>
        <p className="text-gray-600">
          Select a buzzword category to generate your bingo card
        </p>
      </div>

      <div
        className={cn(
          'grid gap-6',
          'grid-cols-1 md:grid-cols-3'
        )}
      >
        {CATEGORIES.map((category) => (
          <Card
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              'p-6',
              'hover:scale-105 hover:shadow-xl',
              'transition-all duration-200',
              'border-2 border-transparent hover:border-blue-500'
            )}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl mb-4" role="img" aria-hidden="true">
                {category.icon}
              </span>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>

              <span
                className={cn(
                  'inline-flex items-center',
                  'px-3 py-1 rounded-full',
                  'bg-blue-100 text-blue-800',
                  'text-xs font-medium'
                )}
              >
                {category.words.length} words
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
