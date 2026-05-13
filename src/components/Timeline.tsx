export interface TimelineEntry {
  period: string;
  role: string;
  institution: string;
  institutionUrl: string;
  bullets: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div>
      {entries.map((entry, i) => (
        <div key={i} className="flex">
          <div className="w-28 flex-shrink-0 pt-0.5 pr-4 text-right">
            <span className="font-mono text-xs text-text-muted">{entry.period}</span>
          </div>
          <div
            className={`flex-1 border-l border-border pl-6 relative ${
              i < entries.length - 1 ? 'pb-10' : ''
            }`}
          >
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
            <p className="text-text-primary font-medium leading-snug">{entry.role}</p>
            <a
              href={entry.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-muted hover:text-accent transition-colors duration-150 inline-block mt-0.5"
            >
              {entry.institution} ↗
            </a>
            {entry.bullets.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {entry.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm text-text-muted">
                    <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
