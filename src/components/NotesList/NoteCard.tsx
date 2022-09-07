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
  const { id, title, subheader, createdAt } = note;

  let isActive =
    selectedNote === note.id
      ? 'bg-zinc-100 text-zinc-900'
      : 'bg-zinc-50 text-zinc-500';

  return (
    <article
      className={`p-4 rounded-lg cursor-pointer ${isActive} overflow-hidden`}
      onClick={() => setSelectedNote(id)}
    >
      <span className="text-zinc-500 uppercase">20 apr</span>
      <h3 className="text-xl line-clamp-1 font-medium">
        {title ? title : 'Start writing'}
      </h3>
      <p className="line-clamp-1 mt-2">
        {subheader ? subheader : 'Conent is here'}
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
