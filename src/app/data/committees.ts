export interface CommitteeMember {
  name: string;
  institution: string;
  country: string;
  role?: string;
  image?: string;
  email?: string;
}

export const committeePortrait = '/committee-portrait.svg';

export const leadershipMembers: CommitteeMember[] = [
  {
    name: 'Prof. Dr. El-Refaie Kenawy',
    role: 'Conference Chairman',
    institution: 'Chairman of the Board of Scientific Society of Chemistry (SSC)',
    country: 'Egypt',
    image: '/committee/Prof. Dr. El-Refaie Kenawy.jpg'
  },
  {
    name: 'Prof. Dr. Mohamed Morsi El-Gohary',
    role: 'Honorary Chairman of the Conference',
    institution: 'President of Borg Al Arab Technological University',
    country: 'Egypt',
    image: '/committee/Prof. Dr. Mohamed Morsi El-Gohary.png'
  },
  {
    name: 'Prof. Dr. Mohamed Abd Alraheem Abu Saied',
    role: 'Executive Chair',
    institution: '',
    country: 'Egypt',
    image: '/committee/Prof. Dr. Mohamed Abd Alraheem Abu Saied.png'
  }
];

export const executiveCommitteeMembers: CommitteeMember[] = [
  {
    name: 'Prof. Tarek M Mohamed',
    institution: '',
    country: 'Egypt',
    image: '/committee/Prof. Tarek M Mohamed.jpeg'
  },
  {
    name: 'Prof. Adel Nassar',
    institution: '',
    country: 'Egypt',
    image: '/committee/Prof. Adel Nassar.jpeg'
  },
  {
    name: 'Prof. Sahar Hassona Hassan El Khalafy',
    institution: '',
    country: 'Egypt',
    image: '/committee/Prof. Sahar Hassona Hassan El Khalafy.jpeg'
  }
];

export const organizingCommitteeMembers: CommitteeMember[] = [
  { name: 'Prof. Ibrahim Al-Fahham', institution: '', country: '', image: '/committee/Prof. Ibrahim Al-Fahham.jpg' },
  { name: 'Prof. Alaa Arafa Badr', institution: '', country: '', image: '/committee/Prof. Alaa Arafa Badr.jpg' },
  { name: 'Prof. Mohamed Ramadan', institution: '', country: '', image: '/committee/Prof. Mohamed Ramadan.jpeg' },
  { name: 'Prof. Rachid SALGHI', institution: 'Euromed University, Fes', country: 'Morocco', image: '/committee/Prof. Rachid SALGHI.jpg' },
  { name: 'Prof. Sami Fattouch', institution: 'INSAT, Tunis', country: 'Tunisia', image: '/committee/Prof. Sami Fattouch.jpg' },
  { name: 'Prof. Alberto Angioni', institution: 'Universita di Cagliari', country: 'Italy', image: '/committee/Prof. Alberto Angioni.png' }
];

