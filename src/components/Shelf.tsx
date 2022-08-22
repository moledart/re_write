import { Category } from '@prisma/client';
import React, { useState } from 'react';
import { RiBillLine, RiMoreFill } from 'react-icons/ri';
import { trpc } from '../utils/trpc';
import ShelfMenu from './ShelfMenu';

interface Props {
  name: string;
  id: string;
  activeCategory: string | undefined;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Shelf = ({ name, id, activeCategory, setActiveCategory }: Props) => {
  const [visible, setVisible] = useState(false);
  const ctx = trpc.useContext();

  const { mutate: removeCategory } = trpc.useMutation(
    ['category.removeCategory'],
    {
      onMutate: () => {
        ctx.cancelQuery(['category.getAll']);
        let optimisticUpdate = ctx.getQueryData(['category.getAll']);
        if (optimisticUpdate) {
          ctx.setQueryData(['category.getAll'], optimisticUpdate);
        }
      },
      onSettled: () => {
        ctx.invalidateQueries(['category.getAll']);
      },
    }
  );

  return (
    <li
      className={`flex items-center p-4 rounded-lg  cursor-pointer relative ${
        activeCategory === id ? 'text-zinc-900 bg-white' : 'text-zinc-600'
      }`}
      onClick={() => setActiveCategory(id)}
    >
      <RiBillLine size="24px" />
      <p className="ml-4">{name}</p>
      <RiMoreFill
        size="24px"
        className="ml-auto hover:text-zinc-900"
        onClick={(e) => {
          e.stopPropagation();
          setVisible(!visible);
        }}
      />
      {visible && <ShelfMenu id={id} />}
    </li>
  );
};

export default Shelf;
