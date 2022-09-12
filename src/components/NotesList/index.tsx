//Components
import NoteCard from './NoteCard';

//State
import { useAtom } from 'jotai';
import { searchAtom, selectedCategoryAtom } from '../../state/atoms';
import { trpc } from '../../utils/trpc';
import AddNoteButton from '../AddNoteButton';

const NotesList = () => {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [search] = useAtom(searchAtom);

  const ctx = trpc.useContext();

  const { data: notes, isSuccess } = trpc.useQuery(
    ['notes.getNotes', { categoryId: selectedCategory, search: search }],
    {
      onSettled: (recievedNotes) => {
        recievedNotes?.forEach((note) =>
          ctx.setQueryData(['notes.getNoteById', { id: note.id }], note)
        );
      },
      staleTime: Infinity,
    }
  );

  const { data: currentCategory } = trpc.useQuery(
    ['category.getCategoryById', { id: selectedCategory! }],
    {
      enabled: !!selectedCategory,
    }
  );

  return (
    <div className="px-5 py-10 border-r border-r-zinc-200 max-h-screen overflow-hidden flex flex-col">
      <header>
        <h1 className="text-3xl font-bold flex items-center h-[72px]">
          {currentCategory?.name || 'All the notes'}
        </h1>
        <div className="max-w-fit">
          <AddNoteButton />
        </div>
      </header>
      <ul className="flex flex-col gap-4 mt-5 pb-5 overflow-y-scroll scroll-smooth no-scrollbar relative custom-opacity">
        {notes?.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
        {isSuccess && !notes?.length && search && (
          <span className="text-zinc-600 mt-5">Nothing to display</span>
        )}
      </ul>
    </div>
  );
};

export default NotesList;
