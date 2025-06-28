
import { Doctor, FilterOptions, SymptomSpecialtyMapping } from '@/types/doctor';

// Enhanced Indian cities database with comprehensive coverage
const indianCitiesDatabase: {[key: string]: {lat: number, lng: number, name: string}} = {
  // Major Cities - Existing
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
  
  // Additional Major Cities
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
  'dibrugarh': { lat: 27.4728, lng: 94.9120, name: 'Dibrugarh, Assam' },
  'imphal': { lat: 24.8170, lng: 93.9368, name: 'Imphal, Manipur' },
  'agartala': { lat: 23.8315, lng: 91.2868, name: 'Agartala, Tripura' },
  'shillong': { lat: 25.5788, lng: 91.8933, name: 'Shillong, Meghalaya' },
  'aizawl': { lat: 23.7271, lng: 92.7176, name: 'Aizawl, Mizoram' },
  'kohima': { lat: 25.6751, lng: 94.1086, name: 'Kohima, Nagaland' },
  'itanagar': { lat: 27.0844, lng: 93.6053, name: 'Itanagar, Arunachal Pradesh' },
  'gangtok': { lat: 27.3389, lng: 88.6065, name: 'Gangtok, Sikkim' },
  'panaji': { lat: 15.4909, lng: 73.8278, name: 'Panaji, Goa' },
  'margao': { lat: 15.2993, lng: 73.9626, name: 'Margao, Goa' },
  'port blair': { lat: 11.6234, lng: 92.7265, name: 'Port Blair, Andaman and Nicobar Islands' },
  'kavaratti': { lat: 10.5593, lng: 72.642, name: 'Kavaratti, Lakshadweep' },
  'daman': { lat: 20.3974, lng: 72.8328, name: 'Daman, Daman and Diu' },
  'silvassa': { lat: 20.2738, lng: 72.9673, name: 'Silvassa, Dadra and Nagar Haveli' },
  'puducherry': { lat: 11.9416, lng: 79.8083, name: 'Puducherry' },
  'pondicherry': { lat: 11.9416, lng: 79.8083, name: 'Pondicherry' },
  
  // Tier 2 and Tier 3 cities
  'nellore': { lat: 14.4426, lng: 79.9865, name: 'Nellore, Andhra Pradesh' },
  'guntur': { lat: 16.3067, lng: 80.4365, name: 'Guntur, Andhra Pradesh' },
  'tirupati': { lat: 13.6288, lng: 79.4192, name: 'Tirupati, Andhra Pradesh' },
  'kadapa': { lat: 14.4673, lng: 78.8242, name: 'Kadapa, Andhra Pradesh' },
  'anantapur': { lat: 14.6819, lng: 77.6006, name: 'Anantapur, Andhra Pradesh' },
  'kurnool': { lat: 15.8281, lng: 78.0373, name: 'Kurnool, Andhra Pradesh' },
  'eluru': { lat: 16.7107, lng: 81.0953, name: 'Eluru, Andhra Pradesh' },
  'ongole': { lat: 15.5057, lng: 80.0499, name: 'Ongole, Andhra Pradesh' },
  'chittoor': { lat: 13.2172, lng: 79.1003, name: 'Chittoor, Andhra Pradesh' },
  'bellary': { lat: 15.1394, lng: 76.9214, name: 'Bellary, Karnataka' },
  'davanagere': { lat: 14.4644, lng: 75.917, name: 'Davanagere, Karnataka' },
  'bijapur': { lat: 16.8302, lng: 75.7100, name: 'Bijapur, Karnataka' },
  'shimoga': { lat: 13.9299, lng: 75.5681, name: 'Shimoga, Karnataka' },
  'tumkur': { lat: 13.3379, lng: 77.1022, name: 'Tumkur, Karnataka' },
  'hassan': { lat: 13.0033, lng: 76.0955, name: 'Hassan, Karnataka' },
  'mandya': { lat: 12.5244, lng: 76.8958, name: 'Mandya, Karnataka' },
  'udupi': { lat: 13.3409, lng: 74.7421, name: 'Udupi, Karnataka' },
  'chikmagalur': { lat: 13.3161, lng: 75.7720, name: 'Chikmagalur, Karnataka' },
  'erode': { lat: 11.3410, lng: 77.7172, name: 'Erode, Tamil Nadu' },
  'tirupur': { lat: 11.1085, lng: 77.3411, name: 'Tirupur, Tamil Nadu' },
  'vellore': { lat: 12.9165, lng: 79.1325, name: 'Vellore, Tamil Nadu' },
  'thanjavur': { lat: 10.7870, lng: 79.1378, name: 'Thanjavur, Tamil Nadu' },
  'dindigul': { lat: 10.3673, lng: 77.9803, name: 'Dindigul, Tamil Nadu' },
  'tirunelveli': { lat: 8.7139, lng: 77.7567, name: 'Tirunelveli, Tamil Nadu' },
  'cuddalore': { lat: 11.7447, lng: 79.7689, name: 'Cuddalore, Tamil Nadu' },
  'kumbakonam': { lat: 10.9601, lng: 79.3881, name: 'Kumbakonam, Tamil Nadu' },
  'karur': { lat: 10.9601, lng: 78.0766, name: 'Karur, Tamil Nadu' },
  'rajahmundry': { lat: 17.0005, lng: 81.8040, name: 'Rajahmundry, Andhra Pradesh' },
  'kakinada': { lat: 16.9891, lng: 82.2475, name: 'Kakinada, Andhra Pradesh' },
  'warangal': { lat: 17.9784, lng: 79.6010, name: 'Warangal, Telangana' },
  'karimnagar': { lat: 18.4386, lng: 79.1288, name: 'Karimnagar, Telangana' },
  'nizamabad': { lat: 18.6725, lng: 78.0941, name: 'Nizamabad, Telangana' },
  'khammam': { lat: 17.2473, lng: 80.1514, name: 'Khammam, Telangana' },
  'mahbubnagar': { lat: 16.7430, lng: 77.9965, name: 'Mahbubnagar, Telangana' },
  'adilabad': { lat: 19.6679, lng: 78.5311, name: 'Adilabad, Telangana' },
  'thrissur': { lat: 10.5276, lng: 76.2144, name: 'Thrissur, Kerala' },
  'kollam': { lat: 8.8932, lng: 76.6141, name: 'Kollam, Kerala' },
  'alappuzha': { lat: 9.4981, lng: 76.3388, name: 'Alappuzha, Kerala' },
  'kannur': { lat: 11.8745, lng: 75.3704, name: 'Kannur, Kerala' },
  'palakkad': { lat: 10.7867, lng: 76.6548, name: 'Palakkad, Kerala' },
  'kottayam': { lat: 9.5916, lng: 76.5222, name: 'Kottayam, Kerala' },
  'malappuram': { lat: 11.0510, lng: 76.0711, name: 'Malappuram, Kerala' },
  'bhilai': { lat: 21.1938, lng: 81.3509, name: 'Bhilai, Chhattisgarh' },
  'bilaspur': { lat: 22.0797, lng: 82.1409, name: 'Bilaspur, Chhattisgarh' },
  'korba': { lat: 22.3595, lng: 82.7501, name: 'Korba, Chhattisgarh' },
  'raigarh': { lat: 21.8974, lng: 83.3950, name: 'Raigarh, Chhattisgarh' },
  'durg': { lat: 21.1901, lng: 81.2849, name: 'Durg, Chhattisgarh' },
  'dhanbad': { lat: 23.7957, lng: 86.4304, name: 'Dhanbad, Jharkhand' },
  'jamshedpur': { lat: 22.8046, lng: 86.2029, name: 'Jamshedpur, Jharkhand' },
  'bokaro': { lat: 23.6693, lng: 86.1511, name: 'Bokaro, Jharkhand' },
  'deoghar': { lat: 24.4823, lng: 86.6961, name: 'Deoghar, Jharkhand' },
  'hazaribagh': { lat: 23.9929, lng: 85.3552, name: 'Hazaribagh, Jharkhand' },
  'berhampur': { lat: 19.3150, lng: 84.7941, name: 'Berhampur, Odisha' },
  'rourkela': { lat: 22.2604, lng: 84.8536, name: 'Rourkela, Odisha' },
  'sambalpur': { lat: 21.4669, lng: 83.9812, name: 'Sambalpur, Odisha' },
  'puri': { lat: 19.8135, lng: 85.8312, name: 'Puri, Odisha' },
  'balasore': { lat: 21.4942, lng: 86.9336, name: 'Balasore, Odisha' },
  'jeypore': { lat: 18.8563, lng: 82.5684, name: 'Jeypore, Odisha' },
  
  // Major Pincodes
  '400001': { lat: 19.0760, lng: 72.8777, name: 'Mumbai - 400001' },
  '110001': { lat: 28.7041, lng: 77.1025, name: 'Delhi - 110001' },
  '560001': { lat: 12.9716, lng: 77.5946, name: 'Bangalore - 560001' },
  '600001': { lat: 13.0827, lng: 80.2707, name: 'Chennai - 600001' },
  '500001': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad - 500001' },
  '411001': { lat: 18.5204, lng: 73.8567, name: 'Pune - 411001' },
  '700001': { lat: 22.5726, lng: 88.3639, name: 'Kolkata - 700001' },
  '380001': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad - 380001' },
  '302001': { lat: 26.9124, lng: 75.7873, name: 'Jaipur - 302001' },
  '395001': { lat: 21.1702, lng: 72.8311, name: 'Surat - 395001' }
};

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

