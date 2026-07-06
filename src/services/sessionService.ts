export interface ParticipantSession {
  id: string;
  registrationNumber: string;
  fullName: string;
  email: string;
  passportOrNationalId: string;
}

const SESSION_KEY = 'aci_participant_session';

export const sessionService = {
  login(session: ParticipantSession): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },

  getSession(): ParticipantSession | null {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as ParticipantSession;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },
};
