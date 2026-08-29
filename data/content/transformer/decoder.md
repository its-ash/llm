---
intro: The decoder is the generation half of the Transformer — it produces output tokens one at a time, attending to both its own growing sequence and the encoder's representation of the input.
callout: The decoder has two types of attention: masked self-attention for its own sequence and cross-attention for the encoder's output — this dual attention is what makes translation work.
---

## What is the Decoder?

The Transformer decoder is a stack of layers that generates output tokens autoregressively. Each decoder layer has **three** sub-layers, unlike the encoder's two: (1) **masked multi-head self-attention** over the decoder's own growing sequence, (2) **cross-attention** that attends to the encoder's output representations, and (3) a **position-wise feed-forward network**. All sub-layers use residual connections and layer normalization.

The masked self-attention uses a **causal mask** — a lower-triangular matrix that prevents each position from attending to future positions. This ensures that when generating token $t$, the decoder can only see tokens $0$ through $t-1$, preserving the autoregressive property. Without this mask, the model could "cheat" by looking ahead during training.

The cross-attention layer is what connects the decoder to the encoder. In this layer, the queries come from the decoder's self-attention output, while the keys and values come from the encoder's output. This lets the decoder focus on relevant parts of the source sequence while generating the target sequence — essential for tasks like translation where you need to align source and target languages.

## Why it matters

The decoder is the direct ancestor of modern LLMs. While the original encoder-decoder Transformer was designed for translation, researchers realized that the decoder alone — with its autoregressive generation capability — could be trained on vast text corpora to become a general-purpose language model. This insight led to GPT.

Understanding the full encoder-decoder architecture is still important for translation, summarization, and any task that involves transforming one sequence into another. Models like T5 and BART use encoder-decoder architectures and achieve excellent results on these tasks.

## Code example

```python
import torch
import torch.nn as nn

class TransformerDecoderLayer(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        # Masked self-attention
        self.self_attention = nn.MultiheadAttention(d_model, n_heads, dropout=dropout, batch_first=True)
        self.norm1 = nn.LayerNorm(d_model)

        # Cross-attention to encoder output
        self.cross_attention = nn.MultiheadAttention(d_model, n_heads, dropout=dropout, batch_first=True)
        self.norm2 = nn.LayerNorm(d_model)

        # Feed-forward
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
        )
        self.norm3 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, encoder_output, tgt_mask=None, memory_mask=None):
        # Masked self-attention
        normed = self.norm1(x)
        attn_out, _ = self.self_attention(normed, normed, normed, attn_mask=tgt_mask)
        x = x + self.dropout(attn_out)

        # Cross-attention
        normed = self.norm2(x)
        cross_out, _ = self.cross_attention(normed, encoder_output, encoder_output, attn_mask=memory_mask)
        x = x + self.dropout(cross_out)

        # Feed-forward
        x = x + self.dropout(self.ffn(self.norm3(x)))
        return x

def make_causal_mask(seq_len):
    mask = torch.triu(torch.ones(seq_len, seq_len), diagonal=1).bool()
    return mask  # True = masked (cannot attend)

seq_len = 8
causal_mask = make_causal_mask(seq_len)
print("Causal mask (True = cannot attend):")
print(causal_mask.int())

layer = TransformerDecoderLayer(d_model=512, n_heads=8, d_ff=2048)
x = torch.randn(2, seq_len, 512)          # decoder input
enc_out = torch.randn(2, 16, 512)         # encoder output (source seq len = 16)
out = layer(x, enc_out, tgt_mask=causal_mask)
print(f"Decoder output shape: {out.shape}")
```

## Common pitfalls

A common error is forgetting the causal mask in the decoder's self-attention. Without it, the model sees future tokens during training, which creates a train/test mismatch — the model learns to rely on information it won't have at inference time. Another mistake is mixing up the roles in cross-attention: queries come from the decoder, keys and values from the encoder. Getting this backwards will silently produce wrong results.

## Key takeaways
- The decoder generates tokens autoregressively using masked self-attention
- It includes cross-attention to attend to the encoder's output (for seq2seq tasks)
- The causal mask prevents looking at future tokens, essential for autoregressive training
- The decoder is the direct ancestor of modern decoder-only LLMs like GPT