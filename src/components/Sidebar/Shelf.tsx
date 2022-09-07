import React, { useState } from 'react';
import { trpc } from '../../utils/trpc';

//Components
import ShelfMenu from './ShelfMenu';
import { RiBillLine, RiMoreFill, RiFlutterLine } from 'react-icons/ri';

//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../state/atoms';

interface ShelfProps {
  name: string;
  id: string;
}

interface ContainerProps {
  children: React.ReactNode;
  id: string;
}

interface ShelfInnerContent extends ShelfProps {
  setEditName: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShelfContainer = ({ children, id }: ContainerProps) => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const isActive =
    selectedCategory === id
      ? 'text-zinc-900 bg-white shadow-inner shadow-zinc-300'
      : 'text-zinc-500';

  return (
    <li
      className={`flex items-center rounded-lg cursor-pointer relative hover:text-zinc-900 hover:bg-white transition-shadow duration-200 ${isActive}`}
      onClick={() => setSelectedCategory(id)}
    >
      <RiFlutterLine size="24px" className="ml-4 -rotate-45" />
      {children}
    </li>
  );
};

const ShelfWithInput = ({ name, id, setEditName }: ShelfInnerContent) => {
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
  );
};

const ShelfWithContent = ({ name, id, setEditName }: ShelfInnerContent) => {
  const [visible, setVisible] = useState(false);

  return (
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
        <ShelfMenu id={id} setEditName={setEditName} setVisible={setVisible} />
      )}
    </>
  );
};

const Shelf = ({ name, id }: ShelfProps) => {
  const [editName, setEditName] = useState(false);

  return (
    <ShelfContainer id={id}>
      {editName ? (
        <ShelfWithInput id={id} name={name} setEditName={setEditName} />
      ) : (
        <ShelfWithContent id={id} name={name} setEditName={setEditName} />
      )}
    </ShelfContainer>
  );
};

export default Shelf;
