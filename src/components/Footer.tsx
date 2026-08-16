import { FOOTER_LINKS, SOCIAL_LINKS } from '../data/content'
import { BrickIcon } from './ui/Brick'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24h-5V8z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.35-1.75-1.35-1.75-1.11-.76.08-.75.08-.75 1.23.09 1.87 1.26 1.87 1.26 1.09 1.87 2.86 1.33 3.56 1.02.11-.79.43-1.33.78-1.63-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const iconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
} as const

export function Footer() {
  return (
    <footer className="border-t-2 border-dark bg-dark py-12 text-off-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <BrickIcon className="h-6 w-8" />
              <span className="font-display text-lg font-bold">BRICK//24</span>
            </div>
            <p className="mt-3 text-sm text-off-white/60">
              Build It. Break It. Rebuild It.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-off-white/40">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-off-white/70 transition-colors hover:text-lego-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lego-yellow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-off-white/40">
              Connect
            </h3>
            <ul className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-off-white/20 transition-colors hover:border-lego-yellow hover:text-lego-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lego-yellow"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-off-white/10 pt-6 text-center text-xs text-off-white/40">
          © 2026 BRICK//24
        </div>
      </div>
    </footer>
  )
}
