export interface CommitteeMember {
  name: string;
  institution: string;
  country: string;
  email?: string;
}

export const organizingCommitteeMembers: CommitteeMember[] = [
  { name: 'Prof. El-Refaie Kenawy', institution: 'Tanta University', country: 'Egypt' },
  {
    name: 'Prof. Mohamed Abd Al-Raheem Abu Saied',
    institution: 'City of Scientific Research and Technological Applications (SRTA-City), Alexandria',
    country: 'Egypt'
  },
  { name: 'Prof. Tarek M Mohamed', institution: 'Tanta University', country: 'Egypt' },
  { name: 'Prof. Adel Nassar', institution: 'Menoufia University', country: 'Egypt' },
  {
    name: 'Prof. Sahar Hassona Hassan El Khalafy',
    institution: 'Tanta University',
    country: 'Egypt'
  },
  { name: 'Prof. Rachid SALGHI', institution: 'Euromed University, Fes', country: 'Morocco' },
  { name: 'Prof. Sami Fattouch', institution: 'INSAT, Tunis', country: 'Tunisia' },
  { name: 'Prof. Alberto Angioni', institution: 'Universita di Cagliari', country: 'Italy' },
  { name: 'Dr. Michelangelo Anastasiades', institution: 'Chemisches, Stuttgart', country: 'Germany' }
];

