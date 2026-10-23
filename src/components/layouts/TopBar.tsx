import { Phone, Mail } from 'lucide-react'

const socialLinks = [
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Facebook', icon: 'f', href: '#' },
  { label: 'Twitter', icon: 't', href: '#' },
]

export const TopBar = () => (
  <div className="bg-black text-gray-400 text-xs py-2.5 px-4">
    <div className="mx-auto max-w-7xl flex items-center justify-between">
      <div className="flex items-center gap-6">
        <a
          href="tel:+2348167000077"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <Phone size={12} />
          +2348167000077
        </a>
        <a
          href="mailto:info@skillsbridge.com"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <Mail size={12} />
          info@skillsbridge.com
        </a>
      </div>
      <div className="flex items-center gap-2">
        {socialLinks.map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white text-[10px] font-semibold text-white hover:bg-white hover:text-black transition-colors"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  </div>
)
