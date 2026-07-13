import { supabase } from '../lib/supabase';
import type { RegistrationFormData } from '../app/types/registration';

export interface RegistrationResult {
  id: string;
  registrationNumber?: string;
  receiptPath?: string;
}

export class RegistrationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'RegistrationError';
  }
}

function mapFormDataToRow(data: RegistrationFormData, receiptPath?: string) {
  return {
    title: data.title || null,
    full_name: data.fullName || null,
    name_on_certificate: data.nameOnCertificate || null,
    gender: data.gender || null,
    nationality: data.nationality || null,
    passport_or_national_id: data.passportOrNationalId || null,

    university_organization: data.universityOrganization || null,
    faculty_department: data.facultyDepartment || null,
    position: data.position || null,
    country: data.country || null,

    email: data.email || null,
    mobile_phone: data.mobilePhone || null,
    whatsapp: data.whatsapp || null,
    postal_address: data.postalAddress || null,

    attendance_mode: data.attendanceMode || null,
    participation_type: data.participationType || null,
    presentation_type: data.presentationType || null,
    paper_title: data.paperTitle || null,
    conference_topic: data.conferenceTopic || null,
    conference_topic_other: data.conferenceTopicOther || null,

    room_type: data.roomType || null,
    check_in: data.checkIn || null,
    check_out: data.checkOut || null,
    roommate: data.roommate || null,
    arrival_airport: data.arrivalAirport || null,
    arrival_date: data.arrivalDate || null,
    arrival_time: data.arrivalTime || null,
    departure_date: data.departureDate || null,
    departure_time: data.departureTime || null,
    invitation_letter: data.invitationLetter || null,
    visa_support_letter: data.visaSupportLetter || null,
    other_requirements: data.otherRequirements || null,

    registration_category: data.registrationCategory || null,
    payment_method: data.paymentMethod || null,
    amount_paid: data.amountPaid || null,
    payment_date: data.paymentDate || null,
    transaction_reference: data.transactionReference || null,
    receipt_path: receiptPath || null,

    agree_declaration: data.agreeDeclaration || null,
  };
}

export async function uploadReceipt(
  registrationId: string,
  file: File,
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const filePath = `${registrationId}/receipt.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('receipts')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new RegistrationError(
      `Failed to upload receipt: ${uploadError.message}`,
      uploadError.code,
    );
  }

  return filePath;
}

export async function submitRegistration(
  data: RegistrationFormData,
): Promise<RegistrationResult> {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  let userId: string;

  if (authError) {
    if (authError.message?.toLowerCase().includes('already registered')) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signInError || !signInData.user) {
        throw new RegistrationError(
          'An account with this email already exists. Please sign in instead.',
        );
      }
      userId = signInData.user.id;
    } else {
      throw new RegistrationError(authError.message, authError?.code);
    }
  } else if (!authData.user) {
    throw new RegistrationError('Failed to create account. Please try again.');
  } else {
    userId = authData.user.id;
  }

  const row = mapFormDataToRow(data);

  const { data: inserted, error: insertError } = await supabase
    .from('registrations')
    .upsert({ ...row, id: userId }, { onConflict: 'id' })
    .select('id, registration_number')
    .single();

  if (insertError) {
    throw new RegistrationError(
      `Failed to submit registration: ${insertError.message}`,
      insertError.code,
    );
  }

  let receiptPath: string | undefined;

  if (data.receiptFile) {
    try {
      receiptPath = await uploadReceipt(userId, data.receiptFile);

      const { error: updateError } = await supabase
        .from('registrations')
        .update({ receipt_path: receiptPath })
        .eq('id', userId);

      if (updateError) {
        console.error('Failed to update receipt_path:', updateError);
      }
    } catch (err) {
      console.error('Receipt upload failed, registration preserved:', err);
    }
  }

  return {
    id: inserted.id,
    registrationNumber: inserted.registration_number,
    receiptPath,
  };
}
