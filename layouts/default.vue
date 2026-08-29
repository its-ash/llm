<script setup lang="ts">
const { loadTheme } = useTheme();
const { loadFromStorage } = useProgress();
const { loadFontSize } = useFontSize();

onMounted(() => {
  loadTheme();
  loadFromStorage();
  loadFontSize();
});
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <TopBar />
      <slot />
    </div>
    <AskAiPanel />
  </div>
</template>