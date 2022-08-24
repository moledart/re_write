import { Category } from '@prisma/client';
import { atom } from 'jotai';

export const selectedCategoryAtom = atom<string | undefined>(undefined);
export const selectedNoteAtom = atom<string | undefined>('');
