---
intro: A Transformer block is the repeating building block stacked many times to form a deep Transformer model. Each block refines the representation by combining attention, feed-forward computation, residuals, and normalization.
callout: The depth of a Transformer — how many blocks you stack — is one of the most impactful hyperparameters for model capacity and quality.
---

## What is a Transformer Block?

A Transformer block (sometimes called a Transformer layer) is a self-contained module that performs two major operations: **multi-head self-attention** and a **position-wise feed-forward network**. Each of these operations is wrapped in a residual connection followed by layer normalization. The block takes a sequence of embedded vectors as input and produces a sequence of the same shape as output — but with richer, more contextually informed representations.

The key insight is that each block doesn't change the dimensionality of the data. The input is a tensor of shape `(batch, seq_len, d_model)` and the output is the same shape. This makes it trivial to stack blocks: the output of block $n$ feeds directly into block $n+1$. This uniformity is what allows models to scale to dozens or even hundreds of layers.

Within a block, the attention sub-layer lets tokens communicate with each other, mixing information across the sequence. The feed-forward sub-layer then processes each token's representation independently, applying a non-linear transformation that increases the model's expressive power. The residual connections ensure that information can flow directly through the stack, mitigating vanishing gradients.

## Why it matters

The Transformer block is the atomic unit of model depth. When we say a model is "32 layers deep," we mean it has 32 Transformer blocks stacked on top of each other. Each block adds a layer of abstraction — early blocks might learn syntax, middle blocks learn semantics, and later blocks learn task-specific reasoning.

The design of the block — specifically the order of operations (pre-norm vs. post-norm), the size of the feed-forward network, and the number of attention heads — determines the model's character. Small changes to the block design can have outsized effects on training stability and final quality.

## Code example

```python
import torch
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attention = nn.MultiheadAttention(
            d_model, n_heads, dropout=dropout, batch_first=True
        )
        self.feed_forward = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Pre-norm architecture (used in GPT-2, LLaMA, etc.)
        normed = self.norm1(x)
        attn_out, _ = self.attention(normed, normed, normed, attn_mask=mask)
        x = x + self.dropout(attn_out)

        normed = self.norm2(x)
        ff_out = self.feed_forward(normed)
        x = x + self.dropout(ff_out)
        return x

block = TransformerBlock(d_model=512, n_heads=8, d_ff=2048)
x = torch.randn(2, 128, 512)  # (batch, seq_len, d_model)
out = block(x)
print(f"Input shape:  {x.shape}")
print(f"Output shape: {out.shape}")
```

## Common pitfalls

A frequent mistake is confusing pre-norm and post-norm architectures. The original Transformer paper used post-norm (applying normalization after the residual addition), but most modern models use pre-norm (applying normalization before the sub-layer). Pre-norm is more stable for training very deep models. If you use the wrong one, deep models may fail to converge. Another pitfall is forgetting the residual connection — without it, deep Transformers simply don't train.

## Key takeaways
- A Transformer block combines attention and feed-forward sub-layers with residuals and normalization
- The block preserves tensor shape, enabling arbitrary stacking for depth
- Pre-norm architecture is preferred for training stability in deep models
- The number of stacked blocks is a primary determinant of model capacity