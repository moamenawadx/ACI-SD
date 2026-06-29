export interface RegistrationFormData {
  title: string;
  fullName: string;
  nameOnCertificate: string;
  gender: string;
  nationality: string;
  passportOrNationalId: string;

  universityOrganization: string;
  facultyDepartment: string;
  position: string;
  country: string;

  email: string;
  mobilePhone: string;
  whatsapp: string;
  postalAddress: string;

  attendanceMode: 'onsite' | 'virtual' | '';
  participationType: string;
  presentationType: string;
  paperTitle: string;
  conferenceTopic: string;
  conferenceTopicOther: string;

  roomType: string;
  checkIn: string;
  checkOut: string;
  roommate: string;
  arrivalAirport: string;
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
  invitationLetter: boolean;
  visaSupportLetter: boolean;
  otherRequirements: string;

  registrationCategory: string;
  paymentMethod: string;
  amountPaid: string;
  paymentDate: string;
  transactionReference: string;
  receiptFile: File | null;

  agreeDeclaration: boolean;
}

export const initialFormData: RegistrationFormData = {
  title: '',
  fullName: '',
  nameOnCertificate: '',
  gender: '',
  nationality: '',
  passportOrNationalId: '',

  universityOrganization: '',
  facultyDepartment: '',
  position: '',
  country: '',

  email: '',
  mobilePhone: '',
  whatsapp: '',
  postalAddress: '',

  attendanceMode: '',
  participationType: '',
  presentationType: '',
  paperTitle: '',
  conferenceTopic: '',
  conferenceTopicOther: '',

  roomType: '',
  checkIn: '',
  checkOut: '',
  roommate: '',
  arrivalAirport: '',
  arrivalDate: '',
  arrivalTime: '',
  departureDate: '',
  departureTime: '',
  invitationLetter: false,
  visaSupportLetter: false,
  otherRequirements: '',

  registrationCategory: '',
  paymentMethod: '',
  amountPaid: '',
  paymentDate: '',
  transactionReference: '',
  receiptFile: null,

  agreeDeclaration: false,
};

export const titles = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Eng.'];

export const genders = ['Male', 'Female'];

export const attendanceModes = [
  { value: 'onsite', label: 'On-site' },
  { value: 'virtual', label: 'Virtual' },
];

export const participationTypes = [
  { value: 'oral-presenter', label: 'Oral Presenter' },
  { value: 'poster-presenter', label: 'Poster Presenter' },
  { value: 'listener', label: 'Listener' },
  { value: 'sponsor', label: 'Sponsor' },
  { value: 'exhibitor', label: 'Exhibitor' },
];

export const presentationTypes = [
  { value: 'oral', label: 'Oral' },
  { value: 'poster', label: 'Poster' },
  { value: 'listener', label: 'Listener' },
];

export const conferenceTopics = [
  'Advanced Chemistry, Functional Materials for Industrial Applications',
  'Nanotechnology & Nanoscale Science',
  'Energy, Sustainability & Clean Technologies',
  'Agrochemical Sciences, Smart Agriculture & Environmental Safety',
  'AI, Data Science & Smart Chemical Systems',
  'Environmental Technologies, Water & Circular Economy',
  'Chemical & Process Engineering for Sustainable Industry',
  'Innovation, Entrepreneurship & Technology Transfer',
  'Other',
];

export const roomTypes = [
  { value: 'single', label: 'Single Room' },
  { value: 'double', label: 'Double Room' },
  { value: 'suite', label: 'Suite' },
];

export const registrationCategories = [
  { value: 'egyptian', label: 'Egyptian' },
  { value: 'international', label: 'International' },
  { value: 'student', label: 'Student' },
  { value: 'accompanying', label: 'Accompanying Person' },
];

export const paymentMethods = [
  { value: 'bank-transfer', label: 'Bank Transfer' },
];

export const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 'Bulgaria', 'Canada',
  'China', 'Colombia', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark',
  'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland',
  'Italy', 'Japan', 'Jordan', 'Kenya', 'Kuwait', 'Lebanon',
  'Libya', 'Malaysia', 'Maldives', 'Mexico', 'Morocco', 'Netherlands',
  'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sudan',
  'Sweden', 'Switzerland', 'Syria', 'Tunisia', 'Turkey', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Yemen',
];

export const stepLabels = [
  'Personal Information',
  'Affiliation',
  'Contact Information',
  'Participation',
  'Accommodation & Travel',
  'Payment',
  'Review & Submit',
];
