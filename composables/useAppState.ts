export const useProgress = () => {
  const completed = useState<string[]>('completed-topics', () => []);

  const loadFromStorage = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('llmhub-progress');
        if (stored) completed.value = JSON.parse(stored);
      } catch {}
    }
  };

  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('llmhub-progress', JSON.stringify(completed.value));
    }
  };

  const markComplete = (key: string) => {
    if (!completed.value.includes(key)) {
      completed.value = [...completed.value, key];
      saveToStorage();
    }
  };

  const markIncomplete = (key: string) => {
    completed.value = completed.value.filter(k => k !== key);
    saveToStorage();
  };

  const toggle = (key: string) => {
    if (completed.value.includes(key)) markIncomplete(key);
    else markComplete(key);
  };

  const isComplete = (key: string) => completed.value.includes(key);

  const completionPercent = computed(() => {
    const total = 38;
    const topicSlugs = new Set<string>();
    completed.value.forEach(k => {
      const parts = k.split('/');
      if (parts.length === 1) topicSlugs.add(parts[0]);
    });
    return Math.round((topicSlugs.size / total) * 100);
  });

  return {
    completed,
    loadFromStorage,
    markComplete,
    markIncomplete,
    toggle,
    isComplete,
    completionPercent
  };
};

export const useTheme = () => {
  const isDark = useState<boolean>('is-dark', () => false);

  const loadTheme = () => {
    if (process.client) {
      const saved = localStorage.getItem('llmhub-theme');
      isDark.value = saved === 'dark';
      applyTheme();
    }
  };

  const applyTheme = () => {
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDark.value);
      localStorage.setItem('llmhub-theme', isDark.value ? 'dark' : 'light');
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  return { isDark, loadTheme, toggleTheme };
};

export const useFontSize = () => {
  const sizes = ['sm', 'base', 'lg', 'xl'] as const;
  type Size = typeof sizes[number];

  const currentSize = useState<Size>('font-size', () => 'base');

  const loadFontSize = () => {
    if (process.client) {
      const saved = localStorage.getItem('llmhub-fontsize') as Size | null;
      if (saved && sizes.includes(saved)) currentSize.value = saved;
    }
  };

  const setSize = (size: Size) => {
    currentSize.value = size;
    if (process.client) localStorage.setItem('llmhub-fontsize', size);
  };

  const increase = () => {
    const idx = sizes.indexOf(currentSize.value);
    if (idx < sizes.length - 1) setSize(sizes[idx + 1]);
  };

  const decrease = () => {
    const idx = sizes.indexOf(currentSize.value);
    if (idx > 0) setSize(sizes[idx - 1]);
  };

  const canIncrease = computed(() => sizes.indexOf(currentSize.value) < sizes.length - 1);
  const canDecrease = computed(() => sizes.indexOf(currentSize.value) > 0);

  return { sizes, currentSize, loadFontSize, setSize, increase, decrease, canIncrease, canDecrease };
};

export const useSidebar = () => {
  const isOpen = useState<boolean>('sidebar-open', () => true);

  const open = () => { isOpen.value = true; };
  const close = () => { isOpen.value = false; };
  const toggleSidebar = () => { isOpen.value = !isOpen.value; };

  return { isOpen, open, close, toggleSidebar };
};

export const useAskAi = () => {
  const isOpen = useState<boolean>('ask-ai-open', () => false);

  const open = () => { isOpen.value = true; };
  const close = () => { isOpen.value = false; };
  const toggleAskAi = () => { isOpen.value = !isOpen.value; };

  return { isOpen, open, close, toggleAskAi };
};