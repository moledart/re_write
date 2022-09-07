import { PlusIcon } from '@heroicons/react/outline';
import { useAtom } from 'jotai';
import React from 'react';
import { activeEditorAtom } from '../state/atoms';
import { useAddNote } from '../hooks/useAddNote';

const AddNoteButton = () => {
  const [, setActiveEditor] = useAtom(activeEditorAtom);
  const addNote = useAddNote();

  return (
    <button
      className="flex items-center justify-center w-full h-full bg-zinc-100 text-zinc-900 p-4 cursor-pointer hover:shadow-inner hover:shadow-zinc-300 transition-shadow duration-100"
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
