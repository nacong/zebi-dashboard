import Form from '@/app/ui/dashboard/stores/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchStoreById } from '@/app/lib/data';
 
export default async function Page(props: { params: Promise<{id : string}>}) {
  const params = await props.params;
  const id = params.id;
  const store = await fetchStoreById(id);

  if (!store) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '가게', href: '/dashboard/stores' },
          {
            label: '가게 수정',
            href: `/dashboard/stores/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form defaultStore={store} />
    </main>
  );
}