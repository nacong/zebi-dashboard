'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useState } from 'react';
import { createPartnership } from '@/app/lib/actions';
import { PartnershipState, StoreForPartnershipCreate } from '@/app/lib/definitions';

export default function PartnershipForm({
  allStores
}: {allStores: StoreForPartnershipCreate[]}) {
  const initialState: PartnershipState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createPartnership, initialState);

  const [search, setSearch] = useState('');
  const filteredStores = allStores.filter((store) =>
    store.name.includes(search)
  );

  return (
    <form action={formAction}>
      <div className="rounded-lg bg-gray-900 text-gray-200 p-4 md:p-6">

        {/* 가게 선택 */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            가게 선택
          </label>
          <input
            placeholder="가게 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 block w-full rounded-md border border-gray-400 bg-gray-900 py-2 px-3 text-sm text-gray-200 placeholder-gray-400"
          />
          <select
            name="store_id"
            className="block w-full rounded-md border border-gray-400 bg-gray-900 py-2 px-3 text-sm"
          >
            {filteredStores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        {/* 이모지 */}
        <div className="mb-4">
          <label htmlFor="emoji" className="mb-2 block text-sm font-medium">
            이모지 (실제로는 <a href="https://toss.im/tossface/all#음식" className="underline">토스이모지</a>로 보여져요)
          </label>
          <input
            id="emoji"
            name="emoji"
            className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm bg-gray-900"
          />
        </div>

        {/* 조건 */}
        <div className="mb-4">
          <label htmlFor="condition" className="mb-2 block text-sm font-medium">
            조건
          </label>
          <input
            id="condition"
            name="condition"
            className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm bg-gray-900"
          />
        </div>

        {/* 혜택 */}
        <div className="mb-4">
          <label htmlFor="benefit" className="mb-2 block text-sm font-medium">
            혜택
          </label>
          <input
            id="benefit"
            name="benefit"
            className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm bg-gray-900"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/partnerships"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-400"
        >
          취소
        </Link>
        <Button type="submit" aria-disabled={isPending}>
          제휴 저장
        </Button>
      </div>
    </form>
  );
}
