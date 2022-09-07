import { useAtom } from 'jotai';
import { trpc } from '../utils/trpc';
import { selectedNoteAtom } from '../state/atoms';

export const useAddNote = () => {
  const ctx = trpc.useContext();
  const [, setSelectedNote] = useAtom(selectedNoteAtom);

  const { mutate: addNote } = trpc.useMutation(['notes.addNewNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getAllNotes']);
      let optimisticUpdate = ctx.getQueryData(['notes.getAllNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getAllNotes'], optimisticUpdate);
    },
    onSettled: (data) => {
      ctx.invalidateQueries(['notes.getAllNotes']);
      setSelectedNote(data?.id);
    },
  });

  return addNote;
};
