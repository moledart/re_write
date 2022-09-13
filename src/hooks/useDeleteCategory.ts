import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useDeleteCategory = () => {
  const ctx = trpc.useContext();
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const { mutate: removeCategory } = trpc.useMutation(
    ['category.removeCategory'],
    {
      onMutate: ({ id }) => {
        ctx.cancelQuery(['category.getAll']);
        ctx.setQueryData(['category.getAll'], (old) => {
          if (old) {
            return old?.filter((item) => item.id !== id);
          }
          return old!;
        });
      },
      onSettled: () => {
        setSelectedCategory(undefined);
        ctx.invalidateQueries(['category.getAll']);
      },
    }
  );

  return removeCategory;
};
