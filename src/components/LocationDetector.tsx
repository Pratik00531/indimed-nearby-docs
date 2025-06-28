
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

// Comprehensive Indian cities and pincodes database - same as in doctorService
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
  'bhopal': { lat: 23.2599, lng: 77.4126, name: 'Bhopal, Madhya Pradesh' },
  'vadodara': { lat: 22.3072, lng: 73.1812, name: 'Vadodara, Gujarat' },
  'rajkot': { lat: 22.3039, lng: 70.8022, name: 'Rajkot, Gujarat' },
  'coimbatore': { lat: 11.0168, lng: 76.9558, name: 'Coimbatore, Tamil Nadu' },
  'gurgaon': { lat: 28.4595, lng: 77.0266, name: 'Gurgaon, Haryana' },
  'gurugram': { lat: 28.4595, lng: 77.0266, name: 'Gurugram, Haryana' },
  'noida': { lat: 28.5355, lng: 77.3910, name: 'Noida, Uttar Pradesh' },
  'faridabad': { lat: 28.4089, lng: 77.3178, name: 'Faridabad, Haryana' },
  'ghaziabad': { lat: 28.6692, lng: 77.4538, name: 'Ghaziabad, Uttar Pradesh' },
  'thane': { lat: 19.2183, lng: 72.9781, name: 'Thane, Maharashtra' },
  'navi mumbai': { lat: 19.0330, lng: 73.0297, name: 'Navi Mumbai, Maharashtra' },
  'nashik': { lat: 19.9975, lng: 73.7898, name: 'Nashik, Maharashtra' },
  'aurangabad': { lat: 19.8762, lng: 75.3433, name: 'Aurangabad, Maharashtra' },
  'solapur': { lat: 17.6599, lng: 75.9064, name: 'Solapur, Maharashtra' },
  'visakhapatnam': { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam, Andhra Pradesh' },
  'vijayawada': { lat: 16.5062, lng: 80.6480, name: 'Vijayawada, Andhra Pradesh' },
  'madurai': { lat: 9.9252, lng: 78.1198, name: 'Madurai, Tamil Nadu' },
  'tiruchirappalli': { lat: 10.7905, lng: 78.7047, name: 'Tiruchirappalli, Tamil Nadu' },
  'salem': { lat: 11.6643, lng: 78.1460, name: 'Salem, Tamil Nadu' },
  'kochi': { lat: 9.9312, lng: 76.2673, name: 'Kochi, Kerala' },
  'thiruvananthapuram': { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram, Kerala' },
  'kozhikode': { lat: 11.2588, lng: 75.7804, name: 'Kozhikode, Kerala' },
  'mysore': { lat: 12.2958, lng: 76.6394, name: 'Mysore, Karnataka' },
  'mysuru': { lat: 12.2958, lng: 76.6394, name: 'Mysuru, Karnataka' },
  'hubli': { lat: 15.3647, lng: 75.1240, name: 'Hubli, Karnataka' },
  'mangalore': { lat: 12.9141, lng: 74.8560, name: 'Mangalore, Karnataka' },
  'patna': { lat: 25.5941, lng: 85.1376, name: 'Patna, Bihar' },
  'ranchi': { lat: 23.3441, lng: 85.3096, name: 'Ranchi, Jharkhand' },
  'bhubaneswar': { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar, Odisha' },
  'cuttack': { lat: 20.4625, lng: 85.8828, name: 'Cuttack, Odisha' },
  'raipur': { lat: 21.2514, lng: 81.6296, name: 'Raipur, Chhattisgarh' },
  'jodhpur': { lat: 26.2389, lng: 73.0243, name: 'Jodhpur, Rajasthan' },
  'kota': { lat: 25.2138, lng: 75.8648, name: 'Kota, Rajasthan' },
  'udaipur': { lat: 24.5854, lng: 73.7125, name: 'Udaipur, Rajasthan' },
  'ajmer': { lat: 26.4499, lng: 74.6399, name: 'Ajmer, Rajasthan' },
  'ludhiana': { lat: 30.9001, lng: 75.8573, name: 'Ludhiana, Punjab' },
  'amritsar': { lat: 31.6340, lng: 74.8723, name: 'Amritsar, Punjab' },
  'jalandhar': { lat: 31.3260, lng: 75.5762, name: 'Jalandhar, Punjab' },
  'chandigarh': { lat: 30.7333, lng: 76.7794, name: 'Chandigarh' },
  'dehradun': { lat: 30.3165, lng: 78.0322, name: 'Dehradun, Uttarakhand' },
  'haridwar': { lat: 29.9457, lng: 78.1642, name: 'Haridwar, Uttarakhand' },
  'shimla': { lat: 31.1048, lng: 77.1734, name: 'Shimla, Himachal Pradesh' },
  'jammu': { lat: 32.7266, lng: 74.8570, name: 'Jammu, Jammu and Kashmir' },
  'srinagar': { lat: 34.0837, lng: 74.7973, name: 'Srinagar, Jammu and Kashmir' },
  'agra': { lat: 27.1767, lng: 78.0081, name: 'Agra, Uttar Pradesh' },
  'varanasi': { lat: 25.3176, lng: 82.9739, name: 'Varanasi, Uttar Pradesh' },
  'allahabad': { lat: 25.4358, lng: 81.8463, name: 'Prayagraj, Uttar Pradesh' },
  'prayagraj': { lat: 25.4358, lng: 81.8463, name: 'Prayagraj, Uttar Pradesh' },
  'meerut': { lat: 28.9845, lng: 77.7064, name: 'Meerut, Uttar Pradesh' },
  'bareilly': { lat: 28.3670, lng: 79.4304, name: 'Bareilly, Uttar Pradesh' },
  'aligarh': { lat: 27.8974, lng: 78.0880, name: 'Aligarh, Uttar Pradesh' },
  'moradabad': { lat: 28.8386, lng: 78.7733, name: 'Moradabad, Uttar Pradesh' },
  'saharanpur': { lat: 29.9680, lng: 77.5552, name: 'Saharanpur, Uttar Pradesh' },
  'gorakhpur': { lat: 26.7606, lng: 83.3732, name: 'Gorakhpur, Uttar Pradesh' },
  'gwalior': { lat: 26.2183, lng: 78.1828, name: 'Gwalior, Madhya Pradesh' },
  'jabalpur': { lat: 23.1815, lng: 79.9864, name: 'Jabalpur, Madhya Pradesh' },
  'ujjain': { lat: 23.1765, lng: 75.7885, name: 'Ujjain, Madhya Pradesh' },
  'sagar': { lat: 23.8388, lng: 78.7378, name: 'Sagar, Madhya Pradesh' },
  'ratlam': { lat: 23.3315, lng: 75.0367, name: 'Ratlam, Madhya Pradesh' },
  'gandhinagar': { lat: 23.2156, lng: 72.6369, name: 'Gandhinagar, Gujarat' },
  'bhavnagar': { lat: 21.7645, lng: 72.1519, name: 'Bhavnagar, Gujarat' },
  'jamnagar': { lat: 22.4707, lng: 70.0577, name: 'Jamnagar, Gujarat' },
  'junagadh': { lat: 21.5222, lng: 70.4579, name: 'Junagadh, Gujarat' },
  'anand': { lat: 22.5645, lng: 72.9289, name: 'Anand, Gujarat' },
  'howrah': { lat: 22.5958, lng: 88.2636, name: 'Howrah, West Bengal' },
  'durgapur': { lat: 23.5204, lng: 87.3119, name: 'Durgapur, West Bengal' },
  'asansol': { lat: 23.6739, lng: 86.9524, name: 'Asansol, West Bengal' },
  'siliguri': { lat: 26.7271, lng: 88.3953, name: 'Siliguri, West Bengal' },
  'guwahati': { lat: 26.1445, lng: 91.7362, name: 'Guwahati, Assam' },
  
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
  '302023': { lat: 26.9124, lng: 75.7873, name: 'Jaipur - 302023' },
  
  // More Pincodes for better coverage
  '395001': { lat: 21.1702, lng: 72.8311, name: 'Surat - 395001' },
  '390001': { lat: 22.3072, lng: 73.1812, name: 'Vadodara - 390001' },
  '360001': { lat: 22.3039, lng: 70.8022, name: 'Rajkot - 360001' },
  '422001': { lat: 19.9975, lng: 73.7898, name: 'Nashik - 422001' },
  '462001': { lat: 23.2599, lng: 77.4126, name: 'Bhopal - 462001' },
  '452001': { lat: 22.7196, lng: 75.8577, name: 'Indore - 452001' },
  '800001': { lat: 25.5941, lng: 85.1376, name: 'Patna - 800001' },
  '834001': { lat: 23.3441, lng: 85.3096, name: 'Ranchi - 834001' },
  '641001': { lat: 11.0168, lng: 76.9558, name: 'Coimbatore - 641001' },
  '682001': { lat: 9.9312, lng: 76.2673, name: 'Kochi - 682001' },
  '695001': { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram - 695001' },
  '570001': { lat: 12.2958, lng: 76.6394, name: 'Mysore - 570001' },
  '580001': { lat: 15.3647, lng: 75.1240, name: 'Hubli - 580001' },
  '575001': { lat: 12.9141, lng: 74.8560, name: 'Mangalore - 575001' },
  '530001': { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam - 530001' },
  '520001': { lat: 16.5062, lng: 80.6480, name: 'Vijayawada - 520001' },
  '625001': { lat: 9.9252, lng: 78.1198, name: 'Madurai - 625001' },
  '620001': { lat: 10.7905, lng: 78.7047, name: 'Tiruchirappalli - 620001' },
  '636001': { lat: 11.6643, lng: 78.1460, name: 'Salem - 636001' },
  '492001': { lat: 21.2514, lng: 81.6296, name: 'Raipur - 492001' },
  '342001': { lat: 26.2389, lng: 73.0243, name: 'Jodhpur - 342001' },
  '324001': { lat: 25.2138, lng: 75.8648, name: 'Kota - 324001' },
  '313001': { lat: 24.5854, lng: 73.7125, name: 'Udaipur - 313001' },
  '305001': { lat: 26.4499, lng: 74.6399, name: 'Ajmer - 305001' },
  '141001': { lat: 30.9001, lng: 75.8573, name: 'Ludhiana - 141001' },
  '143001': { lat: 31.6340, lng: 74.8723, name: 'Amritsar - 143001' },
  '144001': { lat: 31.3260, lng: 75.5762, name: 'Jalandhar - 144001' },
  '160001': { lat: 30.7333, lng: 76.7794, name: 'Chandigarh - 160001' },
  '248001': { lat: 30.3165, lng: 78.0322, name: 'Dehradun - 248001' },
  '249401': { lat: 29.9457, lng: 78.1642, name: 'Haridwar - 249401' },
  '171001': { lat: 31.1048, lng: 77.1734, name: 'Shimla - 171001' },
  '180001': { lat: 32.7266, lng: 74.8570, name: 'Jammu - 180001' },
  '190001': { lat: 34.0837, lng: 74.7973, name: 'Srinagar - 190001' },
  '226001': { lat: 26.8467, lng: 80.9462, name: 'Lucknow - 226001' },
  '208001': { lat: 26.4499, lng: 80.3319, name: 'Kanpur - 208001' },
  '282001': { lat: 27.1767, lng: 78.0081, name: 'Agra - 282001' },
  '221001': { lat: 25.3176, lng: 82.9739, name: 'Varanasi - 221001' },
  '211001': { lat: 25.4358, lng: 81.8463, name: 'Prayagraj - 211001' },
  '250001': { lat: 28.9845, lng: 77.7064, name: 'Meerut - 250001' },
  '474001': { lat: 26.2183, lng: 78.1828, name: 'Gwalior - 474001' },
  '482001': { lat: 23.1815, lng: 79.9864, name: 'Jabalpur - 482001' },
  '456001': { lat: 23.1765, lng: 75.7885, name: 'Ujjain - 456001' },
  '470001': { lat: 23.8388, lng: 78.7378, name: 'Sagar - 470001' },
  '457001': { lat: 23.3315, lng: 75.0367, name: 'Ratlam - 457001' },
  '382001': { lat: 23.2156, lng: 72.6369, name: 'Gandhinagar - 382001' },
  '364001': { lat: 21.7645, lng: 72.1519, name: 'Bhavnagar - 364001' },
  '361001': { lat: 22.4707, lng: 70.0577, name: 'Jamnagar - 361001' },
  '362001': { lat: 21.5222, lng: 70.4579, name: 'Junagadh - 362001' },
  '388001': { lat: 22.5645, lng: 72.9289, name: 'Anand - 388001' },
  '711101': { lat: 22.5958, lng: 88.2636, name: 'Howrah - 711101' },
  '713201': { lat: 23.5204, lng: 87.3119, name: 'Durgapur - 713201' },
  '713301': { lat: 23.6739, lng: 86.9524, name: 'Asansol - 713301' },
  '734001': { lat: 26.7271, lng: 88.3953, name: 'Siliguri - 734001' },
  '781001': { lat: 26.1445, lng: 91.7362, name: 'Guwahati - 781001' }
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

// Enhanced geocoding with comprehensive Indian cities and pincodes
async function geocodeAddress(address: string): Promise<{lat: number, lng: number}> {
  const addressLower = address.toLowerCase().trim();
  
  console.log('Geocoding address:', addressLower);
  
  // Direct match
  if (indianLocations[addressLower]) {
    console.log('Direct match found:', indianLocations[addressLower]);
    return { lat: indianLocations[addressLower].lat, lng: indianLocations[addressLower].lng };
  }
  
  // Check if it's a 6-digit pincode
  if (/^\d{6}$/.test(addressLower)) {
    console.log('Looking for pincode:', addressLower);
    if (indianLocations[addressLower]) {
      console.log('Pincode match found:', indianLocations[addressLower]);
      return { lat: indianLocations[addressLower].lat, lng: indianLocations[addressLower].lng };
    }
  }
  
  // Partial match search for cities
  for (const [key, coords] of Object.entries(indianLocations)) {
    // Skip pincode entries for partial matching
    if (/^\d{6}$/.test(key)) continue;
    
    if (addressLower.includes(key) || key.includes(addressLower)) {
      console.log('Partial city match found:', coords);
      return { lat: coords.lat, lng: coords.lng };
    }
  }
  
  // Check if it's a partial city name match in the full name
  const cityMatches = Object.entries(indianLocations).filter(([key, location]) => 
    location.name.toLowerCase().includes(addressLower) || 
    addressLower.includes(key.split(' ')[0])
  );
  
  if (cityMatches.length > 0) {
    console.log('City name match found:', cityMatches[0][1]);
    return { lat: cityMatches[0][1].lat, lng: cityMatches[0][1].lng };
  }
  
  console.log('No location found for:', addressLower);
  throw new Error('Location not found');
}

export default LocationDetector;
