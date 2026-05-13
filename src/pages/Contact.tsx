import { useState, type FormEvent } from 'react';
import { MetaTags } from '../components/MetaTags';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const INPUT_CLASS =
  'w-full px-3 py-2 bg-surface border border-border rounded text-text-primary text-sm ' +
  'placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent';

const LABEL_CLASS = 'block font-mono text-xs text-text-muted uppercase tracking-wide mb-1';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormState>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(
        'https://formspree.io/f/mjglzydy',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        }
      );
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <MetaTags
        title="Contact"
        description="Get in touch with T. Wesley Bailey."
        path="/contact"
      />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Contact</h1>
        <p className="text-text-muted mb-12">
          Reach out for research collaboration, consulting inquiries, or general correspondence.
        </p>

        {status === 'success' ? (
          <p className="text-text-muted">Message received. I'll follow up shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
            <div>
              <label htmlFor="name" className={LABEL_CLASS}>Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="email" className={LABEL_CLASS}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="message" className={LABEL_CLASS}>Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                required
                rows={5}
                className={INPUT_CLASS}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-5 py-2.5 bg-accent text-white rounded text-sm font-medium hover:bg-accent-dim transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
