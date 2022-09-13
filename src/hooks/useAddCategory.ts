import { useAtom } from 'jotai';
import { selectedCategoryAtom, selectedNoteAtom } from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useAddCategory = () => {
  const ctx = trpc.useContext();
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [, setSelectedNote] = useAtom(selectedNoteAtom);

  const { mutate: addCategory } = trpc.useMutation('category.addCategory', {
    onMutate: ({ id, name }) => {
      ctx.cancelQuery(['category.getAll']);
      ctx.setQueryData(['category.getAll'], (old) => {
        if (old) return [...old, { id, name, createdAt: new Date() }];
        return old!;
      });
    },
    onSettled: (data) => {
      setSelectedCategory(data?.id);
      setSelectedNote(undefined);
      ctx.invalidateQueries(['category.getAll']);
    },
  });

  return addCategory;
};
