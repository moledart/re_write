import React from 'react';

const Tag = ({ selectedNoteTag }: { selectedNoteTag: boolean }) => {
  return (
    <p
      className={`p-2 bg-zinc-100 text-sm rounded ${
        selectedNoteTag && 'bg-zinc-200'
      }`}
    >
      Design
    </p>
  );
};

export default Tag;
