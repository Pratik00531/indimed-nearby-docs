
import React from 'react';
import { Star, Clock, MapPin, Phone, Navigation, Video, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Doctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  userLocation: {lat: number, lng: number} | null;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, userLocation }) => {
  const handleBookAppointment = (mode: 'online' | 'offline') => {
    // In real app, this would open booking modal or navigate to booking page
    console.log(`Booking ${mode} appointment with Dr. ${doctor.name}`);
  };

  const handleCall = () => {
    window.open(`tel:${doctor.contact.phone}`, '_self');
  };

  const handleDirections = () => {
    const { lat, lng } = doctor.clinic.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              {doctor.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
            {doctor.subSpecialty && (
              <p className="text-sm text-gray-600">{doctor.subSpecialty}</p>
            )}
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>{doctor.experience} years exp.</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span>({doctor.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Qualifications */}
        <div className="flex flex-wrap gap-1">
          {doctor.qualifications.map((qual, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {qual}
            </Badge>
          ))}
        </div>

        {/* Clinic Info */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{doctor.clinic.name}</p>
              <p className="text-gray-600">{doctor.clinic.address}</p>
              {doctor.distance && (
                <p className="text-blue-600 font-medium">{doctor.distance} km away</p>
              )}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-green-600 font-medium">{doctor.availability.nextSlot}</span>
        </div>

        {/* Languages */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Languages: </span>
          {doctor.languages.join(', ')}
        </div>

        {/* Consultation Fees */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Online</span>
            </div>
            <span className="font-semibold text-blue-600">₹{doctor.consultationFee.online}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">In-person</span>
            </div>
            <span className="font-semibold text-green-600">₹{doctor.consultationFee.offline}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {doctor.availability.mode !== 'offline' && (
            <Button 
              onClick={() => handleBookAppointment('online')}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Video className="h-4 w-4 mr-2" />
              Book Online
            </Button>
          )}
          
          {doctor.availability.mode !== 'online' && (
            <Button 
              onClick={() => handleBookAppointment('offline')}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <User className="h-4 w-4 mr-2" />
              Visit Clinic
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleCall}
            variant="outline"
            size="sm"
            className="text-gray-600"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          
          <Button
            onClick={handleDirections}
            variant="outline"
            size="sm"
            className="text-gray-600"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
