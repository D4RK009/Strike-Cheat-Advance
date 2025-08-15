import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  resultCount?: number;
}

export function SearchFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  resultCount
}: SearchFilterProps) {
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchQuery.length > 0 || selectedCategory !== "all";

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Search products, features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 transition-colors"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1.5 h-7 w-7 p-0 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                }
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results and Clear Filters */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-4">
          {typeof resultCount === 'number' && (
            <div className="text-sm text-slate-400">
              {resultCount} {resultCount === 1 ? 'product' : 'products'} found
            </div>
          )}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  Category: {selectedCategory}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}