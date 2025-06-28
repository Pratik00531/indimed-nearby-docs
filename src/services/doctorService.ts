import { Doctor, FilterOptions, SymptomSpecialtyMapping } from '@/types/doctor';

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

// Function to generate realistic doctors for any location
function generateDoctorsForLocation(locationName: string, locationCoords: {lat: number, lng: number}): Doctor[] {
  const specialties = [
    { name: 'Dermatologist', sub: 'Skin & Hair Specialist' },
    { name: 'Cardiologist', sub: 'Heart Disease Specialist' },
    { name: 'Gastroenterologist', sub: 'Digestive Health Specialist' },
    { name: 'Orthopedist', sub: 'Bone & Joint Specialist' },
    { name: 'General Physician', sub: 'Family Medicine Specialist' },
    { name: 'Neurologist', sub: 'Brain & Nerve Specialist' },
    { name: 'Pulmonologist', sub: 'Lung & Respiratory Specialist' },
    { name: 'Endocrinologist', sub: 'Diabetes & Hormone Specialist' }
  ];

  const doctorNames = [
    'Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Dr. Amit Singh', 'Dr. Sunita Patel',
    'Dr. Vikram Agarwal', 'Dr. Kavita Modi', 'Dr. Suresh Gupta', 'Dr. Meera Shah',
    'Dr. Ashok Verma', 'Dr. Nisha Jain', 'Dr. Ravi Krishnan', 'Dr. Anjali Deshmukh',
    'Dr. Prakash Joshi', 'Dr. Rekha Singh', 'Dr. Kiran Malhotra', 'Dr. Santosh Tiwari'
  ];

  const doctors: Doctor[] = [];
  const doctorsPerSpecialty = 3; // Generate more doctors per specialty

  specialties.forEach((specialty, specIndex) => {
    for (let i = 0; i < doctorsPerSpecialty; i++) {
      const doctorIndex = (specIndex * doctorsPerSpecialty) + i;
      const experience = Math.floor(Math.random() * 15) + 5;
      const rating = 4.2 + Math.random() * 0.6;
      const reviewCount = Math.floor(Math.random() * 200) + 50;
      const onlineFee = 300 + Math.floor(Math.random() * 400);
      const offlineFee = onlineFee + Math.floor(Math.random() * 300) + 200;

      // Add variation to coordinates (within ~10km radius)
      const latVariation = (Math.random() - 0.5) * 0.15;
      const lngVariation = (Math.random() - 0.5) * 0.15;

      doctors.push({
        id: `${locationName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${specIndex}-${i}`,
        name: doctorNames[doctorIndex % doctorNames.length],
        specialty: specialty.name,
        subSpecialty: specialty.sub,
        qualifications: ['MBBS', `MD ${specialty.name}`],
        experience,
        rating: Math.round(rating * 10) / 10,
        reviewCount,
        consultationFee: { online: onlineFee, offline: offlineFee },
        clinic: {
          name: `${locationName} ${specialty.name} Clinic`,
          address: `${Math.floor(Math.random() * 999) + 1} Main Road, ${locationName}`,
          city: locationName,
          pincode: `${Math.floor(Math.random() * 90000) + 100000}`,
          coordinates: {
            lat: locationCoords.lat + latVariation,
            lng: locationCoords.lng + lngVariation
          }
        },
        availability: {
          nextSlot: Math.random() > 0.5 ? 'Today 3:00 PM' : 'Tomorrow 10:00 AM',
          mode: ['online', 'offline', 'both'][Math.floor(Math.random() * 3)] as 'online' | 'offline' | 'both',
          schedule: {
            'Monday': ['10:00 AM', '4:00 PM'],
            'Wednesday': ['10:00 AM', '4:00 PM'],
            'Friday': ['10:00 AM', '2:00 PM']
          }
        },
        contact: { phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}` },
        languages: ['English', 'Hindi'],
        verified: true,
        distance: 0
      });
    }
  });

  return doctors;
}

// Enhanced geocoding using Nominatim API
async function geocodeLocation(location: string): Promise<{lat: number, lng: number, locationName: string} | null> {
  try {
    console.log('Geocoding location:', location);
    
    const query = encodeURIComponent(`${location}, India`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=3&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'HealthFinder-App/1.0'
        }
      }
    );
    
    if (!response.ok) {
      console.error('Geocoding service error:', response.status);
      return null;
    }
    
    const results = await response.json();
    console.log('Geocoding results:', results);
    
    if (results && results.length > 0) {
      const bestResult = results[0];
      const lat = parseFloat(bestResult.lat);
      const lng = parseFloat(bestResult.lon);
      
      // Extract location name from address
      let locationName = location;
      if (bestResult.address) {
        const addr = bestResult.address;
        locationName = addr.city || addr.town || addr.village || addr.county || addr.state || location;
      }
      
      console.log('Geocoded successfully:', { lat, lng, locationName });
      return { lat, lng, locationName };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export const doctorService = {
  searchDoctors: async (
    query: string,
    userLocation: {lat: number, lng: number} | null,
    filters: FilterOptions
  ): Promise<Doctor[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    let results: Doctor[] = [];
    console.log('Starting search with query:', query, 'location:', userLocation);

    if (userLocation) {
      // Generate doctors around user's location
      console.log('Generating doctors for user location');
      results = generateDoctorsForLocation('Your Area', userLocation);
      
      // Calculate distances
      results = results.map(doctor => ({
        ...doctor,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          doctor.clinic.coordinates.lat,
          doctor.clinic.coordinates.lng
        )
      }));

      // Filter doctors within search radius
      const maxRange = filters.distance || 25;
      results = results.filter(doctor => (doctor.distance || 0) <= maxRange);
      console.log(`Found ${results.length} doctors within ${maxRange}km`);
      
      // Sort by distance
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else {
      // Generate doctors for major cities as fallback
      const majorCities = [
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
        { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
        { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
        { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
        { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 }
      ];
      
      results = [];
      majorCities.forEach(city => {
        const cityDoctors = generateDoctorsForLocation(city.name, city);
        results.push(...cityDoctors);
      });
      
      console.log(`Generated ${results.length} doctors for major cities`);
    }

    // Filter by disease/symptom/specialty if query is provided
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
      
      console.log(`After specialty filtering: ${results.length} doctors found`);
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
