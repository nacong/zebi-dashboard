import { Category, CATEGORY_LIST } from "./definitions";

export async function searchPlaceByKeyword(keyword: string): Promise<{ place_name: string; y: string; x: string; category?: Category; place_url: string; }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_LOCAL_URL!}&query=${keyword}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}`
    }}
  );

  if (!res.ok) throw new Error('카카오 RESTAPI 요청 실패');

  const result = await res.json();
  if (!result?.documents.length) throw new Error('검색 결과가 없습니다.');

  const firstPlace = result.documents[0];
  firstPlace.category = CATEGORY_LIST.find(c => firstPlace.category_name.includes(c));

  return firstPlace;
} 