
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

// Indian cities and pincodes database
const indianLocations: {[key: string]: {lat: number, lng: number, name: string}} = {
  // Major Cities
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai, Maharashtra' },
  'delhi': { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
  'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore, Karnataka' },
  'bengaluru': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru, Karnataka' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, Telangana' },
  'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad, Gujarat' },
  'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai, Tamil Nadu' },
  'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata, West Bengal' },
  'surat': { lat: 21.1702, lng: 72.8311, name: 'Surat, Gujarat' },
  'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune, Maharashtra' },
  'jaipur': { lat: 26.9124, lng: 75.7873, name: 'Jaipur, Rajasthan' },
  'lucknow': { lat: 26.8467, lng: 80.9462, name: 'Lucknow, Uttar Pradesh' },
  'kanpur': { lat: 26.4499, lng: 80.3319, name: 'Kanpur, Uttar Pradesh' },
  'nagpur': { lat: 21.1458, lng: 79.0882, name: 'Nagpur, Maharashtra' },
  'indore': { lat: 22.7196, lng: 75.8577, name: 'Indore, Madhya Pradesh' },
  'thane': { lat: 19.2183, lng: 72.9781, name: 'Thane, Maharashtra' },
  'bhopal': { lat: 23.2599, lng: 77.4126, name: 'Bhopal, Madhya Pradesh' },
  'visakhapatnam': { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam, Andhra Pradesh' },
  'pimpri chinchwad': { lat: 18.6298, lng: 73.7997, name: 'Pimpri Chinchwad, Maharashtra' },
  'patna': { lat: 25.5941, lng: 85.1376, name: 'Patna, Bihar' },
  'vadodara': { lat: 22.3072, lng: 73.1812, name: 'Vadodara, Gujarat' },
  'ghaziabad': { lat: 28.6692, lng: 77.4538, name: 'Ghaziabad, Uttar Pradesh' },
  'ludhiana': { lat: 30.9001, lng: 75.8573, name: 'Ludhiana, Punjab' },
  'agra': { lat: 27.1767, lng: 78.0081, name: 'Agra, Uttar Pradesh' },
  'nashik': { lat: 19.9975, lng: 73.7898, name: 'Nashik, Maharashtra' },
  'faridabad': { lat: 28.4089, lng: 77.3178, name: 'Faridabad, Haryana' },
  'meerut': { lat: 28.9845, lng: 77.7064, name: 'Meerut, Uttar Pradesh' },
  'rajkot': { lat: 22.3039, lng: 70.8022, name: 'Rajkot, Gujarat' },
  'kalyan dombivali': { lat: 19.2403, lng: 73.1305, name: 'Kalyan Dombivali, Maharashtra' },
  'vasai virar': { lat: 19.4912, lng: 72.8054, name: 'Vasai Virar, Maharashtra' },
  'varanasi': { lat: 25.3176, lng: 82.9739, name: 'Varanasi, Uttar Pradesh' },
  'srinagar': { lat: 34.0837, lng: 74.7973, name: 'Srinagar, Jammu and Kashmir' },
  'dhanbad': { lat: 23.7957, lng: 86.4304, name: 'Dhanbad, Jharkhand' },
  'jodhpur': { lat: 26.2389, lng: 73.0243, name: 'Jodhpur, Rajasthan' },
  'navi mumbai': { lat: 19.0330, lng: 73.0297, name: 'Navi Mumbai, Maharashtra' },
  'howrah': { lat: 22.5958, lng: 88.2636, name: 'Howrah, West Bengal' },
  'ranchi': { lat: 23.3441, lng: 85.3096, name: 'Ranchi, Jharkhand' },
  'allahabad': { lat: 25.4358, lng: 81.8463, name: 'Prayagraj, Uttar Pradesh' },
  'prayagraj': { lat: 25.4358, lng: 81.8463, name: 'Prayagraj, Uttar Pradesh' },
  'coimbatore': { lat: 11.0168, lng: 76.9558, name: 'Coimbatore, Tamil Nadu' },
  'jabalpur': { lat: 23.1815, lng: 79.9864, name: 'Jabalpur, Madhya Pradesh' },
  'gwalior': { lat: 26.2183, lng: 78.1828, name: 'Gwalior, Madhya Pradesh' },
  'vijayawada': { lat: 16.5062, lng: 80.6480, name: 'Vijayawada, Andhra Pradesh' },
  'madurai': { lat: 9.9252, lng: 78.1198, name: 'Madurai, Tamil Nadu' },
  'raipur': { lat: 21.2514, lng: 81.6296, name: 'Raipur, Chhattisgarh' },
  'kota': { lat: 25.2138, lng: 75.8648, name: 'Kota, Rajasthan' },
  'chandigarh': { lat: 30.7333, lng: 76.7794, name: 'Chandigarh' },
  'gurgaon': { lat: 28.4595, lng: 77.0266, name: 'Gurgaon, Haryana' },
  'gurugram': { lat: 28.4595, lng: 77.0266, name: 'Gurugram, Haryana' },
  'solapur': { lat: 17.6599, lng: 75.9064, name: 'Solapur, Maharashtra' },
  'hubli': { lat: 15.3647, lng: 75.1240, name: 'Hubli, Karnataka' },
  'mysore': { lat: 12.2958, lng: 76.6394, name: 'Mysore, Karnataka' },
  'mysuru': { lat: 12.2958, lng: 76.6394, name: 'Mysuru, Karnataka' },
  'aurangabad': { lat: 19.8762, lng: 75.3433, name: 'Aurangabad, Maharashtra' },
  'amritsar': { lat: 31.6340, lng: 74.8723, name: 'Amritsar, Punjab' },
  'nellore': { lat: 14.4426, lng: 79.9865, name: 'Nellore, Andhra Pradesh' },
  'haora': { lat: 22.5958, lng: 88.2636, name: 'Haora, West Bengal' },
  
  // Major Pincodes - Mumbai
  '400001': { lat: 19.0760, lng: 72.8777, name: 'Mumbai - 400001' },
  '400002': { lat: 18.9750, lng: 72.8258, name: 'Mumbai - 400002' },
  '400020': { lat: 18.9387, lng: 72.8353, name: 'Mumbai - 400020' },
  '400050': { lat: 19.0596, lng: 72.8295, name: 'Mumbai - 400050' },
  '400070': { lat: 19.1136, lng: 72.8697, name: 'Mumbai - 400070' },
  
  // Major Pincodes - Delhi
  '110001': { lat: 28.7041, lng: 77.1025, name: 'Delhi - 110001' },
  '110002': { lat: 28.6508, lng: 77.2311, name: 'Delhi - 110002' },
  '110003': { lat: 28.6667, lng: 77.2167, name: 'Delhi - 110003' },
  '110016': { lat: 28.5355, lng: 77.2500, name: 'Delhi - 110016' },
  '110019': { lat: 28.5706, lng: 77.3272, name: 'Delhi - 110019' },
  
  // Major Pincodes - Bangalore
  '560001': { lat: 12.9716, lng: 77.5946, name: 'Bangalore - 560001' },
  '560002': { lat: 12.9698, lng: 77.6128, name: 'Bangalore - 560002' },
  '560025': { lat: 12.9698, lng: 77.6205, name: 'Bangalore - 560025' },
  '560034': { lat: 12.9279, lng: 77.6271, name: 'Bangalore - 560034' },
  '560038': { lat: 12.9719, lng: 77.6412, name: 'Bangalore - 560038' },
  
  // Major Pincodes - Chennai
  '600001': { lat: 13.0827, lng: 80.2707, name: 'Chennai - 600001' },
  '600002': { lat: 13.0569, lng: 80.2963, name: 'Chennai - 600002' },
  '600020': { lat: 13.0569, lng: 80.2963, name: 'Chennai - 600020' },
  '600024': { lat: 13.0067, lng: 80.2206, name: 'Chennai - 600024' },
  '600028': { lat: 13.0472, lng: 80.2492, name: 'Chennai - 600028' },
  
  // Major Pincodes - Hyderabad
  '500001': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad - 500001' },
  '500003': { lat: 17.3753, lng: 78.4744, name: 'Hyderabad - 500003' },
  '500020': { lat: 17.4126, lng: 78.4071, name: 'Hyderabad - 500020' },
  '500034': { lat: 17.4447, lng: 78.3503, name: 'Hyderabad - 500034' },
  '500081': { lat: 17.4126, lng: 78.4071, name: 'Hyderabad - 500081' },
  
  // Major Pincodes - Pune
  '411001': { lat: 18.5204, lng: 73.8567, name: 'Pune - 411001' },
  '411002': { lat: 18.5074, lng: 73.8077, name: 'Pune - 411002' },
  '411038': { lat: 18.6298, lng: 73.7997, name: 'Pune - 411038' },
  '411057': { lat: 18.4574, lng: 73.8567, name: 'Pune - 411057' },
  
  // Major Pincodes - Kolkata
  '700001': { lat: 22.5726, lng: 88.3639, name: 'Kolkata - 700001' },
  '700019': { lat: 22.5448, lng: 88.3426, name: 'Kolkata - 700019' },
  '700020': { lat: 22.5448, lng: 88.3426, name: 'Kolkata - 700020' },
  '700027': { lat: 22.5448, lng: 88.3426, name: 'Kolkata - 700027' },
  
  // Major Pincodes - Ahmedabad
  '380001': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad - 380001' },
  '380006': { lat: 23.0395, lng: 72.5661, name: 'Ahmedabad - 380006' },
  '380015': { lat: 23.0395, lng: 72.5661, name: 'Ahmedabad - 380015' },
  '380054': { lat: 23.0726, lng: 72.5199, name: 'Ahmedabad - 380054' },
  
  // Major Pincodes - Jaipur
  '302001': { lat: 26.9124, lng: 75.7873, name: 'Jaipur - 302001' },
  '302006': { lat: 26.9124, lng: 75.7873, name: 'Jaipur - 302006' },
  '302017': { lat: 26.8467, lng: 75.8173, name: 'Jaipur - 302017' },
  '302023': { lat: 26.9124, lng: 75.7873, name: 'Jaipur - 302023' }
};

