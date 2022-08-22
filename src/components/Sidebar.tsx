import React, { useState } from 'react';
import Image from 'next/image';
import {
  RiArrowDownSLine,
  RiMoreFill,
  RiSearchLine,
  RiBillLine,
  RiAddLine,
  RiSettings3Line,
  RiCheckLine,
} from 'react-icons/ri';
import { trpc } from '../utils/trpc';
import { Category } from '@prisma/client';
import { createNextApiHandler } from '@trpc/server/adapters/next';

interface Props {
  handleAddCategory: (name: string) => void;
  categories: Category[] | undefined;
}

const Category = ({ name, id }: Category) => {
  const [visible, setVisible] = useState(false);
  const ctx = trpc.useContext();

  const removeCategory = trpc.useMutation(['category.removeCategory'], {
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
    <li
      className={`flex items-center p-4 rounded-lg  cursor-pointer bg-white text-zinc-900 relative`}
    >
      <RiBillLine size="24px" />
      <p className="ml-4">{name}</p>
      <RiMoreFill
        size="24px"
        className="ml-auto hover:text-zinc-900"
        onClick={() => setVisible(!visible)}
      />
      <div
        className={`${
          visible ? 'flex' : 'hidden'
        } flex-col items-start p-4 gap-4 bg-white shadow rounded-lg absolute top-3/4 right-0 z-20`}
      >
        <button>Change name</button>
        <button
          className="hover:text-rose-600"
          onClick={() => removeCategory.mutate({ id })}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

const Sidebar = ({ handleAddCategory, categories }: Props) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toggleNewCategory, setToggleNewCategory] = useState(false);

  return (
    <div className="bg-zinc-50 col-span-1 px-5 py-10 flex flex-col pb-20">
      <div className="bg-white p-4 flex justify-between items-center rounded-lg">
        <Image
          src="https://picsum.photos/200?grayscale"
          width="40px"
          height="40px"
          className="rounded-sm"
        />
        <p className="text-xl font-semibold ml-4">Andrei K</p>
        <RiArrowDownSLine size="24px" />
      </div>
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
      {categories && (
        <ul className="flex flex-col gap-4 mt-10">
          {categories.map(({ name, id }) => {
            return <Category name={name} id={id} key={id} />;
          })}
          {toggleNewCategory && (
            <li className="relative">
              <input
                type="text"
                className="w-full px-14 py-4 rounded-lg overflow-hidden focus:outline-none"
                placeholder="Add title"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <RiBillLine
                size="24px"
                className="absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400"
              />
              <button
                className="absolute top-1/2 -translate-y-1/2 right-0 text-emerald-800 z-10 px-4 rounded-lg cursor-pointer hover:bg-green-100 h-[calc(100%-2px)] bg-green-50"
                onClick={() => {
                  handleAddCategory(newCategoryName);
                  setNewCategoryName('');
                  setToggleNewCategory(false);
                }}
              >
                Add
              </button>
            </li>
          )}
        </ul>
      )}

      <button
        className="flex items-center bg-white text-zinc-900 p-4 rounded-lg cursor-pointer mt-auto"
        onClick={() => setToggleNewCategory(true)}
      >
        <RiAddLine size="24px" />
        <p className="ml-4">Add shelf</p>
      </button>
      <button className="flex items-center bg-white text-zinc-900 p-4 rounded-lg cursor-pointer mt-5">
        <RiSettings3Line size="24px" />
        <p className="ml-4">Settings</p>
      </button>
    </div>
  );
};

export default Sidebar;
