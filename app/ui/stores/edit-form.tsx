'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State } from '@/app/lib/definitions';

import { StoreForm } from '@/app/lib/definitions';
import { useActionState } from 'react';
import { updateStore } from '@/app/lib/actions';

export default function EditStoreForm({
  store,
}: {
  store: StoreForm;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateStoreWithId = updateStore.bind(null, store.id);
  const [state, formAction, isPending] = useActionState(updateStoreWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* 매장명 */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            매장명
          </label>
          <input
            id="name"
            name="name"
            defaultValue={store.name}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
          {state.errors?.name?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>

        {/* 카테고리 */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            카테고리
          </label>
          <select
            id="category"
            name="category"
            defaultValue={store.category}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          >
            <option value="음식점">음식점</option>
            <option value="카페">카페</option>
            <option value="주점">주점</option>
            <option value="헤어샵">헤어샵</option>
            <option value="헬스장">헬스장</option>
            <option value="PC방">PC방</option>
            <option value="당구장">당구장</option>
            <option value="꽃집">꽃집</option>
            <option value="그외">그외</option>
          </select>
        </div>

        {/* URL */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            매장 링크
          </label>
          <input
            id="url"
            name="url"
            defaultValue={store.url}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* 위치 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="lat" className="mb-2 block text-sm font-medium">
              위도
            </label>
            <input
              id="lat"
              name="lat"
              type="number"
              step="any"
              defaultValue={store.lat}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label htmlFor="lon" className="mb-2 block text-sm font-medium">
              경도
            </label>
            <input
              id="lon"
              name="lon"
              type="number"
              step="any"
              defaultValue={store.lon}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/stores"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          취소
        </Link>
        <Button type="submit" aria-disabled={isPending}>매장 수정</Button>
      </div>
    </form>
  );
}
