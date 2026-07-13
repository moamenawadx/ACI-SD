import { supabase } from '../lib/supabase';

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
  receipt_path: string | null;
  is_admin: boolean;
  created_at: string;
}

export async function getParticipantRegistration(
  registrationId: string
): Promise<RegistrationRecord> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('id', registrationId)
    .single();

  if (error) {
    console.error('getParticipantRegistration error:', error);
    throw new ParticipantError(
      `Failed to load registration details: ${error.message}`,
      error.code
    );
  }

  if (!data) {
    throw new ParticipantError('Registration record not found.');
  }

  return data;
}


