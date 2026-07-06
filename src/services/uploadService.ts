import { supabase } from '../lib/supabase';

export class UploadError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'UploadError';
  }
}

export async function uploadAbstractPdf(
  registrationId: string,
  file: File
): Promise<string> {
  const ext = 'pdf';
  const filePath = `${registrationId}/abstract.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('abstracts')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'application/pdf',
    });

  if (uploadError) {
    throw new UploadError(
      `Failed to upload abstract: ${uploadError.message}`,
      uploadError.code
    );
  }

  const { data: urlData } = supabase.storage
    .from('abstracts')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function submitAbstract(
  registrationId: string,
  abstractSummary: string,
  abstractFileUrl: string
): Promise<void> {
  const { error: insertError } = await supabase
    .from('abstract_submissions')
    .insert({
      registration_id: registrationId,
      abstract_summary: abstractSummary,
      abstract_file_url: abstractFileUrl,
    });

  if (insertError) {
    throw new UploadError(
      `Failed to save abstract submission: ${insertError.message}`,
      insertError.code
    );
  }

  const { error: updateError } = await supabase
    .from('registrations')
    .update({
      abstract_uploaded: true,
      abstract_uploaded_at: new Date().toISOString(),
    })
    .eq('id', registrationId);

  if (updateError) {
    throw new UploadError(
      `Failed to update registration status: ${updateError.message}`,
      updateError.code
    );
  }
}
