import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getParticipantRegistration } from '../../services/participantService';
import type { RegistrationRecord } from '../../services/participantService';

interface ParticipantContextValue {
  participant: RegistrationRecord | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

const ParticipantContext = createContext<ParticipantContextValue | null>(null);

export function ParticipantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [participant, setParticipant] = useState<RegistrationRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchParticipant = useCallback(async () => {
    if (!user) {
      setParticipant(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const record = await getParticipantRegistration(user.id);
      setParticipant(record);
    } catch {
      setParticipant(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchParticipant();
  }, [fetchParticipant]);

  return (
    <ParticipantContext.Provider value={{ participant, loading, refetch: fetchParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
}

export function useParticipant(): ParticipantContextValue {
  const ctx = useContext(ParticipantContext);
  if (!ctx) {
    throw new Error('useParticipant must be used within a ParticipantProvider');
  }
  return ctx;
}
