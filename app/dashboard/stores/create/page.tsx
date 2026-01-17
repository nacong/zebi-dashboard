import Form from '@/app/ui/dashboard/stores/create-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
 
export default function Page() {
 
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: '가게', href: '/dashboard/stores' },
          {
            label: '새로 만들기',
            href: '/dashboard/stores/create',
            active: true,
          },
        ]}
      />
      <Form />
    </>
  );
}