import React, { useState, useEffect } from 'react';
import { RiBillLine } from 'react-icons/ri';
import { trpc } from '../../utils/trpc';
import Shelf from './Shelf';
import { category } from '../../state/atoms';
import { useAtom } from 'jotai';

interface Props {
  toggleNewCategory: boolean;
  setToggleNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shelves = ({ toggleNewCategory, setToggleNewCategory }: Props) => {
  const [activeCategory, setActiveCategory] = useAtom(category);
  const [categoryName, setCategoryName] = useState('');

  // tRPC
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(['category.getAll']);

  const ctx = trpc.useContext();

  const { mutate: addCategory } = trpc.useMutation('category.addCategory', {
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
  });

  return (
    <ul className="flex flex-col gap-4 mt-10">
      {isLoading && 'Loading...'}
      {isError && error instanceof Error && `Error: ${error.message}`}
      {categories?.map(({ name, id }) => (
        <Shelf
          name={name}
          id={id}
          key={id}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
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
