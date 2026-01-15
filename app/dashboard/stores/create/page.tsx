import Form from '@/app/ui/stores/create-form';
import Breadcrumbs from '@/app/ui/stores/breadcrumbs';
 
export default function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stores', href: '/dashboard/stores' },
          {
            label: 'Create Store',
            href: '/dashboard/stores/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}