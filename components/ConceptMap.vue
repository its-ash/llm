<script setup lang="ts">
import type { Topic } from '~/data/topics';

const props = defineProps<{
  topic: Topic;
  currentIndex: number;
}>();

const { topics } = await import('~/data/topics');

const conceptChain = computed(() => {
  const idx = topics.findIndex(t => t.slug === props.topic.slug);
  const chain: { title: string; subtitle: string; active: boolean }[] = [];
  if (idx > 0) {
    chain.push({ title: topics[idx - 1].title.split(' ')[0], subtitle: 'previous', active: false });
  }
  chain.push({ title: props.topic.title.split(' ').slice(0, 2).join(' '), subtitle: 'current topic', active: true });
  if (idx < topics.length - 1) {
    chain.push({ title: topics[idx + 1].title.split(' ')[0], subtitle: 'next', active: false });
  }
  return chain;
});

const relatedTopic = computed(() => {
  const idx = topics.findIndex(t => t.slug === props.topic.slug);
  return idx < topics.length - 1 ? topics[idx + 1] : topics[idx - 1];
});
</script>

<template>
  <div class="hidden lg:flex w-80 shrink-0 border-l flex-col" style="border-color: var(--border);">
    <div class="p-6 border-b" style="border-color: var(--border);">
      <p class="text-sm font-black mono">Concept map</p>
      <p class="text-[10px] font-bold opacity-70 mt-1">How this topic connects</p>
    </div>

    <div class="flex-1 p-8 flex flex-col items-center justify-center gap-0 grid-bg">
      <template v-for="(node, i) in conceptChain" :key="i">
        <ConceptNode :title="node.title" :subtitle="node.subtitle" :active="node.active" />
        <div v-if="i < conceptChain.length - 1" class="w-px h-8" style="background: var(--accent);"></div>
      </template>
    </div>

    <div class="p-6 border-t" style="border-color: var(--border);">
      <div class="rounded-lg border p-4" style="border-color: var(--border);">
        <p class="text-xs font-black">Related topic</p>
        <p class="text-xs font-bold mt-1 mono">{{ relatedTopic?.title }}</p>
        <p class="text-[10px] font-bold mt-1 opacity-70">Continue learning the next concept in the series.</p>
        <NuxtLink :to="`/topic/${relatedTopic?.slug}`" class="mt-3 inline-flex text-[10px] font-black mono" style="color: var(--accent);">
          Open →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>