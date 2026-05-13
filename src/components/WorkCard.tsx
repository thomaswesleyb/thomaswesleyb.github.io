interface WorkCardProps {
  type: 'software' | 'research';
  title: string;
  description: string;
  tags: string[];
  href?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function WorkCard({
  type,
  title,
  description,
  tags,
  href,
  imageUrl,
  imageAlt,
}: WorkCardProps) {
  return (
    <div className="bg-surface border border-border rounded overflow-hidden">
      {imageUrl && (
        // TODO: Replace russianidioms.png with optimized WebP (resize to 800px, convert with sharp/squoosh)
        <picture>
          <source srcSet={imageUrl.replace('.png', '.webp')} type="image/webp" />
          <img
            src={imageUrl}
            alt={imageAlt ?? ''}
            loading="lazy"
            decoding="async"
            className="w-full h-48 object-cover"
          />
        </picture>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
            {type}
          </span>
          <h3 className="text-text-primary font-semibold text-base">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-150"
              >
                {title} ↗
              </a>
            ) : (
              title
            )}
          </h3>
        </div>
        <p className="text-sm text-text-muted leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-text-muted px-2 py-0.5 border border-border rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
