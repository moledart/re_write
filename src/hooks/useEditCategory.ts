import { trpc } from '../utils/trpc';

export const useEditCategory = () => {
  const ctx = trpc.useContext();
  const { mutate: editCategory } = trpc.useMutation(['category.editCategory'], {
    onSettled: () => {
      ctx.invalidateQueries(['category.getAll']);
    },
  });

  return editCategory;
};
