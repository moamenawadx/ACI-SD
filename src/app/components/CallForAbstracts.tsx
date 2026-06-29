import { FileDown, MessageSquare, Image as ImageIcon, Download, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DownloadCard {
  titleKey: string;
  subtitleKey: string;
  icon: LucideIcon;
  color: string;
  fileUrl?: string;
}

const oralCard: DownloadCard = {
  titleKey: 'abstract_oral',
  subtitleKey: 'abstract_oral_subtitle',
  icon: MessageSquare,
  color: 'from-[#2CA6C4] to-[#35B0B7]',
  fileUrl: 'https://drive.google.com/uc?export=download&id=1cz_nuSMrtJQTrDhze78VWomFRKYw7_w9'
};

const posterCard: DownloadCard = {
  titleKey: 'abstract_poster',
  subtitleKey: 'abstract_poster_subtitle',
  icon: ImageIcon,
  color: 'from-[#1E73A8] to-[#2CA6C4]',
  fileUrl: 'https://drive.google.com/uc?export=download&id=1XuKAodGJJ0BJlVx2Q51qr44tsBO9Thfr'
};

const templateCard: DownloadCard = {
  titleKey: 'abstract_template',
  subtitleKey: 'abstract_template_subtitle',
  icon: FileDown,
  color: 'from-[#F2B21A] to-[#2CA6C4]',
  fileUrl: 'https://drive.google.com/uc?export=download&id=1Wb_D8SbEmmL98PHMOqL2mqp4N6we-CgN'
};

const cards = [oralCard, posterCard, templateCard];

export function CallForAbstracts() {
  const { t } = useLanguage();

  const handleDownload = (card: DownloadCard) => {
    if (card.fileUrl) {
      window.open(card.fileUrl, '_blank');
    }
  };

  return (
    <section id="abstract" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#F2B21A] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('abstract_title')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => card.fileUrl && handleDownload(card)}
              className={`relative group p-8 rounded-2xl bg-card border border-border transition-all duration-300 flex flex-col items-center text-center min-h-[220px] ${
                card.fileUrl
                  ? 'cursor-pointer hover:border-transparent hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1'
                  : 'opacity-80'
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative flex flex-col items-center text-center flex-1">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-foreground text-lg">{t(card.titleKey)}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t(card.subtitleKey)}</p>

                {card.fileUrl ? (
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </span>
                  </div>
                ) : (
                  <div className="mt-auto pt-4">
                    <span className="inline-block rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                      Available soon
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
