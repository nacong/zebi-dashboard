import { fetchFilteredStores } from '@/app/lib/data';
import { DeleteStore, UpdateStore } from './buttons';

export default async function StoresTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const stores = await fetchFilteredStores(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
          {/* 모바일 */}
          <div className="md:hidden">
            {stores?.map((store) => (
              <div
                key={store.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">{store.name}</p>
                    <p className="text-sm text-gray-500">
                      {store.category}
                    </p>
                  </div>
                </div>

                <div className="pt-4 text-sm">
                  <a
                    href={store.url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    매장 링크
                  </a>
                  <p className="mt-2 text-gray-500">
                    위치: {store.lat}, {store.lon}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 데스크탑 */}
          <table className="hidden min-w-full text-gray-50 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">매장명</th>
                <th className="px-3 py-5 font-medium">카테고리</th>
                <th className="px-3 py-5 font-medium">링크</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {stores?.map((store) => (
                <tr
                  key={store.id}
                  className="border-b border-gray-900 text-sm last:border-none"
                >
                  <td className="rounded-l-lg py-3 pl-6 pr-3">
                    {store.name}
                  </td>
                  <td className="px-3 py-3">
                    {store.category}
                  </td>
                  <td className="px-3 py-3">
                    <a
                      href={store.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      바로가기
                    </a>
                  </td>
                  <td className="rounded-r-lg whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateStore id={store.id} />
                      <DeleteStore id={store.id} />
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
