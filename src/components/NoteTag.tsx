import React from 'react';

const NoteTag = ({ text }: { text: string }) => {
  return <p className="p-2 bg-zinc-100 text-sm rounded">{text}</p>;
};

export default NoteTag;
