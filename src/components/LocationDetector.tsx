
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
        description: "Please enter a valid city name or pincode",
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
                  placeholder="Enter city or pincode"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  className="w-48"
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

// Mock geocoding functions - In real app, use Google Maps API or similar
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // Mock implementation - replace with actual reverse geocoding service
  const locations = [
    { lat: 12.9716, lng: 77.5946, name: "MG Road, Bangalore" },
    { lat: 12.9698, lng: 77.6205, name: "Brigade Road, Bangalore" },
    { lat: 12.9279, lng: 77.6271, name: "Koramangala, Bangalore" },
  ];
  
  // Find closest location
  let closest = locations[0];
  let minDistance = Math.abs(lat - closest.lat) + Math.abs(lng - closest.lng);
  
  for (const location of locations) {
    const distance = Math.abs(lat - location.lat) + Math.abs(lng - location.lng);
    if (distance < minDistance) {
      closest = location;
      minDistance = distance;
    }
  }
  
  return closest.name;
}

async function geocodeAddress(address: string): Promise<{lat: number, lng: number}> {
  // Mock implementation - replace with actual geocoding service
  const addressMap: {[key: string]: {lat: number, lng: number}} = {
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'delhi': { lat: 28.7041, lng: 77.1025 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    '560001': { lat: 12.9716, lng: 77.5946 },
    '400001': { lat: 19.0760, lng: 72.8777 },
    '110001': { lat: 28.7041, lng: 77.1025 }
  };
  
  const key = address.toLowerCase().trim();
  if (addressMap[key]) {
    return addressMap[key];
  }
  
  // Check if it's a partial match
  for (const [mapKey, coords] of Object.entries(addressMap)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return coords;
    }
  }
  
  throw new Error('Location not found');
}

export default LocationDetector;
