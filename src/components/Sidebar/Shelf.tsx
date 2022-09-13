import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { RiCheckLine, RiCloseLine, RiMoreFill } from 'react-icons/ri';
import { useEditCategory } from '../../hooks/useEditCategory';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { selectedCategoryAtom, selectedNoteAtom } from '../../state/atoms';
import ShelfMenu from './ShelfMenu';

const Shelf = ({ name, id }: { name: string; id: string }) => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [menuVisible, setMenuVisible] = useState(false);
  const [categoryName, setCategoryName] = useState(name);
  const [, setSelectedNote] = useAtom(selectedNoteAtom);
  const [editName, setEditName] = useState(false);
  const editCategory = useEditCategory();

  const handleClickOutside = () => {
    setEditName(false);
  };
  const elementRef = useOutsideClick(handleClickOutside, editName);
  const inputRef = useRef<any>();

  const isActive = selectedCategory === id;

  useEffect(() => {
    if (inputRef && editName) inputRef.current.select();
  }, [inputRef, editName]);

  return (
    <li
      className={`flex justify-between relative hover-border ${
        isActive ? 'bg-white text-zinc-900' : 'text-zinc-400'
      }`}
      onClick={() => {
        setSelectedCategory(id);
        setSelectedNote(undefined);
      }}
      ref={elementRef}
    >
      {editName ? (
        <>
          <input
            type="text"
            className="flex pl-4 py-3 outline-none min-w-0 rounded-lg"
            placeholder="Add title"
            ref={inputRef}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex items-center gap-2 mr-4 text-zinc-400">
            <RiCheckLine
              size={24}
              className="hover:text-emerald-600"
              onClick={() => {
                editCategory({ id, name: categoryName });
                setEditName(false);
              }}
            />
            <RiCloseLine
              className="hover:text-rose-600"
              size={24}
              onClick={() => {
                setEditName(false);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <p className="pl-4 py-3">{name}</p>
          <div
            className="flex items-center mr-4"
            onClick={(e) => {
              e.stopPropagation();
              setMenuVisible(!menuVisible);
            }}
          >
            <RiMoreFill size="24px" className="hover:text-zinc-900" />
          </div>
        </>
      )}

      {menuVisible && (
        <ShelfMenu
          id={id}
          setEditName={setEditName}
          setVisible={setMenuVisible}
          visible={menuVisible}
        />
      )}
    </li>
  );
};

export default Shelf;
