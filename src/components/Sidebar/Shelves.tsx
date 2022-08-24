import React, { useState, useEffect } from 'react';
//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';

import { trpc } from '../../utils/trpc';

//Components
import Shelf from './Shelf';
import { RiBillLine } from 'react-icons/ri';

interface Props {
  toggleNewCategory: boolean;
  setToggleNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shelves = ({ toggleNewCategory, setToggleNewCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [categoryName, setCategoryName] = useState('');

  // tRPC getting all categories
  const { data: categories } = trpc.useQuery(['category.getAll']);

  //Setting the first category as active
  // useEffect(() => setSelectedCategory(categories && categories[0]?.id), []);

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
      {categories?.map(({ name, id }) => (
        <Shelf
          name={name}
          id={id}
          key={id}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
