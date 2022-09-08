import React, { useState } from 'react';
//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';

import { trpc } from '../../utils/trpc';

//Components
import { RiBillLine } from 'react-icons/ri';
import { useAddCategory } from '../../hooks/useAddCategory';
import Shelf from './Shelf';

interface Props {
  toggleNewCategory: boolean;
  setToggleNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shelves = ({ toggleNewCategory, setToggleNewCategory }: Props) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // tRPC getting all categories
  const { data: categories } = trpc.useQuery(['category.getAll']);

  const addCategory = useAddCategory();

  return (
    <ul className="flex flex-col gap-2 mt-10">
      <li
        className={`flex justify-between relative hover-border`}
        onClick={() => setSelectedCategory(undefined)}
      >
        <p className="pl-4 py-4">All notes</p>
      </li>
      {categories?.map(({ name, id }) => (
        <Shelf name={name} id={id} key={id} />
      ))}
      {toggleNewCategory && (
        <li className="relative">
          <input
            type="text"
            className="w-full px-14 py-4 rounded-lg overflow-hidden focus:outline-none"
            placeholder="Add title"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <RiBillLine
            size="24px"
            className="absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400"
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 px-4 cursor-pointer h-[calc(100%-2px)] bg-zinc-700 hover:bg-zinc-900 text-zinc-50"
            onClick={() => {
              addCategory({ name: categoryName });
              setCategoryName('');
              setToggleNewCategory(false);
            }}
          >
            Add
          </button>
        </li>
      )}
    </ul>
  );
};

export default Shelves;