export const scientificCommitteeMembers: CommitteeMember[] = [
  { name: 'Prof. Qusay F. Alsalhy', institution: '', country: '', image: '/committee/Prof. Qusay F. Alsalhy.jpg' },
  { name: 'Prof. Urania Menkissoglu-Spiroudi', institution: 'Aristotle University of Thessaloniki', country: 'Greece', image: '/committee/Prof. Urania Menkissoglu-Spiroudi.jpg' },
  { name: 'Prof. Hussein Darwish', institution: 'National Research Centre', country: 'Egypt', image: '/committee/Prof. Hussein Darwish.jpg' },
  { name: 'Prof. Alessandro Atzei', institution: 'University of Cagliari', country: 'Italy', image: '/committee/Prof. Alessandro Atzei.png' },
  { name: 'Prof. Mohamed Mostafa Elsayed', institution: 'Alexandria University', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Parvez I Haris', institution: 'De Montfort University', country: 'United Kingdom', image: committeePortrait },
  { name: 'Prof. Said Salama Moselhy', institution: 'Ain Shams University', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Osman Tiryaki', institution: 'Canakkale Onsekiz Mart University', country: 'Turkey', image: committeePortrait },
  { name: 'Prof. Abdalziz Fatouh', institution: 'Mansura University', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Angel Montoya Baides', institution: 'Universitat Politecnica de Valencia', country: 'Spain', image: committeePortrait },
  { name: 'Prof. Ibrahim Tantawy', institution: 'Monofia University', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Sara Cunha', institution: 'University of Porto', country: 'Portugal', image: committeePortrait },
  { name: 'Prof. Zakaria A. El Khanate', institution: 'National Research Centre', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Agnieszka Popenda', institution: 'Czestochowa University of Technology', country: 'Poland', image: committeePortrait },
  { name: 'Prof. Soha M Hamdy', institution: 'Fayoum University', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Mohamed Bouezmarni', institution: 'Belgian Development Agency', country: 'Belgium', image: committeePortrait },
  { name: 'Prof. Dr. Ahmed H. Moustafa', institution: 'Zagazig University', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Amir Bertone Gebara', institution: 'Instituto Biologico', country: 'Brazil', image: committeePortrait },
  { name: 'Prof. Dr. Magdy A. Ibrahim', institution: 'Ain Shams University', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Dr. Aly A. Aly', institution: 'Benha University', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Jean Marc Chovelon', institution: 'IUT Lyon 1', country: 'France', image: committeePortrait },
  { name: 'Prof. Antonio Valverde', institution: '', country: '', image: committeePortrait },
  { name: 'Prof. Ntalli Nikoletta', institution: 'Aristotle University of Thessaloniki', country: 'Greece', image: committeePortrait },
  { name: 'Prof. Abderrahim Hormatallah', institution: "IAV Hassan II, Complexe Horticole d'Ait Melloul", country: 'Morocco', image: committeePortrait },
  { name: 'Prof. Zsofia Kovacs', institution: 'University of Pannonia, Veszprem', country: 'Hungary', image: committeePortrait },
  { name: 'Prof. Nafissa Soudani', institution: 'University Mohamed Khider of Biskra', country: 'Algeria', image: committeePortrait },
  { name: 'Prof. Mariateresa Russo', institution: 'University of Reggio Calabria', country: 'Italy', image: committeePortrait },
  { name: 'Prof. Khaoula Toumi', institution: '', country: '', image: committeePortrait },
  { name: 'Prof. Mohamad Amran', institution: 'University Putra', country: 'Malaysia', image: committeePortrait },
  { name: 'Prof. Faouzia Haffari', institution: 'University of Mostaganem', country: 'Algeria', image: committeePortrait },
  { name: 'Dr. Shivendu Ranjan', institution: 'Indian Institute of Technology, Kanpur (IITK)', country: 'India', image: committeePortrait },
  { name: 'Prof. Manar Fawzi Bani Mfarrej', institution: 'University of Abu Dhabi', country: 'United Arab Emirates', image: committeePortrait },
  { name: 'Prof. Ahmad Elmoll', institution: 'Lebanese University', country: 'Lebanon', image: committeePortrait },
  { name: 'Prof. Djilani G. Amara', institution: 'El Oued University', country: 'Algeria', image: committeePortrait },
  { name: 'Prof. Mekhadmi Nour Elhouda', institution: '', country: '', image: committeePortrait },
  { name: 'Prof. Majdeddin Al Ghadban', institution: 'Sabratha University', country: 'Libya', image: committeePortrait },
  { name: 'Prof. Yasser Khadra', institution: 'Ministry of Higher Education and Scientific Research', country: 'Syria', image: committeePortrait },
  { name: 'Prof. Hamza Hammadi', institution: 'Arid Regions Institute', country: 'Tunisia', image: committeePortrait },
  { name: 'Prof. Halim Hammi', institution: 'National Centre of Research in Materials Science (CNRSM)', country: 'Tunisia', image: committeePortrait },
  { name: 'Prof. Mounir Ferhi', institution: 'National Research Center in Materials Sciences', country: 'Tunisia', image: committeePortrait },
  { name: 'Prof. Khalil Abdelrazek Khalil', institution: 'University of Sharjah', country: 'United Arab Emirates', image: committeePortrait },
  { name: 'Prof. Mahmoud Abu hussein', institution: '', country: 'Jordan', image: '/committee/Prof. Mahmoud Abu hussein.png' },
  { name: 'Prof. Nasser Barakat', institution: 'King Faisal University', country: 'Saudi Arabia', image: committeePortrait }
];
