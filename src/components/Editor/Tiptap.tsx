import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useEditNote } from '../../hooks/useEditNote';
import { selectedNoteAtom } from '../../state/atoms';
import { trpc } from '../../utils/trpc';
import EditorMenu from './EditorMenu';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap = () => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  console.log(selectedNote);
  const ctx = trpc.useContext();
  const { data: notes } = trpc.useQuery(['notes.getNotes']);
  const { data: note } = trpc.useQuery(
    ['notes.getNoteById', { id: selectedNote! }],
    { enabled: !!selectedNote }
  );

  const editNote = useEditNote();

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
      content: ``,
      autofocus: true,
      injectCSS: false,
      editorProps: {
        attributes: {
          class:
            'prose h-full min-h-[300px] max-w-none focus:outline-none py-10',
        },
      },
      // onUpdate({ editor }) {},
      onBlur({ editor }) {
        const json = editor.getJSON();
        const body = json.content;
        if (body && selectedNote) {
          const title = body
            .find((element) => element.type === 'heading')
            ?.content?.at(0)?.text;
          const subheader = body
            .find((element) => element.type === 'paragraph')
            ?.content?.at(0)?.text;

          editNote({ title, subheader, body, id: selectedNote });
        }
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
