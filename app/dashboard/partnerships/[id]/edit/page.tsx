import Form from '@/app/ui/dashboard/partnerships/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchPartnershipById } from '@/app/lib/data';
 
export default async function Page(props: { params: Promise<{id : string}>}) {
  const params = await props.params;
  const id = params.id;
  const partnership = await fetchPartnershipById(id);

  if (!partnership) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '제휴', href: '/dashboard/partnerships' },
          {
            label: '제휴 수정',
            href: `/dashboard/partnerships/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form partnership={partnership} />
    </main>
  );
}