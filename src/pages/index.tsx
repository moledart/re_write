import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
//State
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../state/atoms';

//Components
import NoteEditor from '../components/Editor';
import NotesList from '../components/NotesList/NotesList';
import Sidebar from '../components/Sidebar/';

import { trpc } from '../utils/trpc';
import { Category } from '@prisma/client';

const Home: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // const {
  //   data: categories,
  //   isSuccess,
  //   isLoading,
  //   isError,
  //   error,
  // } = trpc.useQuery(['category.getAll']);

  // let firstCategoryId: string | undefined;
  // if (isSuccess && categories.length > 0) {
  //   firstCategoryId = categories[0]?.id;
  // }

  // useEffect(() => setSelectedCategory(firstCategoryId), [firstCategoryId]);

  // const { data: categoryWithNotes } = trpc.useQuery(
  //   ['category.getById', { id: selectedCategory! }],
  //   { enabled: !!selectedCategory }
  // );

  const {
    data: notes,
    isSuccess,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(['notes.getAllNotes']);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <Head>
        <title>re:write</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen grid grid-cols-[240px_380px_1fr]">
        <Sidebar />
        {isSuccess && <NotesList notes={notes} />}
        <NoteEditor />
      </main>
    </>
  );
};

export default Home;
