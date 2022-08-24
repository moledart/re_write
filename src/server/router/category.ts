import { createRouter } from './context';
import { z } from 'zod';

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
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.findFirst({
        where: {
          id: input.id,
        },
        include: {
          notes: true,
        },
        orderBy: {
          createdAt: 'desc',
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
  .mutation('changeCategory', {
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
