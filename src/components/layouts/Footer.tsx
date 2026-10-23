import { BrandLogo } from '@/components/common/BrandLogo'

const footerLinks = {
  Company: ['How it Works', 'Blog', 'Courses', 'About Us'],
  Support: ['Help Center', 'FAQs', 'Terms & Conditions', 'Privacy Policy'],
}

export const Footer = () => (
  <footer className="bg-black text-black-600 pt-14 pb-6 px-4">
    <div className="mx-auto max-w-7xl grid grid-cols-2 gap-10 sm:grid-cols-4">
      {/* Brand */}
      <div className="col-span-2 sm:col-span-1">
        <div className="mb-3">
          <BrandLogo size="md" />
        </div>
        <p className="text-sm leading-relaxed">
          SkillBridge connects you with expert instructors and comprehensive courses for hassle-free
          online learning. Master new skills and advance your career with our AI-powered platform.
        </p>
      </div>

      {/* Link columns */}
      {Object.entries(footerLinks).map(([heading, links]) => (
        <div key={heading}>
          <h4 className="text-sm font-semibold text-white mb-3 text-yellow-600">{heading}</h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm hover:text-yellow-400 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Contact */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3 text-yellow-600">Contact</h4>
        <address className="not-italic space-y-1.5 text-white">
          <p>22 Herbert James Way, Life Camp, Abuja FCT</p>
          <p>+2348156789103</p>
          <p>info@skillsbridge.com</p>
        </address>
      </div>
    </div>

    <div className="mx-auto max-w-7xl mt-10 border-t border-gray-800 pt-5 text-center text-xs">
      Copyright © 2025 skillsbridge.com. All rights reserved.
    </div>
  </footer>
)
