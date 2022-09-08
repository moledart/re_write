//Components
import NoteCard from './NoteCard';

//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';
import { trpc } from '../../utils/trpc';
import AddNoteButton from '../AddNoteButton';

const NotesList = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const {
    data: notes,
    isSuccess,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(['notes.getNotes', { id: selectedCategory }]);

  return (
    <div className="px-5 py-10 border-r border-r-zinc-200 max-h-screen overflow-hidden flex flex-col">
      <header>
        <h1 className="text-3xl font-bold flex items-center h-[72px]">
          All the notes
        </h1>
        <div className="max-w-fit">
          <AddNoteButton />
        </div>
      </header>
      <ul className="flex flex-col gap-4 mt-5 pb-5 overflow-y-scroll scroll-smooth no-scrollbar relative custom-opacity">
        {notes?.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
