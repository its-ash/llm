<script setup lang="ts">
const { isOpen, close } = useSidebar();
const { completionPercent, loadFromStorage } = useProgress();
const { topics } = await import('~/data/topics');

const route = useRoute();
const activeSlug = computed(() => {
  const parts = route.params.slug as string[] | undefined;
  return parts?.[0] ?? '';
});

const fileLabel = computed(() => {
  if (!activeSlug.value) return 'llm-course/home';
  const topic = topics.find(t => t.slug === activeSlug.value);
  return topic ? `llm-course/${topic.slug}` : 'llm-course/home';
});

onMounted(() => {
  loadFromStorage();
});

const closeOnMobile = () => {
  if (process.client && window.innerWidth < 768) close();
};

const railIcons: Record<string, string> = {
  library: 'M4 6h16M4 12h16M4 18h10',
  marks: 'M6 4h12v16l-6-4-6 4V4z',
  progress: 'M12 7v5l3 2',
  settings: 'M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4'
};
</script>

<template>
  <!-- Overlay (mobile only) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/40 z-40 md:hidden"
    @click="close"
  />

  <!-- Sidebar -->
  <div
    class="fixed md:static inset-y-0 left-0 z-50 flex transition-transform duration-200 ease-out"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden'"
    style="background: var(--bg);"
  >
    <!-- Icon rail -->
    <div class="w-16 shrink-0 border-r flex flex-col items-center py-6 gap-8" style="background: var(--bg); border-color: var(--border);">
      <NuxtLink to="/" class="w-10 h-10 rounded-lg flex items-center justify-center mb-2" style="background: var(--accent); color: var(--accent-fg);">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
      </NuxtLink>

      <NuxtLink to="/" class="flex flex-col items-center gap-2 group">
        <span class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--accent); color: var(--accent-fg);">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
        </span>
        <span class="text-[10px] font-bold mono">Library</span>
      </NuxtLink>

      <NuxtLink to="/#progress" class="flex flex-col items-center gap-2 group">
        <span class="w-10 h-10 rounded-lg flex items-center justify-center border" style="border-color: var(--border-strong);">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>
        </span>
        <span class="text-[10px] font-bold mono">Progress</span>
      </NuxtLink>

      <button class="flex flex-col items-center gap-2 group mt-auto">
        <span class="w-10 h-10 rounded-lg flex items-center justify-center border" style="border-color: var(--border-strong);">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        </span>
        <span class="text-[10px] font-bold mono">Settings</span>
      </button>
    </div>

    <!-- File list panel -->
    <div class="w-72 shrink-0 border-r flex flex-col" style="background: var(--bg); border-color: var(--border);">
      <div class="p-6 border-b flex items-center justify-between" style="border-color: var(--border);">
        <div>
          <p class="text-[10px] font-bold uppercase tracking-widest opacity-70">Generated Files</p>
          <p class="text-xs font-bold mt-1 mono">{{ fileLabel }}</p>
        </div>
        <button class="icon-btn" style="width: 2rem; height: 2rem;" @click="close">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <p class="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest opacity-70">Topics</p>

        <NuxtLink
          v-for="topic in topics"
          :key="topic.id"
          :to="`/topic/${topic.slug}`"
          class="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors"
          :style="activeSlug === topic.slug
            ? 'background: var(--accent); color: var(--accent-fg);'
            : ''"
          @click="closeOnMobile"
        >
          <span
            class="mono text-[9px] font-bold w-8 h-6 rounded flex items-center justify-center shrink-0"
            :style="activeSlug === topic.slug
              ? 'background: var(--accent-fg); color: var(--accent);'
              : 'border' + '; border-color: var(--border-strong);'"
          >MD</span>
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-bold truncate">{{ topic.title }}</span>
            <span class="block text-[10px] font-bold opacity-70 mono">{{ topic.subtopics.length }} files</span>
          </span>
        </NuxtLink>
      </div>

      <div class="p-4 border-t" style="border-color: var(--border);">
        <div class="rounded-lg border p-4" style="border-color: var(--border);">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold">Course progress</p>
            <p class="text-[10px] font-bold mono opacity-70">{{ completionPercent }}%</p>
          </div>
          <div class="w-full h-1.5 rounded-full mt-3 overflow-hidden" style="background: var(--border);">
            <div class="h-full rounded-full" :style="`width: ${completionPercent}%; background: var(--accent);`"></div>
          </div>
          <p class="text-[10px] font-bold mt-2 mono opacity-70">{{ completionPercent }}% of 38 sections</p>
        </div>
      </div>
    </div>
  </div>
</template>