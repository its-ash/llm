import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "key-cache": {
    whatIs: "The key cache stores the projected key vectors for all past tokens in each attention layer, avoiding recomputation of the K projection during autoregressive decoding. It is one half of the KV cache.",
    whereUsed: "Every autoregressive transformer (GPT, Llama, Mistral) maintains a key cache per layer per head during generation; FlashDecoding and PagedAttention optimise its memory layout.",
    howToBuild: "In a custom attention layer, append `k` for the new token to a running `past_k` tensor with `torch.cat([past_k, k], dim=-2)` and pass it forward; print `.shape` each step to observe growth.",
  },
  "value-cache": {
    whatIs: "The value cache stores projected value vectors for past tokens so the attention output can be computed without re-running the V projection on prior positions. It pairs with the key cache.",
    whereUsed: "Used alongside the key cache in every autoregressive generation path of HF Transformers, vLLM, and TGI; quantised value caches (fp8/int8) are used inllama.cpp and TensorRT-LLM to save memory.",
    howToBuild: "Maintain `past_v` per layer, concatenate the new value with `torch.cat([past_v, v], dim=-2)`, compute attention as `softmax(q @ past_k.T) @ past_v`, and verify output matches uncached generation.",
  },
  "kv-cache": {
    whatIs: "The KV cache is the combined storage of past key and value tensors across all layers and heads, enabling O(1) per-token compute during decoding instead of O(n) reprocessing of the full context.",
    whereUsed: "Standard in ChatGPT-style serving, vLLM PagedAttention, and HF `generate()`; Llama-3 uses grouped-query attention which reduces KV cache size by sharing K/V across query heads.",
    howToBuild: "Run `model.generate(input_ids, use_cache=True)` vs `use_cache=False` on GPT-2, time both, and confirm the cached version is faster for long sequences while producing identical tokens.",
  },
  "cache-growth": {
    whatIs: "Cache growth is the linear increase in KV-cache memory and the quadratic increase in attention compute as sequence length grows during generation, eventually bottlenecking throughput and context length.",
    whereUsed: "Long-context models like Claude (200k tokens) and Gemini (1M tokens) fight cache growth with sliding-window attention, cache compression, and quantised KV; vLLM tracks cache pressure to schedule batches.",
    howToBuild: "Generate 512 tokens with GPT-2 and log `past_key_values[0][0].shape` each step; plot the last-dimension size to visualise linear growth and measure VRAM at intervals with `torch.cuda.memory_allocated()`.",
  },
  "prefix-caching": {
    whatIs: "Prefix caching reuses the KV cache computed for a shared prompt prefix across multiple requests, skipping redundant prefill computation for identical system prompts or long common instructions.",
    whereUsed: "vLLM's `enable_prefix_caching`, SGLang's RadixAttention, and Anthropic's prompt caching all exploit shared prefixes to cut TTFT for chat applications with repeated system prompts.",
    howToBuild: "Run two `generate()` calls with the same 500-token prefix and a different 10-token suffix; cache the prefix KV manually, reuse it via `past_key_values`, and measure the TTFT reduction for the second call.",
  },
};