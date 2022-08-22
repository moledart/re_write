import React, { useEffect, useState } from 'react';
import { RiAddLine, RiSettings3Line } from 'react-icons/ri';
import Account from './Account';
import NotesSearch from './Search';
import Shelves from './Shelves';

const Sidebar = () => {
  const [toggleNewCategory, setToggleNewCategory] = useState(false);

  return (
    <aside className="bg-zinc-50 col-span-2 px-5 py-10 flex flex-col pb-20">
      <Account />
      <NotesSearch />
      <Shelves
        toggleNewCategory={toggleNewCategory}
        setToggleNewCategory={setToggleNewCategory}
      />
      <button
        className="flex items-center bg-white text-zinc-900 p-4 rounded-lg cursor-pointer mt-auto hover:shadow-md transition-all duration-200"
        onClick={() => setToggleNewCategory(true)}
      >
        <RiAddLine size="24px" />
        <p className="ml-4">Add shelf</p>
      </button>
      <button className="flex items-center bg-white text-zinc-900 p-4 rounded-lg cursor-pointer mt-5 hover:shadow-md hover:shadow-zinc-300 transition-all duration-200">
        <RiSettings3Line size="24px" />
        <p className="ml-4">Settings</p>
      </button>
    </aside>
  );
};

export default Sidebar;
