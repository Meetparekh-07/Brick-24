import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'
import { BrickIcon } from './ui/Brick'
import { Button } from './ui/Button'

/** Sticky navbar — compacts and elevates on scroll */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = () => setMobileOpen(false)

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    handleNavClick()
    
    if (location.pathname === '/') {
      // Already on home page, just scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Not on home page, navigate to home with hash
      navigate('/' + href)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b-2 border-dark bg-off-white/95 py-3 shadow-brick-sm backdrop-blur-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lego-blue"
          onClick={handleNavClick}
        >
          <BrickIcon className="h-7 w-9" />
          <span>BRICK//24</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.href.startsWith('/') ? (
                <Link
                  to={link.href}
                  className="font-display text-sm font-semibold uppercase tracking-wide transition-colors hover:text-lego-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lego-blue"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="font-display text-sm font-semibold uppercase tracking-wide transition-colors hover:text-lego-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lego-blue"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="/register" variant="primary">
            Register Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg border-2 border-dark p-2 shadow-brick-sm md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b-2 border-dark bg-off-white md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      onClick={handleNavClick}
                      className="block rounded-lg px-3 py-3 font-display text-sm font-semibold uppercase tracking-wide hover:bg-lego-yellow/30"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="block rounded-lg px-3 py-3 font-display text-sm font-semibold uppercase tracking-wide hover:bg-lego-yellow/30"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Button href="/register" variant="primary" className="w-full" onClick={handleNavClick}>
                  Register Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
