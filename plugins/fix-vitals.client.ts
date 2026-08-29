export default defineNuxtPlugin(() => {
  if (process.client) {
    try {
      const origGetEntries = PerformanceObserver.prototype.takeRecords;
      PerformanceObserver.prototype.takeRecords = function () {
        try {
          const entries = origGetEntries.call(this);
          return entries.filter((e: any) => e && e.startTime !== undefined);
        } catch {
          return [];
        }
      };
    } catch {}
  }
});