import { trpc } from '../utils/trpc';

export const useAddCategory = () => {
  const ctx = trpc.useContext();

  const { mutate: addCategory } = trpc.useMutation('category.addCategory', {
    onSettled: () => {
      ctx.invalidateQueries(['category.getAll']);
    },
  });

  return addCategory;
};
