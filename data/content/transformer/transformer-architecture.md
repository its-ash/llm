---
intro: The Transformer architecture is the blueprint behind every modern large language model, from GPT to LLaMA. It replaced recurrence with attention, enabling parallel processing and dramatic scaling.
callout: The Transformer's real superpower isn't attention alone — it's the combination of attention, feed-forward layers, residuals, and normalization stacked into deep blocks.
---

## What is Transformer Architecture?

The Transformer architecture, introduced in the landmark 2017 paper "Attention Is All You Need" by Vaswani et al., is a neural network design that processes sequences using self-attention rather than recurrence or convolution. The original architecture has two parts: an **encoder** that reads and understands the input sequence, and a **decoder** that generates the output sequence one token at a time. Both are built from stacked layers of multi-head self-attention, position-wise feed-forward networks, residual connections, and layer normalization.

What makes the Transformer revolutionary is that every token in the sequence can attend to every other token simultaneously. There is no inherent sequential processing bottleneck. This means the model can be trained on GPUs with massive parallelism, and it can learn relationships between tokens that are arbitrarily far apart in the sequence — something recurrent networks struggled with due to the vanishing gradient problem.

The architecture also introduced **positional encodings** to inject order information, since attention itself is permutation-invariant. Without positional information, the model would treat "the cat sat on the mat" and "the mat sat on the cat the" identically.

## Why it matters

The Transformer architecture is the single most important architectural choice in modern LLM design. Every model you've heard of — GPT-4, Claude, LLaMA, Mistral — is a variant of the Transformer. Understanding this architecture is non-negotiable if you want to build, fine-tune, or even effectively use LLMs.

The architecture's importance extends beyond performance. Its parallelizable nature means training scales efficiently with hardware. This is why we've been able to train models on trillions of tokens using thousands of GPUs. A recurrent architecture simply couldn't leverage parallel compute to the same degree.

## Code example

```python
import torch
import torch.nn as nn

class TransformerConfig:
    vocab_size: int = 50000
    d_model: int = 512
    n_heads: int = 8
    n_layers: int = 6
    d_ff: int = 2048
    max_seq_len: int = 2048
    dropout: float = 0.1

class Transformer(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.token_embedding = nn.Embedding(config.vocab_size, config.d_model)
        self.position_embedding = nn.Embedding(config.max_seq_len, config.d_model)
        self.dropout = nn.Dropout(config.dropout)

        encoder_layer = nn.TransformerEncoderLayer(
            d_model=config.d_model,
            nhead=config.n_heads,
            dim_feedforward=config.d_ff,
            dropout=config.dropout,
            batch_first=True,
            activation='gelu'
        )
        self.encoder = nn.TransformerEncoder(encoder_layer, num_layers=config.n_layers)
        self.lm_head = nn.Linear(config.d_model, config.vocab_size, bias=False)

    def forward(self, input_ids):
        batch_size, seq_len = input_ids.shape
        positions = torch.arange(seq_len, device=input_ids.device).unsqueeze(0)

        x = self.token_embedding(input_ids) + self.position_embedding(positions)
        x = self.dropout(x)
        x = self.encoder(x)
        logits = self.lm_head(x)
        return logits

config = TransformerConfig()
model = Transformer(config)
total_params = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total_params:,}")
```

## Common pitfalls

Students often confuse the original encoder-decoder Transformer with the decoder-only architecture used by GPT models. The original paper was designed for translation (an encoder-decoder task), but most modern LLMs use only the decoder stack. Another common mistake is forgetting positional encodings — without them, the model has no notion of token order, and it will produce nonsensical results. Always remember that attention is permutation-invariant by design.

## Key takeaways
- The Transformer replaces recurrence with self-attention, enabling parallel sequence processing
- The original architecture has an encoder and a decoder; modern LLMs often use decoder-only variants
- Positional encodings are essential to inject sequence order information
- The architecture's parallelism is what enables training on massive GPU clusters