import React from 'react';
import { useDeleteCategory } from '../../hooks/useDeleteCategory';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface Props {
  id: string;
  setEditName: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}

const ShelfMenu = ({ id, setEditName, setVisible, visible }: Props) => {
  const removeCategory = useDeleteCategory();

  const handleClickOutside = () => {
    setVisible(false);
  };
  const ref = useOutsideClick(handleClickOutside, visible);

  return (
    <div
      className="flex flex-col items-start p-2 bg-white shadow rounded-lg absolute top-3/4 right-0 z-20"
      ref={ref}
    >
      <button
        className="hover:bg-zinc-100 px-4 py-2"
        onClick={() => {
          setEditName(true);
          setVisible(false);
        }}
      >
        Change name
      </button>
      <button
        className="hover:text-rose-600 px-4 py-2"
        onClick={() => removeCategory({ id })}
      >
        Delete
      </button>
    </div>
  );
};

export default ShelfMenu;
