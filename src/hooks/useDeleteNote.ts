import { trpc } from '../utils/trpc';

export const useDeleteNote = () => {
  const ctx = trpc.useContext();

  const { mutate: deleteNote } = trpc.useMutation(['notes.deleteNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getNotes']);
      let optimisticUpdate = ctx.getQueryData(['notes.getNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getNotes'], optimisticUpdate);
    },
    onSettled: () => {
      ctx.invalidateQueries(['notes.getNotes']);
    },
  });

  return deleteNote;
};
