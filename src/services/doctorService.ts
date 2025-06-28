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

  // Chennai Doctors
  {
    id: '7',
    name: 'Dr. Lakshmi Raman',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Care Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 9,
    rating: 4.6,
    reviewCount: 134,
    consultationFee: { online: 400, offline: 600 },
    clinic: {
      name: 'Chennai Skin Clinic',
      address: '123 T Nagar, Chennai',
      city: 'Chennai',
      pincode: '600017',
      coordinates: { lat: 13.0827, lng: 80.2707 }
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
    languages: ['English', 'Hindi', 'Tamil'],
    verified: true
  },
  {
    id: '8',
    name: 'Dr. Arjun Krishnan',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology', 'DM'],
    experience: 13,
    rating: 4.7,
    reviewCount: 167,
    consultationFee: { online: 500, offline: 750 },
    clinic: {
      name: 'Chennai Heart Center',
      address: '456 Anna Nagar, Chennai',
      city: 'Chennai',
      pincode: '600040',
      coordinates: { lat: 13.0850, lng: 80.2101 }
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
    languages: ['English', 'Hindi', 'Tamil'],
    verified: true
  },

  // Hyderabad Doctors
  {
    id: '9',
    name: 'Dr. Srinivas Reddy',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Digestive Health Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 12,
    rating: 4.5,
    reviewCount: 198,
    consultationFee: { online: 550, offline: 800 },
    clinic: {
      name: 'Hyderabad Digestive Care',
      address: '789 Banjara Hills, Hyderabad',
      city: 'Hyderabad',
      pincode: '500034',
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    availability: {
      nextSlot: 'Today 2:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['2:00 PM', '6:00 PM'],
        'Wednesday': ['2:00 PM', '6:00 PM'],
        'Friday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543218' },
    languages: ['English', 'Hindi', 'Telugu'],
    verified: true
  },
  {
    id: '10',
    name: 'Dr. Meera Shah',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin & Hair Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 8,
    rating: 4.4,
    reviewCount: 145,
    consultationFee: { online: 450, offline: 650 },
    clinic: {
      name: 'Hyderabad Skin Care',
      address: '321 Jubilee Hills, Hyderabad',
      city: 'Hyderabad',
      pincode: '500033',
      coordinates: { lat: 17.4126, lng: 78.4071 }
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
    contact: { phone: '+91-9876543219' },
    languages: ['English', 'Hindi', 'Telugu'],
    verified: true
  },

  // Pune Doctors
  {
    id: '11',
    name: 'Dr. Anil Deshmukh',
    specialty: 'Orthopedist',
    subSpecialty: 'Bone & Joint Specialist',
    qualifications: ['MBBS', 'MS Orthopedics'],
    experience: 15,
    rating: 4.6,
    reviewCount: 234,
    consultationFee: { online: 500, offline: 750 },
    clinic: {
      name: 'Pune Bone Care',
      address: '456 FC Road, Pune',
      city: 'Pune',
      pincode: '411005',
      coordinates: { lat: 18.5204, lng: 73.8567 }
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
    contact: { phone: '+91-9876543220' },
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true
  },
  {
    id: '12',
    name: 'Dr. Priya Kulkarni',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology'],
    experience: 10,
    rating: 4.7,
    reviewCount: 189,
    consultationFee: { online: 600, offline: 900 },
    clinic: {
      name: 'Pune Heart Center',
      address: '789 Koregaon Park, Pune',
      city: 'Pune',
      pincode: '411001',
      coordinates: { lat: 18.5074, lng: 73.8077 }
    },
    availability: {
      nextSlot: 'Tomorrow 9:00 AM',
      mode: 'both',
      schedule: {
        'Tuesday': ['9:00 AM', '3:00 PM'],
        'Thursday': ['9:00 AM', '3:00 PM'],
        'Saturday': ['9:00 AM', '12:00 PM']
      }
    },
    contact: { phone: '+91-9876543221' },
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true
  },

  // Kolkata Doctors
  {
    id: '13',
    name: 'Dr. Soumya Banerjee',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Liver & Digestive Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 16,
    rating: 4.8,
    reviewCount: 267,
    consultationFee: { online: 650, offline: 950 },
    clinic: {
      name: 'Kolkata Digestive Care',
      address: '123 Park Street, Kolkata',
      city: 'Kolkata',
      pincode: '700016',
      coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    availability: {
      nextSlot: 'Today 3:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['11:00 AM', '3:00 PM', '6:00 PM'],
        'Wednesday': ['11:00 AM', '3:00 PM'],
        'Friday': ['11:00 AM', '3:00 PM', '6:00 PM']
      }
    },
    contact: { phone: '+91-9876543222' },
    languages: ['English', 'Hindi', 'Bengali'],
    verified: true
  },
  {
    id: '14',
    name: 'Dr. Rajesh Ghosh',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Disease Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 11,
    rating: 4.5,
    reviewCount: 156,
    consultationFee: { online: 450, offline: 650 },
    clinic: {
      name: 'Kolkata Skin Clinic',
      address: '456 Salt Lake, Kolkata',
      city: 'Kolkata',
      pincode: '700064',
      coordinates: { lat: 22.5448, lng: 88.3426 }
    },
    availability: {
      nextSlot: 'Tomorrow 2:00 PM',
      mode: 'both',
      schedule: {
        'Tuesday': ['2:00 PM', '6:00 PM'],
        'Thursday': ['2:00 PM', '6:00 PM'],
        'Saturday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543223' },
    languages: ['English', 'Hindi', 'Bengali'],
    verified: true
  },

  // Ahmedabad Doctors
  {
    id: '15',
    name: 'Dr. Kiran Patel',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology', 'DM'],
    experience: 14,
    rating: 4.6,
    reviewCount: 201,
    consultationFee: { online: 550, offline: 800 },
    clinic: {
      name: 'Ahmedabad Heart Care',
      address: '789 CG Road, Ahmedabad',
      city: 'Ahmedabad',
      pincode: '380009',
      coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    availability: {
      nextSlot: 'Today 5:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['10:00 AM', '5:00 PM'],
        'Wednesday': ['10:00 AM', '5:00 PM'],
        'Friday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543224' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },
  {
    id: '16',
    name: 'Dr. Nisha Shah',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin & Hair Care',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 9,
    rating: 4.4,
    reviewCount: 123,
    consultationFee: { online: 400, offline: 600 },
    clinic: {
      name: 'Ahmedabad Skin Clinic',
      address: '321 Satellite, Ahmedabad',
      city: 'Ahmedabad',
      pincode: '380015',
      coordinates: { lat: 23.0395, lng: 72.5661 }
    },
    availability: {
      nextSlot: 'Tomorrow 10:00 AM',
      mode: 'both',
      schedule: {
        'Tuesday': ['10:00 AM', '4:00 PM'],
        'Thursday': ['10:00 AM', '4:00 PM'],
        'Saturday': ['10:00 AM', '1:00 PM']
      }
    },
    contact: { phone: '+91-9876543225' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },

  // Surat Doctors
  {
    id: '17',
    name: 'Dr. Vikram Patel',
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
      coordinates: { lat: 21.1702, lng: 72.8311 }
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
    contact: { phone: '+91-9876543226' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },
  {
    id: '18',
    name: 'Dr. Kavita Modi',
    specialty: 'Orthopedist',
    subSpecialty: 'Bone & Joint Specialist',
    qualifications: ['MBBS', 'MS Orthopedics'],
    experience: 12,
    rating: 4.5,
    reviewCount: 143,
    consultationFee: { online: 450, offline: 650 },
    clinic: {
      name: 'Surat Bone Care',
      address: '789 Ring Road, Surat',
      city: 'Surat',
      pincode: '395002',
      coordinates: { lat: 21.1959, lng: 72.8302 }
    },
    availability: {
      nextSlot: 'Today 1:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['1:00 PM', '5:00 PM'],
        'Wednesday': ['1:00 PM', '5:00 PM'],
        'Friday': ['9:00 AM', '1:00 PM']
      }
    },
    contact: { phone: '+91-9876543227' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },

  // Jaipur Doctors
  {
    id: '19',
    name: 'Dr. Rajendra Agarwal',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology'],
    experience: 18,
    rating: 4.8,
    reviewCount: 312,
    consultationFee: { online: 700, offline: 1000 },
    clinic: {
      name: 'Jaipur Heart Center',
      address: '123 MI Road, Jaipur',
      city: 'Jaipur',
      pincode: '302001',
      coordinates: { lat: 26.9124, lng: 75.7873 }
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
    contact: { phone: '+91-9876543228' },
    languages: ['English', 'Hindi'],
    verified: true
  },
  {
    id: '20',
    name: 'Dr. Sunita Sharma',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Care Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 10,
    rating: 4.6,
    reviewCount: 178,
    consultationFee: { online: 500, offline: 700 },
    clinic: {
      name: 'Jaipur Skin Clinic',
      address: '456 C Scheme, Jaipur',
      city: 'Jaipur',
      pincode: '302001',
      coordinates: { lat: 26.9124, lng: 75.7873 }
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
    contact: { phone: '+91-9876543229' },
    languages: ['English', 'Hindi'],
    verified: true
  },

  // Lucknow Doctors
  {
    id: '21',
    name: 'Dr. Ashok Verma',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Digestive Health Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 14,
    rating: 4.7,
    reviewCount: 198,
    consultationFee: { online: 600, offline: 850 },
    clinic: {
      name: 'Lucknow Digestive Care',
      address: '789 Hazratganj, Lucknow',
      city: 'Lucknow',
      pincode: '226001',
      coordinates: { lat: 26.8467, lng: 80.9462 }
    },
    availability: {
      nextSlot: 'Today 3:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['11:00 AM', '3:00 PM', '6:00 PM'],
        'Wednesday': ['11:00 AM', '3:00 PM'],
        'Friday': ['11:00 AM', '3:00 PM', '6:00 PM']
      }
    },
    contact: { phone: '+91-9876543230' },
    languages: ['English', 'Hindi'],
    verified: true
  },
  {
    id: '22',
    name: 'Dr. Rekha Singh',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Disease Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 8,
    rating: 4.4,
    reviewCount: 112,
    consultationFee: { online: 400, offline: 600 },
    clinic: {
      name: 'Lucknow Skin Care',
      address: '321 Gomti Nagar, Lucknow',
      city: 'Lucknow',
      pincode: '226010',
      coordinates: { lat: 26.8467, lng: 80.9462 }
    },
    availability: {
      nextSlot: 'Tomorrow 2:00 PM',
      mode: 'both',
      schedule: {
        'Tuesday': ['2:00 PM', '6:00 PM'],
        'Thursday': ['2:00 PM', '6:00 PM'],
        'Saturday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543231' },
    languages: ['English', 'Hindi'],
    verified: true
  },

  // Kanpur Doctors
  {
    id: '23',
    name: 'Dr. Suresh Gupta',
    specialty: 'Orthopedist',
    subSpecialty: 'Bone & Joint Specialist',
    qualifications: ['MBBS', 'MS Orthopedics'],
    experience: 16,
    rating: 4.6,
    reviewCount: 234,
    consultationFee: { online: 500, offline: 750 },
    clinic: {
      name: 'Kanpur Bone Care',
      address: '456 Mall Road, Kanpur',
      city: 'Kanpur',
      pincode: '208001',
      coordinates: { lat: 26.4499, lng: 80.3319 }
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
    contact: { phone: '+91-9876543232' },
    languages: ['English', 'Hindi'],
    verified: true
  },
  {
    id: '24',
    name: 'Dr. Madhuri Agarwal',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology'],
    experience: 12,
    rating: 4.5,
    reviewCount: 167,
    consultationFee: { online: 550, offline: 800 },
    clinic: {
      name: 'Kanpur Heart Center',
      address: '789 Civil Lines, Kanpur',
      city: 'Kanpur',
      pincode: '208001',
      coordinates: { lat: 26.4499, lng: 80.3319 }
    },
    availability: {
      nextSlot: 'Tomorrow 9:00 AM',
      mode: 'both',
      schedule: {
        'Tuesday': ['9:00 AM', '3:00 PM'],
        'Thursday': ['9:00 AM', '3:00 PM'],
        'Saturday': ['9:00 AM', '12:00 PM']
      }
    },
    contact: { phone: '+91-9876543233' },
    languages: ['English', 'Hindi'],
    verified: true
  },

  // Nagpur Doctors
  {
    id: '25',
    name: 'Dr. Prakash Joshi',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Liver & Digestive Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 15,
    rating: 4.7,
    reviewCount: 189,
    consultationFee: { online: 600, offline: 900 },
    clinic: {
      name: 'Nagpur Digestive Care',
      address: '123 Sitabuldi, Nagpur',
      city: 'Nagpur',
      pincode: '440012',
      coordinates: { lat: 21.1458, lng: 79.0882 }
    },
    availability: {
      nextSlot: 'Today 3:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['11:00 AM', '3:00 PM', '6:00 PM'],
        'Wednesday': ['11:00 AM', '3:00 PM'],
        'Friday': ['11:00 AM', '3:00 PM', '6:00 PM']
      }
    },
    contact: { phone: '+91-9876543234' },
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true
  },
  {
    id: '26',
    name: 'Dr. Anjali Deshmukh',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin & Hair Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 9,
    rating: 4.5,
    reviewCount: 134,
    consultationFee: { online: 450, offline: 650 },
    clinic: {
      name: 'Nagpur Skin Clinic',
      address: '456 Dharampeth, Nagpur',
      city: 'Nagpur',
      pincode: '440010',
      coordinates: { lat: 21.1458, lng: 79.0882 }
    },
    availability: {
      nextSlot: 'Tomorrow 10:00 AM',
      mode: 'both',
      schedule: {
        'Tuesday': ['10:00 AM', '4:00 PM'],
        'Thursday': ['10:00 AM', '4:00 PM'],
        'Saturday': ['10:00 AM', '1:00 PM']
      }
    },
    contact: { phone: '+91-9876543235' },
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true
  },

  // Indore Doctors
  {
    id: '27',
    name: 'Dr. Rajesh Malhotra',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology', 'DM'],
    experience: 17,
    rating: 4.8,
    reviewCount: 278,
    consultationFee: { online: 650, offline: 950 },
    clinic: {
      name: 'Indore Heart Care',
      address: '789 MG Road, Indore',
      city: 'Indore',
      pincode: '452001',
      coordinates: { lat: 22.7196, lng: 75.8577 }
    },
    availability: {
      nextSlot: 'Today 5:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['10:00 AM', '5:00 PM'],
        'Wednesday': ['10:00 AM', '5:00 PM'],
        'Friday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543236' },
    languages: ['English', 'Hindi'],
    verified: true
  },
  {
    id: '28',
    name: 'Dr. Kavya Sharma',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Care Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 11,
    rating: 4.6,
    reviewCount: 156,
    consultationFee: { online: 500, offline: 700 },
    clinic: {
      name: 'Indore Skin Clinic',
      address: '321 Vijay Nagar, Indore',
      city: 'Indore',
      pincode: '452010',
      coordinates: { lat: 22.7196, lng: 75.8577 }
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
    contact: { phone: '+91-9876543237' },
    languages: ['English', 'Hindi'],
    verified: true
  },

  // Bhopal Doctors
  {
    id: '29',
    name: 'Dr. Santosh Tiwari',
    specialty: 'Orthopedist',
    subSpecialty: 'Bone & Joint Specialist',
    qualifications: ['MBBS', 'MS Orthopedics'],
    experience: 13,
    rating: 4.5,
    reviewCount: 189,
    consultationFee: { online: 450, offline: 700 },
    clinic: {
      name: 'Bhopal Bone Care',
      address: '456 MP Nagar, Bhopal',
      city: 'Bhopal',
      pincode: '462011',
      coordinates: { lat: 23.2599, lng: 77.4126 }
    },
    availability: {
      nextSlot: 'Today 2:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['2:00 PM', '6:00 PM'],
        'Wednesday': ['2:00 PM', '6:00 PM'],
        'Friday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543238' },
    languages: ['English', 'Hindi'],
    verified: true
  },
  {
    id: '30',
    name: 'Dr. Priyanka Jain',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Digestive Health Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 10,
    rating: 4.4,
    reviewCount: 123,
    consultationFee: { online: 500, offline: 750 },
    clinic: {
      name: 'Bhopal Digestive Care',
      address: '789 New Market, Bhopal',
      city: 'Bhopal',
      pincode: '462001',
      coordinates: { lat: 23.2599, lng: 77.4126 }
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
    contact: { phone: '+91-9876543239' },
    languages: ['English', 'Hindi'],
    verified: true
  },

  // Vadodara Doctors
  {
    id: '31',
    name: 'Dr. Mehul Patel',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology'],
    experience: 14,
    rating: 4.7,
    reviewCount: 203,
    consultationFee: { online: 600, offline: 850 },
    clinic: {
      name: 'Vadodara Heart Center',
      address: '123 RC Dutt Road, Vadodara',
      city: 'Vadodara',
      pincode: '390007',
      coordinates: { lat: 22.3072, lng: 73.1812 }
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
    contact: { phone: '+91-9876543240' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },
  {
    id: '32',
    name: 'Dr. Kiran Shah',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin & Hair Care',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 8,
    rating: 4.5,
    reviewCount: 145,
    consultationFee: { online: 400, offline: 600 },
    clinic: {
      name: 'Vadodara Skin Clinic',
      address: '456 Alkapuri, Vadodara',
      city: 'Vadodara',
      pincode: '390005',
      coordinates: { lat: 22.3072, lng: 73.1812 }
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
    contact: { phone: '+91-9876543241' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },

  // Rajkot Doctors
  {
    id: '33',
    name: 'Dr. Jayesh Patel',
    specialty: 'Orthopedist',
    subSpecialty: 'Bone & Joint Specialist',
    qualifications: ['MBBS', 'MS Orthopedics'],
    experience: 11,
    rating: 4.4,
    reviewCount: 167,
    consultationFee: { online: 400, offline: 600 },
    clinic: {
      name: 'Rajkot Bone Care',
      address: '789 Jawahar Road, Rajkot',
      city: 'Rajkot',
      pincode: '360001',
      coordinates: { lat: 22.3039, lng: 70.8022 }
    },
    availability: {
      nextSlot: 'Today 3:00 PM',
      mode: 'both',
      schedule: {
        'Monday': ['11:00 AM', '3:00 PM', '6:00 PM'],
        'Wednesday': ['11:00 AM', '3:00 PM'],
        'Friday': ['11:00 AM', '3:00 PM', '6:00 PM']
      }
    },
    contact: { phone: '+91-9876543242' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },
  {
    id: '34',
    name: 'Dr. Nisha Modi',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Digestive Health Specialist',
    qualifications: ['MBBS', 'MD Medicine', 'DM Gastroenterology'],
    experience: 9,
    rating: 4.3,
    reviewCount: 134,
    consultationFee: { online: 450, offline: 650 },
    clinic: {
      name: 'Rajkot Digestive Care',
      address: '321 University Road, Rajkot',
      city: 'Rajkot',
      pincode: '360005',
      coordinates: { lat: 22.3039, lng: 70.8022 }
    },
    availability: {
      nextSlot: 'Tomorrow 2:00 PM',
      mode: 'both',
      schedule: {
        'Tuesday': ['2:00 PM', '6:00 PM'],
        'Thursday': ['2:00 PM', '6:00 PM'],
        'Saturday': ['10:00 AM', '2:00 PM']
      }
    },
    contact: { phone: '+91-9876543243' },
    languages: ['English', 'Hindi', 'Gujarati'],
    verified: true
  },

  // Coimbatore Doctors
  {
    id: '35',
    name: 'Dr. Ravi Kumar',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Disease Specialist',
    qualifications: ['MBBS', 'MD Cardiology'],
    experience: 12,
    rating: 4.6,
    reviewCount: 189,
    consultationFee: { online: 550, offline: 800 },
    clinic: {
      name: 'Coimbatore Heart Center',
      address: '456 RS Puram, Coimbatore',
      city: 'Coimbatore',
      pincode: '641002',
      coordinates: { lat: 11.0168, lng: 76.9558 }
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
    contact: { phone: '+91-9876543244' },
    languages: ['English', 'Hindi', 'Tamil'],
    verified: true
  },
  {
    id: '36',
    name: 'Dr. Malathi Krishnan',
    specialty: 'Dermatologist',
    subSpecialty: 'Skin Care Specialist',
    qualifications: ['MBBS', 'MD Dermatology'],
    experience: 10,
    rating: 4.5,
    reviewCount: 156,
    consultationFee: { online: 450, offline: 650 },
    clinic: {
      name: 'Coimbatore Skin Clinic',
      address: '789 Race Course, Coimbatore',
      city: 'Coimbatore',
      pincode: '641018',
      coordinates: { lat: 11.0168, lng: 76.9558 }
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
    contact: { phone: '+91-9876543245' },
    languages: ['English', 'Hindi', 'Tamil'],
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
