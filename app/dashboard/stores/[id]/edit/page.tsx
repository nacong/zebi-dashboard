import Form from '@/app/ui/stores/edit-form';
import Breadcrumbs from '@/app/ui/stores/breadcrumbs';
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
          { label: 'Stores', href: '/dashboard/stores' },
          {
            label: 'Edit Store',
            href: `/dashboard/stores/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form store={store} />
    </main>
  );
}