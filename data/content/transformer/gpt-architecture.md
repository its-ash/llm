---
intro: GPT (Generative Pre-trained Transformer) is the specific realization of the decoder-only architecture that launched the LLM era. Understanding its design choices is understanding the blueprint that most modern LLMs follow.
callout: GPT proved that you can pre-train a decoder-only model on next-token prediction and then fine-tune it for almost any language task — a single architecture, infinite applications.
---

## What is the GPT Architecture?

GPT, introduced by OpenAI in 2018, is a decoder-only Transformer trained with the next-token prediction objective. The architecture follows the standard decoder-only pattern: token embeddings, positional embeddings, a stack of Transformer blocks with masked self-attention and feed-forward layers, a final layer normalization, and a linear output head that produces logits over the vocabulary.

The GPT family evolved over several generations. **GPT-1** (117M parameters) established the pre-train-then-fine-tune paradigm. **GPT-2** (1.5B parameters) demonstrated that a sufficiently large model trained on enough web text could perform zero-shot tasks without fine-tuning. **GPT-3** (175B parameters) introduced few-shot learning through in-context examples. While OpenAI no longer publishes architectural details, the core design remains recognizable in all GPT models.

Key architectural choices in GPT include: **learned positional embeddings** (instead of sinusoidal), **GELU activation** in the FFN, **pre-norm** (from GPT-2 onward), **weight tying** between token embeddings and the output head, and a context window that has grown from 2K (GPT-2) to 128K+ (GPT-4) tokens.

## Why it matters

GPT is the template. When you build an LLM, you're almost certainly building a GPT-style model. The decoder-only architecture with next-token prediction has proven to be the most scalable, most general, and most practical design for language modeling. Understanding GPT's specific choices helps you make informed decisions when designing your own model.

The GPT architecture also established the **pre-training + fine-tuning** workflow that defines modern NLP. Pre-train on massive unlabeled text to learn general language patterns, then fine-tune on task-specific data. This two-stage approach is far more data-efficient than training from scratch for each task, and it's why even small teams can build capable models by fine-tuning open-source GPT-style architectures.

## Code example

```python
import torch
import torch.nn as nn
import math
from dataclasses import dataclass

@dataclass
class GPTConfig:
    vocab_size: int = 50257
    d_model: int = 768        # GPT-2 small: 768, GPT-2 medium: 1024
    n_heads: int = 12
    d_ff: int = 3072          # 4 * d_model
    n_layers: int = 12
    max_seq_len: int = 1024
    dropout: float = 0.1

class GPTMultiHeadAttention(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.n_heads = config.n_heads
        self.d_model = config.d_model
        self.head_dim = self.d_model // self.n_heads

        self.qkv = nn.Linear(self.d_model, 3 * self.d_model)
        self.proj = nn.Linear(self.d_model, self.d_model)
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x, causal_mask):
        batch, seq_len, _ = x.shape
        qkv = self.qkv(x)
        q, k, v = qkv.chunk(3, dim=-1)

        q = q.view(batch, seq_len, self.n_heads, self.head_dim).transpose(1, 2)
        k = k.view(batch, seq_len, self.n_heads, self.head_dim).transpose(1, 2)
        v = v.view(batch, seq_len, self.n_heads, self.head_dim).transpose(1, 2)

        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.head_dim)
        scores = scores + causal_mask  # (1, 1, seq, seq) broadcasts
        attn = F.softmax(scores, dim=-1)
        attn = self.dropout(attn)

        out = torch.matmul(attn, v)
        out = out.transpose(1, 2).contiguous().view(batch, seq_len, self.d_model)
        return self.proj(out)

import torch.nn.functional as F

class GPTBlock(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.ln1 = nn.LayerNorm(config.d_model)
        self.attn = GPTMultiHeadAttention(config)
        self.ln2 = nn.LayerNorm(config.d_model)
        self.ffn = nn.Sequential(
            nn.Linear(config.d_model, config.d_ff),
            nn.GELU(),
            nn.Linear(config.d_ff, config.d_model),
            nn.Dropout(config.dropout),
        )

    def forward(self, x, causal_mask):
        x = x + self.attn(self.ln1(x), causal_mask)
        x = x + self.ffn(self.ln2(x))
        return x

class GPT(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.wte = nn.Embedding(config.vocab_size, config.d_model)  # token embeddings
        self.wpe = nn.Embedding(config.max_seq_len, config.d_model)  # positional embeddings
        self.drop = nn.Dropout(config.dropout)
        self.blocks = nn.ModuleList([GPTBlock(config) for _ in range(config.n_layers)])
        self.ln_f = nn.LayerNorm(config.d_model)
        self.lm_head = nn.Linear(config.d_model, config.vocab_size, bias=False)
        self.lm_head.weight = self.wte.weight  # weight tying

        self.apply(self._init_weights)

    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            nn.init.normal_(module.weight, mean=0.0, std=0.02)

    def forward(self, input_ids, targets=None):
        batch, seq_len = input_ids.shape
        positions = torch.arange(seq_len, device=input_ids.device)

        x = self.wte(input_ids) + self.wpe(positions)
        x = self.drop(x)

        causal_mask = torch.triu(
            torch.full((seq_len, seq_len), float('-inf'), device=input_ids.device),
            diagonal=1
        )

        for block in self.blocks:
            x = block(x, causal_mask)

        x = self.ln_f(x)
        logits = self.lm_head(x)

        loss = None
        if targets is not None:
            loss = F.cross_entropy(
                logits.view(-1, logits.size(-1)),
                targets.view(-1),
                ignore_index=-1
            )
        return logits, loss

# GPT-2 Small configuration
gpt2_small = GPTConfig(
    vocab_size=50257, d_model=768, n_heads=12, d_ff=3072, n_layers=12
)
model = GPT(gpt2_small)
params = sum(p.numel() for p in model.parameters())
print(f"GPT-2 Small — Parameters: {params:,}")  # ~124M
print(f"Parameters (Millions): {params / 1e6:.1f}M")
```

## Common pitfalls

Students often forget the weight initialization scheme. GPT uses a specific normal initialization with std=0.02, and residual layers are scaled by $1/\sqrt{2 \cdot n_{layers})}$. Poor initialization can cause training to diverge, especially in deeper models. Another common oversight is the weight tying between embeddings and the output head — if you forget this, you'll have ~50K × d_model extra parameters and worse performance.

## Key takeaways
- GPT is a decoder-only Transformer trained with next-token prediction
- It uses learned positional embeddings, GELU activation, pre-norm, and weight tying
- The pre-train then fine-tune paradigm established by GPT defines modern NLP
- GPT-2 Small has ~124M parameters with d_model=768, 12 heads, and 12 layers