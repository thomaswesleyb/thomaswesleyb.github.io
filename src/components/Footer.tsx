export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} T. Wesley Bailey
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/bailey-wesley/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors duration-150 text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/thomaswesleyb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors duration-150 text-sm"
          >
            GitHub
          </a>
          <a
            href="mailto:simplelogin-newsletter.unlaced396@simplelogin.com"
            className="text-text-muted hover:text-text-primary transition-colors duration-150 text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
