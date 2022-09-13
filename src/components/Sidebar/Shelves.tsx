import React, { useState } from 'react';
//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';

import { trpc } from '../../utils/trpc';

//Components
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { useAddCategory } from '../../hooks/useAddCategory';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Shelf from './Shelf';

interface Props {
  toggleNewCategory: boolean;
  setToggleNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shelves = ({ toggleNewCategory, setToggleNewCategory }: Props) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const ctx = trpc.useContext();
  const addCategory = useAddCategory();
  const { data: categories } = trpc.useQuery(['category.getAll'], {
    onSettled: (recivedCategoriries) => {
      recivedCategoriries?.forEach((category) =>
        ctx.setQueryData(
          ['category.getCategoryById', { id: category.id }],
          category
        )
      );
    },
    staleTime: Infinity,
  });

  // Detecting outside click
  const handleClickOutside = () => {
    setToggleNewCategory(false);
  };
  const ref = useOutsideClick(handleClickOutside, toggleNewCategory);

  const isActive = selectedCategory === undefined;

  return (
    <ul className="flex flex-col gap-2 mt-10">
      <li
        className={`flex justify-between relative hover-border ${
          isActive ? 'bg-white text-zinc-900' : 'text-zinc-400'
        }`}
        onClick={() => setSelectedCategory(undefined)}
      >
        <p className="pl-4 py-4">All notes</p>
      </li>
      {categories?.map(({ name, id }) => (
        <Shelf name={name} id={id} key={id} />
      ))}
      {toggleNewCategory && (
        <li
          className="flex justify-between relative hover-border bg-white text-zinc-900"
          ref={ref}
        >
          <input
            type="text"
            className="flex pl-4 py-3 outline-none min-w-0 rounded-lg"
            placeholder="Add title"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex items-center gap-2 mr-4 text-zinc-400">
            <RiCheckLine
              size={24}
              className="hover:text-emerald-600"
              onClick={() => {
                addCategory({ name: categoryName });
                setCategoryName('');
                setToggleNewCategory(false);
              }}
            />
            <RiCloseLine
              className="hover:text-rose-600"
              size={24}
              onClick={() => {
                setToggleNewCategory(false);
              }}
            />
          </div>
        </li>
      )}
    </ul>
  );
};

export default Shelves;
