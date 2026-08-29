<script setup lang="ts">
const { toggleSidebar } = useSidebar();
const { isDark, toggleTheme } = useTheme();
const { currentSize, increase, decrease, canIncrease, canDecrease } = useFontSize();
const { toggleAskAi } = useAskAi();

const route = useRoute();
const { topics } = await import('~/data/topics');

const breadcrumb = computed(() => {
  const parts = route.params.slug as string[] | undefined;
  if (!parts?.length) return 'workspace/llm-course/home';
  const topic = topics.find(t => t.slug === parts[0]);
  if (!topic) return 'workspace/llm-course/home';
  if (parts.length > 1) {
    const sub = topic.subtopics.find(s => s.slug === parts[1]);
    return sub ? `workspace/llm-course/${topic.slug}/${sub.slug}` : `workspace/llm-course/${topic.slug}`;
  }
  return `workspace/llm-course/${topic.slug}`;
});

const sizeLabels: Record<string, string> = { sm: 'SM', base: 'BASE', lg: 'LG', xl: 'XL' };
</script>

<template>
  <div class="flex items-center gap-3 px-4 lg:px-8 py-4 border-b shrink-0" style="border-color: var(--border);">
    <button class="icon-btn shrink-0" @click="toggleSidebar" aria-label="Toggle sidebar">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>

    <div class="min-w-0">
      <p class="text-sm font-bold truncate">LLM Learning Hub</p>
      <p class="text-[10px] font-bold opacity-70 truncate mono">{{ breadcrumb }}</p>
    </div>

    <div class="ml-auto flex items-center gap-2 shrink-0">
      <div class="flex items-stretch rounded-md overflow-hidden border" style="border-color: var(--border-strong);">
        <div class="flex items-center divide-x" style="border-color: var(--border);">
          <button
            class="w-8 h-8 flex items-center justify-center text-xs font-black hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30"
            :disabled="!canDecrease"
            @click="decrease"
          >A-</button>
          <span class="hidden sm:inline-block mono text-[9px] font-bold px-1 w-9 text-center select-none opacity-70 self-center">{{ sizeLabels[currentSize] }}</span>
          <button
            class="w-8 h-8 flex items-center justify-center text-sm font-black hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30"
            :disabled="!canIncrease"
            @click="increase"
          >A+</button>
        </div>
        <button class="w-9 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10" style="border-left: 1px solid var(--border);" @click="toggleTheme">
          <svg v-if="!isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A8.5 8.5 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>
        </button>
        <button
          class="flex items-center gap-1.5 px-2.5 sm:px-3 h-8 text-[11px] font-black hover:bg-black/5 dark:hover:bg-white/10"
          style="border-left: 1px solid var(--border);"
          @click="toggleAskAi"
        >
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          <span class="hidden sm:inline">Ask AI</span>
        </button>
      </div>
    </div>
  </div>
</template>