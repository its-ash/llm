---
intro: The decoder-only Transformer is the architecture behind GPT, LLaMA, Mistral, and virtually every modern large language model. It strips away the encoder and cross-attention, keeping only masked self-attention and feed-forward layers.
callout: The decoder-only architecture proved that you don't need an encoder to understand text — a single stack of masked attention layers can learn both understanding and generation through next-token prediction.
---

## What is the Decoder-Only Transformer?

A decoder-only Transformer is exactly what it sounds like: the decoder half of the original Transformer, without the encoder and without cross-attention. Each layer contains just two sub-layers: **masked multi-head self-attention** and a **position-wise feed-forward network**, wrapped in residual connections and layer normalization.

The model is trained with a simple objective: **next-token prediction**. Given a sequence of tokens, predict the next token. That's it. This simple objective, combined with massive amounts of text data and enough parameters, turns out to be sufficient for learning grammar, facts, reasoning, and even coding ability.

The causal mask ensures that the model can only attend to past tokens, making it compatible with autoregressive generation. During training, all positions are predicted simultaneously in a single forward pass — the model predicts token 1 from token 0, token 2 from tokens 0-1, and so on, all in parallel. This efficient use of compute is a key reason decoder-only models scale so well.

## Why it matters

The decoder-only architecture is the dominant paradigm in LLMs. Its simplicity is its strength: one architecture, one objective, one training procedure. You don't need parallel data (like translation pairs), you just need text — and the internet has plenty of that.

This architecture has been scaled from millions to trillions of parameters, and the scaling laws are remarkably predictable. More parameters, more data, and more compute lead to better performance in a smooth, power-law relationship. This predictability is what gives researchers confidence to invest enormous resources in training ever-larger models.

The decoder-only design also simplifies inference. There's no encoder to run first — you just feed in the prompt and generate. KV caching works naturally with the causal attention pattern, making generation efficient.

## Code example

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
from dataclasses import dataclass

@dataclass
class DecoderOnlyConfig:
    vocab_size: int = 50257
    d_model: int = 768
    n_heads: int = 12
    d_ff: int = 3072
    n_layers: int = 12
    max_seq_len: int = 1024
    dropout: float = 0.1

class DecoderOnlyBlock(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.ln1 = nn.LayerNorm(config.d_model)
        self.attn = nn.MultiheadAttention(
            config.d_model, config.n_heads, dropout=config.dropout, batch_first=True
        )
        self.ln2 = nn.LayerNorm(config.d_model)
        self.ffn = nn.Sequential(
            nn.Linear(config.d_model, config.d_ff),
            nn.GELU(),
            nn.Dropout(config.dropout),
            nn.Linear(config.d_ff, config.d_model),
        )

    def forward(self, x, causal_mask):
        # Pre-norm masked self-attention
        h = self.ln1(x)
        attn_out, _ = self.attn(h, h, h, attn_mask=causal_mask)
        x = x + attn_out
        # Pre-norm FFN
        x = x + self.ffn(self.ln2(x))
        return x

class DecoderOnlyTransformer(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.token_embed = nn.Embedding(config.vocab_size, config.d_model)
        self.pos_embed = nn.Embedding(config.max_seq_len, config.d_model)
        self.dropout = nn.Dropout(config.dropout)
        self.blocks = nn.ModuleList([DecoderOnlyBlock(config) for _ in range(config.n_layers)])
        self.ln_f = nn.LayerNorm(config.d_model)
        self.lm_head = nn.Linear(config.d_model, config.vocab_size, bias=False)

        # Weight tying: share embeddings and output projection
        self.lm_head.weight = self.token_embed.weight

    def forward(self, input_ids):
        batch, seq_len = input_ids.shape
        positions = torch.arange(seq_len, device=input_ids.device).unsqueeze(0)

        x = self.token_embed(input_ids) + self.pos_embed(positions)
        x = self.dropout(x)

        causal_mask = torch.triu(
            torch.full((seq_len, seq_len), float('-inf'), device=input_ids.device),
            diagonal=1
        )

        for block in self.blocks:
            x = block(x, causal_mask)

        x = self.ln_f(x)
        logits = self.lm_head(x)
        return logits

config = DecoderOnlyConfig()
model = DecoderOnlyTransformer(config)
input_ids = torch.randint(0, config.vocab_size, (2, 64))
logits = model(input_ids)
print(f"Logits shape: {logits.shape}")  # (2, 64, 50257)
print(f"Total parameters: {sum(p.numel() for p in model.parameters()):,}")
```

## Common pitfalls

Students sometimes forget weight tying — sharing the token embedding matrix with the output (lm_head) projection. This reduces parameters significantly and empirically improves performance. Another common mistake is not using the causal mask properly during training. The mask should be filled with $-\infty$ (not zeros) at masked positions, so that softmax turns them into exactly zero attention weights.

## Key takeaways
- The decoder-only Transformer uses only masked self-attention and FFN layers — no encoder, no cross-attention
- It's trained with next-token prediction, a simple yet powerful objective
- This is the architecture behind GPT, LLaMA, Mistral, and all major modern LLMs
- Weight tying between embeddings and the output head reduces parameters and improves results