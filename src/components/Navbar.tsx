import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-mono text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
        >
          twesleyb
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm transition-colors duration-150 ${
                  pathname === to
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul id="mobile-menu" className="md:hidden border-t border-border">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-3 text-sm transition-colors duration-150 ${
                  pathname === to
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
