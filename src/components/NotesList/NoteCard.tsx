import { Note } from '@prisma/client';

//State
import { useAtom } from 'jotai';
import { selectedNoteAtom } from '../../state/atoms';
import Tag from './Tag';

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {
  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
  const { id, title, createdAt } = note;

  return (
    <article
      className={`bg-zinc-50 p-4 rounded-lg text-zinc-500 ${
        selectedNote === note.id && 'bg-zinc-100 text-zinc-900'
      }`}
    >
      <span className="text-zinc-500 uppercase">20 apr</span>
      <h3 className="text-xl">{title}</h3>
      <p className="line-clamp-2 mt-2">
        This is your first note here, give it a go and start writing!
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        <Tag selectedNoteTag={selectedNote === note.id} />
        <Tag selectedNoteTag={selectedNote === note.id} />
        <Tag selectedNoteTag={selectedNote === note.id} />
      </div>
    </article>
  );
};

export default NoteCard;
