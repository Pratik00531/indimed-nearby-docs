
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Doctor } from '@/types/doctor';

interface MapViewProps {
  doctors: Doctor[];
  userLocation: {lat: number, lng: number} | null;
}

const MapView: React.FC<MapViewProps> = ({ doctors, userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || doctors.length === 0) return;

    // Simple map implementation - In real app, use Google Maps or Mapbox
    // This is a placeholder showing doctor locations
    console.log('Rendering map with doctors:', doctors);
    console.log('User location:', userLocation);
  }, [doctors, userLocation]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Doctor Locations
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Placeholder for actual map */}
        <div 
          ref={mapContainer}
          className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-600">Interactive Map</p>
              <p className="text-sm text-gray-500">
                Showing {doctors.length} doctors near you
              </p>
              <p className="text-xs text-gray-400 mt-2">
                In a real implementation, this would show an interactive map<br/>
                with doctor locations, user location, and navigation features
              </p>
            </div>
          </div>
        </div>

        {/* Doctor List for Map */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-gray-900">Doctors on Map:</h4>
          {doctors.slice(0, 5).map((doctor, index) => (
            <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500">{doctor.clinic.address}</p>
                </div>
              </div>
              
              <div className="text-right">
                {doctor.distance && (
                  <p className="text-sm font-medium text-blue-600">{doctor.distance} km</p>
                )}
                <button 
                  onClick={() => {
                    const { lat, lng } = doctor.clinic.coordinates;
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                  }}
                  className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1 mt-1"
                >
                  <Navigation className="h-3 w-3" />
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
