"use client";
import "@blocknote/core/fonts/inter.css";
// import { BlockNoteView } from "@blocknote/react";
// import { useCreateBlockNote } from "@blocknote/react";
import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";

import {
  BlockNoteView,
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";

import "@blocknote/react/style.css";
import "./Beditor.css";

import { HiOutlineGlobeAlt } from "react-icons/hi";
import { AIInputForm } from "./InlineAIwindow";


// ----------------------------------------------------------------------------
// Custom @ Menu to use AI to generate a block with text
import { AiGenerate } from "./AIGenerate";
// Our schema with inline content specs, which contain the configs and
// implementations for inline content  that we want our editor to use.
// Function which gets all users for the mentions menu.
const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => {
  return [{
  title: "AI Generate",
  onItemClick: () => {
    editor.insertInlineContent([
    {
      type: "",
      props: {
      user: "AI Generate",
      },
    },
    " ", // add a space after the mention
    ]);
  },
  }];
};

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Custom Slash Menu item to insert a block after the current one.
const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Insert Hello World",
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([helloWorldBlock], currentBlock, "after");
  },
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Used to insert a block with 'Hello World' below.",
});

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
];
// ----------------------------------------------------------------------------
const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    //  DefaultReactSuggestionItem,
    // default: getCustomSlashMenuItems.,
    aiGenInline: AiGenerate,

  },
});

// ----------------------------------------------------------------------------
export default function BetterEditor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "You'll see that the text is now white.",
      },
      {
        type: "paragraph",
        content:
          "Press the '/' key - the hovered Slash Menu items are also white.",
      },
      {
        type: "paragraph",
      },
    ],
  });

  // Renders the editor instance using a React component.
  // Adds `data-theming-css-demo` to restrict styles to only this demo.
  return (
    <BlockNoteView editor={editor} data-theming-css slashMenu={true}>
      {/* <SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      /> */}
      <SuggestionMenuController
        triggerCharacter={"@"}
        getItems={async (query) =>
          // Gets the mentions menu items
          filterSuggestionItems(getMentionMenuItems(editor), query)
        }
        />
    </BlockNoteView>
  );
}
