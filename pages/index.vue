<script setup lang="ts">
const { topics, totalSubtopics } = await import('~/data/topics');
const { completionPercent } = useProgress();
const { currentSize } = useFontSize();
</script>

<template>
  <div class="flex-1 flex overflow-hidden">
    <div class="flex-1 overflow-y-auto grid-bg">
      <div class="article-content max-w-4xl mx-auto px-6 lg:px-10 py-10 lg:py-12" :data-size="currentSize">

        <div class="flex items-center gap-2 mb-4">
          <span class="badge badge-filled">MD</span>
          <span class="art-small font-bold opacity-70 mono">Home · {{ topics.length }} topics · {{ totalSubtopics }} subtopics</span>
        </div>

        <h1 class="art-h1 font-black leading-tight">LLM Learning Hub</h1>
        <p class="mt-4 art-lead font-bold leading-relaxed">
          An IDE-style learning environment for Large Language Models. From Python foundations to inference optimization — explore 38 topics with concise explanations, code examples, and references.
        </p>

        <div id="progress" class="mt-8 rounded-xl border-2 p-6" style="border-color: var(--accent);">
          <div class="flex items-center justify-between">
            <p class="art-body font-black">Your progress</p>
            <p class="art-body font-black mono">{{ completionPercent }}%</p>
          </div>
          <div class="w-full h-2 rounded-full mt-4 overflow-hidden" style="background: var(--border);">
            <div class="h-full rounded-full transition-all" :style="`width: ${completionPercent}%; background: var(--accent);`"></div>
          </div>
          <p class="art-small font-bold mt-3 opacity-70 mono">Select a topic below to begin or continue learning.</p>
        </div>

        <h2 class="art-h2 font-black mt-10">All Topics</h2>
        <p class="mt-3 art-body leading-relaxed">Each topic contains multiple subtopics with concise explanations and code examples. Click any card to open its detail page.</p>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-for="topic in topics"
            :key="topic.id"
            :to="`/topic/${topic.slug}`"
            class="block rounded-xl border p-5 transition-all hover:border-transparent group"
            style="border-color: var(--border);"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <span class="mono text-[9px] font-bold w-6 h-6 rounded flex items-center justify-center" style="background: var(--accent); color: var(--accent-fg);">{{ String(topic.id).padStart(2, '0') }}</span>
                  <span class="art-small font-bold opacity-60 mono">{{ topic.subtopics.length }} files</span>
                </div>
                <p class="text-sm font-black truncate">{{ topic.title }}</p>
                <p class="art-small font-bold mt-2 opacity-70 leading-relaxed">{{ topic.subtopics[0].name }} · {{ topic.subtopics[topic.subtopics.length - 1].name }}</p>
              </div>
              <svg class="w-4 h-4 shrink-0 mt-1 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>