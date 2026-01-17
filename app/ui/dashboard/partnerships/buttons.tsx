import { deletePartnership } from '@/app/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../../button';

export function CreatePartnership() {
  return (
    <Link
      href="/dashboard/partnerships/create"
    >
      <Button>새로 만들기</Button>
    </Link>
  );
}

export function UpdatePartnership({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/partnerships/${id}/edit`}
      className="rounded-md border p-2"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePartnership({ id }: { id: string }) {
  const deletePartnershipWithId = deletePartnership.bind(null, id);

  return (
    <form action={deletePartnershipWithId}>
      <button type="submit" className="rounded-md border p-2">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
