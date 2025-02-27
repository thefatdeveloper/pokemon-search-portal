import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '../common/Container';
import { Divider } from '../common/Divider';

interface FooterProps {
  className?: string;
}

interface FooterLinkGroup {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

const footerLinks: FooterLinkGroup[] = [
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'PokeAPI', href: 'https://pokeapi.co' },
      { name: 'Guides', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'GitHub', href: '#' },
      { name: 'Discord', href: '#' },
      { name: 'Twitter', href: '#' },
    ],
  },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('py-8 bg-gray-50 dark:bg-gray-900', className)}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">PokéSearch</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The comprehensive Pokémon search portal powered by Next.js and PokeAPI.
            </p>
          </div>

          {/* Link sections */}
          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PokéSearch. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0 text-sm text-gray-500 dark:text-gray-500">
            Pokémon and its trademarks are &copy; of Nintendo, Game Freak, and Creatures Inc.
          </p>
        </div>
      </Container>
    </footer>
  );
}