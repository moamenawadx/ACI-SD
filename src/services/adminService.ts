import { supabase } from '../lib/supabase';

export class AdminError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AdminError';
  }
}

export interface AdminInfo {
  id: string;
  email: string;
  fullName: string;
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<AdminInfo> {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError || !authData.user) {
    throw new AdminError(
      authError?.message || 'Invalid email or password.',
      authError?.code,
    );
  }

  const { data: reg, error: regError } = await supabase
    .from('registrations')
    .select('is_admin, full_name, email')
    .eq('id', authData.user.id)
    .single();

  if (regError || !reg?.is_admin) {
    await supabase.auth.signOut();
    throw new AdminError('This account does not have admin privileges.');
  }

  return {
    id: authData.user.id,
    email: reg.email,
    fullName: reg.full_name,
  };
}

export async function getAdminInfo(): Promise<AdminInfo | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  if (!user) return null;

  const { data } = await supabase
    .from('registrations')
    .select('is_admin, full_name, email')
    .eq('id', user.id)
    .single();

  if (!data?.is_admin) return null;

  return {
    id: user.id,
    email: data.email,
    fullName: data.full_name,
  };
}

export async function logoutAdmin(): Promise<void> {
  await supabase.auth.signOut();
}

export async function checkIsAdmin(): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  if (!user) return false;

  const { data } = await supabase
    .from('registrations')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return data?.is_admin === true;
}
