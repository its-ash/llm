import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "transformer-architecture": {
    whatIs: "The Transformer is a neural network architecture built entirely on attention and feed-forward layers, replacing recurrence with self-attention for sequence modeling. It enables parallel training and long-range context.",
    whereUsed: "GPT, Llama, Claude, BERT, T5, and virtually every modern LLM are transformers; the architecture scaled from the original 65M-parameter model to trillion-parameter frontier models.",
    howToBuild: "Stack N transformer blocks (multi-head attention + MLP + LayerNorm + residuals), add token and positional embeddings, and a final LM head — this is the GPT architecture in PyTorch.",
  },
  "transformer-block": {
    whatIs: "A transformer block is the repeated unit of a transformer, containing a multi-head self-attention sublayer and a feed-forward (MLP) sublayer, each with residual connections and layer normalization.",
    whereUsed: "GPT-2 small has 12 blocks; Llama-3 70B has 80; each block refines the token representations that flow through the residual stream, progressively building higher-level features.",
    howToBuild: "Implement `x = x + attn(layernorm(x))` then `x = x + mlp(layernorm(x))` (pre-norm), and stack N copies; verify gradient flow with `torch.autograd.grad` to confirm residuals help depth.",
  },
  "feed-forward-network": {
    whatIs: "The feed-forward network (FFN) is a two-layer MLP applied to each token position independently after the attention sublayer. It expands the hidden dimension to a larger intermediate size, applies a non-linearity, and projects back, giving the model per-token nonlinear capacity.",
    whereUsed: "Every transformer block in GPT, BERT, LLaMA, and T5 contains an FFN sublayer. GPT-style models typically use a 4x expansion ratio; LLaMA swaps the ReLU/GELU for SwiGLU, increasing the expansion to ~8/3x to keep parameter count constant.",
    howToBuild: "In PyTorch: `nn.Sequential(nn.Linear(d_model, d_ff), nn.GELU(), nn.Linear(d_ff, d_model))` where `d_ff = 4 * d_model`. For SwiGLU, implement a gated variant: `Linear(d_model, d_ff) * silu(Linear(d_model, d_ff))` then `Linear(d_ff, d_model)`.",
  },
  "residual-connection": {
    whatIs: "A residual (skip) connection adds a layer's input back to its output: `x = x + Sublayer(x)`. This creates a gradient highway that lets signals flow directly to earlier layers, preventing degradation in deep networks.",
    whereUsed: "Present in every transformer block of GPT-2, BERT, LLaMA, and Mistral around the attention and FFN sublayers. Modern models like LLaMA and GPT-2 use pre-norm residuals (`x = x + Sublayer(LayerNorm(x))`) for better training stability than the original post-norm design.",
    howToBuild: "Simply add the input to the sublayer output: `x = x + self_attn(x)` and `x = x + ffn(x)` in PyTorch. With pre-norm: `x = x + self_attn(self.ln1(x))` then `x = x + ffn(self.ln2(x))`.",
  },
  "layer-normalization": {
    whatIs: "Layer normalization stabilizes training by normalizing activations across the feature dimension of a single token: subtract the mean and divide by the standard deviation of that token's features, then apply a learnable scale and shift.",
    whereUsed: "Used in every transformer block in GPT, BERT, and T5. LLaMA and Gemma replaced standard LayerNorm with RMSNorm, which drops the mean-centering step for efficiency. LayerNorm is applied before (pre-norm) or after (post-norm) the attention/FFN sublayers.",
    howToBuild: "Use `nn.LayerNorm(d_model)` in PyTorch, or implement RMSNorm: `x * torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + eps) * self.weight` for the modern variant used by LLaMA.",
  },
  "dropout": {
    whatIs: "Dropout randomly zeros a fraction of activations during training, forcing the network to learn redundant representations. At inference, all units are active and outputs are scaled to compensate, acting as a regularizer.",
    whereUsed: "Applied to attention weights, FFN outputs, and residual connections in the original transformer and GPT-2 (typically 0.1-0.2 rate). Modern large models like LLaMA and GPT-3 often reduce or remove dropout, relying on data scale and other regularization instead.",
    howToBuild: "Add `nn.Dropout(p=0.1)` after attention output and FFN output in PyTorch. Call `model.eval()` before inference to disable dropout automatically; `model.train()` re-enables it.",
  },
  "encoder": {
    whatIs: "The encoder is a stack of transformer blocks that processes the entire input sequence bidirectionally, allowing each token to attend to all others. It produces contextualized representations but does not generate output autoregressively.",
    whereUsed: "The encoder stack is the core of BERT, used for classification, NER, and sentence embeddings. Encoder-decoder models like T5 and BART use the encoder to understand the input before the decoder generates the output.",
    howToBuild: "Stack N transformer blocks each containing self-attention (bidirectional, no causal mask) and an FFN. In PyTorch: `for blk in self.blocks: x = blk(x, src_mask=None)` — no causal mask means full bidirectional attention.",
  },
  "decoder": {
    whatIs: "The decoder generates output tokens autoregressively while attending to its own past outputs (causal self-attention) and the encoder's representations (cross-attention). It uses a causal mask to prevent looking at future tokens.",
    whereUsed: "The decoder is the generative half of encoder-decoder models like T5, BART, and the original transformer for translation. During inference it generates one token at a time; during training it uses teacher forcing with a causal mask.",
    howToBuild: "Each decoder block has three sublayers: causal self-attention, cross-attention over encoder output, and FFN. Use `nn.TransformerDecoderLayer` or build manually with `attn_weights.masked_fill_(causal_mask, -inf)`.",
  },
  "decoder-only-transformer": {
    whatIs: "A decoder-only transformer drops the encoder and cross-attention, using only causal self-attention and FFN blocks. It takes a token sequence as input and predicts the next token, making it ideal for autoregressive language modeling.",
    whereUsed: "This is the architecture behind nearly all modern LLMs: GPT-2, GPT-3, GPT-4, LLaMA, Mistral, Gemma, and Qwen. The entire model is a stack of decoder blocks processing the prompt and generating continuations.",
    howToBuild: "Stack N blocks of `[causal_self_attn, FFN]` with pre-norm residuals. In PyTorch: `x = x + attn(ln1(x), causal_mask=True)` then `x = x + ffn(ln2(x))`. Apply a final LayerNorm and `Linear(d_model, vocab_size)` to get logits.",
  },
  "gpt-architecture": {
    whatIs: "GPT (Generative Pre-trained Transformer) is a decoder-only transformer pretrained on next-token prediction over large text corpora. It uses learned positional embeddings, pre-norm LayerNorm, GELU FFN, and is fine-tuned or prompted for downstream tasks.",
    whereUsed: "The GPT family ranges from GPT-1 (117M) to GPT-4 (trillion-scale). OpenAI's GPT-2 and GPT-3 are the canonical open-weight references. LLaMA, Mistral, and Falcon follow the same decoder-only GPT template with variations like RMSNorm and RoPE.",
    howToBuild: "Implement a `GPTModel` with `nn.Embedding` for tokens and positions, a stack of decoder blocks, final LayerNorm, and an LM head tied to the embedding weights. Karpathy's nanoGPT is a minimal reference (~300 lines).",
  },
};