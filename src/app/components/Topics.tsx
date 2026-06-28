import { useLanguage } from '../contexts/LanguageContext';
import { Atom, Cpu, Zap, Leaf, Brain, TreePine, Factory, Lightbulb } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function Topics() {
  const { language, t } = useLanguage();

  const uiText = {
    en: {
      sectionIntro:
        'Explore the conference themes through focused subtopics that connect scientific advances with industrial and societal impact.',
      subtopicsLabel: 'Featured Subtopics',
      toggleLabel: 'Show subtopics'
    },
    ar: {
      sectionIntro:
        'استكشف محاور المؤتمر من خلال موضوعات فرعية متخصصة تربط بين التقدم العلمي والأثر الصناعي والمجتمعي.',
      subtopicsLabel: 'الموضوعات الفرعية',
      toggleLabel: 'عرض الموضوعات الفرعية'
    }
  };

  const topics = [
    {
      icon: Atom,
      title: t('topic_chemistry'),
      description: t('topic_chemistry_desc'),
      color: 'from-[#1E73A8] to-[#2CA6C4]',
      details: [
        {
          enTitle: 'Smart and Functional Polymers',
          arTitle: 'البوليمرات الذكية والوظيفية',
        },
        {
          enTitle: 'Metal-Organic Frameworks (MOFs) and Advanced Materials',
          arTitle: 'الأطر الفلزية العضوية (MOFs) والمواد المتقدمة',
        },
        {
          enTitle: 'Green and Sustainable Chemistry',
          arTitle: 'الكيمياء الخضراء والمستدامة',
        },
        {
          enTitle: 'Catalysis and Corrosion Science',
          arTitle: 'علوم التحفيز والتآكل',
        },
        {
          enTitle: 'Petroleum Chemistry, Refining Processes, and Petrochemical Technologies',
          arTitle: 'كيمياء البترول وعمليات التكرير والتقنيات البتروكيميائية',
        },
        {
          enTitle: 'Sensors, Biosensors, and Analytical Systems',
          arTitle: 'المستشعرات والمستشعرات الحيوية والأنظمة التحليلية',
        },
        {
          enTitle: 'Biochemistry, Pharmaceuticals, and Molecular Medicine',
          arTitle: 'الكيمياء الحيوية والمستحضرات الدوائية والطب الجزيئي',
        },
        {
          enTitle: 'Industrial Chemistry',
          arTitle: 'الكيمياء الصناعية',
        }
      ]
    },
    {
      icon: Cpu,
      title: t('topic_nano'),
      description: t('topic_nano_desc'),
      color: 'from-[#2CA6C4] to-[#35B0B7]',
      details: [
        {
          enTitle: 'Nanofibers and Nano-enabled Devices',
          arTitle: 'الألياف النانوية والأجهزة المدعومة بتقنيات النانو',
        },
        {
          enTitle: 'Nanomedicine and Pharmaceutical Nanotechnology',
          arTitle: 'الطب النانوي والتقنيات النانوية الدوائية',
        },
        {
          enTitle: 'Nano-fabrication and Scalable Production Techniques',
          arTitle: 'تقنيات التصنيع النانوي وأساليب الإنتاج القابلة للتوسع',
        },
        {
          enTitle: 'Industrial Applications of Nanotechnology',
          arTitle: 'التطبيقات الصناعية لتكنولوجيا النانو',
        },
        {
          enTitle: 'Nanomaterials, Nanoscale Design, and Nano-enabled Systems',
          arTitle: 'المواد النانوية والتصميم على المقياس النانوي والأنظمة المعتمدة على النانو',
        }
      ]
    },
    {
      icon: Zap,
      title: t('topic_energy'),
      description: t('topic_energy_desc'),
      color: 'from-[#146C43] to-[#35B0B7]',
      details: [
        {
          enTitle: 'Renewable and Clean Energy Systems',
          arTitle: 'أنظمة الطاقة المتجددة والنظيفة',
        },
        {
          enTitle: 'Energy Storage, Conversion, and Efficiency',
          arTitle: 'تخزين الطاقة وتحويلها وكفاءتها',
        },
        {
          enTitle: 'Hydrogen Technologies and Future Fuels',
          arTitle: 'تقنيات الهيدروجين ووقود المستقبل',
        },
        {
          enTitle: 'Sustainable Energy Solutions for Industrial Applications',
          arTitle: 'حلول الطاقة المستدامة للتطبيقات الصناعية',
        }
      ]
    },
    {
      icon: Leaf,
      title: t('topic_agro'),
      description: t('topic_agro_desc'),
      color: 'from-[#35B0B7] to-[#146C43]',
      details: [
        {
          enTitle: 'Pesticide Chemistry and Formulation Technologies',
          arTitle: 'كيمياء المبيدات وتقنيات التحضير',
        },
        {
          enTitle: 'Agrochemical Innovation and Sustainable Agriculture',
          arTitle: 'الابتكار في الكيمياء الزراعية والزراعة المستدامة',
        },
        {
          enTitle: 'Environmental Fate, Toxicology, and Risk Assessment',
          arTitle: 'المصير البيئي والسمية وتقييم المخاطر',
        },
        {
          enTitle: 'Integrated and Eco-friendly Agricultural Practices',
          arTitle: 'الممارسات الزراعية المتكاملة والصديقة للبيئة',
        }
      ]
    },
    {
      icon: Brain,
      title: t('topic_ai'),
      description: t('topic_ai_desc'),
      color: 'from-[#1E73A8] to-[#0A2647]',
      details: [
        {
          enTitle: 'AI-driven Materials & Drug Discovery',
          arTitle: 'الاكتشاف المدعوم بالذكاء الاصطناعي للمواد والأدوية',
        },
        {
          enTitle: 'Smart Manufacturing & Industry 4.0',
          arTitle: 'التصنيع الذكي والثورة الصناعية الرابعة',
        },
        {
          enTitle: 'Digitalization of Chemical and Industrial Systems',
          arTitle: 'الرقمنة في الأنظمة الكيميائية والصناعية',
        },
        {
          enTitle: 'Integration of Smart Monitoring',
          arTitle: 'تكامل أنظمة المراقبة الذكية',
        },
        {
          enTitle: 'Data Analytics, Modeling, and Process Optimization',
          arTitle: 'تحليل البيانات والنمذجة وتحسين العمليات',
        }
      ]
    },
    {
      icon: TreePine,
      title: t('topic_enviro'),
      description: t('topic_enviro_desc'),
      color: 'from-[#146C43] to-[#2CA6C4]',
      details: [
        {
          enTitle: 'Water & Wastewater Treatment Technologies',
          arTitle: 'تقنيات معالجة المياه ومياه الصرف',
        },
        {
          enTitle: 'Water Reuse & Industrial Water Management (ZLD)',
          arTitle: 'إعادة استخدام المياه وإدارة المياه الصناعية (ZLD)',
        },
        {
          enTitle: 'Environmental Remediation & Pollution Control',
          arTitle: 'المعالجة البيئية ومكافحة التلوث',
        },
        {
          enTitle: 'Circular Economy & Resource Recovery',
          arTitle: 'الاقتصاد الدائري واسترداد الموارد',
        }
      ]
    },
    {
      icon: Factory,
      title: t('topic_engineering'),
      description: t('topic_engineering_desc'),
      color: 'from-[#0A2647] to-[#1E73A8]',
      details: [
        {
          enTitle: 'Reaction Engineering & Process Intensification',
          arTitle: 'هندسة التفاعلات وتكثيف العمليات',
        },
        {
          enTitle: 'Separation Technologies (Membranes, Adsorption, Distillation)',
          arTitle: 'تقنيات الفصل (الأغشية والامتزاز والتقطير)',
        },
        {
          enTitle: 'Industrial Process Design and Optimization',
          arTitle: 'تصميم العمليات الصناعية وتحسينها',
        },
        {
          enTitle: 'Sustainable and Energy-efficient Chemical Processes',
          arTitle: 'العمليات الكيميائية المستدامة والموفرة للطاقة',
        }
      ]
    },
    {
      icon: Lightbulb,
      title: t('topic_innovation'),
      description: t('topic_innovation_desc'),
      color: 'from-[#F2B21A] to-[#2CA6C4]',
      details: [
        {
          enTitle: 'Technology Transfer & Commercialization',
          arTitle: 'نقل التكنولوجيا والتسويق التجاري',
        },
        {
          enTitle: 'Startups & Deep-tech Innovation',
          arTitle: 'الشركات الناشئة والابتكار في التقنيات العميقة',
        },
        {
          enTitle: 'Industry-Academia Collaboration',
          arTitle: 'التعاون بين الصناعة والأوساط الأكاديمية',
        },
        {
          enTitle: 'Applied Research & Market-driven Solutions',
          arTitle: 'البحوث التطبيقية والحلول الموجهة للسوق',
        },
        {
          enTitle: 'Student Innovation & Prototype Development',
          arTitle: 'ابتكار الطلاب وتطوير النماذج الأولية',
        }
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
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${topic.color} mb-4`}>
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 leading-snug text-lg">{topic.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{topic.description}</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`topic-${index}`} className="border-none">
                    <AccordionTrigger className="rounded-xl border border-border/80 bg-background/60 px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${topic.color}`} />
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            {uiText[language].subtopicsLabel}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {uiText[language].toggleLabel}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ul className="space-y-3 ps-6 text-sm leading-relaxed text-foreground marker:text-primary">
                        {topic.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="rounded-xl border border-border/80 bg-background/50 px-4 py-3"
                          >
                            {language === 'en' ? detail.enTitle : detail.arTitle}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
