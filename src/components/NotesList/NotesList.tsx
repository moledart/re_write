import React from 'react';

import { trpc } from '../../utils/trpc';
import { Category, Note } from '@prisma/client';

//Components
import { PlusIcon } from '@heroicons/react/outline';
import NoteCard from './NoteCard';

//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';

interface Props {
  categoryWithNotes:
    | (Category & {
        notes: Note[];
      })
    | null
    | undefined;
}

const NotesList = ({ categoryWithNotes }: Props) => {
  return (
    <div className="col-span-2 px-5 py-10 pb-20 border-r border-r-zinc-200">
      <h1 className="text-3xl font-bold h-[72px]">{categoryWithNotes?.name}</h1>
      <div className="flex items-center bg-zinc-100 text-zinc-900 p-4 rounded-lg cursor-pointer mt-5">
        <PlusIcon className="h-6" />
        <p className="ml-4">Add new note</p>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {/* {!notes && 'Loading...'}
        {notes?.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))} */}
      </div>
    </div>
  );
};

export default NotesList;
