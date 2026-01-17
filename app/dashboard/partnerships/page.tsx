import Pagination from '@/app/ui/dashboard/pagination';
import Search from '@/app/ui/dashboard/search';
import Table from '@/app/ui/dashboard/partnerships/table';
import { CreatePartnership } from '@/app/ui/dashboard/partnerships/buttons';
import { PartnershipsTableSkeleton } from '@/app/ui/dashboard/skeletons';
import { Suspense } from 'react';
import { fetchPartnershipsPages } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page(props: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const user_id = session?.user?.id;
  if(!user_id) {
    redirect("/login");
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPartnershipsPages(query, user_id);

  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl">제휴</h1>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="제휴 검색..." />
        <CreatePartnership />
      </div>

      <Suspense key={query + currentPage} fallback={<PartnershipsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} user_id={user_id} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
