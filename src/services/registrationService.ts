import { supabase } from '../lib/supabase';
import type { RegistrationFormData } from '../app/types/registration';

export interface RegistrationResult {
  id: string;
  registrationNumber?: string;
  receiptUrl?: string;
}

export class RegistrationError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'RegistrationError';
  }
}

function mapFormDataToRow(
  data: RegistrationFormData,
  receiptUrl?: string
) {
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
    receipt_url: receiptUrl || null,

    agree_declaration: data.agreeDeclaration || null,
  };
}

export async function uploadReceipt(
  registrationId: string,
  file: File,
  onProgress?: (percent: number) => void
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
      uploadError.code
    );
  }

  const { data: urlData } = supabase.storage
    .from('receipts')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function submitRegistration(
  data: RegistrationFormData,
  onUploadProgress?: (percent: number) => void
): Promise<RegistrationResult> {
  let receiptUrl: string | undefined;

  if (data.receiptFile) {
    const tempId = crypto.randomUUID();
    receiptUrl = await uploadReceipt(tempId, data.receiptFile, onUploadProgress);

    const row = mapFormDataToRow(data, receiptUrl);

    const { data: inserted, error: insertError } = await supabase
      .from('registrations')
      .insert(row)
      .select('id, registration_number')
      .single();

    if (insertError) {
      throw new RegistrationError(
        `Failed to submit registration: ${insertError.message}`,
        insertError.code
      );
    }

    return { id: inserted.id, registrationNumber: inserted.registration_number, receiptUrl };
  }

  const row = mapFormDataToRow(data);

  const { data: inserted, error: insertError } = await supabase
    .from('registrations')
    .insert(row)
    .select('id, registration_number')
    .single();

  if (insertError) {
    throw new RegistrationError(
      `Failed to submit registration: ${insertError.message}`,
      insertError.code
    );
  }

  return { id: inserted.id, registrationNumber: inserted.registration_number };
}
