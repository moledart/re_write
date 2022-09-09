import { trpc } from '../utils/trpc';

export const useEditNote = () => {
  const ctx = trpc.useContext();

  const { mutate: editNote } = trpc.useMutation(['notes.editNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getNotes']);
      const optimisticUpdate = ctx.getQueryData(['notes.getNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getNotes'], optimisticUpdate);
    },
    onSettled: () => {
      ctx.invalidateQueries(['notes.getNotes']);
    },
  });

  return editNote;
};
