<script setup lang="ts">
const route = useRoute();
const { getTopicBySlug } = await import('~/data/topics');

const slug = computed(() => route.params.slug as string);
const topic = computed(() => getTopicBySlug(slug.value));

if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found', fatal: true });
}
</script>

<template>
  <div class="flex-1 flex overflow-hidden">
    <ArticleContent v-if="topic" :topic="topic" />
    <ConceptMap v-if="topic" :topic="topic" :current-index="0" />
  </div>
</template>