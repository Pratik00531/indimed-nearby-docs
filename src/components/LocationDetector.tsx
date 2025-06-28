
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LocationDetectorProps {
  onLocationDetected: (location: {lat: number, lng: number}) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationDetected }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const { toast } = useToast();

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location detection",
        variant: "destructive"
      });
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get address
          const address = await reverseGeocode(latitude, longitude);
          setCurrentLocation(address);
          onLocationDetected({ lat: latitude, lng: longitude });
          
          toast({
            title: "Location detected",
            description: `Found your location: ${address}`,
          });
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          onLocationDetected({ lat: latitude, lng: longitude });
          setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        
        setIsDetecting(false);
      },
      (error) => {
        setIsDetecting(false);
        let message = "Failed to detect location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: message,
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleManualLocation = async () => {
    if (!manualLocation.trim()) return;

    try {
      const coords = await geocodeAddress(manualLocation);
      onLocationDetected(coords);
      setCurrentLocation(manualLocation);
      
      toast({
        title: "Location set",
        description: `Using location: ${manualLocation}`,
      });
    } catch (error) {
      toast({
        title: "Location not found",
        description: "Please enter a valid city name, area, or pincode",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-700">Your Location:</span>
          </div>
          
          {currentLocation ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{currentLocation}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentLocation('');
                  setManualLocation('');
                }}
                className="text-blue-600"
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={detectCurrentLocation}
                disabled={isDetecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isDetecting ? 'Detecting...' : 'Detect Location'}
              </Button>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Enter city, area, or pincode"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  className="w-56"
                  onKeyPress={(e) => e.key === 'Enter' && handleManualLocation()}
                />
                <Button
                  onClick={handleManualLocation}
                  variant="outline"
                  disabled={!manualLocation.trim()}
                >
                  Set
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced geocoding using Nominatim (OpenStreetMap) API
async function geocodeAddress(address: string): Promise<{lat: number, lng: number}> {
  const addressLower = address.toLowerCase().trim();
  
  console.log('Geocoding address with Nominatim:', addressLower);
  
  try {
    // Use Nominatim API for comprehensive geocoding
    const query = encodeURIComponent(`${address}, India`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=5&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'HealthFinder-App/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }
    
    const results = await response.json();
    console.log('Nominatim results:', results);
    
    if (results && results.length > 0) {
      const bestResult = results[0];
      const lat = parseFloat(bestResult.lat);
      const lng = parseFloat(bestResult.lon);
      
      console.log('Found coordinates:', { lat, lng });
      return { lat, lng };
    }
    
    // Fallback: Try without "India" suffix for local searches
    const fallbackQuery = encodeURIComponent(address);
    const fallbackResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${fallbackQuery}&countrycodes=in&limit=3&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'HealthFinder-App/1.0'
        }
      }
    );
    
    if (fallbackResponse.ok) {
      const fallbackResults = await fallbackResponse.json();
      console.log('Fallback Nominatim results:', fallbackResults);
      
      if (fallbackResults && fallbackResults.length > 0) {
        const bestResult = fallbackResults[0];
        const lat = parseFloat(bestResult.lat);
        const lng = parseFloat(bestResult.lon);
        
        console.log('Found coordinates (fallback):', { lat, lng });
        return { lat, lng };
      }
    }
    
    throw new Error('Location not found');
    
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Unable to find location');
  }
}

// Enhanced reverse geocoding using Nominatim
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'HealthFinder-App/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Reverse geocoding service unavailable');
    }
    
    const result = await response.json();
    console.log('Reverse geocoding result:', result);
    
    if (result && result.address) {
      const address = result.address;
      const parts = [];
      
      // Build address string from most specific to least specific
      if (address.neighbourhood) parts.push(address.neighbourhood);
      if (address.suburb) parts.push(address.suburb);
      if (address.city || address.town || address.village) {
        parts.push(address.city || address.town || address.village);
      }
      if (address.state) parts.push(address.state);
      
      return parts.join(', ') || result.display_name;
    }
    
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

export default LocationDetector;
