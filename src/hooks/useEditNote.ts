import { useAtom } from 'jotai';
import { searchAtom, selectedCategoryAtom } from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useEditNote = () => {
  const ctx = trpc.useContext();
  const [searchInput] = useAtom(searchAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  const { mutate: editNote } = trpc.useMutation(['notes.editNote'], {
    onSettled: (data) => {
      if (data) {
        ctx.invalidateQueries(['notes.getNotes']);
        ctx.setQueryData(['notes.getNotes'], (old) => {
          if (data && old) return [data, ...old];
          return old!;
        });
      }
    },
  });

  return editNote;
};
