import { X, Loader2, AlertTriangle } from 'lucide-react';
import { useParticipant } from '../../contexts/ParticipantContext';

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
  const { participant, loading } = useParticipant();

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
          ) : participant ? (
            <div className="space-y-4">
              <DetailSection title="Personal Information">
                <DetailRow label="Title" value={participant.title} />
                <DetailRow label="Full Name" value={participant.full_name} />
                <DetailRow label="Name on Certificate" value={participant.name_on_certificate} />
                <DetailRow label="Gender" value={participant.gender} />
                <DetailRow label="Nationality" value={participant.nationality} />
                <DetailRow label="Passport / National ID" value={participant.passport_or_national_id} />
              </DetailSection>

              <DetailSection title="Affiliation">
                <DetailRow label="University / Organization" value={participant.university_organization} />
                <DetailRow label="Faculty / Department" value={participant.faculty_department} />
                <DetailRow label="Position" value={participant.position} />
                <DetailRow label="Country" value={participant.country} />
              </DetailSection>

              <DetailSection title="Contact Information">
                <DetailRow label="Email" value={participant.email} />
                <DetailRow label="Mobile Phone" value={participant.mobile_phone} />
                <DetailRow label="WhatsApp" value={participant.whatsapp} />
                <DetailRow label="Postal Address" value={participant.postal_address} />
              </DetailSection>

              <DetailSection title="Participation Details">
                <DetailRow label="Attendance Mode" value={participant.attendance_mode} />
                <DetailRow label="Participation Type" value={participant.participation_type} />
                <DetailRow label="Paper Title" value={participant.paper_title} />
                <DetailRow label="Conference Topic" value={participant.conference_topic === 'Other' ? participant.conference_topic_other : participant.conference_topic} />
              </DetailSection>

              <DetailSection title="Accommodation & Travel">
                <DetailRow label="Room Type" value={participant.room_type} />
                <DetailRow label="Check-in" value={participant.check_in} />
                <DetailRow label="Check-out" value={participant.check_out} />
                <DetailRow label="Roommate" value={participant.roommate} />
                <DetailRow label="Arrival Airport" value={participant.arrival_airport} />
                <DetailRow label="Arrival Date" value={participant.arrival_date} />
                <DetailRow label="Arrival Time" value={participant.arrival_time} />
                <DetailRow label="Departure Date" value={participant.departure_date} />
                <DetailRow label="Departure Time" value={participant.departure_time} />
                <DetailRow label="Invitation Letter" value={participant.invitation_letter} />
                <DetailRow label="Visa Support Letter" value={participant.visa_support_letter} />
                <DetailRow label="Other Requirements" value={participant.other_requirements} />
              </DetailSection>

              <DetailSection title="Payment Information">
                <DetailRow label="Registration Category" value={participant.registration_category} />
                <DetailRow label="Payment Method" value={participant.payment_method} />
                <DetailRow label="Amount Paid" value={participant.amount_paid} />
                <DetailRow label="Payment Date" value={participant.payment_date} />
                <DetailRow label="Transaction Reference" value={participant.transaction_reference} />
              </DetailSection>
            </div>
          ) : (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Could not load registration details.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
