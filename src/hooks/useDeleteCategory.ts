import { trpc } from '../utils/trpc';

export const useDeleteCategory = () => {
  const ctx = trpc.useContext();

  const { mutate: removeCategory } = trpc.useMutation(
    ['category.removeCategory'],
    {
      onSettled: () => {
        ctx.invalidateQueries(['category.getAll']);
      },
    }
  );

  return removeCategory;
};
