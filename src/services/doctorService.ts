
import { Doctor, FilterOptions, SymptomSpecialtyMapping } from '@/types/doctor';

// Mock data - In real app, this would come from API
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin & Hair Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 8,
    rating: 4.8,
    reviewCount: 156,
    consultationFee: { online: 500, offline: 800 },
    clinic: {
      name: 'Skin Care Clinic',
      address: '123 MG Road, Bangalore',
      city: 'Bangalore',
      pincode: '560001',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    availability: {
      nextSlot: 'Today 3:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['9:00 AM', '2:00 PM', '6:00 PM'],
        'Tuesday': ['9:00 AM', '2:00 PM'],
        'Wednesday': ['9:00 AM', '2:00 PM', '6:00 PM']
      }
    },
    contact: { phone: '+91-9876543210' },
    languages: ['English', 'Hindi', 'Kannada'],
    verified: true
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology', 'DM'],
    experience: 15,
    rating: 4.9,
    reviewCount: 289,
    consultationFee: { online: 800, offline: 1200 },
    clinic: {
      name: 'Heart Care Hospital',
      address: '456 Brigade Road, Bangalore',
      city: 'Bangalore',
      pincode: '560025',
      coordinates: { lat: 12.9698, lng: 77.6205 }
    },
    availability: {
      nextSlot: 'Tomorrow 10:00 AM',
      mode: 'both',
      schedule: {
        'Monday': ['10:00 AM', '4:00 PM'],
        'Wednesday': ['10:00 AM', '4:00 PM'],
        'Friday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543211' },
    languages: ['English', 'Hindi', 'Tamil'],
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Sunita Patel',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Digestive System Specialist',
    qualifications: ['MBBS', 'MD Internal Medicine', 'DM Gastroenterology'],
    experience: 12,
    rating: 4.7,
    reviewCount: 203,
    consultationFee: { online: 600, offline: 900 },
    clinic: {
      name: 'Digestive Care Center',
      address: '789 Koramangala, Bangalore',
      city: 'Bangalore',
      pincode: '560034',
      coordinates: { lat: 12.9279, lng: 77.6271 }
    },
    availability: {
      nextSlot: 'Today 5:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['11:00 AM', '5:00 PM'],
        'Tuesday': ['11:00 AM', '3:00 PM'],
        'Thursday': ['11:00 AM', '5:00 PM']
      }
    },
    contact: { phone: '+91-9876543212' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },
  {
    id: '4',
    name: 'Dr. Amit Singh',
    specialty: 'Orthopedist',
    subSpecialty: 'Bone & Joint Specialist',
    qualifications: ['MBBS', 'MS Orthopedics'],
    experience: 10,
    rating: 4.6,
    reviewCount: 178,
    consultationFee: { online: 450, offline: 700 },
    clinic: {
      name: 'Bone Care Clinic',
      address: '321 Indiranagar, Bangalore',
      city: 'Bangalore',
      pincode: '560038',
      coordinates: { lat: 12.9719, lng: 77.6412 }
    },
    availability: {
      nextSlot: 'Tomorrow 2:00 PM',
      mode: 'offline',
      schedule: {
        'Tuesday': ['2:00 PM', '6:00 PM'],
        'Thursday': ['2:00 PM', '6:00 PM'],
        'Saturday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543213' },
    languages: ['English', 'Hindi', 'Punjabi'],
    verified: true
  }
];

const symptomSpecialtyMap: SymptomSpecialtyMapping = {
  'skin': ['Dermatologist'],
  'skin disease': ['Dermatologist'],
  'acne': ['Dermatologist'],
  'rash': ['Dermatologist'],
  'hair loss': ['Dermatologist', 'Trichologist'],
  'heart': ['Cardiologist'],
  'chest pain': ['Cardiologist', 'General Physician'],
  'heart disease': ['Cardiologist'],
  'high bp': ['Cardiologist', 'General Physician'],
  'hypertension': ['Cardiologist', 'General Physician'],
  'stomach': ['Gastroenterologist', 'General Physician'],
  'stomach pain': ['Gastroenterologist', 'General Physician'],
  'digestive': ['Gastroenterologist'],
  'acidity': ['Gastroenterologist', 'General Physician'],
  'back pain': ['Orthopedist', 'Neurologist'],
  'joint pain': ['Orthopedist', 'Rheumatologist'],
  'bone': ['Orthopedist'],
  'fracture': ['Orthopedist'],
  'fever': ['General Physician', 'Internal Medicine'],
  'headache': ['Neurologist', 'General Physician'],
  'diabetes': ['Endocrinologist', 'General Physician'],
  'cough': ['Pulmonologist', 'General Physician']
};

export const doctorService = {
  searchDoctors: async (
    query: string,
    userLocation: {lat: number, lng: number} | null,
    filters: FilterOptions
  ): Promise<Doctor[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let results = [...mockDoctors];

    // Filter by symptom/specialty
    if (query) {
      const queryLower = query.toLowerCase();
      const matchingSpecialties = new Set<string>();
      
      // Check symptom mapping
      Object.entries(symptomSpecialtyMap).forEach(([symptom, specialties]) => {
        if (queryLower.includes(symptom)) {
          specialties.forEach(spec => matchingSpecialties.add(spec.toLowerCase()));
        }
      });

      // If no symptom match, search by specialty name directly
      if (matchingSpecialties.size === 0) {
        matchingSpecialties.add(queryLower);
      }

      results = results.filter(doctor => 
        matchingSpecialties.has(doctor.specialty.toLowerCase()) ||
        doctor.name.toLowerCase().includes(queryLower) ||
        doctor.subSpecialty?.toLowerCase().includes(queryLower)
      );
    }

    // Calculate distances if user location is available
    if (userLocation) {
      results = results.map(doctor => ({
        ...doctor,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          doctor.clinic.coordinates.lat,
          doctor.clinic.coordinates.lng
        )
      }));

      // Filter by distance
      results = results.filter(doctor => (doctor.distance || 0) <= filters.distance);
      
      // Sort by distance
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    // Apply other filters
    results = results.filter(doctor => {
      if (filters.consultationMode !== 'all') {
        if (filters.consultationMode === 'online' && doctor.availability.mode === 'offline') return false;
        if (filters.consultationMode === 'offline' && doctor.availability.mode === 'online') return false;
      }

      if (doctor.rating < filters.minRating) return false;

      const maxFee = Math.max(doctor.consultationFee.online, doctor.consultationFee.offline);
      if (maxFee > filters.maxFees) return false;

      return true;
    });

    return results;
  },

  getSpecialtyForSymptom: (symptom: string): string[] => {
    const symptomLower = symptom.toLowerCase();
    for (const [key, specialties] of Object.entries(symptomSpecialtyMap)) {
      if (symptomLower.includes(key)) {
        return specialties;
      }
    }
    return ['General Physician'];
  }
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 10) / 10;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
