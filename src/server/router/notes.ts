import { createRouter } from './context';
import z from 'zod';

export const notesRouter = createRouter()
  .query('getAllNotes', {
    async resolve({ ctx }) {
      return await ctx.prisma.note.findMany();
    },
  })
  .query('getNotesByCategory', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.note.findMany({
        where: {
          categoryId: input.id,
        },
      });
    },
  });
