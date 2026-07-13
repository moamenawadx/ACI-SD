import { supabase } from '../lib/supabase';
import { getSignedUrl } from './storageService';
import type { SubmissionType } from '../app/config/submissionConfig';
import { getConfig } from '../app/config/submissionConfig';

export class SubmissionError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SubmissionError';
  }
}

export interface SubmissionRecord {
  id: string;
  registration_id: string;
  status: 'pending' | 'approved' | 'rejected';
  review_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string | null;
  [key: string]: unknown;
}

export interface SubmissionWithParticipant extends SubmissionRecord {
  registrations: {
    full_name: string;
    registration_number: string;
    email: string;
    university_organization: string;
  };
}

async function uploadFile(
  bucket: string,
  registrationId: string,
  prefix: string,
  file: File,
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const filePath = `${registrationId}/${prefix}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    throw new SubmissionError(
      `Failed to upload file: ${uploadError.message}`,
      uploadError.code,
    );
  }

  return filePath;
}

export async function getSubmission(
  type: SubmissionType,
  registrationId: string,
): Promise<SubmissionRecord | null> {
  const config = getConfig(type);

  const { data, error } = await supabase
    .from(config.table)
    .select('*')
    .eq('registration_id', registrationId)
    .maybeSingle();

  if (error) {
    throw new SubmissionError(
      `Failed to load ${type} submission: ${error.message}`,
      error.code,
    );
  }

  return data as SubmissionRecord | null;
}

export async function submitSubmission(
  type: SubmissionType,
  registrationId: string,
  file: File,
  summary?: string,
): Promise<{ id: string; filePath: string }> {
  const config = getConfig(type);

  const filePath = await uploadFile(
    config.bucket,
    registrationId,
    config.filePathPrefix,
    file,
  );

  const insertData: Record<string, unknown> = {
    registration_id: registrationId,
    [config.filePathColumn]: filePath,
  };

  if (summary !== undefined && config.summaryColumn) {
    insertData[config.summaryColumn] = summary;
  }

  const { data, error } = await supabase
    .from(config.table)
    .insert(insertData)
    .select('id')
    .single();

  if (error) {
    throw new SubmissionError(
      `Failed to save ${type} submission: ${error.message}`,
      error.code,
    );
  }

  return { id: data.id, filePath };
}

export async function replaceSubmission(
  type: SubmissionType,
  submissionId: string,
  registrationId: string,
  file: File,
  summary?: string,
): Promise<{ filePath: string }> {
  const config = getConfig(type);

  const filePath = await uploadFile(
    config.bucket,
    registrationId,
    config.filePathPrefix,
    file,
  );

  const updateData: Record<string, unknown> = {
    [config.filePathColumn]: filePath,
    updated_at: new Date().toISOString(),
  };

  if (summary !== undefined && config.summaryColumn) {
    updateData[config.summaryColumn] = summary;
  }

  const { error } = await supabase
    .from(config.table)
    .update(updateData)
    .eq('id', submissionId);

  if (error) {
    throw new SubmissionError(
      `Failed to replace ${type} file: ${error.message}`,
      error.code,
    );
  }

  return { filePath };
}

export async function deleteSubmission(
  type: SubmissionType,
  submissionId: string,
): Promise<void> {
  const config = getConfig(type);

  const { error } = await supabase
    .from(config.table)
    .delete()
    .eq('id', submissionId);

  if (error) {
    throw new SubmissionError(
      `Failed to delete ${type} submission: ${error.message}`,
      error.code,
    );
  }
}

export async function listSubmissions(
  type: SubmissionType,
  statusFilter?: string,
): Promise<SubmissionWithParticipant[]> {
  const config = getConfig(type);

  let query = supabase
    .from(config.table)
    .select(
      `*, registrations (full_name, registration_number, email, university_organization)`,
    );

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    throw new SubmissionError(
      `Failed to load ${type} submissions: ${error.message}`,
      error.code,
    );
  }

  return (data as SubmissionWithParticipant[]) ?? [];
}

export async function updateSubmissionStatus(
  type: SubmissionType,
  id: string,
  status: 'approved' | 'rejected',
  reviewedBy: string,
  reviewNotes?: string,
): Promise<void> {
  const config = getConfig(type);

  const updateData: Record<string, unknown> = {
    status,
    reviewed_by: reviewedBy,
    reviewed_at: new Date().toISOString(),
  };

  if (reviewNotes !== undefined) {
    updateData.review_notes = reviewNotes;
  }

  const { error } = await supabase
    .from(config.table)
    .update(updateData)
    .eq('id', id);

  if (error) {
    throw new SubmissionError(
      `Failed to update ${type} submission status: ${error.message}`,
      error.code,
    );
  }
}

export async function getSubmissionFileUrl(
  type: SubmissionType,
  submission: SubmissionRecord,
): Promise<string | null> {
  const config = getConfig(type);
  const filePath = submission[config.filePathColumn] as string | undefined;
  if (!filePath) return null;
  return getSignedUrl(config.bucket, filePath);
}
