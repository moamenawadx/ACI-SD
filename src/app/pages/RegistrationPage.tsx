import { useLanguage } from '../contexts/LanguageContext';
import { RegistrationWizard } from '../components/registration/RegistrationWizard';

export function RegistrationPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent mb-4">
            {t('registration_title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('reg_intro')}
          </p>
        </div>
        <RegistrationWizard />
      </div>
    </div>
  );
}