// Mock reverse geocoding - find closest Indian location
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  let closest: {lat: number, lng: number, name: string} | null = null;
  let minDistance = Infinity;
  
  for (const location of Object.values(indianLocations)) {
    const distance = Math.abs(lat - location.lat) + Math.abs(lng - location.lng);
    if (distance < minDistance) {
      closest = location;
      minDistance = distance;
    }
  }
  
  return closest ? closest.name : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

// Enhanced geocoding with comprehensive Indian cities
async function geocodeAddress(address: string): Promise<{lat: number, lng: number}> {
  const addressLower = address.toLowerCase().trim();
  
  // Direct match
  if (indianLocations[addressLower]) {
    return { lat: indianLocations[addressLower].lat, lng: indianLocations[addressLower].lng };
  }
  
  // Partial match search
  for (const [key, coords] of Object.entries(indianLocations)) {
    if (addressLower.includes(key) || key.includes(addressLower)) {
      return { lat: coords.lat, lng: coords.lng };
    }
  }
  
  // Check if it's a partial city name match
  const cityMatches = Object.entries(indianLocations).filter(([key, location]) => 
    location.name.toLowerCase().includes(addressLower) || 
    addressLower.includes(key.split(' ')[0])
  );
  
  if (cityMatches.length > 0) {
    return { lat: cityMatches[0][1].lat, lng: cityMatches[0][1].lng };
  }
  
  throw new Error('Location not found');
}

export default LocationDetector;
