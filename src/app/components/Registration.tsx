import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import {
  GraduationCap,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  Copy,
  Check,
  RotateCcw,
  ArrowRightLeft
} from 'lucide-react';

interface FeeRow {
  key: string;
  egpDouble: string;
  egpSingle: string | null;
  egpOnline: string | null;
  usdDouble: string;
  usdSingle: string | null;
  usdOnline: string | null;
}

const feeRows: FeeRow[] = [
  { key: 'reg_category_full_paper', egpDouble: '10,500', egpSingle: '13,500', egpOnline: '5,000', usdDouble: '1000', usdSingle: '1,200', usdOnline: '600' },
  { key: 'reg_category_abstract', egpDouble: '9,500', egpSingle: '12,500', egpOnline: '4,000', usdDouble: '850', usdSingle: '1,050', usdOnline: '500' },
  { key: 'reg_category_attendee', egpDouble: '9,000', egpSingle: '12,000', egpOnline: '3,000', usdDouble: '750', usdSingle: '950', usdOnline: '400' },
  { key: 'reg_category_accompanying', egpDouble: '9,000', egpSingle: null, egpOnline: null, usdDouble: '700', usdSingle: null, usdOnline: null }
];

const includes = [
  'reg_include_welcome_packet',
  'reg_include_publication',
  'reg_include_sessions',
  'reg_include_proceedings',
  'reg_include_program',
  'reg_include_gift_bag',
  'reg_include_certificate',
  'reg_include_accommodation'
];

const notIncludes = [
  'reg_not_include_visa',
  'reg_not_include_transport',
  'reg_not_include_one_author',
  'reg_not_include_additional_authors'
];

