import { deleteStore } from '@/app/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../../button';

export function CreateStore() {
  return (
    <Link
      href="/dashboard/stores/create"
    >
      <Button>새로 만들기</Button>
    </Link>
  );
}

export function UpdateStore({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/stores/${id}/edit`}
      className="rounded-md border p-2"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteStore({ id }: { id: string }) {
  const deleteStoreWithId = deleteStore.bind(null, id);

  return (
    <form action={deleteStoreWithId}>
      <button type="submit" className="rounded-md border p-2">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
