import Form from '@/app/ui/dashboard/partnerships/create-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchAllStoresForPartnership } from '@/app/lib/data';
 
export default async function Page() {
  // 전체 가게 리스트
  const allStores = await fetchAllStoresForPartnership();
 
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: '제휴', href: '/dashboard/partnerships' },
          {
            label: '새로 만들기',
            href: '/dashboard/partnerships/create',
            active: true,
          },
        ]}
      />
      <Form allStores={allStores}/>
    </>
  );
}