export const scientificCommitteeMembers: CommitteeMember[] = [
  { name: 'Prof. Hussein Darwish', institution: 'National Research Centre', country: 'Egypt' },
  { name: 'Prof. Mohamed Mostafa Elsayed', institution: 'Alexandria University', country: 'Egypt' },
  { name: 'Prof. Said salama Moselhy', institution: 'Ain shams university', country: 'Egypt' },
  { name: 'Prof. Abdalziz fatouh', institution: 'Mansura university', country: 'Egypt' },
  { name: 'Prof. Ibrahim Tantawy', institution: 'Monofia University', country: 'Egypt' },
  { name: 'Prof. Zakaria A el khanate', institution: 'National Research Centre', country: 'Egypt' },
  { name: 'Prof. Soha M Hamdy', institution: 'Fayoum University', country: 'Egypt' },
  {
    name: 'Prof. Dr. Ahmed H. Moustafa',
    institution: 'Zagazig University',
    country: 'Egypt',
    email: 'ah_hu_mostafa@yahoo.com'
  },
  {
    name: 'Prof. Dr. Magdy A. Ibrahim',
    institution: 'Ain Shams University',
    country: 'Egypt',
    email: 'magdy_ahmed1977@yahoo.com'
  },
  {
    name: 'Prof. Dr. Aly A. Aly',
    institution: 'Benha University',
    country: 'Egypt',
    email: 'aly.maboudaly@fsc.bu.edu.eg'
  },
  { name: 'Prof. Nafissa Soudani', institution: 'University Mohamed Khider of Biskra', country: 'Algeria' },
  { name: 'Dr. Mohamed Bouezmarni', institution: 'Belgian development agency', country: 'Belgium' },
  { name: 'Dr. Amir Bertone Gebara', institution: 'Instituto Biologico', country: 'Brazil' },
  { name: 'Dr. Claudia Ciscato', institution: 'Instituto Biologico', country: 'Brazil' },
  { name: 'Prof. Jean Marc Chovelon', institution: 'IUT Lyon 1', country: 'France' },
  {
    name: 'Prof. Michel Couderchet',
    institution: 'Universite de Reims Champagne-Ardenne, Reims',
    country: 'France'
  },
  {
    name: 'Prof. Urania Menkissoglu-Spiroudi',
    institution: 'Aristotle University of Thessaloniki',
    country: 'Greece'
  },
  {
    name: 'Prof. Ntalli Nikoletta',
    institution: 'Aristotle University of Thessaloniki',
    country: 'Greece'
  },
  { name: 'Prof. Zsofia KOVACS', institution: 'University of Pannonia, Veszprem', country: 'Hungary' },
  { name: 'Prof. Mariateresa Russo', institution: 'University of Reggio Calabria', country: 'Italy' },
  { name: 'Prof. Alessandro Atzei', institution: 'University of Cagliari', country: 'Italy' },
  { name: 'Dr. Ashraf Al Hawamdeh', institution: 'National FAO/IPM', country: 'Jordan' },
  { name: 'Dr. Mamoun Albakri', institution: 'Ministry of Agriculture', country: 'Jordan' },
  { name: 'Prof. Ahmad El Moll', institution: 'Lebanese University', country: 'Lebanon' },
  { name: 'Dr. Ali Amin Kafu', institution: 'Biotechnology Research Center, Tripoli', country: 'Libya' },
  { name: 'Dr. Fauzi A. Bisheya', institution: 'Agricultural Research center, Tripoli', country: 'Libya' },
  {
    name: 'Prof. Mohamad Amran B. Mohd Salleh',
    institution: 'University Putra',
    country: 'Malaysia'
  },
  {
    name: 'Dr. Shivendu Ranjan',
    institution: 'Indian Institute of Technology, Kanpur (IITK)',
    country: 'India'
  },
  {
    name: 'Dr. Nandita Dasgupta',
    institution: 'Institute of Engineering and Technology',
    country: 'India'
  },
  {
    name: 'Dr. VELISCO NATALIA',
    institution: 'Dimitre Cantemir State University, Chisinau',
    country: 'Moldova'
  },
  {
    name: 'Igor CRETESCU',
    institution: 'Ghorghe Asachi Technical University of Iasi',
    country: 'Romania'
  },
  {
    name: 'Prof. Abderrahim Hormatallah',
    institution: "IAV Hassan II, Complexe Horticole d'Ait Melloul",
    country: 'Morocco'
  },
  { name: 'Dr. Mohamed Ayoub', institution: 'Green Solutions, Agadir', country: 'Morocco' },
  {
    name: 'Dr. Agnieszka Popenda',
    institution: 'Czestochowa University of Technology',
    country: 'Poland'
  },
  {
    name: 'Dr. Slawomir Kalinowski',
    institution: 'Warmia and Mazury University in Olsztyn',
    country: 'Poland'
  },
  { name: 'Dr. Sara Cunha', institution: 'University of Porto', country: 'Portugal' },
  {
    name: 'Dr. J. (Koos) F. van Staden',
    institution: 'Process Analytical Technology Laboratory',
    country: 'Romania'
  },
  {
    name: 'Dr. Ionela Daniela Morariu',
    institution: 'University of Medicine and Pharmacy, Iasi',
    country: 'Romania'
  },
  {
    name: 'Dr. Bassam S. Tawabini',
    institution: 'King Fahd University of Petroleum & Minerals',
    country: 'Saudi Arabia'
  },
  {
    name: 'Prof. Angel Montoya Baides',
    institution: 'Universitat Politecnica de Valencia',
    country: 'Spain'
  },
  { name: 'Dr. Ana Aguilera', institution: 'University of Almeria, 04071-Almeria', country: 'Spain' },
  { name: 'Prof. Lazic Sanja', institution: 'University of Novi Sad', country: 'Serbia' },
  {
    name: 'Prof. Slavica Vukovic',
    institution: 'University of Novi Sad, Faculty of Agriculture, Novi Sad',
    country: 'Serbia'
  },
  {
    name: 'Dr. Azhari Omer Abdelbagi Mohamed',
    institution: 'Ministry of Higher Education & Scientific Research, Khartoum',
    country: 'Sudan'
  },
  { name: 'Dr. Asma Laarif', institution: 'IRESA, Chott Mariem, Sousse', country: 'Tunisia' },
  {
    name: 'Prof. Osman Tiryaki',
    institution: 'Canakkale Onsekiz Mart University',
    country: 'Turkey'
  },
  { name: 'Dr. Ummuhan Kaya', institution: 'TUV AUSTRIA TURK, Izmir', country: 'Turkey' },
  {
    name: 'Prof. Abdelelah Mohamed Elhassan',
    institution: 'Al Safwa Feasibility Studies & Consultancy, Sharjah',
    country: 'United Arab Emirates'
  },
  { name: 'Prof. Manar Mfarrej', institution: 'University of Abu Dhabi', country: 'United Arab Emirates' },
  { name: 'Prof. Parvez I Haris', institution: 'De Montfort University', country: 'United Kingdom' },
  { name: 'Prof. Djilani G. Amara', institution: 'El Oued University', country: 'Algeria' },
  { name: 'Prof. Nizar BELLAKHAL', institution: '', country: 'Tunisia' },
  { name: 'Dr. Faouzia Haffari', institution: 'University of Mostaganem', country: 'Algeria' },
  { name: 'Prof. Majdeddin Al Ghadban', institution: 'Sabratha University', country: 'Libya' },
  {
    name: 'Prof. Yasser KHADRA',
    institution: 'Ministry of Higher Education and Scientific Research',
    country: 'Syria'
  },
  {
    name: 'Prof. Halim Hammi',
    institution: 'National Centre of Research in Materials Science (CNRSM)',
    country: 'Tunisia',
    email: 'halimhammi2015@gmail.com'
  },
  { name: 'Prof. Hamza Hammadi', institution: 'Arid Regions Institute', country: 'Tunisia' },
  {
    name: 'Prof. Khalil Abdelrazek Khalil Abdelmawgoud',
    institution: 'University of Sharjah',
    country: 'United Arab Emirates'
  },
  { name: 'Prof. Nasser Aly Mohamed Barakat', institution: 'King Faisal University', country: 'Saudi Arabia' },
  { name: 'Prof. Sakina Mohamed Ahmed Yagi', institution: 'University of Khartoum', country: 'Sudan' },
  {
    name: 'Prof. Hichem BEN JANNET',
    institution: 'University of Monastir',
    country: 'Tunisia',
    email: 'hichem.bjannet@gmail.com'
  },
  {
    name: 'Prof. Mounir FERHI',
    institution: 'National Research Center in Materials Sciences',
    country: 'Tunisia'
  }
];
