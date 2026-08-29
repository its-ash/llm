<script setup lang="ts">
import type { Topic } from '~/data/topics';

const props = defineProps<{
  topic: Topic;
}>();

const { currentSize } = useFontSize();
const { isComplete, toggle } = useProgress();

const progressKey = computed(() => props.topic.slug);
const completed = computed(() => isComplete(progressKey.value));

const topicIntros: Record<string, string> = {
  'computer-python-foundations': "Foundations matter. Python, tensors, and GPU basics — the daily tools for building LLMs.",
  'mathematics': "The math behind neural networks: vectors, matrices, gradients, and the chain rule. Just the pieces that matter.",
  'machine-learning': "Core ML concepts: datasets, training loops, loss, overfitting. Before jumping to neural networks.",
  'neural-networks': "From a single neuron to multi-layer networks. Forward pass, backpropagation, and optimizers.",
  'nlp': "Text processing before Transformers: bag-of-words, TF-IDF, RNNs, LSTMs. The history that shows why attention won.",
  'tokenization': "Text to tokens to IDs. The first step in every LLM pipeline. BPE, WordPiece, and vocabulary design.",
  'embeddings': "Turning tokens into vectors that capture meaning. The foundation of semantic understanding.",
  'positional-information': "Transformers need position info. Sinusoidal encodings, learned embeddings, and RoPE.",
  'attention': "The mechanism that powers Transformers. Scaled dot-product, softmax, masking, and causal attention.",
  'multi-head-attention': "Parallel attention heads focusing on different relationships. Projections, concatenation, output.",
  'transformer': "The full architecture: attention + FFN + residuals + norm. From encoder-decoder to GPT-style decoder-only.",
  'language-modeling': "Predicting the next token. Logits, probability distributions, and the causal LM objective.",
  'text-generation': "Generating text: temperature, top-k, top-p, repetition penalty, beam search. The generation toolbox.",
  'stopping-generation': "When to stop: EOS tokens, stop sequences, max tokens, and context length limits.",
  'llm-architecture': "Parameter counts, weight matrices, depth vs width, head count. The blueprint of real LLMs.",
  'context-window': "The model's working memory. Prompt tokens, generated tokens, and context limits.",
  'llm-training': "The training pipeline: data cleaning, batching, forward pass, loss, backprop, weight updates, checkpoints.",
  'build-small-llm': "Build a small LLM from scratch. Dataset, tokenizer, GPT architecture, training, and generation.",
  'model-precision': "FP32, FP16, BF16. How numerical precision affects speed, memory, and accuracy.",
  'quantization': "Reduce precision to save memory. INT8, INT4, symmetric vs asymmetric, and QAT.",
  'gpu-memory': "VRAM budgeting: weights, activations, gradients, optimizer state, KV cache.",
  'kv-cache': "Cache keys and values to avoid recomputation. O(n^2) to O(n) per generation step.",
  'fine-tuning': "Adapt pretrained models to specific tasks. SFT, instruction tuning, catastrophic forgetting, PEFT.",
  'lora': "Low-rank adaptation: freeze weights, train tiny matrices. 100x fewer trainable parameters.",
  'alignment': "Making models helpful and safe. RLHF, reward models, PPO, and DPO.",
  'rag': "Connect LLMs to external knowledge. Chunking, embedding, retrieval, reranking, grounded generation.",
  'vector-search': "Find similar things at scale. Vector databases, ANN, hybrid search, metadata filtering.",
  'function-calling': "LLMs that use tools. Schema definitions, tool selection, argument validation, execution loops.",
  'agents': "LLMs that plan and act. The observe-think-act loop, memory, and multi-step task execution.",
  'inference': "Production generation: prefill, decode, batching, streaming, latency, and throughput.",
  'inference-optimization': "Faster inference: Flash Attention, speculative decoding, memory and compute trade-offs.",
  'distributed-training': "Multi-GPU training: data, tensor, and pipeline parallelism. Communication overhead.",
  'mixture-of-experts': "Scale capacity without scaling compute. Routing, sparse activation, load balancing.",
  'multimodal-llms': "Beyond text: images, audio, video. Vision encoders, cross-modal alignment.",
  'reasoning-models': "More compute at inference for better answers. Test-time compute, search, verification.",
  'evaluation': "Measuring LLM quality. Perplexity, benchmarks, human eval, hallucination detection.",
  'llm-systems': "Production infrastructure: serving, load balancing, caching, monitoring, cost optimization.",
  'llm-research': "How to experiment, ablate, benchmark, and push the field forward.",
};

