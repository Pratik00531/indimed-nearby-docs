
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

// More realistic Indian doctor names
const realisticDoctorNames = [
  'Dr. Rajesh Kumar Sharma', 'Dr. Priya Agarwal', 'Dr. Amit Singh Patel', 'Dr. Sunita Rani Gupta',
  'Dr. Vikram Chand Joshi', 'Dr. Kavita Devi Modi', 'Dr. Suresh Kumar Verma', 'Dr. Meera Shah',
  'Dr. Ashok Kumar Singh', 'Dr. Nisha Kumari Jain', 'Dr. Ravi Shankar Krishnan', 'Dr. Anjali Deshmukh',
  'Dr. Prakash Chandra Joshi', 'Dr. Rekha Singh', 'Dr. Kiran Malhotra', 'Dr. Santosh Tiwari',
  'Dr. Deepak Kumar Agarwal', 'Dr. Pooja Sharma', 'Dr. Manoj Singh Chauhan', 'Dr. Sita Devi Yadav',
  'Dr. Ramesh Chand Gupta', 'Dr. Seema Agarwal', 'Dr. Vinod Kumar Patel', 'Dr. Mamta Singh',
  'Dr. Anil Kumar Sharma', 'Dr. Rashmi Agarwal', 'Dr. Sanjay Kumar Jain', 'Dr. Usha Devi Modi'
];

// Realistic hospital/clinic name patterns
const hospitalPatterns = [
  'City Hospital', 'Medical Center', 'Healthcare Clinic', 'Specialty Hospital',
  'Nursing Home', 'Diagnostic Center', 'Multi-Specialty Hospital', 'Care Hospital',
  'Health Center', 'Polyclinic', 'Super Specialty Hospital', 'Medical Institute'
];

// Function to get realistic clinic name based on location and specialty
function getRealisticClinicName(locationName: string, specialty: string): string {
  const patterns = [
    `${locationName} ${specialty} Clinic`,
    `${specialty} Care Center, ${locationName}`,
    `${locationName} ${hospitalPatterns[Math.floor(Math.random() * hospitalPatterns.length)]}`,
    `Advanced ${specialty} Center`,
    `${locationName} Medical Center`,
    `${specialty} Specialty Hospital`
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
}

// Function to generate realistic addresses based on actual location data
async function getRealisticAddress(locationCoords: {lat: number, lng: number}, locationName: string): Promise<string> {
  try {
    // Try to get detailed address information from reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationCoords.lat}&lon=${locationCoords.lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'HealthFinder-App/1.0'
        }
      }
    );
    
    if (response.ok) {
      const result = await response.json();
      if (result && result.address) {
        const addr = result.address;
        const roadNames = [
          addr.road, addr.pedestrian, addr.footway, addr.cycleway,
          'Main Road', 'Station Road', 'Market Road', 'Hospital Road',
          'Gandhi Road', 'Nehru Street', 'Park Street', 'Commercial Street'
        ].filter(Boolean);
        
        const selectedRoad = roadNames[Math.floor(Math.random() * roadNames.length)] || 'Main Road';
        const buildingNumber = Math.floor(Math.random() * 999) + 1;
        
        return `${buildingNumber}, ${selectedRoad}, ${locationName}`;
      }
    }
  } catch (error) {
    console.log('Could not fetch detailed address, using generic format');
  }
  
  // Fallback to generic but realistic address format
  const roadNames = ['Main Road', 'Station Road', 'Market Street', 'Gandhi Road', 'Commercial Complex'];
  const buildingNumber = Math.floor(Math.random() * 999) + 1;
  const selectedRoad = roadNames[Math.floor(Math.random() * roadNames.length)];
  
  return `${buildingNumber}, ${selectedRoad}, ${locationName}`;
}

// Enhanced function to generate more realistic doctors for any location
async function generateRealisticDoctorsForLocation(locationName: string, locationCoords: {lat: number, lng: number}): Promise<Doctor[]> {
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

  const doctors: Doctor[] = [];
  const doctorsPerSpecialty = 3;

  for (let specIndex = 0; specIndex < specialties.length; specIndex++) {
    const specialty = specialties[specIndex];
    
    for (let i = 0; i < doctorsPerSpecialty; i++) {
      const doctorIndex = (specIndex * doctorsPerSpecialty) + i;
      const experience = Math.floor(Math.random() * 15) + 5;
      const rating = 4.1 + Math.random() * 0.8; // More realistic rating range
      const reviewCount = Math.floor(Math.random() * 150) + 25;
      const onlineFee = 300 + Math.floor(Math.random() * 400);
      const offlineFee = onlineFee + Math.floor(Math.random() * 300) + 200;

      // Add variation to coordinates (within ~5-10km radius for more realistic spread)
      const latVariation = (Math.random() - 0.5) * 0.08;
      const lngVariation = (Math.random() - 0.5) * 0.08;

      const clinicCoords = {
        lat: locationCoords.lat + latVariation,
        lng: locationCoords.lng + lngVariation
      };

      // Get realistic address
      const address = await getRealisticAddress(clinicCoords, locationName);

      doctors.push({
        id: `${locationName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${specIndex}-${i}`,
        name: realisticDoctorNames[doctorIndex % realisticDoctorNames.length],
        specialty: specialty.name,
        subSpecialty: specialty.sub,
        qualifications: ['MBBS', `MD ${specialty.name}`, 'DGO'][Math.random() > 0.7 ? 'slice' : 'slice'](0, 2),
        experience,
        rating: Math.round(rating * 10) / 10,
        reviewCount,
        consultationFee: { online: onlineFee, offline: offlineFee },
        clinic: {
          name: getRealisticClinicName(locationName, specialty.name),
          address,
          city: locationName,
          pincode: `${Math.floor(Math.random() * 90000) + 100000}`,
          coordinates: clinicCoords
        },
        availability: {
          nextSlot: Math.random() > 0.6 ? 'Today 3:00 PM' : Math.random() > 0.5 ? 'Tomorrow 10:00 AM' : 'Day after tomorrow 2:00 PM',
          mode: ['online', 'offline', 'both'][Math.floor(Math.random() * 3)] as 'online' | 'offline' | 'both',
          schedule: {
            'Monday': ['10:00 AM', '4:00 PM'],
            'Wednesday': ['10:00 AM', '4:00 PM'],
            'Friday': ['10:00 AM', '2:00 PM']
          }
        },
        contact: { phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}` },
        languages: ['English', 'Hindi', 'Local Language'],
        verified: Math.random() > 0.2, // 80% verification rate
        distance: 0
      });
    }
  }

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
      // Try to get location name from coordinates for more realistic data
      let locationName = 'Your Area';
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.lat}&lon=${userLocation.lng}&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'HealthFinder-App/1.0'
            }
          }
        );
        
        if (response.ok) {
          const result = await response.json();
          if (result && result.address) {
            const addr = result.address;
            locationName = addr.city || addr.town || addr.village || addr.county || addr.state || 'Your Area';
          }
        }
      } catch (error) {
        console.log('Could not determine location name, using default');
      }

      console.log(`Generating realistic doctors for ${locationName}`);
      results = await generateRealisticDoctorsForLocation(locationName, userLocation);
      
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
      for (const city of majorCities) {
        const cityDoctors = await generateRealisticDoctorsForLocation(city.name, city);
        results.push(...cityDoctors);
      }
      
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
