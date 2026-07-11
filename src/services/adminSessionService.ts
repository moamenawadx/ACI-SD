export interface AdminSession {
  id: string;
  email: string;
  fullName: string;
}

const SESSION_KEY = 'aci_admin_session';

export const adminSessionService = {
  login(session: AdminSession): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },

  getSession(): AdminSession | null {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AdminSession;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },
};
