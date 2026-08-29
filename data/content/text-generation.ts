import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "greedy-decoding": {
    whatIs: "Greedy decoding selects the single highest-probability token at each step. It is deterministic and fast but tends to produce repetitive, generic text because it never explores lower-probability but more creative options.",
    whereUsed: "Greedy decoding is the default for simple LLM demos and when determinism is required. It is rarely used in production chatbots (GPT-4, Claude) because it yields dull, repetitive output. It can get stuck in loops like 'I am I am I am'.",
    howToBuild: "At each step: `next_token = logits.argmax(dim=-1)`. Append to the sequence and repeat: `for _ in range(max_new): next = model(ids).argmax(-1)[-1:]; ids = cat([ids, next])`. No sampling needed.",
  },
  "random-sampling": {
    whatIs: "Random sampling picks the next token by drawing from the model's probability distribution rather than always taking the argmax. This introduces stochasticity, producing diverse and creative output across multiple runs.",
    whereUsed: "Sampling is the default generation mode for creative writing and chat in models like GPT-4, LLaMA, and Mistral. Combined with temperature, top-k, and top-p, it gives the controllable variety that production LLM APIs expose to users.",
    howToBuild: "Convert logits to probabilities and sample: `probs = F.softmax(logits, dim=-1); next = torch.multinomial(probs, num_samples=1)`. Set a manual seed via `torch.manual_seed(42)` for reproducibility.",
  },
  "temperature": {
    whatIs: "Temperature is a scalar that scales logits before softmax. Values below 1 sharpen the distribution (more deterministic); values above 1 flatten it (more random). Temperature 0 is equivalent to greedy decoding.",
    whereUsed: "Every production LLM API (OpenAI, Anthropic, HuggingFace Inference) exposes a temperature parameter. Code generation uses low temperature (~0.2) for precision; creative writing uses higher (~0.7-1.0). GPT-4 defaults to 1.0.",
    howToBuild: "Divide logits by temperature before softmax: `probs = F.softmax(logits / temperature, dim=-1)`. Use `temperature = 0.7` as a sensible default for balanced chat. Guard against division by zero.",
  },
  "top-k": {
    whatIs: "Top-k sampling restricts the next-token choice to the k highest-probability tokens, zeroing out the rest before renormalizing and sampling. This prevents rare, nonsensical tokens from being selected while keeping some diversity.",
    whereUsed: "Top-k is supported by HuggingFace `generate()`, OpenAI's API (top-k parameter), and LLaMA inference code. Common values are 40-50. GPT-2 popularized top-k sampling as a balance between greedy and full random sampling.",
    howToBuild: "Find the k-th largest logit, mask everything below: `vals, _ = logits.topk(k); logits[logits < vals[-1]] = -inf; probs = F.softmax(logits, dim=-1)`. Then `torch.multinomial(probs, 1)`.",
  },
  "top-p": {
    whatIs: "Top-p (nucleus) sampling keeps the smallest set of tokens whose cumulative probability exceeds p, discarding the long tail. It adapts the candidate pool size dynamically: fewer choices for confident steps, more for uncertain ones.",
    whereUsed: "Top-p is the default in OpenAI's API (`top_p=1.0` means off, `0.9` is common) and is used in Claude, LLaMA, and Mistral generation. It generally produces higher-quality text than fixed top-k because it adapts to distribution sharpness.",
    howToBuild: "Sort logits descending, compute cumulative softmax probabilities, mask tokens where cumulative prob exceeds p: `sorted_probs, idx = sort(probs, desc); cum = cumsum(sorted_probs); mask = cum > p; sorted_probs[mask] = 0; renorm`.",
  },
  "repetition-penalty": {
    whatIs: "Repetition penalty reduces the probability of tokens that have already appeared in the generated text. It scales down the logits of previously seen tokens, discouraging the model from repeating the same phrases or words.",
    whereUsed: "Used in HuggingFace `generate()` (`repetition_penalty=1.1`), CTRL paper, and LLaMA inference. Values of 1.1-1.3 are typical; higher values aggressively suppress repetition but can harm coherence. OpenAI API does not expose this directly.",
    howToBuild: "For each token already in the sequence, divide its logit by the penalty if positive, multiply if negative: `score = logit / penalty if logit > 0 else logit * penalty`. Apply before softmax in the generation loop.",
  },
  "beam-search": {
    whatIs: "Beam search maintains B (beam width) partial sequences at each step, expanding each with its top-B next tokens and keeping the overall highest-scoring B candidates. It explores multiple paths and returns the highest-probability complete sequence.",
    whereUsed: "Beam search is standard in machine translation (T5, MarianMT, Google Translate) and summarization (BART). It is rarely used for open-ended LLM chat (GPT-4, Claude) because it produces generic, less diverse text and is slower than sampling.",
    howToBuild: "Maintain a list of (sequence, cumulative_log_prob). At each step, expand each beam with top-B tokens, compute new scores, select top-B overall. Terminate when all beams hit EOS or max length. HuggingFace: `model.generate(num_beams=4)`.",
  },
};