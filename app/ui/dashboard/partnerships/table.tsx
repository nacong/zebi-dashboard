import { fetchFilteredPartnerships } from '@/app/lib/data';
import { DeletePartnership, UpdatePartnership } from './buttons';

export default async function PartnershipsTable({
  query,
  currentPage,
  user_id,
}: {
  query: string;
  currentPage: number;
  user_id: string;
}) {
  const partnerships = await fetchFilteredPartnerships(query, user_id, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
          {/* 모바일 */}
          <div className="md:hidden">
            {partnerships?.map((partnership) => (
              <div
                key={partnership.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">{partnership.store_name}</p>
                    <p className="text-sm text-gray-500">{partnership.emoji}</p>
                    <p className="text-sm text-gray-500">{partnership.condition}</p>
                    <p className="text-sm text-gray-500">{partnership.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 데스크탑 */}
          <table className="hidden min-w-full text-gray-50 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">가게 이름</th>
                <th className="px-3 py-5 font-medium">이모지</th>
                <th className="px-3 py-5 font-medium">조건</th>
                <th className="px-3 py-5 font-medium">혜택</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {partnerships?.map((partnership) => (
                <tr
                  key={partnership.id}
                  className="border-b text-sm last:border-none"
                >
                  <td className="rounded-l-lg py-3 pl-6 pr-3">{partnership.store_name}</td>
                  <td className="px-3 py-3">{partnership.emoji}</td>
                  <td className="px-3 py-3">{partnership.condition}</td>
                  <td className="px-3 py-3">{partnership.benefit}</td>
                  <td className="rounded-r-lg whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePartnership id={partnership.id} />
                      <DeletePartnership id={partnership.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

