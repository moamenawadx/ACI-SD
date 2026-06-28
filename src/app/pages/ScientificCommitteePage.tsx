import { CommitteePage } from '../components/CommitteePage';
import { scientificCommitteeMembers } from '../data/committees';

export function ScientificCommitteePage() {
  return (
    <CommitteePage
      title={{
        en: 'Scientific Committees',
        ar: 'اللجان العلمية'
      }}
      description={{
        en: 'This committee features distinguished national and international experts who support the scientific quality of the conference through academic guidance, review, and subject-matter leadership.',
        ar: 'تضم هذه اللجنة نخبة من الخبراء المحليين والدوليين الذين يدعمون الجودة العلمية للمؤتمر من خلال الإشراف الأكاديمي والتحكيم والقيادة التخصصية.'
      }}
      members={scientificCommitteeMembers}
    />
  );
}
