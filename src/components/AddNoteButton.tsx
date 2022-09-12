import { PlusIcon } from '@heroicons/react/outline';
import { useAtom } from 'jotai';
import { useAddNote } from '../hooks/useAddNote';
import { selectedCategoryAtom } from '../state/atoms';

const AddNoteButton = () => {
  const addNote = useAddNote();
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  return (
    <button
      className="flex items-center justify-center w-full h-full bg-zinc-900 text-zinc-50 pl-4 pr-6 py-4 hover-border"
      onClick={() => {
        addNote({ categoryId: selectedCategory });
      }}
    >
      <PlusIcon className="h-6" />
      <p className="ml-4">Add new note</p>
    </button>
  );
};

export default AddNoteButton;
