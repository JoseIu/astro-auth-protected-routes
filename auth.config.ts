// import GitHub from '@auth/core/providers/github';
import prisma from '@/db';
import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    //TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
    // })

    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async ({ email, password }) => {
        const user = await prisma.userAuth.findUnique({
          where: {
            email: `${email}`
          }
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error('Invalid credentials');
        }

        const { password: _, ...rest } = user;
        return rest;
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user as AdapterUser;
      return session;
    }
  }
});
