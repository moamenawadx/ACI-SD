import { X, Loader2, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { RegistrationRecord } from '../../../services/participantService';
import { getParticipantRegistration } from '../../../services/participantService';
import { sessionService } from '../../../services/sessionService';

const FETCH_TIMEOUT = 15000;

interface RegistrationDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value: string | boolean | null }) {
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value ?? '—';
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground w-2/5 shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground break-words">{display}</span>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{title}</h4>
      <div className="divide-y divide-border/50">{children}</div>
    </div>
  );
}

export function RegistrationDetailsModal({ open, onClose }: RegistrationDetailsModalProps) {
  const [data, setData] = useState<RegistrationRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const session = sessionService.getSession();

  useEffect(() => {
    if (!open || !session) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) {
        cancelled = true;
        console.error('RegistrationDetailsModal timeout: request exceeded 15s');
        setError('Request timed out. Please try again.');
        setLoading(false);
      }
    }, FETCH_TIMEOUT);

    setLoading(true);
    setError(null);
    setData(null);

    getParticipantRegistration(session.id)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('RegistrationDetailsModal fetch error:', err);
          setError(err.message || 'Failed to load registration details.');
          setLoading(false);
        }
      })
      .finally(() => {
        clearTimeout(timeout);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [open, session]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-card">
          <h3 className="text-xl font-bold text-foreground">Registration Details</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : data ? (
            <div className="space-y-4">
              <DetailSection title="Personal Information">
                <DetailRow label="Title" value={data.title} />
                <DetailRow label="Full Name" value={data.full_name} />
                <DetailRow label="Name on Certificate" value={data.name_on_certificate} />
                <DetailRow label="Gender" value={data.gender} />
                <DetailRow label="Nationality" value={data.nationality} />
                <DetailRow label="Passport / National ID" value={data.passport_or_national_id} />
              </DetailSection>

              <DetailSection title="Affiliation">
                <DetailRow label="University / Organization" value={data.university_organization} />
                <DetailRow label="Faculty / Department" value={data.faculty_department} />
                <DetailRow label="Position" value={data.position} />
                <DetailRow label="Country" value={data.country} />
              </DetailSection>

              <DetailSection title="Contact Information">
                <DetailRow label="Email" value={data.email} />
                <DetailRow label="Mobile Phone" value={data.mobile_phone} />
                <DetailRow label="WhatsApp" value={data.whatsapp} />
                <DetailRow label="Postal Address" value={data.postal_address} />
              </DetailSection>

              <DetailSection title="Participation Details">
                <DetailRow label="Attendance Mode" value={data.attendance_mode} />
                <DetailRow label="Participation Type" value={data.participation_type} />
                <DetailRow label="Paper Title" value={data.paper_title} />
                <DetailRow label="Conference Topic" value={data.conference_topic === 'Other' ? data.conference_topic_other : data.conference_topic} />
              </DetailSection>

              <DetailSection title="Accommodation & Travel">
                <DetailRow label="Room Type" value={data.room_type} />
                <DetailRow label="Check-in" value={data.check_in} />
                <DetailRow label="Check-out" value={data.check_out} />
                <DetailRow label="Roommate" value={data.roommate} />
                <DetailRow label="Arrival Airport" value={data.arrival_airport} />
                <DetailRow label="Arrival Date" value={data.arrival_date} />
                <DetailRow label="Arrival Time" value={data.arrival_time} />
                <DetailRow label="Departure Date" value={data.departure_date} />
                <DetailRow label="Departure Time" value={data.departure_time} />
                <DetailRow label="Invitation Letter" value={data.invitation_letter} />
                <DetailRow label="Visa Support Letter" value={data.visa_support_letter} />
                <DetailRow label="Other Requirements" value={data.other_requirements} />
              </DetailSection>

              <DetailSection title="Payment Information">
                <DetailRow label="Registration Category" value={data.registration_category} />
                <DetailRow label="Payment Method" value={data.payment_method} />
                <DetailRow label="Amount Paid" value={data.amount_paid} />
                <DetailRow label="Payment Date" value={data.payment_date} />
                <DetailRow label="Transaction Reference" value={data.transaction_reference} />
              </DetailSection>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
