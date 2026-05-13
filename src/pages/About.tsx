import { MetaTags } from '../components/MetaTags';

const EXPERTISE = [
  { label: 'OSINT', description: 'Open-source intelligence in Russian and English' },
  { label: 'AI & ML', description: 'Language models, RAG systems, writing assistants' },
  { label: 'Russian Language', description: 'Professional working proficiency' },
  { label: 'National Security Policy', description: 'AI governance, Eurasian security, irregular warfare' },
  { label: 'Software Engineering', description: 'TypeScript, Python, React, distributed systems' },
  { label: 'Data Analysis', description: 'Structured analysis of unstructured text sources' },
] as const;

export default function About() {
  return (
    <>
      <MetaTags
        title="About"
        description="Background and expertise of T. Wesley Bailey — CSIS researcher, SAIS MA candidate, and former software engineer with Russian language capability."
        path="/about"
      />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-text-primary mb-8">About</h1>

        <div className="space-y-4 text-text-muted leading-relaxed mb-16 max-w-2xl">
          <p>
            T. Wesley Bailey is an MA candidate at the Johns Hopkins School of Advanced
            International Studies, concentrating in AI Policy and National Security. He is
            concurrently a Russian Language Intern at the Center for Strategic and International
            Studies, where he conducts open-source intelligence research in Russian for a U.S.
            government client.
          </p>
          <p>
            His prior work as a Software Engineer at Cvent included building AI writing assistants
            and RAG-based consumer interfaces, giving him practical experience with the systems he
            now analyzes in a policy context. He holds a BA in Computer Science and Russian from
            Sewanee: The University of the South.
          </p>
        </div>

        <h2 className="text-lg font-semibold text-text-primary mb-6">Expertise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXPERTISE.map(({ label, description }) => (
            <div key={label} className="p-4 bg-surface border border-border rounded">
              <span className="font-mono text-xs text-accent block mb-1">{label}</span>
              <p className="text-sm text-text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
