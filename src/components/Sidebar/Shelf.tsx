import React, { useState } from 'react';
import { trpc } from '../../utils/trpc';

//Components
import ShelfMenu from './ShelfMenu';
import { RiBillLine, RiMoreFill } from 'react-icons/ri';

interface Props {
  name: string;
  id: string;
  selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Shelf = ({ name, id, selectedCategory, setSelectedCategory }: Props) => {
  const [visible, setVisible] = useState(false);
  const [editName, setEditName] = useState(false);
  const [categoryName, setCategoryName] = useState(name);

  const ctx = trpc.useContext();
  const { mutate: changeCategory } = trpc.useMutation(
    ['category.changeCategory'],
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
      className={`flex items-center rounded-lg cursor-pointer relative hover:text-zinc-900 hover:bg-white transition-shadow duration-200 ${
        selectedCategory === id
          ? 'text-zinc-900 bg-white shadow-inner shadow-zinc-300'
          : 'text-zinc-500'
      }`}
      onClick={() => setSelectedCategory(id)}
    >
      <RiBillLine size="24px" className="ml-4" />
      {editName ? (
        <>
          <input
            type="text"
            className="flex-auto ml-4 py-4 focus:outline-none bg-transparent"
            placeholder="Add title"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            className="px-4 cursor-pointer h-full bg-zinc-700 hover:bg-zinc-900 text-zinc-50"
            onClick={() => {
              changeCategory({ id, name: categoryName });
              setEditName(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="ml-4 py-4">{name}</p>
          <RiMoreFill
            size="24px"
            className="ml-auto hover:text-zinc-900 mr-4"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(!visible);
            }}
          />
          {visible && (
            <ShelfMenu
              id={id}
              setEditName={setEditName}
              setVisible={setVisible}
            />
          )}
        </>
      )}
    </li>
  );
};

export default Shelf;
