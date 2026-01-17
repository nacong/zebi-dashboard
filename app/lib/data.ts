import postgres from 'postgres';
import { ClientPartnership, Store, StoreForPartnershipCreate } from './definitions';
import { auth } from '@/auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredStores(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const stores = await sql<Store[]>`
      SELECT
        id,
        name,
        category,
        url,
        lat,
        lon
      FROM stores
      WHERE
        name ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return stores;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores.');
  }
}

export async function fetchStoresPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM stores
      WHERE
        name ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`}
    `;

    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores pages.');
  }
}

export async function fetchStoreById(id: string) {
  try {
    const data = await sql<Store[]>`
      SELECT
        id,
        name,
        category,
        url,
        lat,
        lon
      FROM stores
      WHERE id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch store.');
  }
}

export async function fetchFilteredPartnerships(
  query: string,
  user_id: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {

    const partnerships = await sql<ClientPartnership[]>`
      SELECT
        p.id,
        s.name AS store_name,
        p.emoji,
        p.condition,
        p.benefit
      FROM partnerships p
      JOIN stores s
        ON s.id = store_id
      WHERE
        college_id = ${user_id ?? ''}
        AND (
          s.name ILIKE ${`%${query}%`}
          OR p.condition ILIKE ${`%${query}%`}
          OR p.benefit ILIKE ${`%${query}%`}
        )
      ORDER BY s.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return partnerships;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch partnerships.');
  }
}

export async function fetchAllStoresForPartnership() {
  try {
    const allStores = await sql<StoreForPartnershipCreate[]>`SELECT id, name FROM stores`;
    return allStores;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all stores for partnership.');
  }
}

export async function fetchPartnershipsPages(query: string, user_id: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM partnerships p
      JOIN stores s
        ON s.id = store_id
      WHERE
        college_id = ${user_id}
        AND (
          s.name ILIKE ${`%${query}%`}
          OR p.condition ILIKE ${`%${query}%`}
          OR p.benefit ILIKE ${`%${query}%`}
        )
    `;

    return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch partnerships pages.');
  }
}

export async function fetchPartnershipById(id: string) {
  try {
    const data = await sql<ClientPartnership[]>`
      SELECT
        p.id,
        s.name AS store_name,
        p.emoji,
        p.condition,
        p.benefit
      FROM partnerships p
      JOIN stores s
        ON s.id = store_id
      WHERE p.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch partnership.');
  }
}