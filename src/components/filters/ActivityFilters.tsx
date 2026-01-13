import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FilterCategory, PriceRange, DurationFilter } from '@/types/activity';

interface ActivityFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  selectedPrice: PriceRange;
  onPriceChange: (price: PriceRange) => void;
  selectedDuration: DurationFilter;
  onDurationChange: (duration: DurationFilter) => void;
  categories: string[];
}

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'All Prices' },
  { value: 'budget', label: 'Under €50' },
  { value: 'mid', label: '€50 - €100' },
  { value: 'premium', label: 'Over €100' },
];

const durationFilters: { value: DurationFilter; label: string }[] = [
  { value: 'all', label: 'Any Duration' },
  { value: 'short', label: 'Under 3 hours' },
  { value: 'half-day', label: 'Half Day' },
  { value: 'full-day', label: 'Full Day' },
  { value: 'multi-day', label: 'Multi-Day' },
];

export function ActivityFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  selectedDuration,
  onDurationChange,
  categories,
}: ActivityFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = selectedCategory !== 'all' || selectedPrice !== 'all' || selectedDuration !== 'all';

  const clearFilters = () => {
    onCategoryChange('all');
    onPriceChange('all');
    onDurationChange('all');
    onSearchChange('');
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? 'default' : 'secondary'}
          size="lg"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-primary-foreground text-primary text-xs flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Extended Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-muted rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-3">Price Range</label>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => onPriceChange(range.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedPrice === range.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background text-foreground hover:bg-background/80'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium mb-3">Duration</label>
                  <div className="flex flex-wrap gap-2">
                    {durationFilters.map((duration) => (
                      <button
                        key={duration.value}
                        onClick={() => onDurationChange(duration.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedDuration === duration.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background text-foreground hover:bg-background/80'
                        }`}
                      >
                        {duration.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
