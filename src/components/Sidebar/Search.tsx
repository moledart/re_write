import { useAtom } from 'jotai';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { searchAtom } from '../../state/atoms';

const NotesSearch = () => {
  const [search, setSearch] = useAtom(searchAtom);
  return (
    <div className="relative mt-5">
      <input
        type="text"
        className="w-full px-14 py-4 rounded-lg"
        placeholder="Search notes"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <RiSearchLine
        size="24px"
        className="absolute top-1/2 -translate-y-1/2 left-4 ml-auto text-zinc-400"
      />
      <RiCloseLine
        className="hover:text-rose-600 absolute top-1/2 -translate-y-1/2 right-4 text-zinc-400 cursor-pointer transition-all duration-100"
        size={24}
        onClick={() => {
          setSearch('');
        }}
      />
    </div>
  );
};

export default NotesSearch;
