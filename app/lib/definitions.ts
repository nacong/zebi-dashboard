import z from "zod";

export type User = {
  id: string;
  name: string;
  image: string;
  code: string;
};

export type Store = {
  id: string;
  name: string;
  category: "음식점" | "카페" | "주점" | "헤어샵" | "헬스장" | "PC방" | "당구장" | "꽃집" | "그외";
  url: string;
  lat: number;
  lon: number;
}

export type StoreForm = {
  id: string;
  name: string;
  category: "음식점" | "카페" | "주점" | "헤어샵" | "헬스장" | "PC방" | "당구장" | "꽃집" | "그외";
  url: string;
  lat: number;
  lon: number;
};

export type StoresTable = {
  id: string;
  name: string;
  category: "음식점" | "카페" | "주점" | "헤어샵" | "헬스장" | "PC방" | "당구장" | "꽃집" | "그외";
  url: string;
  lat: number;
  lon: number;
};

/**
 * Store 검증 스키마
 */
export const StoreSchema = z.object({
  name: z.string().min(1, '매장명을 입력해 주세요.'),
  category: z.enum([
    '음식점',
    '카페',
    '주점',
    '헤어샵',
    '헬스장',
    'PC방',
    '당구장',
    '꽃집',
    '그외',
  ]),
  url: z.string().url().optional().or(z.literal('')),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
});

/**
 * 공통 State 타입 (이미 있으면 재사용)
 */
export type State = {
  errors?: {
    name?: string[];
    category?: string[];
    lat?: string[];
    lon?: string[];
  };
  message?: string | null;
};

export type Partnership = {
  id: string;
  collegeId: string;
  storeId: string;
  emoji: string;
  condition: string;
  benefit: string;
}