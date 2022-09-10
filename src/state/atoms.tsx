import { atom } from 'jotai';

export const selectedCategoryAtom = atom<string | undefined>(undefined);
export const searchAtom = atom<string | undefined>('');
export const selectedNoteAtom = atom<string | undefined>('');
