import { supabase } from '../lib/supabase';
import { adminSessionService } from './adminSessionService';

export class AdminError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AdminError';
  }
}

export interface AbstractWithParticipant {
  id: string;
  registration_id: string;
  abstract_summary: string;
  abstract_file_url: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  registrations: {
    full_name: string;
    registration_number: string;
    email: string;
    university_organization: string;
  };
}

export async function loginAdmin(email: string, password: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    throw new AdminError('Invalid email or password.');
  }

  const { data: admin, error: adminError } = await supabase
    .from('admins')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    throw new AdminError('This account does not have admin privileges.');
  }

  adminSessionService.login({
    id: admin.id,
    email: admin.email,
    fullName: admin.full_name,
  });
}

export async function logoutAdmin(): Promise<void> {
  await supabase.auth.signOut();
  adminSessionService.logout();
}

export async function listAbstracts(
  statusFilter?: string
): Promise<AbstractWithParticipant[]> {
  console.log('[listAbstracts] statusFilter:', statusFilter);

  let query = supabase
    .from('abstract_submissions')
    .select(
      '*, registrations!inner(full_name, registration_number, email, university_organization)'
    )
    .order('created_at', { ascending: false });

  if (statusFilter && statusFilter !== 'all') {
    console.log('[listAbstracts] applying filter: status =', statusFilter);
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;

  console.log('[listAbstracts] Supabase error:', error);
  console.log('[listAbstracts] Supabase data (raw):', data);
  console.log('[listAbstracts] data is array?', Array.isArray(data));
  console.log('[listAbstracts] data length:', data?.length);

  if (error) {
    throw new AdminError(`Failed to load abstracts: ${error.message}`, error.code);
  }

  const mapped = (data as unknown as AbstractWithParticipant[]) ?? [];
  console.log('[listAbstracts] mapped data:', mapped);
  console.log('[listAbstracts] mapped length:', mapped.length);
  return mapped;
}

export async function updateAbstractStatus(
  id: string,
  status: 'approved' | 'rejected',
  reviewedBy: string
): Promise<void> {
  const { error } = await supabase
    .from('abstract_submissions')
    .update({
      status,
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw new AdminError(
      `Failed to update abstract status: ${error.message}`,
      error.code
    );
  }
}
