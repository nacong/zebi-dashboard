import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import ZebiLogo from '@/app/ui/zebi-logo';
import Profile from './profile';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-black text-white">
      <Link
        className="mb-2 rounded-md bg-gray-900 p-4"
        href="/"
      >
        <h1 className="text-xl font-bold">제비 대시보드</h1>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Profile />
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-900 md:block"></div>
        <form action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium text-white hover:bg-gray-700 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6 text-white" />
            <div className="hidden md:block">로그아웃</div>
          </button>
        </form>
      </div>
    </div>
  );
}

