
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, MessageCircle, Stethoscope, Clock, Star, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LocationDetector from '@/components/LocationDetector';
import DoctorFilters from '@/components/DoctorFilters';
import DoctorCard from '@/components/DoctorCard';
import MapView from '@/components/MapView';
import ChatBot from '@/components/ChatBot';
import { doctorService } from '@/services/doctorService';
import { Doctor, FilterOptions } from '@/types/doctor';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    consultationMode: 'all',
    minRating: 0,
    maxFees: 2000,
    availability: 'all',
    distance: 25
  });

  // Load initial doctors on component mount
  useEffect(() => {
    loadInitialDoctors();
  }, []);

  // Update search when location or filters change
  useEffect(() => {
    if (searchQuery || doctors.length > 0) {
      handleSearch();
    }
  }, [userLocation, filters]);

  const loadInitialDoctors = async () => {
    setIsLoading(true);
    try {
      // Load all doctors initially without any search query
      const results = await doctorService.searchDoctors('', null, filters);
      setDoctors(results);
      setFilteredDoctors(results);
      console.log('Loaded initial doctors:', results.length);
    } catch (error) {
      console.error('Error loading initial doctors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await doctorService.searchDoctors(searchQuery, userLocation, filters);
      setDoctors(results);
      setFilteredDoctors(results);
      console.log('Search results:', results.length);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationDetected = (location: {lat: number, lng: number}) => {
    console.log('Location detected:', location);
    setUserLocation(location);
  };

  const popularSymptoms = [
    'Fever', 'Headache', 'Skin Problems', 'Stomach Pain', 'Chest Pain',
    'Back Pain', 'Cough', 'Diabetes', 'High BP', 'Heart Disease'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">HealthFinder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className="hidden sm:flex"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {showMap ? 'List View' : 'Map View'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatBot(true)}
                className="bg-blue-50 hover:bg-blue-100"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Right Doctor for Your Health
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search by symptoms or conditions to find nearby specialists
          </p>
          
          {/* Location Detector */}
          <LocationDetector onLocationDetected={handleLocationDetected} />
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter symptoms, condition, or specialist (e.g., skin disease, dermatologist)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="h-12 px-4"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            {/* Popular Symptoms */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      setSearchQuery(symptom);
                      setTimeout(() => handleSearch(), 100);
                    }}
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {showFilters && (
          <DoctorFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Results Section */}
        {doctors.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                {filteredDoctors.length} Doctors Found
                {userLocation ? ' Near You' : ' in Bangalore'}
              </h3>
              <Button
                variant="outline"
                onClick={() => setShowMap(!showMap)}
                className="sm:hidden"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {showMap ? 'List' : 'Map'}
              </Button>
            </div>

            {showMap ? (
              <MapView doctors={filteredDoctors} userLocation={userLocation} />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} userLocation={userLocation} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="text-center py-12 bg-white/50">
            <CardContent>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Finding doctors for you...</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && doctors.length === 0 && (
          <Card className="text-center py-12 bg-white/50">
            <CardContent>
              <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or location, or browse all available doctors
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={loadInitialDoctors}
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100"
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Show All Doctors
                </Button>
                <Button
                  onClick={() => setShowChatBot(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Help from AI Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ChatBot */}
      {showChatBot && (
        <ChatBot
          onClose={() => setShowChatBot(false)}
          onSymptomSelected={(symptom) => {
            setSearchQuery(symptom);
            setShowChatBot(false);
            setTimeout(() => handleSearch(), 100);
          }}
        />
      )}
    </div>
  );
};

export default Index;
