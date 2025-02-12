'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../hooks/useTranslations';
import { Dancing_Script } from 'next/font/google';

const handwriting = Dancing_Script({ 
  subsets: ['latin'],
  weight: '400'
});

const Footer = () => {
  const { t } = useTranslations();

  return (
    <footer className="
      w-full 
      py-16 px-8
      bg-[var(--color-background)]
      text-[var(--color-text-gray)]
      border-t border-white/10
    ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-16">
          {/* Company Info */}
          <div className="flex flex-col gap-6">
            <Link 
              href="/" 
              className={`text-2xl text-[var(--color-text-white)] hover:text-[var(--color-text-white)] transition-colors duration-300 ease-in-out ${handwriting.className}`}
            >
              KeepmeCompany
            </Link>
            <p className="text-[var(--color-text-gray)] leading-relaxed">
              86-90, Paul Street,<br />
              London EC2A 4NE
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-[var(--color-text-gray)] font-semibold">
                Legal
              </h3>
              
              <Link 
                href="https://shine-galaxy-e28.notion.site/Privacy-Policy-10d288e561168082b48cce94ef79e3ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-gray)] hover:text-[var(--color-text-white)] transition-colors duration-300 ease-in-out"
              >
                {t('common.footer.privacyNotice')}
              </Link>

              <Link 
                href="https://shine-galaxy-e28.notion.site/Accessibility-Statement-10c288e56116801da9a9f47ec6a3fabe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-gray)] hover:text-[var(--color-text-white)] transition-colors duration-300 ease-in-out"
              >
                {t('common.footer.accessibility')}
              </Link>

              <a 
                href="mailto:eduardo@keepmecompany.com"
                className="text-[var(--color-text-gray)] hover:text-[var(--color-text-white)] transition-colors duration-300 ease-in-out"
              >
                {t('common.footer.gdprRequests')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;