import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "context-window": {
    whatIs: "The context window is the maximum number of tokens a model can process in a single forward pass, combining the prompt and any generated output. It is determined by the positional encoding scheme and the attention implementation's memory limits.",
    whereUsed: "GPT-4 Turbo has 128K tokens, Claude 3 Opus 200K, Gemini 1.5 Pro 2M, and LLaMA-2 4K. Long context windows enable document Q&A, codebase analysis, and extended conversations. Exceeding it requires truncation, retrieval, or sliding-window attention.",
    howToBuild: "Set `max_seq_len` in the model config. For learned positional embeddings, cap at this length. For RoPE, set the base frequency and optionally scale it (NTK-aware, YaRN) to extend the window. Check: `assert input_ids.shape[1] <= max_seq_len`.",
  },
  "sequence-length": {
    whatIs: "Sequence length is the actual number of tokens in a specific input, as opposed to the context window which is the maximum allowed. It determines memory usage and compute for that particular forward pass.",
    whereUsed: "During training, sequence length is a batch hyperparameter (e.g., 2048 or 4096) that balances throughput and memory. During inference, it grows as tokens are generated. vLLM and FlashAttention optimize memory based on the actual sequence length.",
    howToBuild: "Read it: `seq_len = input_ids.shape[1]`. In training, pad or pack sequences to a fixed `seq_len` for efficient batching. In inference, track it as generation extends the sequence. Memory scales as O(seq_len²) for standard attention, O(seq_len) with FlashAttention.",
  },
  "prompt-tokens": {
    whatIs: "Prompt tokens are the input tokens provided by the user that condition the model's generation. They include system instructions, conversation history, and the current query, all converted to token IDs by the tokenizer.",
    whereUsed: "In every LLM interaction, the prompt tokens consume part of the context window. GPT-4, Claude, and LLaMA all process the full prompt in the first forward pass. Token counting APIs help users stay within limits before sending a request.",
    howToBuild: "Tokenize the full prompt: `prompt_ids = tokenizer(prompt, return_tensors='pt').input_ids`. Count: `n_prompt = prompt_ids.shape[1]`. Ensure `n_prompt + max_new_tokens <= context_window` before generation.",
  },
  "generated-tokens": {
    whatIs: "Generated tokens are the output tokens produced by the model after the prompt. They are created one at a time (or in speculative batches) and appended to the sequence. The count of generated tokens determines the response length and output cost.",
    whereUsed: "LLM APIs bill based on generated tokens (OpenAI charges per output token at a higher rate than input). vLLM and TGI track generated token counts for rate limiting and billing. The generation loop runs until the token budget or a stop condition is met.",
    howToBuild: "Track: `generated = ids[:, prompt_len:]` after the generation loop. Count: `n_generated = generated.shape[1]`. Decode: `output_text = tokenizer.decode(generated[0], skip_special_tokens=True)`.",
  },
  "long-context": {
    whatIs: "Long-context refers to models and techniques designed to handle input sequences far exceeding the standard 2K-4K window, typically 32K to 2M tokens. This requires architectural or positional encoding modifications to maintain quality at scale.",
    whereUsed: "GPT-4 Turbo (128K), Claude 3 (200K), and Gemini 1.5 Pro (2M) are long-context models. Techniques include RoPE scaling (LLaMA-2 Long), YaRN, Ring Attention, and FlashAttention-2. Applications: entire-codebase reasoning, book summarization, long-document RAG.",
    howToBuild: "Extend RoPE with NTK-aware scaling: `base *= (scale * seq_len / original_max) ** (d / (d - 2))`. Use FlashAttention-2 to reduce memory from O(n²) to O(n). For extreme lengths, implement Ring Attention to split sequences across GPUs.",
  },
  "context-limit": {
    whatIs: "The context limit is the hard upper bound on tokens a model accepts, enforced by the API or inference engine. Inputs exceeding it are rejected, truncated, or cause an error. It is distinct from the context window (architectural max) and may be set lower.",
    whereUsed: "OpenAI enforces context limits per model (e.g., 8192 for `gpt-4`, 128K for `gpt-4-turbo`). HuggingFace TGI and vLLM set `--max-input-length` to cap prompts. Exceeding it returns a 400 error or silently truncates from the left.",
    howToBuild: "Validate before sending: `if len(prompt_ids) + max_new > limit: raise ValueError('Context exceeded')`. For graceful handling, truncate from the left: `prompt_ids = prompt_ids[:, -limit:]` or implement a retrieval-augmented summarization step.",
  },
};