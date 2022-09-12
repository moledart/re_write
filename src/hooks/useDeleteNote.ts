import { useAtom } from 'jotai';
import {
  searchAtom,
  selectedCategoryAtom,
  selectedNoteAtom,
} from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useDeleteNote = () => {
  const ctx = trpc.useContext();
  const [, setSelectedNote] = useAtom(selectedNoteAtom);
  const [searchInput] = useAtom(searchAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  const { mutate: deleteNote } = trpc.useMutation(['notes.deleteNote'], {
    onMutate: ({ id }) => {
      ctx.cancelQuery(['notes.getNotes']);
      const notes = ctx.getQueryData([
        'notes.getNotes',
        { categoryId: selectedCategory, search: searchInput },
      ]);
      const newNotes = notes?.filter((note) => note.id !== id);
      if (newNotes) {
        ctx.setQueryData(
          [
            'notes.getNotes',
            { categoryId: selectedCategory, search: searchInput },
          ],
          newNotes
        );
      }
    },
    onSuccess: () => {
      ctx.invalidateQueries(['notes.getNotes']);
      setSelectedNote(undefined);
    },
  });

  return deleteNote;
};
