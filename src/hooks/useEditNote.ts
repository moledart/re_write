import { trpc } from '../utils/trpc';

export const useEditNote = () => {
  const ctx = trpc.useContext();

  const { mutate: editNote } = trpc.useMutation(['notes.editNote'], {
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

  return editNote;
};
