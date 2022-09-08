import { Note } from '@prisma/client';

//Components
import NoteCard from './NoteCard';

//State
import AddNoteButton from '../AddNoteButton';

interface Props {
  notes: Note[];
}

const NotesList = ({ notes }: Props) => {
  return (
    <div className="px-5 py-10 border-r border-r-zinc-200 max-h-screen overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold flex items-center h-[72px]">
        All the notes
      </h1>
      <div className="max-w-fit">
        <AddNoteButton />
      </div>
      <ul className="flex flex-col gap-4 mt-5 overflow-y-scroll no-scrollbar ">
        {!notes && 'Loading...'}
        {notes?.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
