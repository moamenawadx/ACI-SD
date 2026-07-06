import { useState } from 'react';
import { ParticipantLayout } from '../components/participant/ParticipantLayout';
import { DashboardHeader } from '../components/participant/DashboardHeader';
import { WelcomeCard } from '../components/participant/WelcomeCard';
import { RegistrationCard } from '../components/participant/RegistrationCard';
import { RegistrationDetailsModal } from '../components/participant/RegistrationDetailsModal';
import { AbstractUploadCard } from '../components/participant/AbstractUploadCard';

export function ParticipantDashboardPage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <ParticipantLayout>
      <DashboardHeader />
      <div className="space-y-6">
        <WelcomeCard />
        <div id="registration-details">
          <RegistrationCard onViewDetails={() => setShowRegistrationModal(true)} />
        </div>
        <div id="upload-abstract">
          <AbstractUploadCard />
        </div>
      </div>

      <RegistrationDetailsModal
        open={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </ParticipantLayout>
  );
}
