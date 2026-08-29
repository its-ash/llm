<script setup lang="ts">
const { isOpen, close } = useAskAi();
const route = useRoute();
const { topics } = await import('~/data/topics');

const contextLabel = computed(() => {
  const parts = route.params.slug as string[] | undefined;
  if (!parts?.length) return 'home';
  const topic = topics.find(t => t.slug === parts[0]);
  return topic ? topic.slug : 'home';
});

const messages = ref<{ role: 'ai' | 'user'; text: string }[]>([
  { role: 'ai', text: 'Ask me anything about the current topic — I can explain concepts, suggest next steps, or point you to references.' }
]);

const input = ref('');

const send = () => {
  if (!input.value.trim()) return;
  messages.value.push({ role: 'user', text: input.value });
  input.value = '';
  messages.value.push({ role: 'ai', text: 'Great question! Check the Further Reading section for references, or review the code examples to build intuition.' });
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-96 max-h-[28rem] rounded-lg border shadow-2xl flex flex-col overflow-hidden"
    style="background: var(--bg); border-color: var(--border-strong);"
  >
    <div class="flex items-center justify-between px-4 py-3 border-b shrink-0" style="background: var(--accent); color: var(--accent-fg); border-color: var(--border);">
      <div class="flex items-center gap-2 min-w-0">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        <span class="mono text-[11px] font-black truncate">Ask AI · {{ contextLabel }}</span>
      </div>
      <button class="w-6 h-6 rounded-md flex items-center justify-center shrink-0" @click="close">
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div v-for="(msg, i) in messages" :key="i" class="flex gap-2" :class="msg.role === 'user' ? 'flex-row-reverse' : ''">
        <span class="mono text-[9px] font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0" :style="msg.role === 'ai' ? 'background: var(--accent); color: var(--accent-fg);' : 'border; border-color: var(--border-strong);'">{{ msg.role === 'ai' ? 'AI' : 'YOU' }}</span>
        <p class="text-xs font-bold leading-relaxed rounded-lg px-3 py-2 max-w-[85%]" :style="msg.role === 'ai' ? 'background: var(--hover);' : 'background: var(--accent); color: var(--accent-fg);'">{{ msg.text }}</p>
      </div>
    </div>

    <div class="p-3 border-t shrink-0" style="border-color: var(--border);">
      <div class="flex items-center gap-2 rounded-md px-3 py-2" style="border: 1px solid var(--border-strong);">
        <input
          v-model="input"
          type="text"
          placeholder="Ask about this topic..."
          class="flex-1 min-w-0 bg-transparent text-xs font-bold outline-none placeholder:opacity-50"
          @keydown.enter="send"
        />
        <button class="mono text-[9px] font-black px-2 py-1.5 rounded shrink-0" style="background: var(--accent); color: var(--accent-fg);" @click="send">SEND</button>
      </div>
    </div>
  </div>
</template>