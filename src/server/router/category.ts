import { z } from 'zod';
import { createRouter } from './context';

export const categoryRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.category.findMany({
        orderBy: {
          name: 'desc',
        },
      });
    },
  })
  .query('getCategoryById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('addCategory', {
    input: z.object({
      name: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.category.create({
          data: {
            name: input.name,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  })
  .mutation('removeCategory', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.category.delete({
          where: {
            id: input.id,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  })
  .mutation('editCategory', {
    input: z.object({
      name: z.string(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.category.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
