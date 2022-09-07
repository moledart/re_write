import React from 'react';

import { trpc } from '../../utils/trpc';
import { Category, Note } from '@prisma/client';

//Components
import { PlusIcon } from '@heroicons/react/outline';
import NoteCard from './NoteCard';

//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';
import AddNoteButton from '../AddNoteButton';

interface Props {
  // categoryWithNotes:
  //   | (Category & {
  //       notes: Note[];
  //     })
  //   | null
  //   | undefined;
  notes: Note[];
}

// const NotesList = ({ categoryWithNotes }: Props) => {
//   const notes = categoryWithNotes?.notes;
//   return (
//     <div className="col-span-2 px-5 py-10 pb-20 border-r border-r-zinc-200">
//       <h1 className="text-3xl font-bold h-[72px] flex items-center">
//         {categoryWithNotes?.name}
//       </h1>
//       <div className="max-w-fit rounded-lg overflow-hidden">
//         <AddNoteButton />
//       </div>
//       <div className="flex flex-col gap-5 mt-5">
//         {!notes && 'Loading...'}
//         {notes?.map((note) => (
//           <NoteCard note={note} key={note.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

const NotesList = ({ notes }: Props) => {
  return (
    <div className="px-5 py-10 pb-20 border-r border-r-zinc-200">
      <h1 className="text-3xl font-bold h-[72px] flex items-center">
        All the notes
      </h1>
      <div className="max-w-fit rounded-lg overflow-hidden">
        <AddNoteButton />
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {!notes && 'Loading...'}
        {notes?.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
