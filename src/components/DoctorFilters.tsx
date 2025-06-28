
import React from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterOptions } from '@/types/doctor';

interface DoctorFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

const DoctorFilters: React.FC<DoctorFiltersProps> = ({ filters, onFiltersChange, onClose }) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      consultationMode: 'all',
      minRating: 0,
      maxFees: 2000,
      availability: 'all',
      distance: 25
    });
  };

  return (
    <Card className="mb-6 border-2 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Consultation Mode */}
        <div>
          <Label className="text-base font-medium mb-3 block">Consultation Mode</Label>
          <RadioGroup
            value={filters.consultationMode}
            onValueChange={(value) => updateFilter('consultationMode', value)}
            className="flex flex-row space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Online</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offline" id="offline" />
              <Label htmlFor="offline">In-person</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Rating */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Minimum Rating: {filters.minRating} stars
          </Label>
          <Slider
            value={[filters.minRating]}
            onValueChange={(value) => updateFilter('minRating', value[0])}
            min={0}
            max={5}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Fees */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Maximum Consultation Fees: ₹{filters.maxFees}
          </Label>
          <Slider
            value={[filters.maxFees]}
            onValueChange={(value) => updateFilter('maxFees', value[0])}
            min={200}
            max={2000}
            step={100}
            className="w-full"
          />
        </div>

        {/* Distance */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Maximum Distance: {filters.distance} km
          </Label>
          <Slider
            value={[filters.distance]}
            onValueChange={(value) => updateFilter('distance', value[0])}
            min={5}
            max={50}
            step={5}
            className="w-full"
          />
        </div>

        {/* Availability */}
        <div>
          <Label className="text-base font-medium mb-3 block">Availability</Label>
          <Select
            value={filters.availability}
            onValueChange={(value) => updateFilter('availability', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any time</SelectItem>
              <SelectItem value="today">Available today</SelectItem>
              <SelectItem value="tomorrow">Available tomorrow</SelectItem>
              <SelectItem value="this-week">Available this week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={resetFilters} variant="outline" className="flex-1">
            Reset All
          </Button>
          <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorFilters;
