import postgres from 'postgres';
import { users, stores, partnerships } from '@/app/lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      image TEXT NOT NULL UNIQUE,
      code TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return sql`
        INSERT INTO users (name, image, code)
        VALUES (${user.name}, ${user.image}, ${user.code})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedStores() {
  await sql`
    CREATE TABLE IF NOT EXISTS stores (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      url TEXT NOT NULL,
      lat DOUBLE PRECISION NOT NULL,
      lon DOUBLE PRECISION NOT NULL
    );
  `;

  const insertedStores = await Promise.all(
    stores.map((store) => {
      return sql`
        INSERT INTO stores (name, category, url, lat, lon)
        VALUES (
          ${store.name},
          ${store.category},
          ${store.url},
          ${store.lat},
          ${store.lon}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedStores;
}

async function seedPartnerships() {
  await sql`
    CREATE TABLE IF NOT EXISTS partnerships (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      college_id UUID NOT NULL,
      store_id TEXT NOT NULL,
      emoji TEXT NOT NULL,
      condition TEXT NOT NULL,
      benefit TEXT NOT NULL
    );
  `;

  const insertedPartnerships = await Promise.all(
    partnerships.map((p) => {
      return sql`
        INSERT INTO partnerships (
          id,
          college_id,
          store_id,
          emoji,
          condition,
          benefit
        )
        VALUES (
          ${p.id},
          ${p.collegeId},
          ${p.storeId},
          ${p.emoji},
          ${p.condition},
          ${p.benefit}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedPartnerships;
}


export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedStores()
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}