import { useAtom } from 'jotai';
import {
  searchAtom,
  selectedCategoryAtom,
  selectedNoteAtom,
} from '../state/atoms';
import { trpc } from '../utils/trpc';

export const useAddNote = () => {
  const ctx = trpc.useContext();
  const [, setSelectedNote] = useAtom(selectedNoteAtom);
  const [searchInput] = useAtom(searchAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  const { mutate: addNote } = trpc.useMutation(['notes.addNewNote'], {
    onSettled: (data) => {
      setSelectedNote(data?.id);
      ctx.invalidateQueries(['notes.getNotes']);
    },
  });

  return addNote;
};