const topicIntro = computed(() => topicIntros[props.topic.slug] ?? `Explore ${props.topic.title.toLowerCase()} — ${props.topic.subtopics.length} concepts.`);

const { topics } = await import('~/data/topics');

const navLinks = computed(() => {
  const idx = topics.findIndex(t => t.slug === props.topic.slug);
  return {
    prev: idx > 0 ? topics[idx - 1] : null,
    next: idx < topics.length - 1 ? topics[idx + 1] : null
  };
});
</script>

<template>
  <div class="flex-1 overflow-y-auto grid-bg">
    <div class="article-content max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-12" :data-size="currentSize">

      <div class="flex items-center gap-2 mb-4">
        <span class="badge badge-filled">MD</span>
        <span class="art-small font-bold opacity-70 mono">Section {{ topic.id }} of 38 · {{ topic.subtopics.length }} subtopics</span>
      </div>

      <h1 class="art-h1 font-black leading-tight">{{ topic.title }}</h1>
      <p class="mt-4 art-lead font-bold leading-relaxed">{{ topicIntro }}</p>

      <div class="mt-8 rounded-xl border p-6 flex gap-4" style="border-color: var(--border); background: var(--hover);">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: var(--accent); color: var(--accent-fg);">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>
        </div>
        <div class="flex-1">
          <p class="art-body font-black">Learning path</p>
          <p class="art-body mt-1 leading-relaxed">Work through each subtopic in order. Click any file below to open its lesson. Track your progress with the checkbox at the bottom.</p>
        </div>
      </div>

      <h2 class="art-h2 font-black mt-10">Subtopics</h2>
      <p class="mt-3 art-body leading-relaxed">Each subtopic includes a concise explanation, code examples, and references.</p>

      <div class="mt-6 space-y-3">
        <NuxtLink
          v-for="(sub, i) in topic.subtopics"
          :key="sub.slug"
          :to="`/topic/${topic.slug}/${sub.slug}`"
          class="block rounded-lg border p-5 transition-colors hover:border-transparent"
          style="border-color: var(--border);"
          @mouseover="$event.currentTarget.style.background = 'var(--hover)'"
          @mouseleave="$event.currentTarget.style.background = 'transparent'"
        >
          <div class="flex items-start gap-4">
            <span class="mono text-[9px] font-bold w-8 h-6 rounded flex items-center justify-center shrink-0 badge">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black">{{ sub.name }}</p>
              <p class="art-small font-bold mt-1 opacity-70 leading-relaxed">{{ sub.design }}</p>
              <div class="mt-3 flex items-center gap-2">
                <span class="art-small font-bold opacity-60 mono">{{ sub.slug }}</span>
              </div>
            </div>
            <svg class="w-4 h-4 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-10 pt-8 border-t" style="border-color: var(--border);">
        <button
          class="flex items-center gap-3 art-body font-black cursor-pointer"
          @click="toggle(progressKey)"
        >
          <span
            class="w-5 h-5 rounded flex items-center justify-center border-2"
            :style="completed ? 'background: var(--accent); color: var(--accent-fg); border-color: var(--accent);' : 'border-color: var(--accent);'"
          >
            <svg v-if="completed" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>
          </span>
          {{ completed ? 'Completed' : 'Mark topic as complete' }}
        </button>
      </div>

      <div class="mt-8 pt-8 border-t flex items-center justify-between" style="border-color: var(--border);">
        <NuxtLink
          v-if="navLinks.prev"
          :to="`/topic/${navLinks.prev.slug}`"
          class="flex items-center gap-2 art-body font-black mono"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          {{ navLinks.prev.title.split(' ').slice(0, 2).join(' ') }}
        </NuxtLink>
        <span v-else />

        <NuxtLink
          v-if="navLinks.next"
          :to="`/topic/${navLinks.next.slug}`"
          class="flex items-center gap-2 art-body font-black mono"
        >
          {{ navLinks.next.title.split(' ').slice(0, 2).join(' ') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>