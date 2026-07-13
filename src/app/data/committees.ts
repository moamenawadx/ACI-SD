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
    name: 'Prof. Sahar Hassona Hassan El Khalafy',
    institution: '',
    country: 'Egypt',
    image: '/committee/Prof. Sahar Hassona Hassan El Khalafy.jpeg'
  },
  {
    name: 'Prof. Adel Nassar',
    institution: '',
    country: 'Egypt',
    image: '/committee/Prof. Adel Nassar.jpeg'
  }
];

export const organizingCommitteeMembers: CommitteeMember[] = [
  { name: 'Prof. Ibrahim Al-Fahham', institution: '', country: 'Egypt', image: '/committee/Prof. Ibrahim Al-Fahham.jpg' },
  { name: 'Prof. Mohamed Ramadan', institution: '', country: 'Egypt', image: '/committee/Prof. Mohamed Ramadan.jpeg' },
  { name: 'Prof. Sami Fattouch', institution: '', country: 'Tunisia', image: '/committee/Prof. Sami Fattouch.jpg' },
  { name: 'Assoc. prof. Marwa Mostafa Abdel-Ati', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Bassem Nashaat Zakher', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Alaa Arafa Badr', institution: '', country: 'Egypt', image: '/committee/Prof. Alaa Arafa Badr.jpg' },
  { name: 'Prof. Rachid SALGHI', institution: '', country: 'Morocco', image: '/committee/Prof. Rachid SALGHI.jpg' },
  { name: 'Prof. Alberto Angioni', institution: '', country: 'Italy', image: '/committee/Prof. Alberto Angioni.png' },
  { name: 'Prof. Halim Hammi', institution: '', country: 'Tunisia', image: '/committee/Prof. Halim Hammi .jpeg' }
];

export const scientificCommitteeMembers: CommitteeMember[] = [
  { name: 'Prof. Qusay F. Alsalhy', institution: '', country: 'Iraq', image: '/committee/Prof. Qusay F. Alsalhy.jpg' },
  { name: 'Prof. Urania Menkissoglu-Spiroudi', institution: '', country: 'Greece', image: '/committee/Prof. Urania Menkissoglu-Spiroudi.jpg' },
  { name: 'Prof. Mohamed Vall El Mami', institution: '', country: 'Mauritania', image: committeePortrait },
  { name: 'Prof. Hussein Darwish', institution: '', country: 'Egypt', image: '/committee/Prof. Hussein Darwish.jpg' },
  { name: 'Prof. Alessandro Atzei', institution: '', country: 'Italy', image: '/committee/Prof. Alessandro Atzei.png' },
  { name: 'Prof. Mohamed Mostafa Elsayed', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Parvez I Haris', institution: '', country: 'United Kingdom', image: committeePortrait },
  { name: 'Prof. Said Salama Moselhy', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Osman Tiryaki', institution: '', country: 'Turkey', image: '/committee/Prof. Osman Tiryaki.png' },
  { name: 'Prof. Abdalziz Fatouh', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Angel Montoya Baides', institution: '', country: 'Spain', image: committeePortrait },
  { name: 'Prof. Ibrahim Tantawy', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Sara Cunha', institution: '', country: 'Portugal', image: committeePortrait },
  { name: 'Prof. Zakaria A el khanate', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Agnieszka Popenda', institution: '', country: 'Poland', image: committeePortrait },
  { name: 'Prof. Soha M Hamdy', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Mohamed Bouezmarni', institution: '', country: 'Belgium', image: committeePortrait },
  { name: 'Prof. Ahmed H. Moustafa', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Nasser Barakat', institution: '', country: 'Saudi Arabia', image: committeePortrait },
  { name: 'Prof. Magdy A. Ibrahim', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Dr. Amir Bertone Gebara', institution: '', country: 'Brazil', image: committeePortrait },
  { name: 'Prof. Aly A. Aly', institution: '', country: 'Egypt', image: committeePortrait },
  { name: 'Prof. Jean Marc Chovelon', institution: '', country: 'France', image: committeePortrait },
  { name: 'Prof. Antonio Valverde García', institution: '', country: 'Spain', image: '/committee/Prof. Antonio Valverde.jpg' },
  { name: 'Prof. Ntalli Nikoletta', institution: '', country: 'Greece', image: committeePortrait },
  { name: 'Prof. Abderrahim Hormatallah', institution: '', country: 'Morocco', image: '/committee/Prof. Abderrahim Hormatallah.jpg' },
  { name: 'Prof. Michelangelo Anastassiades', institution: '', country: 'Germany', image: committeePortrait },
  { name: 'Prof. Zsofia KOVACS', institution: '', country: 'Hungary', image: committeePortrait },
  { name: 'Prof. Nafissa Soudani', institution: '', country: 'Algeria', image: '/committee/Prof. Nafissa Soudani.jpg' },
  { name: 'Prof. Mariateresa Russo', institution: '', country: 'Italy', image: committeePortrait },
  { name: 'Prof. Khaoula Toumi', institution: '', country: 'Tunisia', image: '/committee/Prof. Khaoula Toumi.jpg' },
  { name: 'Prof. Mohamad Amran', institution: '', country: 'Malaysia', image: committeePortrait },
  { name: 'Prof. Faouzia Haffari', institution: '', country: 'Algeria', image: committeePortrait },
  { name: 'Dr. Shivendu Ranjan', institution: '', country: 'India', image: committeePortrait },
  { name: 'Prof. Manar Fawzi Bani Mfarrej', institution: '', country: 'UAE', image: '/committee/Prof. Manar Fawzi Bani Mfarrej.png' },
  { name: 'Prof. Mahmoud Abuhussein', institution: '', country: 'Jordan', image: '/committee/Prof. Mahmoud Abu hussein.png' },
  { name: 'Prof. Ahmad Elmoll', institution: '', country: 'Lebanon', image: '/committee/Prof. Ahmad Elmoll.jpg' },
  { name: 'Prof. Djilani G. Amara', institution: '', country: 'Algeria', image: '/committee/Prof. Djilani G. Amara.jpg' },
  { name: 'Prof. Nour Elhouda Mekhadmi', institution: '', country: 'Algeria', image: committeePortrait },
  { name: 'Prof. Majdeddin Al Ghadban', institution: '', country: 'Libya', image: committeePortrait },
  { name: 'Prof. Yasser Khadra', institution: '', country: 'Syria', image: committeePortrait },
  { name: 'Prof. Hamza Hammadi', institution: '', country: 'Tunisia', image: committeePortrait },
  { name: 'Prof. Mounir FERHI', institution: '', country: 'Tunisia', image: committeePortrait },
  { name: 'Prof. Khalil Abdelrazek Khalil', institution: '', country: 'UAE', image: committeePortrait },
  { name: 'Prof. Sakina Mohamed Ahmed', institution: '', country: 'Sudan', image: committeePortrait }
];
