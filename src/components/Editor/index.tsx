import { JSONContent } from '@tiptap/react';
import { useAtom } from 'jotai';
import { useDeleteNote } from '../../hooks/useDeleteNote';
import { selectedNoteAtom } from '../../state/atoms';
import AddNoteButton from '../AddNoteButton';
import Tiptap from './Tiptap';

export interface NoteFields {
  title: string | undefined;
  subheader: string | undefined;
  body: JSONContent[];
}

const NoteEditor = () => {
  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
  const deleteNote = useDeleteNote();

  if (!selectedNote)
    return (
      <div className="w-fit h-fit self-center justify-self-center">
        <AddNoteButton />
      </div>
    );

  return (
    <>
      <div className="flex flex-col px-10 py-10 min-h-screen overflow-y-scroll placeholder:text-zinc-400 max-w-[80ch] mx-auto no-scrollbar">
        <div className="flex flex-wrap gap-2 mt-4 mb-10"></div>
        <Tiptap />
        <button
          className="text-zinc-600 px-6 py-4 mt-5"
          onClick={() => {
            deleteNote({ id: selectedNote! });
            setSelectedNote(undefined);
          }}
        >
          Delete note
        </button>
      </div>
    </>
  );
};

export default NoteEditor;
