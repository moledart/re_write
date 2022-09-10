import { useAtom } from 'jotai';
import { selectedNoteAtom } from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useAddNote = () => {
  const ctx = trpc.useContext();
  const [, setSelectedNote] = useAtom(selectedNoteAtom);

  const { mutate: addNote } = trpc.useMutation(['notes.addNewNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getNotes']);
      const optimisticUpdate = ctx.getQueryData(['notes.getNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getNotes'], optimisticUpdate);
    },
    onSettled: (data) => {
      setSelectedNote(data?.id);
      ctx.invalidateQueries(['notes.getNotes']);
    },
  });

  return addNote;
};
