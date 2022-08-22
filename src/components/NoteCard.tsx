import React from 'react';

const NoteCard = ({
  active = false,
  title,
}: {
  active?: boolean;
  title: string;
}) => {
  return (
    <article
      className={`bg-zinc-50 p-4 rounded-lg text-zinc-500 ${
        active && 'bg-zinc-100 text-zinc-900'
      }`}
    >
      <span className="text-zinc-500 uppercase">20 apr</span>
      <h3 className="text-xl">{title}</h3>
      <p className="line-clamp-2 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto
        assumenda laboriosam omnis aliquid minus sunt unde et in eum recusandae
        mollitia laborum numquam, perferendis voluptate. Minus vel eveniet
        eligendi.
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        <p
          className={`p-2 bg-zinc-100 text-sm rounded ${
            active && 'bg-zinc-200'
          }`}
        >
          Design
        </p>
        <p
          className={`p-2 bg-zinc-100 text-sm rounded ${
            active && 'bg-zinc-200'
          }`}
        >
          Database
        </p>
        <p
          className={`p-2 bg-zinc-100 text-sm rounded ${
            active && 'bg-zinc-200'
          }`}
        >
          Typescript
        </p>
      </div>
    </article>
  );
};

export default NoteCard;
