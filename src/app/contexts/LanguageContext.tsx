import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    topics: 'Topics',
    abstract: 'Abstract',
    registration: 'Registration',
    contact: 'Contact',
    registerNow: 'Register Now',
    submitAbstract: 'Submit Abstract',
    hero_title: 'ACI-SD 2027',
    hero_subtitle: '1st International Conference on Advancing Chemistry and Innovation Towards Sustainable Development',
    hero_subtitle2: '11th Mediterranean Group of Pesticide Research (MGPR) Symposium',
    hero_date: '27-30 January 2027',
    hero_location: 'Hurghada, Egypt',
    about_title: 'About the Conference',
    about_desc:
      'The Scientific Society of Chemistry (SSC) is organizing its First International Scientific Conference as a global platform that brings together scientists, researchers, experts, and industry leaders to foster scientific dialogue, exchange expertise, and showcase innovation in chemistry and advanced technologies.',
    about_desc_2:
      'The conference aims to strengthen bridges between academic research and industrial applications while supporting the integration of scientific knowledge with entrepreneurship to advance sustainable development driven by innovation.',
    about_desc_3:
      'Its scientific program addresses advanced chemistry and materials, smart polymers, metal-organic frameworks (MOFs), green chemistry, energy, catalysis, corrosion, nanotechnology, artificial intelligence in chemical innovation, water and environmental technologies, circular economy, and sustainable pharmaceutical and biotechnology industries.',
    mgpr_title: 'About the MGPR Symposium',
    mgpr_desc:
      'The 11th Mediterranean Group of Pesticide Research (MGPR) Symposium will be held in Egypt from 27 to 30 January 2027, continuing a long-standing scientific series previously hosted in Italy, Spain, France, Turkey, Morocco, Egypt, and Greece.',
    mgpr_desc_2:
      'The symposium provides a valuable opportunity for scientists, academicians, students, pesticide companies, producers, and environmental stakeholders to share up-to-date knowledge on pesticide applications, benefits, risks, and research developments in agriculture and the environment.',
    stat_international: 'International Conference',
    stat_topics: '8 Research Topics',
    stat_speakers: '50+ Speakers',
    stat_location: 'Hurghada, Egypt',
    topics_title: 'Conference Topics',
    topic_chemistry: 'Advanced Chemistry & Materials',
    topic_chemistry_desc: 'Cutting-edge research in chemical synthesis and advanced materials',
    topic_nano: 'Nanotechnology',
    topic_nano_desc: 'Innovations in nanoscale science and applications',
    topic_energy: 'Energy & Sustainability',
    topic_energy_desc: 'Renewable energy solutions and sustainable technologies',
    topic_agro: 'Agrochemical & Environmental Safety',
    topic_agro_desc: 'Sustainable agriculture and environmental protection',
    topic_ai: 'AI & Data Science',
    topic_ai_desc: 'Machine learning and computational chemistry',
    topic_enviro: 'Environmental Technologies',
    topic_enviro_desc: 'Clean technologies for environmental preservation',
    topic_engineering: 'Chemical & Process Engineering',
    topic_engineering_desc: 'Advanced process design and optimization',
    topic_innovation: 'Innovation & Entrepreneurship',
    topic_innovation_desc: 'Translating research into commercial applications',
    committee: 'Committees',
    committee_title: 'Conference Committees',
    organizingCommitteeNav: 'Organizing',
    scientificCommitteeNav: 'Scientific',
    abstract_title: 'Call for Abstracts',
    abstract_email: 'Submit to: sci.s.o.chemistry@gmail.com',
    abstract_words: '200-300 words',
    abstract_format: '12-point Font size, Times New Roman, Bold, A4',
    abstract_deadline: 'Deadline: 30 November 2026',
    abstract_oral: 'Oral Presentation (15-30 min)',
    abstract_poster: 'Poster Presentation (90x120 cm)',
    downloadTemplate: 'Download Abstract Template',
    dates_title: 'Important Dates',
    date_submission: 'Abstract Submission Deadline',
    date_early: 'Early Registration Deadline',
    date_conference: 'Conference Dates: 27-30 Jan 2027',
    registration_title: 'Registration',
    reg_egyptian: 'Egyptian Participants',
    reg_international: 'International Participants',
    reg_accommodation: 'Includes: Accommodation + Transportation',
    reg_discount: 'Student Discount Available',
    bank_details: 'Bank Transfer Details',
    bank_account: 'Account: Scientific Society of Chemistry (SSC)',
    bank_name: 'Bank: Egyptian Arab Land Bank (EALB)',
    venue_title: 'Venue',
    venue_location: 'Hotel on the Corniche, Hurghada, Egypt',
    venue_region: 'Red Sea Coast',
    venue_intro:
      'The symposium will take place at a hotel within walking distance of the beautiful beach and corniche of Hurghada, offering participants a professional setting in one of Egypt\'s leading coastal destinations.',
    venue_accommodation_title: 'Accommodation',
    venue_accommodation_desc: 'Conference venue hotel near the beach and Hurghada corniche.',
    venue_tour: 'Professional Networking Experience',
    venue_tour_desc: 'A welcoming environment designed for scientific exchange, collaboration, and engagement.',
    venue_language: 'Conference Language: English',
    venue_language_desc: 'All scientific sessions, presentations, and official communications will be conducted in English.',
    organized_by: 'Organized by',
    footer_desc: 'Advancing Chemistry and Innovation Towards Sustainable Development',
    footer_links: 'Quick Links',
    footer_contact: 'Contact Information',
    back_to_top: 'Back to top',
    copyright: '© 2027 ACI-SD | Scientific Society of Chemistry'
  },
  ar: {
    home: 'الرئيسية',
    about: 'عن المؤتمر',
    topics: 'المحاور',
    abstract: 'الملخصات',
    registration: 'التسجيل',
    contact: 'اتصل بنا',
    registerNow: 'سجل الآن',
    submitAbstract: 'قدم ملخص',
    hero_title: 'ACI-SD 2027',
    hero_subtitle: 'المؤتمر الدولي الأول للنهوض بالكيمياء والابتكار من أجل التنمية المستدامة',
    hero_subtitle2: 'الندوة الحادية عشرة لمجموعة البحر المتوسط لأبحاث المبيدات (MGPR)',
    hero_date: '27-30 يناير 2027',
    hero_location: 'الغردقة، مصر',
    about_title: 'عن المؤتمر',
    about_desc:
      'تنظم الجمعية العلمية للكيمياء (SSC) مؤتمرها العلمي الدولي الأول باعتباره منصة عالمية تجمع العلماء والباحثين والخبراء وقادة الصناعة بهدف تعزيز الحوار العلمي وتبادل الخبرات وعرض أحدث الابتكارات في الكيمياء والتقنيات المتقدمة.',
    about_desc_2:
      'يسعى المؤتمر إلى بناء جسور قوية بين البحث الأكاديمي والتطبيقات الصناعية، مع دعم تكامل المعرفة العلمية مع ريادة الأعمال لتحقيق تنمية مستدامة قائمة على الابتكار.',
    about_desc_3:
      'ويتناول البرنامج العلمي موضوعات الكيمياء المتقدمة والمواد والبوليمرات الذكية والأطر الفلزية العضوية (MOFs) والكيمياء الخضراء والطاقة والتحفيز والتآكل وتكنولوجيا النانو والذكاء الاصطناعي في الابتكار الكيميائي وتقنيات المياه والبيئة والاقتصاد الدائري والصناعات الدوائية والحيوية المستدامة.',
    mgpr_title: 'عن ندوة MGPR',
    mgpr_desc:
      'تُعقد الندوة الحادية عشرة لمجموعة البحر المتوسط لأبحاث المبيدات (MGPR) في مصر خلال الفترة من 27 إلى 30 يناير 2027، استمرارًا لسلسلة علمية راسخة استضافتها سابقًا إيطاليا وإسبانيا وفرنسا وتركيا والمغرب ومصر واليونان.',
    mgpr_desc_2:
      'وتوفر الندوة فرصة قيّمة للعلماء والأكاديميين والطلاب وشركات المبيدات والمنتجين والمهتمين بالبيئة لتبادل أحدث المعارف حول استخدامات المبيدات وفوائدها ومخاطرها والتطورات البحثية المرتبطة بالزراعة والبيئة.',
    stat_international: 'مؤتمر دولي',
    stat_topics: '8 محاور بحثية',
    stat_speakers: '+50 متحدث',
    stat_location: 'الغردقة، مصر',
    topics_title: 'محاور المؤتمر',
    topic_chemistry: 'الكيمياء المتقدمة والمواد',
    topic_chemistry_desc: 'أبحاث متطورة في التركيب الكيميائي والمواد المتقدمة',
    topic_nano: 'تكنولوجيا النانو',
    topic_nano_desc: 'ابتكارات في علم النانو وتطبيقاته',
    topic_energy: 'الطاقة والاستدامة',
    topic_energy_desc: 'حلول الطاقة المتجددة والتقنيات المستدامة',
    topic_agro: 'الكيمياء الزراعية والسلامة البيئية',
    topic_agro_desc: 'الزراعة المستدامة وحماية البيئة',
    topic_ai: 'الذكاء الاصطناعي وعلوم البيانات',
    topic_ai_desc: 'التعلم الآلي والكيمياء الحاسوبية',
    topic_enviro: 'التقنيات البيئية',
    topic_enviro_desc: 'التقنيات النظيفة للحفاظ على البيئة',
    topic_engineering: 'الهندسة الكيميائية',
    topic_engineering_desc: 'تصميم وتحسين العمليات المتقدمة',
    topic_innovation: 'الابتكار وريادة الأعمال',
    topic_innovation_desc: 'تحويل البحث إلى تطبيقات تجارية',
    committee: 'اللجان',
    committee_title: 'لجان المؤتمر',
    organizingCommitteeNav: 'التنظيمية',
    scientificCommitteeNav: 'العلمية',
    abstract_title: 'الدعوة لتقديم الملخصات',
    abstract_email: 'أرسل إلى: sci.s.o.chemistry@gmail.com',
    abstract_words: '200-300 كلمة',
    abstract_format: '12-pt حجم الخط, Times New Roman، عريض، A4',
    abstract_deadline: 'الموعد النهائي: 30 نوفمبر 2026',
    abstract_oral: 'عرض شفهي (15-30 دقيقة)',
    abstract_poster: 'عرض ملصق (90×120 سم)',
    downloadTemplate: 'تحميل قالب الملخص',
    dates_title: 'التواريخ المهمة',
    date_submission: 'الموعد النهائي لتقديم الملخصات',
    date_early: 'الموعد النهائي للتسجيل المبكر',
    date_conference: 'تواريخ المؤتمر: 27-30 يناير 2027',
    registration_title: 'التسجيل',
    reg_egyptian: 'المشاركون المصريون',
    reg_international: 'المشاركون الدوليون',
    reg_accommodation: 'يشمل: الإقامة + النقل',
    reg_discount: 'خصم متاح للطلاب',
    bank_details: 'تفاصيل التحويل البنكي',
    bank_account: 'الحساب: الجمعية العلمية للكيمياء',
    bank_name: 'البنك: بنك الأراضي المصري العربي',
    venue_title: 'مكان الانعقاد',
    venue_location: 'فندق على الكورنيش، الغردقة، مصر',
    venue_region: 'ساحل البحر الأحمر',
    venue_intro:
      'تُقام الندوة في فندق يقع على مسافة قريبة سيرًا من الشاطئ الجميل وكورنيش الغردقة، مما يوفر للمشاركين بيئة مهنية مميزة في واحدة من أبرز الوجهات الساحلية في مصر.',
    venue_accommodation_title: 'الإقامة',
    venue_accommodation_desc: 'فندق انعقاد المؤتمر بالقرب من الشاطئ وكورنيش الغردقة.',
    venue_tour: 'بيئة مهنية للتواصل',
    venue_tour_desc: 'أجواء مثالية للتبادل العلمي وبناء الشراكات وتعزيز التفاعل بين المشاركين.',
    venue_language: 'لغة المؤتمر: الإنجليزية',
    venue_language_desc: 'ستُعقد جميع الجلسات العلمية والعروض التقديمية والمراسلات الرسمية باللغة الإنجليزية.',
    organized_by: 'تنظيم',
    footer_desc: 'النهوض بالكيمياء والابتكار نحو التنمية المستدامة',
    footer_links: 'روابط سريعة',
    footer_contact: 'معلومات الاتصال',
    back_to_top: 'العودة إلى الأعلى',
    copyright: '© 2027 ACI-SD | الجمعية العلمية للكيمياء'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-cairo' : 'font-inter'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
