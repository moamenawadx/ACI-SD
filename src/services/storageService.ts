import { supabase } from '../lib/supabase';
import { SubmissionError } from './submissionService';

export class StorageError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export async function getSignedUrl(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    throw new StorageError(
      `Failed to generate signed URL: ${error.message}`,
      error.code,
    );
  }

  return data.signedUrl;
}

export async function getSignedUrls(
  bucket: string,
  filePaths: string[],
  expiresIn: number = 3600,
): Promise<string[]> {
  const results = await Promise.allSettled(
    filePaths.map((path) =>
      supabase.storage.from(bucket).createSignedUrl(path, expiresIn),
    ),
  );

  return results.map((r) => {
    if (r.status === 'fulfilled' && r.value.data) {
      return r.value.data.signedUrl;
    }
    return '';
  });
}
