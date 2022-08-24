// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { categoryRouter } from './category';
import { notesRouter } from './notes';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('category.', categoryRouter)
  .merge('notes.', notesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
