import { createRouter } from './context';
import z from 'zod';
import { JSONContent } from '@tiptap/react';

export const notesRouter = createRouter()
  .query('getAllNotes', {
    async resolve({ ctx }) {
      return await ctx.prisma.note.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
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
  })
  .query('getNoteById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.note.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('addNewNote', {
    input: z.object({
      title: z.string().optional(),
      subheader: z.any().optional(),
      body: z.any().optional(),
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.note.create({
          data: {
            title: input.title,
            subheader: input.subheader,
            body: input.body,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('deleteNote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.note.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('editNote', {
    input: z.object({
      id: z.string(),
      title: z.string().optional(),
      subheader: z.any().optional(),
      body: z.any().optional(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.note.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            subheader: input.subheader,
            body: input.body,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
