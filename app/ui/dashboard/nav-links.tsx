'use client';

import {
  SparklesIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: '제휴', href: '/dashboard/partnerships', icon: SparklesIcon },
  { name: '가게', href: '/dashboard/stores', icon: BuildingStorefrontIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isSelected = pathname.includes(link.href);
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-blue-800 text-white': isSelected,
                'bg-gray-900 text-white hover:bg-gray-800': !isSelected,
              },
            )}
          >
            <LinkIcon className={clsx('w-6')} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