// Function to generate realistic doctors for any Indian city
function generateDoctorsForCity(cityName: string, cityCoords: {lat: number, lng: number}): Doctor[] {
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
  const doctorsPerSpecialty = 2; // Generate 2 doctors per specialty for better coverage

  specialties.forEach((specialty, specIndex) => {
    for (let i = 0; i < doctorsPerSpecialty; i++) {
      const doctorIndex = (specIndex * doctorsPerSpecialty) + i;
      const experience = Math.floor(Math.random() * 15) + 5; // 5-20 years
      const rating = 4.2 + Math.random() * 0.6; // 4.2-4.8 rating
      const reviewCount = Math.floor(Math.random() * 200) + 50; // 50-250 reviews
      const onlineFee = 300 + Math.floor(Math.random() * 400); // 300-700
      const offlineFee = onlineFee + Math.floor(Math.random() * 300) + 200; // 200-500 more than online

      // Add slight variation to coordinates (within ~5km radius)
      const latVariation = (Math.random() - 0.5) * 0.1; // ~5km variation
      const lngVariation = (Math.random() - 0.5) * 0.1;

      doctors.push({
        id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-${specIndex}-${i}`,
        name: doctorNames[doctorIndex % doctorNames.length],
        specialty: specialty.name,
        subSpecialty: specialty.sub,
        qualifications: ['MBBS', `MD ${specialty.name}`],
        experience,
        rating: Math.round(rating * 10) / 10,
        reviewCount,
        consultationFee: { online: onlineFee, offline: offlineFee },
        clinic: {
          name: `${cityName} ${specialty.name} Clinic`,
          address: `${Math.floor(Math.random() * 999) + 1} Main Road, ${cityName}`,
          city: cityName,
          pincode: `${Math.floor(Math.random() * 90000) + 100000}`,
          coordinates: {
            lat: cityCoords.lat + latVariation,
            lng: cityCoords.lng + lngVariation
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
        distance: 0 // Will be calculated during search
      });
    }
  });

  return doctors;
}

// Function to get city coordinates from name or pincode
function getCityCoordinates(location: string): {lat: number, lng: number, cityName: string} | null {
  const locationLower = location.toLowerCase().trim();
  
  // Direct match
  if (indianCitiesDatabase[locationLower]) {
    const coords = indianCitiesDatabase[locationLower];
    return { lat: coords.lat, lng: coords.lng, cityName: coords.name };
  }
  
  // Partial match search
  for (const [key, coords] of Object.entries(indianCitiesDatabase)) {
    if (locationLower.includes(key) || key.includes(locationLower) || 
        coords.name.toLowerCase().includes(locationLower)) {
      return { lat: coords.lat, lng: coords.lng, cityName: coords.name };
    }
  }
  
  return null;
}

export const doctorService = {
  searchDoctors: async (
    query: string,
    userLocation: {lat: number, lng: number} | null,
    filters: FilterOptions
  ): Promise<Doctor[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let results: Doctor[] = [];
    console.log('Starting search with query:', query, 'location:', userLocation);

    // Step 1: Generate doctors based on user location
    if (userLocation) {
      // Find the closest city from our database
      let closestCity: {name: string, coords: {lat: number, lng: number}} | null = null;
      let minDistance = Infinity;
      
      for (const [key, coords] of Object.entries(indianCitiesDatabase)) {
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          coords.lat, coords.lng
        );
        if (distance < minDistance) {
          closestCity = { name: coords.name, coords: { lat: coords.lat, lng: coords.lng } };
          minDistance = distance;
        }
      }
      
      if (closestCity) {
        console.log(`Generating doctors for closest city: ${closestCity.name}`);
        results = generateDoctorsForCity(closestCity.name, closestCity.coords);
        
        // Calculate distances and filter within 30km
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
        const maxRange = 30;
        results = results.filter(doctor => (doctor.distance || 0) <= maxRange);
        console.log(`Found ${results.length} doctors within ${maxRange}km of ${closestCity.name}`);
        
        // Sort by distance
        results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }
    } else {
      // If no location provided, generate doctors for major cities
      const majorCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];
      results = [];
      
      majorCities.forEach(cityName => {
        const cityData = indianCitiesDatabase[cityName.toLowerCase()];
        if (cityData) {
          const cityDoctors = generateDoctorsForCity(cityName, cityData);
          results.push(...cityDoctors);
        }
      });
      
      console.log(`Generated ${results.length} doctors for major cities`);
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
    
    // If no results found but user has location, try expanding the search radius
    if (results.length === 0 && userLocation) {
      console.log('No results found, expanding search to nearby cities...');
      
      // Get all cities within 100km and generate doctors for them
      const nearbyCities = Object.entries(indianCitiesDatabase)
        .map(([key, coords]) => ({
          key,
          coords,
          distance: calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng)
        }))
        .filter(city => city.distance <= 100)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Take top 5 nearest cities
      
      results = [];
      nearbyCities.forEach(city => {
        const cityDoctors = generateDoctorsForCity(city.coords.name, city.coords);
        results.push(...cityDoctors);
      });
      
      // Apply the same filtering logic again
      if (query && query.trim()) {
        const queryLower = query.toLowerCase().trim();
        const matchingSpecialties = new Set<string>();
        
        Object.entries(symptomSpecialtyMap).forEach(([symptom, specialties]) => {
          if (queryLower.includes(symptom)) {
            specialties.forEach(spec => matchingSpecialties.add(spec.toLowerCase()));
          }
        });

        if (matchingSpecialties.size === 0) {
          matchingSpecialties.add(queryLower);
        }

        results = results.filter(doctor => 
          matchingSpecialties.has(doctor.specialty.toLowerCase()) ||
          doctor.name.toLowerCase().includes(queryLower) ||
          doctor.subSpecialty?.toLowerCase().includes(queryLower)
        );
      }
      
      console.log(`Expanded search found ${results.length} doctors in nearby cities`);
    }

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
