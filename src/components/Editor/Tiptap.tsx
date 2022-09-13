import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useEditNote } from '../../hooks/useEditNote';
import {
  searchAtom,
  selectedCategoryAtom,
  selectedNoteAtom,
} from '../../state/atoms';
import { trpc } from '../../utils/trpc';
import EditorMenu from './EditorMenu';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap = () => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  const [searchInput] = useAtom(searchAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const ctx = trpc.useContext();

  const { data: note } = trpc.useQuery(
    ['notes.getNoteById', { id: selectedNote! }],
    { enabled: !!selectedNote, staleTime: Infinity }
  );

  const editNote = useEditNote();

  const findNode = (nodeArray: JSONContent[], nodeType?: string) => {
    if (nodeType) {
      return nodeArray
        .find((element) => element.type === nodeType)
        ?.content?.at(0)?.text;
    } else {
      return nodeArray.at(1)?.content?.at(0)?.text;
    }
  };

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
            'prose h-full min-h-[300px] max-w-none focus:outline-none py-10 whitespace-pre-wrap',
        },
      },
      onUpdate({ editor }) {
        const noteContent: JSONContent = editor.getJSON();
        const title = findNode(noteContent.content!, 'heading');
        const subheader = findNode(noteContent.content!);
        console.log(noteContent);
        const notes = ctx.getQueryData([
          'notes.getNotes',
          { categoryId: selectedCategory, search: searchInput },
        ]);
        const newNotes = notes?.map((note) => {
          if (note.id === selectedNote)
            return {
              ...note,
              title: title || '',
              subheader: subheader || '',
            };
          return note;
        });
        if (newNotes) {
          ctx.setQueryData(
            [
              'notes.getNotes',
              { categoryId: selectedCategory, search: searchInput },
            ],
            newNotes
          );
          ctx.setQueryData(['notes.getNotes', { search: '' }], newNotes);
        }
      },
    },
    [selectedNote, selectedCategory]
  );

  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);

  useEffect(() => {
    if (debouncedEditor && editor) {
      const noteContent = editor.getJSON();
      const title = findNode(noteContent.content!, 'heading');
      const subheader = findNode(noteContent.content!);
      editNote({
        title: title || '',
        subheader: subheader || '',
        noteContent,
        id: selectedNote!,
      });
    }
  }, [debouncedEditor]);

  // useEffect(() => {
  //   if (editor && !editor.isDestroyed)
  //     editor?.commands.setContent(note?.noteContent as Content);
  // }, [note]);

  return (
    <>
      <EditorContent editor={editor} />
      <EditorMenu editor={editor} />
    </>
  );
};

export default Tiptap;
