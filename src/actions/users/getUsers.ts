import { defineAction } from 'astro:actions';
import prisma from '../../db';

export const getUsersAction = defineAction({
  accept: 'json',
  input: undefined,
  handler: async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return users;
  }
});
