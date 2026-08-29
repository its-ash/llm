<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';

const props = withDefaults(defineProps<{
  code: string;
  lang?: string;
  filename?: string;
}>(), {
  lang: 'python',
  filename: 'example.py'
});

const editorEl = ref<HTMLElement>();
let view: EditorView | null = null;
const { isDark } = useTheme();

const getExtensions = () => [
  lineNumbers(),
  history(),
  keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
  EditorView.editable.of(false),
  EditorState.readOnly.of(true),
  EditorView.lineWrapping,
  python(),
  isDark.value ? oneDark : EditorView.theme({
    '&': { backgroundColor: 'var(--code-bg)', color: 'var(--fg)' },
    '.cm-gutters': { backgroundColor: 'transparent', borderRight: '1px solid var(--border)' },
    '.cm-lineNumbers .cm-gutterElement': { color: 'var(--muted)' },
    '.cm-content': { fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace' }
  })
];

onMounted(() => {
  if (editorEl.value) {
    view = new EditorView({
      state: EditorState.create({ doc: props.code, extensions: getExtensions() }),
      parent: editorEl.value
    });
  }
});

watch(() => isDark.value, () => {
  if (view && editorEl.value) {
    view.destroy();
    view = new EditorView({
      state: EditorState.create({ doc: props.code, extensions: getExtensions() }),
      parent: editorEl.value
    });
  }
});

watch(() => props.code, (newCode) => {
  if (view) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: newCode }
    });
  }
});

onBeforeUnmount(() => {
  if (view) view.destroy();
});
</script>

<template>
  <div class="rounded-lg border overflow-hidden" style="border-color: var(--border-strong);">
    <div class="flex items-center justify-between px-4 py-2 border-b" style="border-color: var(--border); background: var(--hover);">
      <span class="mono text-[10px] font-bold opacity-60">{{ filename }}</span>
      <span class="mono text-[10px] font-bold opacity-60 uppercase">{{ lang }}</span>
    </div>
    <div ref="editorEl" class="overflow-x-auto code-editor" />
  </div>
</template>

<style>
.code-editor .cm-editor { font-size: 0.875rem; }
.code-editor .cm-scroller { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; }
.code-editor .cm-editor.cm-focused { outline: none; }
.code-editor .cm-content { padding: 0.5rem 0; }
</style>