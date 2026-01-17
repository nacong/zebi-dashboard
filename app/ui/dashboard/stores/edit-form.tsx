'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState, useTransition } from 'react';
import { updateStore } from '@/app/lib/actions';
import { Category, CATEGORY_LIST, Store, StoreCreate, StoreState } from '@/app/lib/definitions';
import KakaoMap from './kakao-map';
import { Marker } from '@/app/lib/kakao-map-definitions';
import { searchPlaceByKeyword } from '@/app/lib/kakao-map-actions';


export default function StoreEditForm({
  defaultStore,
}: {
  defaultStore: Store;
}) {
  const [store, setStore] = useState<StoreCreate>(defaultStore);
  const [selectedPlace, setSelectedPlace] = useState<Marker>({ 
    position: {
      lat: defaultStore.lat,
      lng: defaultStore.lon
    },
    label: defaultStore.name
  });

  const [errors, setErrors] = useState<StoreState['errors']>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = <T extends keyof Store>(
    key: T,
    value: Store[T]
  ) => {
    setStore((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      setErrors({});
      setMessage(null);

      const result = await updateStore(defaultStore.id, store);

      if (result?.errors) {
        setErrors(result.errors);
        setMessage(result.message ?? '입력값이 올바르지 않습니다.');
        return;
      }
    });
  };

  const search = async (keyword: string) => {
    try {
      const { place_name, y, x, category, place_url } = await searchPlaceByKeyword(keyword);

      setSelectedPlace({
        position: {
          lat: Number(y),
          lng: Number(x)
        },
        label: place_name
      });

      setStore((prev) => ({
        ...prev,
        name: place_name,
        ...(category && { category }),
        url: place_url,
        lat: Number(y),
        lon: Number(x),
      }));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // 맵을 클릭했을 때 가게 정보에 lat, lon을 바꿔요.
  // (검색해도 안나오는 가게면 수동으로 위치를 넣어요.)
  const handleMapClick = (lat: number, lon: number) => {
    setStore((prev) => ({ ...prev, lat, lon }));
  }

  return (
    <div className="rounded-md bg-gray-900 text-gray-200 p-4 md:p-6">

      <div className="mb-4">
        <label htmlFor="search" className="mb-2 block text-sm font-medium">
          가게 검색
        </label>
        <div className="flex flex-col gap-2">
          <input
            id="search"
            placeholder="카카오맵에서 검색해요"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                search(e.currentTarget.value);
              }
            }}
          />
          <KakaoMap focusStore={selectedPlace} onMapClick={handleMapClick} />
        </div>
      </div>
        
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            가게 이름
          </label>
          <input
            id="name"
            value={store.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
          {errors?.name?.map((err) => (
            <p key={err} className="mt-2 text-sm text-red-500">{err}</p>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            카테고리
          </label>
          <select
            name="category"
            value={store.category}
            onChange={(e) =>
              handleChange('category', e.target.value as Category)
            }
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          >
            <option value="" disabled>선택</option>

            {CATEGORY_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors?.category?.map((err) => (
            <p key={err} className="mt-2 text-sm text-red-500">{err}</p>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            매장 링크
          </label>
          <input
            name="url"
            value={store.url}
            onChange={(e) => setStore((s) => ({ ...s, url: e.target.value }))}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
          {errors?.url?.map((err) => (
            <p key={err} className="mt-2 text-sm text-red-500">{err}</p>
          ))}
        </div>

        {message && (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/stores"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
          >
            취소
          </Link>
          <Button type="submit" aria-disabled={isPending}>
            {isPending ? '저장 중...' : '매장 저장'}
          </Button>
          
        </div>

      </form>
    </div>
  );
}
