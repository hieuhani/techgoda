<template>
  <bubble-menu
    class="text-black inline-flex h-full leading-none gap-0.5 flex-row p-1 items-center bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
    :should-show="shouldShow"
  >
    <button
      v-for="({ fn, icon }, key) in bubbleItems"
      @click="fn"
      type="button"
      :class="
        cn(
          'flex group items-center justify-center border text-sm font-semibold rounded-md whitespace-nowrap bg-transparent border-transparent text-neutral-500 dark:text-neutral-400 hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200 h-8 gap-1 min-w-[2rem] px-2 w-auto',
          editor.isActive(key) ? 'bg-black/10' : ''
        )
      "
    >
      <component :is="icon" :size="16" />
    </button>
  </bubble-menu>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
import { type Editor, BubbleMenu, isTextSelection } from "@tiptap/vue-3";
import { type BubbleMenuView } from "@tiptap/extension-bubble-menu";

import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-vue-next";

const props = defineProps<{
  editor: Editor;
}>();

const bubbleItems = {
  bold: {
    fn: () => props.editor.chain().focus().toggleBold().run(),
    icon: BoldIcon,
  },
  italic: {
    fn: () => props.editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon,
  },
  underline: {
    fn: () => props.editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon,
  },
  strike: {
    fn: () => props.editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon,
  },
};

function shouldShow(this: BubbleMenuView, { view, state, from, to }: any) {
  // https://github.com/ueberdosis/tiptap/blob/main/packages/extension-bubble-menu/src/bubble-menu-plugin.ts#L47
  const { doc, selection } = state;

  const { empty } = selection;
  // Sometime check for `empty` is not enough.
  // Doubleclick an empty paragraph returns a node size of 2.
  // So we check also for an empty text size.
  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(state.selection);
  // When clicking on a element inside the bubble menu the editor "blur" event
  // is called and the bubble menu item is focussed. In this case we should
  // consider the menu as part of the editor and keep showing the menu
  const isChildOfMenu = this.element.contains(document.activeElement);
  const hasEditorFocus = view.hasFocus() || isChildOfMenu;
  if (!hasEditorFocus || empty || isEmptyTextBlock || !this.editor.isEditable) {
    return false;
  }
  return ["heading", "paragraph"].some((type) => this.editor.isActive(type));
}
</script>
