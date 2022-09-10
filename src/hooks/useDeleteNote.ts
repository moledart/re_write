import { useAtom } from 'jotai';
import { selectedNoteAtom } from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useDeleteNote = () => {
  const ctx = trpc.useContext();
  const [, setSelectedNote] = useAtom(selectedNoteAtom);

  const { mutate: deleteNote } = trpc.useMutation(['notes.deleteNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getNotes']);
      const optimisticUpdate = ctx.getQueryData(['notes.getNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getNotes'], optimisticUpdate);
    },
    onSettled: () => {
      const notes = ctx.getQueryData(['notes.getNotes']);
      setSelectedNote(notes?.at(0)?.id);
      ctx.invalidateQueries(['notes.getNotes']);
    },
  });

  return deleteNote;
};
