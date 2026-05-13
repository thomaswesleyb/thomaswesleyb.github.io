import { MetaTags } from '../components/MetaTags';
import { Timeline, type TimelineEntry } from '../components/Timeline';

const entries: TimelineEntry[] = [
  {
    period: '2025 – present',
    role: 'Russian Language Intern',
    institution: 'Center for Strategic and International Studies',
    institutionUrl: 'https://www.csis.org/programs/warfare-irregular-threats-and-terrorism-program',
    bullets: [
      'Conducts open-source Russian-language intelligence research for a U.S. government client',
      'Supports the Warfare, Irregular Threats, and Terrorism Program',
    ],
  },
  {
    period: '2025 – present',
    role: 'MA Candidate, International Relations',
    institution: 'Johns Hopkins School of Advanced International Studies',
    institutionUrl: 'https://sais.jhu.edu/',
    bullets: [
      'Concentration: AI Policy and National Security',
    ],
  },
  {
    period: '2022 – 2025',
    role: 'Software Engineer II',
    institution: 'Cvent, Inc.',
    institutionUrl: 'https://www.cvent.com/',
    bullets: [
      'Developed and fine-tuned an AI writing assistant for event marketing',
      'Built consumer rendering layer for a RAG-based AI virtual concierge',
      'Worked on multi-language platform and sessions/speakers product',
    ],
  },
  {
    period: '2018 – 2022',
    role: 'BA, Computer Science and Russian',
    institution: 'Sewanee: The University of the South',
    institutionUrl: 'https://new.sewanee.edu/',
    bullets: [],
  },
];

export default function Experience() {
  return (
    <>
      <MetaTags
        title="Experience"
        description="Professional and academic background of T. Wesley Bailey."
        path="/experience"
      />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-text-primary mb-12">Experience</h1>
        <Timeline entries={entries} />
      </section>
    </>
  );
}
