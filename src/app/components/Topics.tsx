import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Atom, Cpu, Zap, Leaf, Brain, TreePine, Factory, Lightbulb, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export function Topics() {
  const { language, t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleTopic = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const uiText = {
    en: {
      sectionIntro:
        'Among others, the following research areas will be covered during the Conference as oral or poster presentations.',
    },
    ar: {
      sectionIntro:
        'من بين المواضيع الأخرى، سيتم تغطية مجالات البحث التالية خلال المؤتمر كعروض شفهية أو ملصقات.',
    }
  };

  const topics = [
    {
      icon: Atom,
      title: t('topic_chemistry'),
      description: t('topic_chemistry_desc'),
      color: 'from-[#1E73A8] to-[#2CA6C4]',
      details: [
        { enTitle: 'Smart and Functional Polymers', arTitle: 'البوليمرات الذكية والوظيفية' },
        { enTitle: 'Metal–Organic Frameworks (MOFs) and Advanced Materials', arTitle: 'الأطر الفلزية العضوية (MOFs) والمواد المتقدمة' },
        { enTitle: 'Green and Sustainable Chemistry', arTitle: 'الكيمياء الخضراء والمستدامة' },
        { enTitle: 'Catalysis and Corrosion Science', arTitle: 'علوم التحفيز والتآكل' },
        { enTitle: 'Petroleum Chemistry, Refining Processes, and Petrochemical Technologies', arTitle: 'كيمياء البترول وعمليات التكرير والتقنيات البتروكيميائية' },
        { enTitle: 'Sensors, Biosensors, and Analytical Systems', arTitle: 'المستشعرات والمستشعرات الحيوية والأنظمة التحليلية' },
        { enTitle: 'Biochemistry, Pharmaceuticals, and Molecular Medicine', arTitle: 'الكيمياء الحيوية والمستحضرات الدوائية والطب الجزيئي' },
        { enTitle: 'Industrial Chemistry', arTitle: 'الكيمياء الصناعية' }
      ]
    },
    {
      icon: Cpu,
      title: t('topic_nano'),
      description: t('topic_nano_desc'),
      color: 'from-[#2CA6C4] to-[#35B0B7]',
      details: [
        { enTitle: 'Nanofibers and Nano-enabled Devices', arTitle: 'الألياف النانوية والأجهزة المدعومة بتقنيات النانو' },
        { enTitle: 'Nanomedicine and Pharmaceutical Nanotechnology', arTitle: 'الطب النانوي والتقنيات النانوية الدوائية' },
        { enTitle: 'Nano-fabrication and Scalable Production Techniques', arTitle: 'تقنيات التصنيع النانوي وأساليب الإنتاج القابلة للتوسع' },
        { enTitle: 'Industrial Applications of Nanotechnology', arTitle: 'التطبيقات الصناعية لتكنولوجيا النانو' },
        { enTitle: 'Nanomaterials, Nanoscale Design, and Nano-enabled Systems', arTitle: 'المواد النانوية والتصميم على المقياس النانوي والأنظمة المعتمدة على النانو' }
      ]
    },
    {
      icon: Zap,
      title: t('topic_energy'),
      description: t('topic_energy_desc'),
      color: 'from-[#146C43] to-[#35B0B7]',
      details: [
        { enTitle: 'Renewable and Clean Energy Systems', arTitle: 'أنظمة الطاقة المتجددة والنظيفة' },
        { enTitle: 'Energy Storage, Conversion, and Efficiency', arTitle: 'تخزين الطاقة وتحويلها وكفاءتها' },
        { enTitle: 'Hydrogen Technologies and Future Fuels', arTitle: 'تقنيات الهيدروجين ووقود المستقبل' },
        { enTitle: 'Sustainable Energy Solutions for Industrial Applications', arTitle: 'حلول الطاقة المستدامة للتطبيقات الصناعية' }
      ]
    },
    {
      icon: Leaf,
      title: t('topic_agro'),
      description: t('topic_agro_desc'),
      color: 'from-[#35B0B7] to-[#146C43]',
      details: [
        { enTitle: 'Pesticide Chemistry and Formulation Technologies', arTitle: 'كيمياء المبيدات وتقنيات التحضير' },
        { enTitle: 'Agrochemical Innovation and Sustainable Agriculture', arTitle: 'الابتكار في الكيمياء الزراعية والزراعة المستدامة' },
        { enTitle: 'Nanotechnology for Sustainable Agriculture and Plant Protection', arTitle: 'تكنولوجيا النانو من أجل الزراعة المستدامة وحماية النباتات' },
        { enTitle: 'Smart and Precision Agriculture Systems', arTitle: 'أنظمة الزراعة الذكية والدقيقة' },
        { enTitle: 'Plant Bioactive Compounds, Functional Biomolecules, and Agro-biotechnology', arTitle: 'المركبات النشطة بيولوجيًا والجزيئات الوظيفية والتكنولوجيا الحيوية الزراعية' },
        { enTitle: 'Integrated and Eco-friendly Agricultural Practices', arTitle: 'الممارسات الزراعية المتكاملة والصديقة للبيئة' },
        { enTitle: 'Environmental Fate, Toxicology, and Risk Assessment', arTitle: 'المصير البيئي والسمية وتقييم المخاطر' }
      ]
    },
    {
      icon: Brain,
      title: t('topic_ai'),
      description: t('topic_ai_desc'),
      color: 'from-[#1E73A8] to-[#0A2647]',
      details: []
    },
    {
      icon: TreePine,
      title: t('topic_enviro'),
      description: t('topic_enviro_desc'),
      color: 'from-[#146C43] to-[#2CA6C4]',
      details: [
        { enTitle: 'Water & Wastewater Treatment Technologies', arTitle: 'تقنيات معالجة المياه ومياه الصرف' },
        { enTitle: 'Water Reuse & Industrial Water Management (ZLD)', arTitle: 'إعادة استخدام المياه وإدارة المياه الصناعية (ZLD)' },
        { enTitle: 'Environmental Remediation & Pollution Control', arTitle: 'المعالجة البيئية ومكافحة التلوث' },
        { enTitle: 'Circular Economy & Resource Recovery', arTitle: 'الاقتصاد الدائري واسترداد الموارد' }
      ]
    },
    {
      icon: Factory,
      title: t('topic_engineering'),
      description: t('topic_engineering_desc'),
      color: 'from-[#0A2647] to-[#1E73A8]',
      details: [
        { enTitle: 'Reaction Engineering & Process Intensification', arTitle: 'هندسة التفاعلات وتكثيف العمليات' },
        { enTitle: 'Separation Technologies (Membranes, Adsorption, Distillation)', arTitle: 'تقنيات الفصل (الأغشية والامتزاز والتقطير)' },
        { enTitle: 'Industrial Process Design and Optimization', arTitle: 'تصميم العمليات الصناعية وتحسينها' },
        { enTitle: 'Sustainable and Energy-efficient Chemical Processes', arTitle: 'العمليات الكيميائية المستدامة والموفرة للطاقة' }
      ]
    },
    {
      icon: Lightbulb,
      title: t('topic_innovation'),
      description: t('topic_innovation_desc'),
      color: 'from-[#F2B21A] to-[#2CA6C4]',
      details: [
        { enTitle: 'Technology Transfer & Commercialization', arTitle: 'نقل التكنولوجيا والتسويق التجاري' },
        { enTitle: 'Startups & Deep-tech Innovation', arTitle: 'الشركات الناشئة والابتكار في التقنيات العميقة' },
        { enTitle: 'Industry–Academia Collaboration', arTitle: 'التعاون بين الصناعة والأوساط الأكاديمية' },
        { enTitle: 'Applied Research & Market-driven Solutions', arTitle: 'البحوث التطبيقية والحلول الموجهة للسوق' },
        { enTitle: 'Student Innovation & Prototype Development', arTitle: 'ابتكار الطلاب وتطوير النماذج الأولية' },
        { enTitle: 'Innovation and Entrepreneurship in Agri-food Technologies', arTitle: 'الابتكار وريادة الأعمال في تقنيات الأغذية الزراعية' }
      ]
    }
  ];

  return (
    <section id="topics" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('topics_title')}
        </h2>

        <p className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed mb-14">
          {uiText[language].sectionIntro}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              onClick={() => toggleTopic(index)}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 cursor-pointer"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${topic.color} mb-4`}>
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 leading-snug text-lg">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 mt-1 ${expandedIndex === index ? 'rotate-180' : ''}`}
                  />
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-border/50 mt-4">
                    <ul className="space-y-2">
                      {topic.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-3 px-4 py-3 rounded-xl border border-border/80 bg-background/50 text-sm leading-relaxed text-foreground"
                        >
                          <span className="text-primary mt-0.5 shrink-0">•</span>
                          <span>{language === 'en' ? detail.enTitle : detail.arTitle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
