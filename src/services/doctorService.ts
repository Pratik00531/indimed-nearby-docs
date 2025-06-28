
import { Doctor, FilterOptions, SymptomSpecialtyMapping } from '@/types/doctor';

// Mock data with doctors in multiple cities
const mockDoctors: Doctor[] = [
  // Bangalore Doctors
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
  
  // Mumbai Doctors
  {
    id: '3',
    name: 'Dr. Sunita Patel',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Disease Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 12,
    rating: 4.7,
    reviewCount: 203,
    consultationFee: { online: 600, offline: 900 },
    clinic: {
      name: 'Mumbai Skin Clinic',
      address: '789 Bandra West, Mumbai',
      city: 'Mumbai',
      pincode: '400050',
      coordinates: { lat: 19.0596, lng: 72.8295 }
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
    languages: ['English', 'Hindi', 'Marathi'],
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
      name: 'Mumbai Bone Care',
      address: '321 Andheri East, Mumbai',
      city: 'Mumbai',
      pincode: '400069',
      coordinates: { lat: 19.1136, lng: 72.8697 }
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
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true
  },

  // Delhi Doctors
  {
    id: '5',
    name: 'Dr. Neha Gupta',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Digestive System Specialist',
    qualifications: ['MBBS', 'MD Internal Medicine', 'DM Gastroenterology'],
    experience: 14,
    rating: 4.8,
    reviewCount: 245,
    consultationFee: { online: 700, offline: 1000 },
    clinic: {
      name: 'Delhi Digestive Care',
      address: '456 CP, New Delhi',
      city: 'Delhi',
      pincode: '110001',
      coordinates: { lat: 28.7041, lng: 77.1025 }
    },
    availability: {
      nextSlot: 'Today 4:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['10:00 AM', '4:00 PM'],
        'Wednesday': ['10:00 AM', '4:00 PM'],
        'Friday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543214' },
    languages: ['English', 'Hindi'],
    verified: true
  },
  {
    id: '6',
    name: 'Dr. Rohit Sharma',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Specialist',
    qualifications: ['MBBS', 'MD Cardiology'],
    experience: 11,
    rating: 4.5,
    reviewCount: 189,
    consultationFee: { online: 600, offline: 900 },
    clinic: {
      name: 'Delhi Heart Center',
      address: '789 Lajpat Nagar, Delhi',
      city: 'Delhi',
      pincode: '110024',
      coordinates: { lat: 28.5677, lng: 77.2500 }
    },
    availability: {
      nextSlot: 'Tomorrow 11:00 AM',
      mode: 'both',
      schedule: {
        'Tuesday': ['11:00 AM', '5:00 PM'],
        'Thursday': ['11:00 AM', '5:00 PM'],
        'Saturday': ['9:00 AM', '1:00 PM']
      }
    },
    contact: { phone: '+91-9876543215' },
    languages: ['English', 'Hindi'],
    verified: true
  },

  // Surat Doctors
  {
    id: '7',
    name: 'Dr. Kiran Patel',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Care Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 9,
    rating: 4.6,
    reviewCount: 134,
    consultationFee: { online: 400, offline: 600 },
    clinic: {
      name: 'Surat Skin Clinic',
      address: '123 Ring Road, Surat',
      city: 'Surat',
      pincode: '395001',
      coordinates: { lat: 21.1702, lng: 72.8311 }
    },
    availability: {
      nextSlot: 'Today 6:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['9:00 AM', '6:00 PM'],
        'Wednesday': ['9:00 AM', '6:00 PM'],
        'Friday': ['9:00 AM', '3:00 PM']
      }
    },
    contact: { phone: '+91-9876543216' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },
  {
    id: '8',
    name: 'Dr. Vikram Shah',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Stomach & Liver Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 13,
    rating: 4.7,
    reviewCount: 167,
    consultationFee: { online: 500, offline: 750 },
    clinic: {
      name: 'Surat Digestive Center',
      address: '456 Athwa Lines, Surat',
      city: 'Surat',
      pincode: '395007',
      coordinates: { lat: 21.1959, lng: 72.8302 }
    },
    availability: {
      nextSlot: 'Tomorrow 3:00 PM',
      mode: 'both',
      schedule: {
        'Tuesday': ['3:00 PM', '7:00 PM'],
        'Thursday': ['3:00 PM', '7:00 PM'],
        'Saturday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543217' },
    languages: ['English', 'Hindi', 'Gujarati'],
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
    console.log('Starting search with query:', query, 'location:', userLocation);

    // Step 1: Filter by location first (within 30km range)
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

      // Filter doctors within 30km range
      const maxRange = 30; // 30km range
      results = results.filter(doctor => (doctor.distance || 0) <= maxRange);
      
      console.log(`Found ${results.length} doctors within ${maxRange}km`);
      
      // Sort by distance
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    // Step 2: Filter by disease/symptom/specialty if query is provided
    if (query && query.trim()) {
      const queryLower = query.toLowerCase().trim();
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
      
      console.log(`After disease/specialty filtering: ${results.length} doctors found`);
    }

    // Step 3: Apply other filters
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

    console.log('Final results after all filters:', results.length);
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
