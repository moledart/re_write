import { trpc } from '../utils/trpc';

export const useDeleteCategory = () => {
  const ctx = trpc.useContext();

  const { mutate: removeCategory } = trpc.useMutation(
    ['category.removeCategory'],
    {
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
    }
  );

  return removeCategory;
};
