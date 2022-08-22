import React from 'react';
import {
  ChevronDownIcon,
  SearchIcon,
  DotsHorizontalIcon,
  LibraryIcon,
  TerminalIcon,
  TemplateIcon,
  PlusIcon,
  CogIcon,
} from '@heroicons/react/outline';
import NoteCard from './NoteCard';

const NotesList = () => {
  return (
    <div className="col-span-2 px-5 py-10 pb-20 border-r border-r-zinc-200">
      <h1 className="text-3xl font-bold h-[72px]">Typescript</h1>
      <div className="flex items-center bg-zinc-100 text-zinc-900 p-4 rounded-lg cursor-pointer mt-5">
        <PlusIcon className="h-6" />
        <p className="ml-4">Add new note</p>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <NoteCard active title="Typescript generics" />
        <NoteCard title="tRPC for typesafe API" />
        <NoteCard title="Next as a backend" />
      </div>
    </div>
  );
};

export default NotesList;
