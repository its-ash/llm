---
intro: Dropout is a regularization technique that randomly zeros out activations during training, forcing the model to learn robust representations that don't depend on any single neuron.
callout: Dropout is training's way of saying "don't put all your eggs in one basket" — it prevents co-adaptation by making the model survive without any given neuron.
---

## What is Dropout?

Dropout, introduced by Hinton et al. (2012), works by randomly setting a fraction of activations to zero during each forward pass in training. The fraction is controlled by a probability $p$ (the dropout rate). When a neuron is dropped, its contribution is zeroed, and the remaining neurons must compensate. At inference time, dropout is disabled — all neurons participate, and outputs are scaled to account for the training-time dropping.

In Transformers, dropout is applied in several places: after the attention weights (before they're used to weight the value vectors), after the attention output, after the feed-forward network, and sometimes on the input embeddings. The typical dropout rate is 0.1 for small models and can be 0.0 to 0.1 for very large models (larger models often need less regularization).

The key insight is that dropout prevents **co-adaptation** — where neurons become overly dependent on specific other neurons being active. By randomly removing neurons, the model is forced to learn redundant, robust features. It's akin to training an ensemble of sub-networks simultaneously, since each forward pass uses a different random subset of neurons.

## Why it matters

Dropout directly affects a model's ability to generalize. Without it, Transformers — especially smaller ones — can easily overfit to the training data, memorizing patterns rather than learning generalizable representations. This is particularly important when training data is limited relative to model capacity.

However, dropout is a double-edged sword. Too much dropout underfits and slows convergence. Too little risks overfitting. Modern large-scale LLMs (100B+ parameters) often use very low or zero dropout, because their sheer size and the massive amount of training data provide natural regularization. The rule of thumb: the smaller your model relative to your data, the more dropout helps.

## Code example

```python
import torch
import torch.nn as nn

class TransformerWithDropout(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attention = nn.MultiheadAttention(d_model, n_heads, dropout=dropout, batch_first=True)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Dropout(dropout),      # dropout in FFN
            nn.Linear(d_ff, d_model),
            nn.Dropout(dropout),      # dropout after FFN
        )
        self.attn_dropout = nn.Dropout(dropout)
        self.embed_dropout = nn.Dropout(dropout)

    def forward(self, x):
        x = self.embed_dropout(x)  # dropout on embeddings

        # Attention sub-layer with dropout
        normed = self.norm1(x)
        attn_out, _ = self.attention(normed, normed, normed)
        x = x + self.attn_dropout(attn_out)

        # FFN sub-layer
        x = x + self.ffn(self.norm2(x))
        return x

# Demonstrating dropout behavior
dropout = nn.Dropout(p=0.5)
x = torch.ones(1, 10)  # all ones

# Training mode: some values zeroed, others scaled by 1/(1-p)
dropout.train()
out_train = dropout(x)
print(f"Training mode output:\n{out_train}")
print(f"Sum: {out_train.sum().item():.1f} (expected ~10.0 due to scaling)")

# Eval mode: identity operation
dropout.eval()
out_eval = dropout(x)
print(f"Eval mode output:\n{out_eval}")
print(f"Sum: {out_eval.sum().item():.1f}")
```

## Common pitfalls

The most common mistake is forgetting to call `model.eval()` before inference. If the model stays in training mode, dropout will randomly zero out activations during generation, producing nonsensical or inconsistent outputs. Always toggle between `model.train()` and `model.eval()` appropriately. Another pitfall is applying dropout to the wrong places — it should be on activations, not weights, and it should not be applied to the residual stream before the addition (apply it to the sub-layer output instead).

## Key takeaways
- Dropout randomly zeros activations during training to prevent co-adaptation and overfitting
- It is disabled during inference via `model.eval()`
- Typical rates are 0.1 for small models; large models often use less or none
- Forgetting to switch to eval mode during inference is a classic and silent bug