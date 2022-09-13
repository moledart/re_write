import { trpc } from '../utils/trpc';

export const useEditCategory = () => {
  const ctx = trpc.useContext();
  const { mutate: editCategory } = trpc.useMutation(['category.editCategory'], {
    onMutate: ({ id, name }) => {
      ctx.cancelQuery(['category.getAll']);
      const oldCategories = ctx.getQueryData(['category.getAll']);
      const newCategories = oldCategories?.map((item) =>
        item.id === id ? { ...item, name } : item
      );
      if (newCategories) ctx.setQueryData(['category.getAll'], newCategories);
    },
    onSettled: () => {
      ctx.invalidateQueries(['category.getAll']);
      ctx.invalidateQueries(['category.getCategoryById']);
    },
  });

  return editCategory;
};
