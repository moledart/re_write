import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useAtom } from 'jotai';
import { useEditNote } from '../../hooks/useEditNote';
import { selectedNoteAtom } from '../../state/atoms';
import { trpc } from '../../utils/trpc';
import EditorMenu from './EditorMenu';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap = () => {
  const [selectedNote] = useAtom(selectedNoteAtom);

  // console.log('from tiptap', selectedNote);
  const { data: note } = trpc.useQuery(
    ['notes.getNoteById', { id: selectedNote! }],
    { enabled: !!selectedNote, staleTime: Infinity }
  );

  const editNote = useEditNote();

  const findNode = (nodeArray: JSONContent[], nodeType: string) =>
    nodeArray.find((element) => element.type === nodeType)?.content?.at(0)
      ?.text;

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
      content: note?.noteContent as JSONContent,
      autofocus: 'end',
      injectCSS: false,
      editorProps: {
        attributes: {
          class:
            'prose h-full min-h-[300px] max-w-none focus:outline-none py-10',
        },
      },
      onBlur({ editor }) {
        const noteContent: JSONContent = editor.getJSON();
        if (noteContent.content && selectedNote) {
          const title = findNode(noteContent.content, 'heading');
          const subheader = findNode(noteContent.content, 'paragraph');
          editNote({ title, subheader, noteContent, id: selectedNote });
        }
      },
    },
    [selectedNote]
  );

  return (
    <>
      <EditorContent editor={editor} />
      <EditorMenu editor={editor} />
    </>
  );
};

export default Tiptap;
