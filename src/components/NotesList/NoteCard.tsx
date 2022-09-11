import { RiDeleteBinLine } from 'react-icons/ri';

//State
import { useAtom } from 'jotai';
import { useDeleteNote } from '../../hooks/useDeleteNote';
import { selectedNoteAtom } from '../../state/atoms';

interface Props {
  note: {
    id: string;
    createdAt: Date;
    title: string | null;
    subheader: string | null;
  };
}

const NoteCard = ({ note }: Props) => {
  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
  const { id, title, subheader, createdAt } = note;
  const deleteNote = useDeleteNote();

  const date = createdAt.toLocaleDateString('en-GB', {
    month: 'short',
    day: '2-digit',
  });

  const isActive = selectedNote === note.id;

  return (
    <li className="group hover-border flex-[0_0_auto]">
      <article
        className={`p-4 ${
          isActive ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-50 text-zinc-500'
        } overflow-hidden relative rounded-lg`}
        onClick={() => setSelectedNote(id)}
      >
        <small className={`uppercase ${isActive ? 'text-zinc-500' : ''}`}>
          {date}
        </small>
        <h3 className="text-xl line-clamp-1">
          {title ? title : 'Start writing'}
        </h3>
        <p className={`line-clamp-1 mt-2 ${isActive ? 'text-zinc-500' : ''}`}>
          {subheader ? subheader : 'Conent is here'}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {/* <Tag selectedNoteTag={selectedNote === note.id} />
          <Tag selectedNoteTag={selectedNote === note.id} />
          <Tag selectedNoteTag={selectedNote === note.id} /> */}
          <RiDeleteBinLine
            size="24px"
            className="text-zinc-300 hover:text-rose-400 place-self-center opacity-0 ml-auto group-hover:opacity-100 transition-all duration-100"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNote(undefined);
              deleteNote({ id });
            }}
          />
        </div>
      </article>
    </li>
  );
};

export default NoteCard;
