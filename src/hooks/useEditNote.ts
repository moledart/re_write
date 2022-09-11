import { useAtom } from 'jotai';
import { searchAtom, selectedCategoryAtom } from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useEditNote = () => {
  const ctx = trpc.useContext();
  const [searchInput] = useAtom(searchAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  const { mutate: editNote } = trpc.useMutation(['notes.editNote'], {
    onSettled: () => {
      ctx.invalidateQueries([
        'notes.getNotes',
        { categoryId: selectedCategory, search: searchInput },
      ]);
    },
  });

  return editNote;
};
