import { trpc } from '../utils/trpc';

export const useAddCategory = () => {
  const ctx = trpc.useContext();

  const { mutate: addCategory } = trpc.useMutation('category.addCategory', {
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

  return addCategory;
};
