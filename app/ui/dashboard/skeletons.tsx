// Skeleton for StoresTable
function StoreRowSkeleton() {
  return (
    <tr className="border-b border-gray-900 last:border-none text-sm">
      <td className="rounded-l-lg py-3 pl-6 pr-3">
        <div className="h-6 w-full max-w-[200px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-full max-w-[120px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-full max-w-[100px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="rounded-r-lg py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-8 w-8 rounded bg-gray-700 animate-pulse"></div>
          <div className="h-8 w-8 rounded bg-gray-700 animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
}

function MobileStoreSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-900 p-4 animate-pulse">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <div className="h-6 w-full max-w-[160px] rounded bg-gray-700 mb-1"></div>
          <div className="h-4 w-full max-w-[120px] rounded bg-gray-700"></div>
        </div>
      </div>
      <div className="pt-4">
        <div className="h-4 w-full max-w-[140px] rounded bg-gray-700 mb-2"></div>
        <div className="h-4 w-full max-w-[100px] rounded bg-gray-700"></div>
      </div>
    </div>
  );
}

export function StoresTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block w-full align-middle">
        <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
          {/* 모바일 */}
          <div className="md:hidden">
            {Array.from({ length: rows }).map((_, idx) => (
              <MobileStoreSkeleton key={idx} />
            ))}
          </div>

          {/* 데스크탑 */}
          <table className="hidden w-full min-w-full text-gray-50 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">매장명</th>
                <th className="px-3 py-5 font-medium">카테고리</th>
                <th className="px-3 py-5 font-medium">링크</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {Array.from({ length: rows }).map((_, idx) => (
                <StoreRowSkeleton key={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Skeleton for PartnershipsTable
function PartnershipRowSkeleton() {
  return (
    <tr className="border-b border-gray-900 last:border-none text-sm">
      <td className="rounded-l-lg py-3 pl-6 pr-3">
        <div className="h-6 w-full max-w-[200px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-full max-w-[40px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-full max-w-[120px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-full max-w-[140px] rounded bg-gray-700 animate-pulse"></div>
      </td>
      <td className="rounded-r-lg py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-8 w-8 rounded bg-gray-700 animate-pulse"></div>
          <div className="h-8 w-8 rounded bg-gray-700 animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
}

function MobilePartnershipSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-900 p-4 animate-pulse">
      <div className="flex flex-col gap-2 border-b border-gray-800 pb-4">
        <div className="h-6 w-full max-w-[160px] rounded bg-gray-700"></div>
        <div className="h-6 w-full max-w-[40px] rounded bg-gray-700"></div>
        <div className="h-6 w-full max-w-[120px] rounded bg-gray-700"></div>
        <div className="h-6 w-full max-w-[140px] rounded bg-gray-700"></div>
      </div>
      <div className="pt-4 flex justify-end gap-3">
        <div className="h-10 w-10 rounded bg-gray-700"></div>
        <div className="h-10 w-10 rounded bg-gray-700"></div>
      </div>
    </div>
  );
}

export function PartnershipsTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block w-full align-middle">
        <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
          {/* 모바일 */}
          <div className="md:hidden">
            {Array.from({ length: rows }).map((_, idx) => (
              <MobilePartnershipSkeleton key={idx} />
            ))}
          </div>

          {/* 데스크탑 */}
          <table className="hidden w-full min-w-full text-gray-50 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">가게 이름</th>
                <th className="px-3 py-5 font-medium">이모지</th>
                <th className="px-3 py-5 font-medium">조건</th>
                <th className="px-3 py-5 font-medium">혜택</th>
                <th className="px-3 py-5 font-medium">액션</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {Array.from({ length: rows }).map((_, idx) => (
                <PartnershipRowSkeleton key={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

