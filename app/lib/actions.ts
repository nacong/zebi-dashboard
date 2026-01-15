'use server';

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { State, StoreSchema } from "./definitions";
import z from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '코드를 확인해주세요.';
        default:
          return '코드를 확인해주세요.';
      }
    }
    throw error;
  }

  // 2. 대시보드로 이동해요.
  redirect('/dashboard');
}

export async function createStore(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = StoreSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    url: formData.get('url'),
    lat: formData.get('lat'),
    lon: formData.get('lon'),
  });


  if (!validatedFields.success) {
    const treeError = z.treeifyError(validatedFields.error);

    return {
      errors: {
        name: treeError.properties?.name?.errors,
        category: treeError.properties?.category?.errors,
        lat: treeError.properties?.lat?.errors,
        lon: treeError.properties?.lon?.errors,
      },
      message: '입력값이 올바르지 않습니다.',
    };
  }

  const { name, category, url, lat, lon } = validatedFields.data;
  
  try {
    await sql`
      INSERT INTO stores (name, category, url, lat, lon)
      VALUES (
        ${name},
        ${category},
        ${url ?? null},
        ${lat},
        ${lon}
      );
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: '매장 생성 중 오류가 발생했습니다.',
    };
  }

  revalidatePath('/dashboard/stores');
  redirect('/dashboard/stores');
}

export async function updateStore(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = StoreSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    url: formData.get('url'),
    lat: formData.get('lat'),
    lon: formData.get('lon'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '입력값이 올바르지 않습니다.',
    };
  }

  const { name, category, url, lat, lon } = validatedFields.data;

  try {
    await sql`
      UPDATE stores
      SET
        name = ${name},
        category = ${category},
        url = ${url ?? null},
        lat = ${lat},
        lon = ${lon}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: '매장 수정 중 오류가 발생했습니다.',
    };
  }

  revalidatePath('/dashboard/stores');
  redirect('/dashboard/stores');
}


export async function deleteStore(id: string) {
  try {
    await sql`
      DELETE FROM stores
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete store.');
  }

  revalidatePath('/dashboard/stores');
}
