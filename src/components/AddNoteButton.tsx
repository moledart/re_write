import { PlusIcon } from '@heroicons/react/outline';
import { useAddNote } from '../hooks/useAddNote';

const AddNoteButton = () => {
  const addNote = useAddNote();

  return (
    <button
      className="flex items-center justify-center w-full h-full bg-zinc-900 text-zinc-50 pl-4 pr-6 py-4 hover-border"
      onClick={() => {
        addNote({ title: '', subheader: '', noteContent: '' });
      }}
    >
      <PlusIcon className="h-6" />
      <p className="ml-4">Add new note</p>
    </button>
  );
};

export default AddNoteButton;
