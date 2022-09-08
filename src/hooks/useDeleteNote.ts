import { trpc } from '../utils/trpc';

export const useDeleteNote = () => {
  const ctx = trpc.useContext();

  const { mutate: deleteNote } = trpc.useMutation(['notes.deleteNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getAllNotes']);
      let optimisticUpdate = ctx.getQueryData(['notes.getAllNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getAllNotes'], optimisticUpdate);
    },
    onSettled: () => {
      ctx.invalidateQueries(['notes.getAllNotes']);
    },
  });

  return deleteNote;
};
