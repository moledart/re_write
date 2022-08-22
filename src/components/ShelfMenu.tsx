import React from 'react';
import { trpc } from '../utils/trpc';

const ShelfMenu = ({ id }: { id: string }) => {
  const ctx = trpc.useContext();

  const { mutate: removeCategory } = trpc.useMutation(
    ['category.removeCategory'],
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
    <div className="flex flex-col items-start p-2 bg-white shadow rounded-lg absolute top-3/4 right-0 z-20">
      <button className="hover:bg-zinc-100 px-4 py-2">Change name</button>
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
