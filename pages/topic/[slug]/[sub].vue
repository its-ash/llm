<script setup lang="ts">
const route = useRoute();
const { getSubtopic } = await import('~/data/topics');

const topicSlug = computed(() => route.params.slug as string);
const subSlug = computed(() => route.params.sub as string);

const result = computed(() => getSubtopic(topicSlug.value, subSlug.value));

if (!result.value) {
  throw createError({ statusCode: 404, statusMessage: 'Subtopic not found', fatal: true });
}
</script>

<template>
  <div class="flex-1 flex overflow-hidden">
    <SubtopicContent v-if="result" :topic="result.topic" :subtopic="result.subtopic" />
  </div>
</template>