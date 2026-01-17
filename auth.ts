import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import postgres from 'postgres';
import { User } from './app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(code: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE code=${code}`;
    return user[0];
  } catch (error) {
    throw new Error('서버 오류.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ code: z.string().length(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { code } = parsedCredentials.data;
          const user = await getUser(code);

          if (user) return user;
        }
        return null;
      },
    }),
    
  ],
});