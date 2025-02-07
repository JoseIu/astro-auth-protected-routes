import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import prisma from '../../db';

export const updateUserLike = defineAction({
  accept: 'json',
  input: z.object({
    userId: z.string(),
    increment: z.number()
  }),
  handler: async input => {
    const user = await prisma.user.findUnique({ where: { id: input.userId } });

    if (!user) throw new Error('User not found');

    const updatedLikes = await prisma.user.update({
      where: { id: input.userId },
      data: {
        likes: user.likes + input.increment
      }
    });
    return updatedLikes;
  }
});
