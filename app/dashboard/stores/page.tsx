import Pagination from '@/app/ui/stores/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/stores/table';
import { CreateStore } from '@/app/ui/stores/buttons';
import { StoresTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchStoresPages } from '@/app/lib/data';

export default async function Page(props: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchStoresPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">가게</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="가게 검색..." />
        <CreateStore />
      </div>

      <Suspense key={query + currentPage} fallback={<StoresTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
