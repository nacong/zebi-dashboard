import z from "zod";

// 가게
export const CATEGORY_LIST = [
  '한식',
  '일식',
  '중식',
  '양식',
  '주점',
  '카페',
  '헤어',
  '헬스',
  'PC',
  '당구',
  '꽃집',
  '네일',
  '그외',
] as const;

export type User = {
  id: string;
  name: string;
  image: string;
  code: string;
};

export type Category = (typeof CATEGORY_LIST)[number];

export const StoreSchema = z.object({
  name: z.string().min(1, '매장명을 입력해 주세요.'),
  category: z.enum(CATEGORY_LIST),
  url: z
    .url()
    .transform((v) => {
      if (v.startsWith("http://")) {
        return v.replace("http://", "https://");
      }
      return v;
    }),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
});

export type StoreCreate = z.infer<typeof StoreSchema>;
export type Store = StoreCreate & { id: string };

export type StoreState = {
  errors?: Partial<Record<keyof StoreCreate, string[]>>;
  message?: string | null;
};

export type StoreForPartnershipCreate = {
  id: string;
  name: string;
}

// 제휴
export type Partnership = {
  id: string;
  college_id: string;
  store_id: string;
  emoji: string;
  condition?: string;
  benefit: string;
}

export type PartnershipState = {
  errors?: {
    store_id?: string[];
    emoji?: string[];
    condition?: string[];
    benefit?: string[];
  };
  message?: string | null;
};

export type ClientPartnership = Omit<Partnership, 'college_id' | 'store_id'> & {
  store_name: string;
};

const PartnershipBaseSchema = {
  emoji: z
    .string()
    .min(1, '이모지를 입력해 주세요.')
    .refine(
      (v) => /^\p{Extended_Pictographic}$/u.test(v),
      '이모지 1개만 입력해 주세요.',
    ),
  condition: z.string().min(1, '조건을 입력해 주세요.'),
  benefit: z.string().min(1, '혜택을 입력해 주세요.'),
};

export const PartnershipCreateSchema = z.object({
  store_id: z.string().min(1, '가게를 선택해 주세요.'),
  ...PartnershipBaseSchema,
});

export const PartnershipUpdateSchema = z.object({
  ...PartnershipBaseSchema,
});