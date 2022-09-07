import { JSONContent } from '@tiptap/react';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { selectedNoteAtom, activeEditorAtom } from '../../state/atoms';
import { trpc } from '../../utils/trpc';
import AddNoteButton from '../AddNoteButton';
import NoteTag from '../NoteTag';
import Tiptap from './Tiptap';

export interface NoteFields {
  title: string | undefined;
  subheader: string | undefined;
  body: JSONContent[];
}

const NoteEditor = () => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  const [activeEditor] = useAtom(activeEditorAtom);

  const ctx = trpc.useContext();

  const { mutate: deleteNote } = trpc.useMutation(['notes.deleteNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getAllNotes']);
      let optimisticUpdate = ctx.getQueryData(['notes.getAllNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getAllNotes'], optimisticUpdate);
    },
    onSettled: () => {
      ctx.invalidateQueries(['notes.getAllNotes']);
    },
  });

  if (!selectedNote && !activeEditor)
    return (
      <div className="col-span-3">
        <AddNoteButton />
      </div>
    );

  return (
    <>
      <div className="flex flex-col px-10 py-10 min-h-screen overflow-y-scroll placeholder:text-zinc-400 w-[70ch] mx-auto">
        <div className="flex flex-wrap gap-2 mt-4 mb-10"></div>
        <Tiptap />
        <button
          className="text-zinc-600 px-6 py-4 mt-5"
          onClick={() => deleteNote({ id: selectedNote! })}
        >
          Delete note
        </button>
      </div>
    </>
  );
};

export default NoteEditor;
