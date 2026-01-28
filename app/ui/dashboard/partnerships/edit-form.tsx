'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PartnershipState } from '@/app/lib/definitions';

import { ClientPartnership } from '@/app/lib/definitions';
import { useActionState } from 'react';
import { updatePartnership } from '@/app/lib/actions';

export default function EditPartnershipForm({
  partnership,
}: {
  partnership: ClientPartnership;
}) {
  const initialState: PartnershipState = { message: null, errors: {} };
  const updatePartnershipWithId = updatePartnership.bind(null, partnership.id);
  const [state, formAction, isPending] = useActionState(updatePartnershipWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-lg bg-gray-900 text-gray-200 p-4 md:p-6">

        <div className="mb-4">
          <label htmlFor="store_name" className="mb-2 block text-sm font-medium">
            가게 이름
          </label>
          <input
            id="store_name"
            name="store_name"
            readOnly
            defaultValue={partnership.store_name}
            className="block w-full rounded-md border text-gray-400 border-gray-400 py-2 px-3 text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="emoji" className="mb-2 block text-sm font-medium">
            이모지 (실제로는 <a href="https://toss.im/tossface/all#음식" className="underline">토스이모지</a>로 보여져요)
          </label>
          <input
            id="emoji"
            name="emoji"
            defaultValue={partnership.emoji}
            className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="condition" className="mb-2 block text-sm font-medium">
            조건
          </label>
          <input
            id="condition"
            name="condition"
            defaultValue={partnership.condition}
            className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
          />
        </div>

         <div className="mb-4">
          <label htmlFor="benefit" className="mb-2 block text-sm font-medium">
            혜택
          </label>
          <input
            id="benefit"
            name="benefit"
            defaultValue={partnership.benefit}
            className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
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
        <Button type="submit" aria-disabled={isPending}>제휴 수정</Button>
      </div>
    </form>
  );
}
