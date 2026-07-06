import { supabase } from '../lib/supabase';
import type { ParticipantSession } from './sessionService';

export class ParticipantError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ParticipantError';
  }
}

export interface RegistrationRecord {
  id: string;
  registration_number: string;
  title: string;
  full_name: string;
  name_on_certificate: string;
  gender: string;
  nationality: string;
  passport_or_national_id: string;
  university_organization: string;
  faculty_department: string;
  position: string;
  country: string;
  email: string;
  mobile_phone: string;
  whatsapp: string;
  postal_address: string | null;
  attendance_mode: string;
  participation_type: string;
  presentation_type: string | null;
  paper_title: string | null;
  conference_topic: string;
  conference_topic_other: string | null;
  room_type: string | null;
  check_in: string | null;
  check_out: string | null;
  roommate: string | null;
  arrival_airport: string | null;
  arrival_date: string | null;
  arrival_time: string | null;
  departure_date: string | null;
  departure_time: string | null;
  invitation_letter: boolean | null;
  visa_support_letter: boolean | null;
  other_requirements: string | null;
  registration_category: string;
  payment_method: string;
  amount_paid: string;
  payment_date: string;
  transaction_reference: string;
  receipt_url: string | null;
  abstract_uploaded: boolean;
  abstract_uploaded_at: string | null;
  created_at: string;
}

export interface AbstractSubmissionRecord {
  id: string;
  registration_id: string;
  abstract_summary: string;
  abstract_file_url: string;
  created_at: string;
}

export async function loginParticipant(
  registrationNumber: string,
  passportOrNationalId: string
): Promise<ParticipantSession> {
  const { data, error } = await supabase
    .from('registrations')
    .select('id, registration_number, full_name, email, passport_or_national_id')
    .eq('registration_number', registrationNumber)
    .eq('passport_or_national_id', passportOrNationalId)
    .single();

  if (error || !data) {
    throw new ParticipantError(
      'No participant found with the provided credentials. Please check your Registration Number and National ID / Passport Number and try again.'
    );
  }

  return {
    id: data.id,
    registrationNumber: data.registration_number,
    fullName: data.full_name,
    email: data.email,
    passportOrNationalId: data.passport_or_national_id,
  };
}

export async function getParticipantRegistration(
  registrationId: string
): Promise<RegistrationRecord> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('id', registrationId)
    .single();

  if (error || !data) {
    throw new ParticipantError('Failed to load registration details.');
  }

  return data;
}

export async function getAbstractSubmission(
  registrationId: string
): Promise<AbstractSubmissionRecord | null> {
  const { data, error } = await supabase
    .from('abstract_submissions')
    .select('*')
    .eq('registration_id', registrationId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new ParticipantError('Failed to load abstract submission.');
  }

  return data;
}
