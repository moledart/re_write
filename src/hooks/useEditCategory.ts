import { trpc } from '../utils/trpc';

export const useEditCategory = () => {
  const ctx = trpc.useContext();
  const { mutate: editCategory } = trpc.useMutation(['category.editCategory'], {
    onMutate: () => {
      ctx.cancelQuery(['category.getAll']);
      const optimisticUpdate = ctx.getQueryData(['category.getAll']);
      if (optimisticUpdate) {
        ctx.setQueryData(['category.getAll'], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(['category.getAll']);
    },
  });

  return editCategory;
};
