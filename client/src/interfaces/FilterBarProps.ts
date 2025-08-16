export interface FilterBarProps {
  openFilterBar: boolean;
  onApplyFilters: (filters: { priceRange: number[]; ratingRange: number[] }) => void;
}