import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link href="/login" className="flex items-center gap-5 rounded-md bg-blue-700 px-6 py-3 transition-colors hover:bg-blue-400">
        <span>제비 대시보드 로그인 하러가기</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </div>
  );
}