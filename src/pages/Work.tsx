import { MetaTags } from '../components/MetaTags';
import { WorkCard } from '../components/WorkCard';
import russianIdiomsImg from '../assets/russianidioms.png';

export default function Work() {
  return (
    <>
      <MetaTags
        title="Work"
        description="Selected software projects and research by T. Wesley Bailey."
        path="/work"
      />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Work</h1>
        <p className="text-text-muted mb-12">Selected software and research</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <WorkCard
            type="software"
            title="Event Coreference Resolution for Conflict Strike Data"
            description="Coming soon..."
            tags={['Iran', 'NLP', 'Python', 'Entity Resolution']}
          />
          {/* TODO: Add research/analytical work cards as projects develop (see docs/overhaul.md §16) */}
        </div>

        <p className="text-text-muted mb-12">Contributions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkCard
            type="research"
            title="Global Terrorism Threat Assessment"
            description="I contributed to CSIS's Global Terrorism Threat Assessment, conducting extensive research on terrorism cases"
            tags={['Terrorism', 'Research', 'OSINT']}
            href="https://www.csis.org/analysis/global-terrorism-threat-assessment-2026"
          />
          <WorkCard
            type="research"
            title="The Ballooning Costs of Russian War"
            description="I conducted research for this CSIS brief, featured in NYT and CNN"
            tags={['Russia', 'Research', 'OSINT']}
            href="https://www.csis.org/analysis/russian-blood-and-treasure-ballooning-costs-putins-war"
          />
        </div>
        
      </section>
    </>
  );
}
