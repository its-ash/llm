<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  active?: boolean;
}>();
</script>

<template>
  <div
    class="w-full rounded-lg border-2 px-4 py-4 text-center"
    :style="active
      ? 'border-color: var(--accent); background: var(--accent); color: var(--accent-fg);'
      : 'border-color: var(--accent); background: var(--bg);'"
  >
    <p class="text-sm font-black">{{ title }}</p>
    <p v-if="subtitle" class="text-[10px] font-bold mt-1 opacity-70 mono">{{ subtitle }}</p>
  </div>
</template>