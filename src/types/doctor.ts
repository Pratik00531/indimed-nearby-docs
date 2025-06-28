
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  qualifications: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  consultationFee: {
    online: number;
    offline: number;
  };
  clinic: {
    name: string;
    address: string;
    city: string;
    pincode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  availability: {
    nextSlot: string;
    mode: 'online' | 'offline' | 'both';
    schedule: {
      [key: string]: string[];
    };
  };
  contact: {
    phone: string;
    email?: string;
  };
  languages: string[];
  verified: boolean;
  distance?: number;
}

export interface FilterOptions {
  consultationMode: 'all' | 'online' | 'offline';
  minRating: number;
  maxFees: number;
  availability: 'all' | 'today' | 'tomorrow' | 'this-week';
  distance: number;
}

export interface SymptomSpecialtyMapping {
  [key: string]: string[];
}
