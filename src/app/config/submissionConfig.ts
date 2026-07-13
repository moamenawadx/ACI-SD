export type SubmissionType = 'abstract' | 'poster' | 'oral';

export interface SubmissionTypeConfig {
  type: SubmissionType;
  table: string;
  bucket: string;
  summaryColumn: string | null;
  filePathColumn: string;
  summaryLabel: string;
  summaryPlaceholder: string;
  title: string;
  description: string;
  acceptedMimeTypes: string[];
  acceptedExtensions: string[];
  maxFileSize: number;
  showSummary: boolean;
  filePathPrefix: string;
}

export const SUBMISSION_CONFIGS: Record<SubmissionType, SubmissionTypeConfig> =
  {
    abstract: {
      type: 'abstract',
      table: 'abstract_submissions',
      bucket: 'abstracts',
      summaryColumn: 'abstract_summary',
      filePathColumn: 'abstract_file_path',
      summaryLabel: 'Abstract Summary',
      summaryPlaceholder: 'Enter your abstract summary...',
      title: 'Abstract Submission',
      description: 'Submit your abstract for the conference.',
      acceptedMimeTypes: ['application/pdf'],
      acceptedExtensions: ['.pdf'],
      maxFileSize: 10,
      showSummary: true,
      filePathPrefix: 'abstract',
    },
    poster: {
      type: 'poster',
      table: 'poster_submissions',
      bucket: 'posters',
      summaryColumn: null,
      filePathColumn: 'poster_file_path',
      summaryLabel: '',
      summaryPlaceholder: '',
      title: 'Poster Presentation',
      description: 'Upload your poster for the conference.',
      acceptedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      acceptedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
      maxFileSize: 20,
      showSummary: false,
      filePathPrefix: 'poster',
    },
    oral: {
      type: 'oral',
      table: 'oral_presentations',
      bucket: 'oral-presentations',
      summaryColumn: null,
      filePathColumn: 'oral_file_path',
      summaryLabel: '',
      summaryPlaceholder: '',
      title: 'Oral Presentation',
      description: 'Upload your oral presentation file.',
      acceptedMimeTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint',
      ],
      acceptedExtensions: ['.pdf', '.pptx', '.ppt'],
      maxFileSize: 50,
      showSummary: false,
      filePathPrefix: 'oral',
    },
  };

export function getConfig(type: SubmissionType): SubmissionTypeConfig {
  return SUBMISSION_CONFIGS[type];
}
