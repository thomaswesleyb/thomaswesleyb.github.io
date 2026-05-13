import { Link } from 'react-router-dom';
import { MetaTags } from '../components/MetaTags';

export default function Home() {
  return (
    <>
      <MetaTags
        title="Home"
        description="T. Wesley Bailey — technical geopolitical intelligence analyst specializing in Russian and Eurasian security, OSINT, and AI applications in national security."
        path="/"
      />
      <section className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto px-6 py-12">
        <p className="font-mono text-sm text-text-muted mb-4">T. Wesley Bailey</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight mb-6">
          Technical geopolitical<br />intelligence analyst
        </h1>
        <p className="text-text-muted text-lg max-w-xl leading-relaxed mb-8">
          Bridging software engineering and open-source intelligence. Focused on Russian and
          Eurasian security, AI applications in national security, and language-enabled analysis.
        </p>
        <div className="flex gap-4">
          <Link
            to="/work"
            className="px-5 py-2.5 bg-accent text-white rounded text-sm font-medium hover:bg-accent-dim transition-colors duration-150"
          >
            View Work
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 border border-border text-text-muted rounded text-sm font-medium hover:text-text-primary hover:border-text-muted transition-colors duration-150"
          >
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
