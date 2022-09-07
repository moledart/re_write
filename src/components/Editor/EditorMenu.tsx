import { Editor } from '@tiptap/react';
import React from 'react';

import {
  RiListUnordered,
  RiListOrdered,
  RiCodeLine,
  RiCodeSSlashLine,
  RiDoubleQuotesR,
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiText,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiSeparator,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from 'react-icons/ri';

const EditorMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const chainAndFocus = () => {
    return editor.chain().focus();
  };

  return (
    <div className="controls-menu">
      <button
        onClick={() => chainAndFocus().toggleBold().run()}
        className={`${editor.isActive('bold') && 'is-active'}`}
      >
        <RiBold />
      </button>
      <button
        onClick={() => chainAndFocus().toggleItalic().run()}
        className={`${editor.isActive('italic') && 'is-active'}`}
      >
        <RiItalic />
      </button>
      <button
        onClick={() => chainAndFocus().toggleStrike().run()}
        className={`${editor.isActive('strike') && 'is-active'}`}
      >
        <RiStrikethrough />
      </button>
      <button
        onClick={() => chainAndFocus().toggleCode().run()}
        className={`${editor.isActive('code') && 'is-active'}`}
      >
        <RiCodeLine />
      </button>

      <div className="h-6 w-[1px] bg-zinc-200 mx-3 my-auto"></div>

      <button
        onClick={() => chainAndFocus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <RiText />
      </button>
      <button
        onClick={() => chainAndFocus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <RiH1 />
      </button>
      <button
        onClick={() => chainAndFocus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <RiH2 />
      </button>
      <button
        onClick={() => chainAndFocus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <RiH3 />
      </button>
      <button
        onClick={() => chainAndFocus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <RiH4 />
      </button>

      <div className="h-6 w-[1px] bg-zinc-200 mx-3 my-auto"></div>

      <button
        onClick={() => chainAndFocus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <RiListUnordered />
      </button>
      <button
        onClick={() => chainAndFocus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <RiListOrdered />
      </button>
      <button
        onClick={() => chainAndFocus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <RiCodeSSlashLine />
      </button>
      <button
        onClick={() => chainAndFocus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <RiDoubleQuotesR />
      </button>
      <button onClick={() => chainAndFocus().setHorizontalRule().run()}>
        <RiSeparator />
      </button>

      <div className="h-6 w-[1px] bg-zinc-200 mx-3 my-auto"></div>

      <button onClick={() => chainAndFocus().undo().run()}>
        <RiArrowGoBackLine />
      </button>
      <button onClick={() => chainAndFocus().redo().run()}>
        <RiArrowGoForwardLine />
      </button>
    </div>
  );
};

export default EditorMenu;
