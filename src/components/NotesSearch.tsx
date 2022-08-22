import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

const NotesSearch = () => {
  return (
    <div className="relative mt-5">
      <input
        type="text"
        className="w-full px-14 py-4 rounded-lg"
        placeholder="Search notes"
      />
      <RiSearchLine
        size="24px"
        className="absolute top-1/2 -translate-y-1/2 left-4 ml-auto text-zinc-400"
      />
    </div>
  );
};

export default NotesSearch;
