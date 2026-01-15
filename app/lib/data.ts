import postgres from 'postgres';
import { StoresTable, StoreForm } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredStores(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const stores = await sql<StoresTable[]>`
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
    const data = await sql<StoreForm[]>`
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
