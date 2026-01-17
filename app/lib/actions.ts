'use server';

import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { StoreState, StoreSchema, PartnershipState, PartnershipCreateSchema, PartnershipUpdateSchema, StoreCreate, Store } from "./definitions";
import z from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function login(prevStoreState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.log(error)
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
}

export async function createStore(store: StoreCreate): Promise<StoreState> {
  const validated = StoreSchema.safeParse(store);

  if (!validated.success) {
    const treeError = z.treeifyError(validated.error);

    return {
      errors: {
        name: treeError.properties?.name?.errors,
        category: treeError.properties?.category?.errors,
        url: treeError.properties?.url?.errors,
        lat: treeError.properties?.lat?.errors,
        lon: treeError.properties?.lon?.errors,
      },
      message: '입력값이 올바르지 않습니다.',
    };
  }

  const { name, category, url, lat, lon } = validated.data;

  try {
    await sql`
      INSERT INTO stores (name, category, url, lat, lon)
      VALUES (
        ${name},
        ${category},
        ${url},
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

export async function updateStore(id: string, store: StoreCreate): Promise<StoreState> {
  const validated = StoreSchema.safeParse(store);

  if (!validated.success) {
    const treeError = z.treeifyError(validated.error);

    return {
      errors: {
        name: treeError.properties?.name?.errors,
        category: treeError.properties?.category?.errors,
        url: treeError.properties?.url?.errors,
        lat: treeError.properties?.lat?.errors,
        lon: treeError.properties?.lon?.errors,
      },
      message: '입력값이 올바르지 않습니다.',
    };
  }

  const { name, category, url, lat, lon } = validated.data;

  try {
    await sql`
      UPDATE stores
      SET
        name = ${name},
        category = ${category},
        url = ${url},
        lat = ${lat},
        lon = ${lon}
      WHERE id = ${id};
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

export async function createPartnership(
  prevPartnershipState: PartnershipState,
  formData: FormData,
): Promise<PartnershipState> {
  const validatedFields = PartnershipCreateSchema.safeParse({
    store_id: formData.get('store_id'),
    emoji: formData.get('emoji'),
    condition: formData.get('condition'),
    benefit: formData.get('benefit')
  });


  if (!validatedFields.success) {
    const treeError = z.treeifyError(validatedFields.error);

    return {
      errors: {
        store_id: treeError.properties?.store_id?.errors,
        emoji: treeError.properties?.emoji?.errors,
        condition: treeError.properties?.condition?.errors,
        benefit: treeError.properties?.benefit?.errors,
      },
      message: '입력값이 올바르지 않습니다.',
    };
  }

  const { store_id, emoji, condition, benefit } = validatedFields.data;
  
  try {
    const session = await auth();
    if (!session?.user) {
      return { message: '세션이 만료되었습니다.' };
    }

    await sql`
      INSERT INTO partnerships (college_id, store_id, emoji, condition, benefit)
      VALUES (
        ${session.user.id ?? ''},
        ${store_id},
        ${emoji},
        ${condition},
        ${benefit}
      );
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: '제휴 생성 중 오류가 발생했습니다.',
    };
  }

  revalidatePath('/dashboard/partnerships');
  redirect('/dashboard/partnerships');
}

export async function updatePartnership(
  id: string,
  prevPartnershipState: PartnershipState,
  formData: FormData,
): Promise<PartnershipState> {
  const validatedFields = PartnershipUpdateSchema.safeParse({
    emoji: formData.get('emoji'),
    condition: formData.get('condition'),
    benefit: formData.get('benefit'),
  });


  if (!validatedFields.success) {
    const treeError = z.treeifyError(validatedFields.error);

    return {
      errors: {
        emoji: treeError.properties?.emoji?.errors,
        condition: treeError.properties?.condition?.errors,
        benefit: treeError.properties?.benefit?.errors,
      },
      message: '입력값이 올바르지 않습니다.',
    };
  }

  const { emoji, condition, benefit } = validatedFields.data;

  try {
    await sql`
      UPDATE partnerships
      SET
        emoji = ${emoji},
        condition = ${condition},
        benefit = ${benefit}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: '제휴 수정 중 오류가 발생했습니다.'
    };
  }

  revalidatePath('/dashboard/partnerships');
  redirect('/dashboard/partnerships');
}

export async function deletePartnership(id: string) {
  try {
    await sql`
      DELETE FROM partnerships
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete partnership.');
  }

  revalidatePath('/dashboard/partnerships');
}
