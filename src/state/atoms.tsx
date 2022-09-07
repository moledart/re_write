import { Category } from '@prisma/client';
import { atom } from 'jotai';

export const selectedCategoryAtom = atom<string | undefined>('default');
export const selectedNoteAtom = atom<string | undefined>('');
export const activeEditorAtom = atom(false);
