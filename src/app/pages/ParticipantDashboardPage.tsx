import { useState } from 'react';
import { ParticipantLayout } from '../components/participant/ParticipantLayout';
import { DashboardHeader } from '../components/participant/DashboardHeader';
import { WelcomeCard } from '../components/participant/WelcomeCard';
import { RegistrationCard } from '../components/participant/RegistrationCard';
import { RegistrationDetailsModal } from '../components/participant/RegistrationDetailsModal';
import { SubmissionUploadCard } from '../components/participant/SubmissionUploadCard';

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
          <SubmissionUploadCard type="abstract" />
        </div>
        <div id="upload-poster">
          <SubmissionUploadCard type="poster" />
        </div>
        <div id="upload-oral">
          <SubmissionUploadCard type="oral" />
        </div>
      </div>

      <RegistrationDetailsModal
        open={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </ParticipantLayout>
  );
}
