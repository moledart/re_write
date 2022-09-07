import { useEditor, EditorContent, Content } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import EditorMenu from './EditorMenu';
import { prepareServerlessUrl } from 'next/dist/server/base-server';
import { NoteFields } from '.';
import { Note } from '@prisma/client';
import { JSONValue } from 'superjson/dist/types';
import { useEffect } from 'react';
import assert from 'assert';
import { trpc } from '../../utils/trpc';
import { useAtom } from 'jotai';
import { selectedNoteAtom } from '../../state/atoms';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap = () => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  const ctx = trpc.useContext();

  const { data: note } = trpc.useQuery(
    ['notes.getNoteById', { id: selectedNote! }],
    { enabled: !!selectedNote }
  );

  const { mutate: editNote } = trpc.useMutation(['notes.editNote'], {
    onMutate: () => {
      ctx.cancelQuery(['notes.getAllNotes']);
      let optimisticUpdate = ctx.getQueryData(['notes.getAllNotes']);
      if (optimisticUpdate)
        ctx.setQueryData(['notes.getAllNotes'], optimisticUpdate);
    },
    onSettled: () => {
      ctx.invalidateQueries(['notes.getAllNotes']);
    },
  });
  const editor = useEditor(
    {
      extensions: [
        CustomDocument,
        StarterKit.configure({
          document: false,
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
              return 'Heading';
            }

            return 'Paragraph';
          },
        }),
      ],
      content: `${note?.body as Content}`,
      autofocus: true,
      injectCSS: false,
      editorProps: {
        attributes: {
          class:
            'prose h-full min-h-[300px] max-w-none focus:outline-none py-10',
        },
      },
      onUpdate({ editor }) {
        const json = editor.getJSON();
        let body = json.content;
        if (body && selectedNote) {
          let title = body
            .find((element) => element.type === 'heading')
            ?.content?.at(0)?.text;
          let subheader = body
            .find((element) => element.type === 'paragraph')
            ?.content?.at(0)?.text;

          editNote({ title, subheader, body, id: selectedNote });
        }
        // console.log(body);
        // let title = json.content?.at(0)?.content?.at(0)?.text;
        // let subheader = json.content?.at(1)?.content?.at(0)?.text;
        // if (body) setNewNote({ title, subheader, body });
      },
    },
    [selectedNote]
  );

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor?.commands.setContent(note?.body as Content);
    }
  }, [note, editor]);

  return (
    <>
      <EditorContent editor={editor} />
      <EditorMenu editor={editor} />
    </>
  );
};

export default Tiptap;
