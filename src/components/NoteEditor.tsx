import React from 'react';
import NoteTag from './NoteTag';
import Tiptap from './Tiptap';

const NoteEditor = () => {
  return (
    <div className="col-span-3 px-10 py-10 max-h-screen overflow-scroll">
      <h1 className="text-4xl font-bold">Typescript generics</h1>
      <div className="flex flex-wrap gap-2 mt-4 mb-10">
        <NoteTag text="Typescript" />
        <NoteTag text="Prsima" />
        <NoteTag text="tRPC" />
      </div>
      <Tiptap />
    </div>
  );
};

export default NoteEditor;
