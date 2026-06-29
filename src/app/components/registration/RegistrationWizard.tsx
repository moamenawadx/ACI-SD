import { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { RegistrationFormData } from '../../types/registration';
import { initialFormData, stepLabels } from '../../types/registration';
import { TextInput, SelectInput, RadioGroup, CheckboxField, TextArea, CountrySelect, PhoneInput, DatePicker, FileUpload } from './FormFields';
import {
  titles, genders, attendanceModes, participationTypes, presentationTypes,
  conferenceTopics, roomTypes, registrationCategories, paymentMethods, countries
} from '../../types/registration';

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = ((current) / (total - 1)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Step {current + 1} of {total}
        </span>
        <span className="text-muted-foreground">{stepLabels[current]}</span>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ease-out flex-1 ${
              i <= current ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between">
        {stepLabels.map((label, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              i <= current ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < current
                ? 'bg-primary text-primary-foreground'
                : i === current
                ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                : 'bg-muted text-muted-foreground'
            }`}>
              {i < current ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </span>
            <span className="text-[10px] text-muted-foreground text-center leading-tight max-w-16 hidden sm:block">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-foreground mb-6">{title}</h3>
      {children}
    </div>
  );
}

interface StepProps {
  data: RegistrationFormData;
  update: (patch: Partial<RegistrationFormData>) => void;
  errors: Record<string, string>;
}

function Step1PersonalInfo({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Personal Information">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <SelectInput
          label="Title"
          options={titles.map(t => ({ value: t, label: t }))}
          placeholder="Select title"
          value={data.title}
          onChange={(e) => update({ title: e.target.value })}
          error={errors.title}
          required
        />
        <div className="sm:col-span-2">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            error={errors.fullName}
            required
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <TextInput
            label="Name on Certificate"
            placeholder="Enter the name as it should appear on the certificate"
            value={data.nameOnCertificate}
            onChange={(e) => update({ nameOnCertificate: e.target.value })}
            error={errors.nameOnCertificate}
            required
          />
        </div>
        <RadioGroup
          label="Gender"
          name="gender"
          options={genders.map(g => ({ value: g.toLowerCase(), label: g }))}
          value={data.gender}
          onChange={(v) => update({ gender: v })}
          error={errors.gender}
          required
        />
        <CountrySelect
          label="Nationality"
          value={data.nationality}
          onChange={(v) => update({ nationality: v })}
          error={errors.nationality}
          required
        />
        <TextInput
          label="Passport / National ID"
          placeholder="Enter passport or national ID number"
          value={data.passportOrNationalId}
          onChange={(e) => update({ passportOrNationalId: e.target.value })}
          error={errors.passportOrNationalId}
          required
        />
      </div>
    </StepCard>
  );
}

function Step2Affiliation({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Affiliation">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <TextInput
            label="University / Organization"
            placeholder="Enter your university or organization name"
            value={data.universityOrganization}
            onChange={(e) => update({ universityOrganization: e.target.value })}
            error={errors.universityOrganization}
            required
          />
        </div>
        <TextInput
          label="Faculty / Department"
          placeholder="Enter your faculty or department"
          value={data.facultyDepartment}
          onChange={(e) => update({ facultyDepartment: e.target.value })}
          error={errors.facultyDepartment}
          required
        />
        <TextInput
          label="Position"
          placeholder="Enter your position / job title"
          value={data.position}
          onChange={(e) => update({ position: e.target.value })}
          error={errors.position}
          required
        />
        <CountrySelect
          label="Country"
          value={data.country}
          onChange={(v) => update({ country: v })}
          error={errors.country}
          required
        />
      </div>
    </StepCard>
  );
}

function Step3ContactInfo({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Contact Information">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            error={errors.email}
            required
          />
        </div>
        <PhoneInput
          label="Mobile Phone"
          value={data.mobilePhone}
          onChange={(v) => update({ mobilePhone: v })}
          error={errors.mobilePhone}
          required
        />
        <PhoneInput
          label="WhatsApp"
          value={data.whatsapp}
          onChange={(v) => update({ whatsapp: v })}
        />
        <div className="sm:col-span-2">
          <TextArea
            label="Postal Address"
            placeholder="Enter your full postal address"
            value={data.postalAddress}
            onChange={(e) => update({ postalAddress: e.target.value })}
            error={errors.postalAddress}
            required
          />
        </div>
      </div>
    </StepCard>
  );
}

function Step4Participation({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Participation">
      <div className="space-y-6">
        <RadioGroup
          label="Attendance Mode"
          name="attendanceMode"
          options={attendanceModes}
          value={data.attendanceMode}
          onChange={(v) => update({ attendanceMode: v as 'onsite' | 'virtual' })}
          error={errors.attendanceMode}
          required
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <SelectInput
            label="Participation Type"
            options={participationTypes}
            placeholder="Select participation type"
            value={data.participationType}
            onChange={(e) => update({ participationType: e.target.value })}
            error={errors.participationType}
            required
          />
          <SelectInput
            label="Presentation Type"
            options={presentationTypes}
            placeholder="Select presentation type"
            value={data.presentationType}
            onChange={(e) => update({ presentationType: e.target.value })}
            error={errors.presentationType}
            required
          />
        </div>

        <TextInput
          label="Paper Title"
          placeholder="Enter your paper title"
          value={data.paperTitle}
          onChange={(e) => update({ paperTitle: e.target.value })}
          error={errors.paperTitle}
        />

        <SelectInput
          label="Conference Topic"
          options={conferenceTopics.map(t => ({ value: t, label: t }))}
          placeholder="Select conference topic"
          value={data.conferenceTopic}
          onChange={(e) => update({ conferenceTopic: e.target.value, conferenceTopicOther: e.target.value !== 'Other' ? '' : data.conferenceTopicOther })}
          error={errors.conferenceTopic}
          required
        />

        {data.conferenceTopic === 'Other' && (
          <TextInput
            label="Please specify"
            placeholder="Enter your conference topic"
            value={data.conferenceTopicOther}
            onChange={(e) => update({ conferenceTopicOther: e.target.value })}
            error={errors.conferenceTopicOther}
            required
          />
        )}
      </div>
    </StepCard>
  );
}

function Step5AccommodationTravel({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Accommodation & Travel">
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Accommodation</h4>
          <div className="grid sm:grid-cols-2 gap-5">
            <SelectInput
              label="Room Type"
              options={roomTypes}
              placeholder="Select room type"
              value={data.roomType}
              onChange={(e) => update({ roomType: e.target.value })}
              error={errors.roomType}
            />
            <TextInput
              label="Roommate"
              placeholder="Roommate full name (if applicable)"
              value={data.roommate}
              onChange={(e) => update({ roommate: e.target.value })}
            />
            <DatePicker
              label="Check-in"
              value={data.checkIn}
              onChange={(v) => update({ checkIn: v })}
              error={errors.checkIn}
            />
            <DatePicker
              label="Check-out"
              value={data.checkOut}
              onChange={(v) => update({ checkOut: v })}
              error={errors.checkOut}
              min={data.checkIn || undefined}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Travel</h4>
          <div className="grid sm:grid-cols-2 gap-5">
            <TextInput
              label="Arrival Airport"
              placeholder="Enter arrival airport"
              value={data.arrivalAirport}
              onChange={(e) => update({ arrivalAirport: e.target.value })}
            />
            <div />
            <DatePicker
              label="Arrival Date"
              value={data.arrivalDate}
              onChange={(v) => update({ arrivalDate: v })}
            />
            <TextInput
              label="Arrival Time"
              type="time"
              value={data.arrivalTime}
              onChange={(e) => update({ arrivalTime: e.target.value })}
            />
            <DatePicker
              label="Departure Date"
              value={data.departureDate}
              onChange={(v) => update({ departureDate: v })}
            />
            <TextInput
              label="Departure Time"
              type="time"
              value={data.departureTime}
              onChange={(e) => update({ departureTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Special Requirements</h4>
          <div className="space-y-3">
            <CheckboxField
              label="I require an invitation letter"
              checked={data.invitationLetter}
              onChange={(v) => update({ invitationLetter: v })}
            />
            <CheckboxField
              label="I require a visa support letter"
              checked={data.visaSupportLetter}
              onChange={(v) => update({ visaSupportLetter: v })}
            />
          </div>
          <div className="mt-4">
            <TextArea
              label="Other Requirements"
              placeholder="Describe any other requirements..."
              value={data.otherRequirements}
              onChange={(e) => update({ otherRequirements: e.target.value })}
            />
          </div>
        </div>
      </div>
    </StepCard>
  );
}

function Step6Payment({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Payment">
      <div className="space-y-6">
        <SelectInput
          label="Registration Category"
          options={registrationCategories}
          placeholder="Select registration category"
          value={data.registrationCategory}
          onChange={(e) => update({ registrationCategory: e.target.value })}
          error={errors.registrationCategory}
          required
        />

        <SelectInput
          label="Payment Method"
          options={paymentMethods}
          placeholder="Select payment method"
          value={data.paymentMethod}
          onChange={(e) => update({ paymentMethod: e.target.value })}
          error={errors.paymentMethod}
          required
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <TextInput
            label="Amount Paid"
            type="number"
            placeholder="Enter amount"
            value={data.amountPaid}
            onChange={(e) => update({ amountPaid: e.target.value })}
            error={errors.amountPaid}
            required
          />
          <DatePicker
            label="Payment Date"
            value={data.paymentDate}
            onChange={(v) => update({ paymentDate: v })}
            error={errors.paymentDate}
            required
          />
        </div>

        <TextInput
          label="Transaction Reference"
          placeholder="Enter transaction reference number"
          value={data.transactionReference}
          onChange={(e) => update({ transactionReference: e.target.value })}
          error={errors.transactionReference}
          required
        />

        <FileUpload
          label="Upload Receipt"
          value={data.receiptFile}
          onChange={(f) => update({ receiptFile: f })}
          error={errors.receiptFile as string}
          accept=".pdf,.jpg,.jpeg,.png"
          maxSize={10}
          required
        />
      </div>
    </StepCard>
  );
}

function ReviewRow({ label, value }: { label: string; value: string | boolean | null }) {
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || '—';
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground w-1/3 shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground break-words">{display}</span>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{title}</h4>
      <div className="divide-y divide-border/50">{children}</div>
    </div>
  );
}

function Step7ReviewSubmit({ data, update, errors }: StepProps) {
  return (
    <StepCard title="Review & Submit">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Please review all information below before submitting. You can go back to edit any step.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <ReviewSection title="Personal Information">
            <ReviewRow label="Title" value={data.title} />
            <ReviewRow label="Full Name" value={data.fullName} />
            <ReviewRow label="Name on Certificate" value={data.nameOnCertificate} />
            <ReviewRow label="Gender" value={data.gender} />
            <ReviewRow label="Nationality" value={data.nationality} />
            <ReviewRow label="Passport / National ID" value={data.passportOrNationalId} />
          </ReviewSection>

          <div className="space-y-4">
            <ReviewSection title="Affiliation">
              <ReviewRow label="University / Organization" value={data.universityOrganization} />
              <ReviewRow label="Faculty / Department" value={data.facultyDepartment} />
              <ReviewRow label="Position" value={data.position} />
              <ReviewRow label="Country" value={data.country} />
            </ReviewSection>

            <ReviewSection title="Contact Information">
              <ReviewRow label="Email" value={data.email} />
              <ReviewRow label="Mobile Phone" value={data.mobilePhone} />
              <ReviewRow label="WhatsApp" value={data.whatsapp} />
              <ReviewRow label="Postal Address" value={data.postalAddress} />
            </ReviewSection>
          </div>
        </div>

        <ReviewSection title="Participation">
          <ReviewRow label="Attendance Mode" value={data.attendanceMode} />
          <ReviewRow label="Participation Type" value={data.participationType} />
          <ReviewRow label="Presentation Type" value={data.presentationType} />
          <ReviewRow label="Paper Title" value={data.paperTitle} />
          <ReviewRow label="Conference Topic" value={data.conferenceTopic === 'Other' ? data.conferenceTopicOther : data.conferenceTopic} />
        </ReviewSection>

        <div className="grid sm:grid-cols-2 gap-4">
          <ReviewSection title="Accommodation & Travel">
            <ReviewRow label="Room Type" value={data.roomType} />
            <ReviewRow label="Check-in" value={data.checkIn} />
            <ReviewRow label="Check-out" value={data.checkOut} />
            <ReviewRow label="Roommate" value={data.roommate} />
            <ReviewRow label="Arrival Airport" value={data.arrivalAirport} />
            <ReviewRow label="Arrival Date" value={data.arrivalDate} />
            <ReviewRow label="Arrival Time" value={data.arrivalTime} />
            <ReviewRow label="Departure Date" value={data.departureDate} />
            <ReviewRow label="Departure Time" value={data.departureTime} />
            <ReviewRow label="Invitation Letter" value={data.invitationLetter} />
            <ReviewRow label="Visa Support Letter" value={data.visaSupportLetter} />
            <ReviewRow label="Other Requirements" value={data.otherRequirements} />
          </ReviewSection>

          <ReviewSection title="Payment">
            <ReviewRow label="Registration Category" value={data.registrationCategory} />
            <ReviewRow label="Payment Method" value={data.paymentMethod} />
            <ReviewRow label="Amount Paid" value={data.amountPaid} />
            <ReviewRow label="Payment Date" value={data.paymentDate} />
            <ReviewRow label="Transaction Reference" value={data.transactionReference} />
            <ReviewRow label="Receipt" value={data.receiptFile ? data.receiptFile.name : null} />
          </ReviewSection>
        </div>

        <div className="pt-4 border-t border-border">
          <CheckboxField
            label="I confirm that all information provided is accurate and complete. I understand that any false or misleading information may result in the rejection of my registration."
            checked={data.agreeDeclaration}
            onChange={(v) => update({ agreeDeclaration: v })}
            error={errors.agreeDeclaration}
          />
        </div>
      </div>
    </StepCard>
  );
}

function validateStep(step: number, data: RegistrationFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (step) {
    case 0: {
      if (!data.title) errors.title = 'Title is required';
      if (!data.fullName.trim()) errors.fullName = 'Full name is required';
      if (!data.nameOnCertificate.trim()) errors.nameOnCertificate = 'Name on certificate is required';
      if (!data.gender) errors.gender = 'Gender is required';
      if (!data.nationality) errors.nationality = 'Nationality is required';
      if (!data.passportOrNationalId.trim()) errors.passportOrNationalId = 'Passport or National ID is required';
      break;
    }
    case 1: {
      if (!data.universityOrganization.trim()) errors.universityOrganization = 'University or organization is required';
      if (!data.facultyDepartment.trim()) errors.facultyDepartment = 'Faculty or department is required';
      if (!data.position.trim()) errors.position = 'Position is required';
      if (!data.country) errors.country = 'Country is required';
      break;
    }
    case 2: {
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email format';
      }
      if (!data.mobilePhone.trim()) {
        errors.mobilePhone = 'Mobile phone is required';
      } else if (!/^[\d\s+()-]{7,20}$/.test(data.mobilePhone)) {
        errors.mobilePhone = 'Invalid phone number';
      }
      if (!data.postalAddress.trim()) errors.postalAddress = 'Postal address is required';
      break;
    }
    case 3: {
      if (!data.attendanceMode) errors.attendanceMode = 'Attendance mode is required';
      if (!data.participationType) errors.participationType = 'Participation type is required';
      if (!data.presentationType) errors.presentationType = 'Presentation type is required';
      if (!data.conferenceTopic) errors.conferenceTopic = 'Conference topic is required';
      if (data.conferenceTopic === 'Other' && !data.conferenceTopicOther.trim()) {
        errors.conferenceTopicOther = 'Please specify your topic';
      }
      break;
    }
    case 4: {
      break;
    }
    case 5: {
      if (!data.registrationCategory) errors.registrationCategory = 'Registration category is required';
      if (!data.paymentMethod) errors.paymentMethod = 'Payment method is required';
      if (!data.amountPaid.trim()) errors.amountPaid = 'Amount is required';
      if (!data.paymentDate) errors.paymentDate = 'Payment date is required';
      if (!data.transactionReference.trim()) errors.transactionReference = 'Transaction reference is required';
      if (!data.receiptFile) errors.receiptFile = 'Receipt is required';
      break;
    }
    case 6: {
      if (!data.agreeDeclaration) errors.agreeDeclaration = 'You must agree to proceed';
      break;
    }
  }

  return errors;
}

export function RegistrationWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RegistrationFormData>({ ...initialFormData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((patch: Partial<RegistrationFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  }, []);

  const currentErrors = useMemo(() => validateStep(step, data), [step, data]);

  const canProceed = useMemo(() => {
    if (step === 6) return true;
    return Object.keys(currentErrors).length === 0;
  }, [step, currentErrors]);

  const handleNext = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStep((s) => Math.min(s + 1, 6));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    const errs = validateStep(6, data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    console.log('=== Registration Form Data ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('Receipt file:', data.receiptFile);
    setSubmitted(true);
  };

  const handleEdit = (s: number) => {
    setStep(s);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Registration Submitted Successfully</h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Thank you for registering. Your data has been received. You will receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ProgressBar current={step} total={7} />

      {step === 0 && <Step1PersonalInfo data={data} update={update} errors={errors} />}
      {step === 1 && <Step2Affiliation data={data} update={update} errors={errors} />}
      {step === 2 && <Step3ContactInfo data={data} update={update} errors={errors} />}
      {step === 3 && <Step4Participation data={data} update={update} errors={errors} />}
      {step === 4 && <Step5AccommodationTravel data={data} update={update} errors={errors} />}
      {step === 5 && <Step6Payment data={data} update={update} errors={errors} />}
      {step === 6 && <Step7ReviewSubmit data={data} update={update} errors={errors} />}

      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 6 ? (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canProceed}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleEdit(0)}
              className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-all text-sm"
            >
              Edit All
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-[#F2B21A] text-[#0A0F1E] font-semibold hover:shadow-lg hover:shadow-[#F2B21A]/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!data.agreeDeclaration}
            >
              Submit Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
