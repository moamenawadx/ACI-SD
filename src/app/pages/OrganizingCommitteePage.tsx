import { CommitteePage } from '../components/CommitteePage';
import { organizingCommitteeMembers } from '../data/committees';

export function OrganizingCommitteePage() {
  return (
    <CommitteePage
      title={{
        en: 'Organizing Committees',
        ar: 'اللجان التنظيمية'
      }}
      description={{
        en: 'This committee brings together the conference leadership and operational coordinators responsible for planning, institutional collaboration, and successful event delivery.',
        ar: 'تضم هذه اللجنة قيادات المؤتمر والمنسقين التنفيذيين المسؤولين عن التخطيط والتنسيق المؤسسي وضمان التنفيذ الناجح لفعاليات المؤتمر.'
      }}
      members={organizingCommitteeMembers}
    />
  );
}
