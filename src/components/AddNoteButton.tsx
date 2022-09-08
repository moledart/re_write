import { PlusIcon } from '@heroicons/react/outline';
import { useAtom } from 'jotai';
import { useAddNote } from '../hooks/useAddNote';
import { activeEditorAtom } from '../state/atoms';

const AddNoteButton = () => {
  const [, setActiveEditor] = useAtom(activeEditorAtom);
  const addNote = useAddNote();

  return (
    <button
      className="flex items-center justify-center w-full h-full bg-zinc-900 text-zinc-50 pl-4 pr-6 py-4 hover-border"
      onClick={() => {
        setActiveEditor(true);
        addNote({ title: '', subheader: '', body: '' });
      }}
    >
      <PlusIcon className="h-6" />
      <p className="ml-4">Add new note</p>
    </button>
  );
};

export default AddNoteButton;