const bankFields = [
  { label: 'bank_account', value: 'Scientific Society of Chemistry (SSC)' },
  { label: 'bank_name', value: 'Egyptian Arab Land Bank (EALB)' },
  { label: 'reg_account_number', value: '11100436905020000111' },
  { label: 'reg_iban', value: 'EG310007001150200111100436900' },
  { label: 'reg_swift', value: 'ARLBEGCAXXX' }
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all shrink-0"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-500">{t('reg_copied')}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function AnimatedAccordion({ open, children }: { open: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="grid transition-all duration-300 ease-in-out"
      style={{
        gridTemplateRows: open ? '1fr' : '0fr'
      }}
    >
      <div ref={contentRef} className="overflow-hidden">
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Registration() {
  const { t } = useLanguage();
  const [showBankDetails, setShowBankDetails] = useState(false);

  const renderCell = (value: string | null) =>
    value !== null ? (
      value
    ) : (
      <span className="text-muted-foreground">{t('reg_not_available')}</span>
    );

  return (
    <section id="registration" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('registration_title')}
        </h2>

        <p className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed mb-12">
          {t('reg_intro')}
        </p>

        <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
          {t('reg_fee_schedule')}
        </h3>

        <div className="overflow-x-auto rounded-2xl shadow-lg mb-12">
          <table className="w-full text-sm bg-card border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white">
                <th
                  rowSpan={2}
                  className="sticky top-0 px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[180px]"
                >
                  {t('reg_header_category')}
                </th>
                <th
                  colSpan={2}
                  className="sticky top-0 px-4 py-3 text-center font-semibold whitespace-nowrap min-w-[200px]"
                >
                  {t('reg_header_egp_onsite')}
                </th>
                <th
                  rowSpan={2}
                  className="sticky top-0 px-4 py-3 text-center font-semibold whitespace-nowrap min-w-[120px]"
                >
                  {t('reg_header_egp_online')}
                </th>
                <th
                  colSpan={2}
                  className="sticky top-0 px-4 py-3 text-center font-semibold whitespace-nowrap min-w-[200px]"
                >
                  {t('reg_header_usd_onsite')}
                </th>
                <th
                  rowSpan={2}
                  className="sticky top-0 px-4 py-3 text-center font-semibold whitespace-nowrap min-w-[120px]"
                >
                  {t('reg_header_usd_online')}
                </th>
              </tr>
              <tr className="bg-gradient-to-r from-[#1E73A8]/90 to-[#2CA6C4]/90 text-white/90">
                <th className="px-4 py-2 text-center font-medium whitespace-nowrap text-xs uppercase tracking-wider">
                  {t('reg_header_double')}
                </th>
                <th className="px-4 py-2 text-center font-medium whitespace-nowrap text-xs uppercase tracking-wider">
                  {t('reg_header_single')}
                </th>
                <th className="px-4 py-2 text-center font-medium whitespace-nowrap text-xs uppercase tracking-wider">
                  {t('reg_header_double')}
                </th>
                <th className="px-4 py-2 text-center font-medium whitespace-nowrap text-xs uppercase tracking-wider">
                  {t('reg_header_single')}
                </th>
              </tr>
            </thead>
            <tbody>
              {feeRows.map((row) => (
                <tr
                  key={row.key}
                  className="border-t border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-foreground">
                    {t(row.key)}
                  </td>
                  <td className="px-4 py-4 text-center text-foreground">{renderCell(row.egpDouble)}</td>
                  <td className="px-4 py-4 text-center text-foreground">{renderCell(row.egpSingle)}</td>
                  <td className="px-4 py-4 text-center text-foreground">{renderCell(row.egpOnline)}</td>
                  <td className="px-4 py-4 text-center text-foreground">{renderCell(row.usdDouble)}</td>
                  <td className="px-4 py-4 text-center text-foreground">{renderCell(row.usdSingle)}</td>
                  <td className="px-4 py-4 text-center text-foreground">{renderCell(row.usdOnline)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/50 shrink-0">
              <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">
                {t('reg_student_title')}
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                {t('reg_student_text')}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <button
            onClick={() => setShowBankDetails(!showBankDetails)}
            className="w-full p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4]">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-foreground text-lg">{t('bank_details')}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                showBankDetails ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatedAccordion open={showBankDetails}>
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              {bankFields.map((field) => (
                <div key={field.label} className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">{t(field.label)}</span>
                    <p className="text-foreground font-medium font-mono text-sm mt-0.5 break-all">
                      {field.value}
                    </p>
                  </div>
                  <CopyButton text={field.value} />
                </div>
              ))}
            </div>
          </AnimatedAccordion>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {t('reg_includes_title')}
            </h3>
            <ul className="space-y-3">
              {includes.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              {t('reg_not_includes_title')}
            </h3>
            <ul className="space-y-3">
              {notIncludes.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm mb-12">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#1E73A8]" />
            {t('reg_cancellation_title')}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-justify">
            {t('reg_cancellation_intro')}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-[#1E73A8]" />
              <div>
                <span className="text-sm text-foreground">{t('reg_cancellation_1')}</span>
                <span className="ml-1.5 inline-block rounded-full bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400">
                  80%
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-[#F2B21A]" />
              <div>
                <span className="text-sm text-foreground">{t('reg_cancellation_2')}</span>
                <span className="ml-1.5 inline-block rounded-full bg-amber-100 dark:bg-amber-900/40 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                  50%
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <div>
                <span className="text-sm text-foreground">{t('reg_cancellation_3')}</span>
                <span className="ml-1.5 inline-block rounded-full bg-red-100 dark:bg-red-900/40 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:text-red-400">
                  0%
                </span>
              </div>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-5 text-justify">
            {t('reg_cancellation_note')}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm mb-12">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[#2CA6C4]" />
            {t('reg_transfer_title')}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed text-justify">
            {t('reg_transfer_desc')}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50 shrink-0">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">
                {t('reg_additional_title')}
              </h3>
              <ul className="space-y-1">
                <li className="text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-blue-500 shrink-0" />
                  {t('reg_additional_video')}
                </li>
                <li className="text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-blue-500 shrink-0" />
                  {t('reg_additional_early')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/register"
            className="inline-block px-10 py-4 rounded-xl bg-[#F2B21A] text-[#0A0F1E] font-semibold text-lg hover:shadow-2xl hover:shadow-[#F2B21A]/30 transition-all duration-300 transform hover:scale-105"
          >
            {t('registerNow')}
          </Link>
        </div>
      </div>
    </section>
  );
}
