---
intro: Layer normalization stabilizes training by normalizing the activations within each token's representation. It keeps the numbers in a reasonable range, preventing the explosive or vanishing signals that plague deep networks.
callout: Layer normalization operates across features for each token independently — it's the per-token thermostat that keeps representations stable.
---

## What is Layer Normalization?

Layer normalization (LayerNorm) is a technique that normalizes the features of each individual token vector to have zero mean and unit variance, then applies a learned scale and shift. For a token vector $x$ with $d$ features, LayerNorm computes:

$$\text{LayerNorm}(x) = \gamma \cdot \frac{x - \mu}{\sigma + \epsilon} + \beta$$

where $\mu$ and $\sigma$ are the mean and standard deviation computed across the feature dimension, $\gamma$ and $\beta$ are learnable parameters, and $\epsilon$ is a small constant (typically $10^{-5}$) to prevent division by zero.

Unlike batch normalization, which normalizes across the batch dimension, LayerNorm normalizes across the feature dimension for each example independently. This makes it work identically at training and inference time, and it doesn't depend on batch size — critical for language models where batch sizes vary and sequences have different lengths.

In modern Transformers, you'll also encounter **RMSNorm** (Root Mean Square Normalization), a simplified variant that removes the mean subtraction and only normalizes by the RMS. It's used in LLaMA and other recent models because it's slightly faster and works just as well in practice.

## Why it matters

Without normalization, deep Transformers are extremely unstable. Activations can grow or shrink exponentially across layers, leading to NaN losses and training failures. LayerNorm acts as a stabilizer, keeping the scale of representations in a controlled range so that gradients flow predictably.

The placement of LayerNorm is also architecturally significant. As discussed with residual connections, **pre-norm** (normalizing before the sub-layer) is more stable for deep models than **post-norm** (normalizing after the residual addition). Pre-norm ensures the residual path carries unnormalized signals, which preserves gradient flow. Most modern LLMs use pre-norm.

## Code example

```python
import torch
import torch.nn as nn

class LayerNorm(nn.Module):
    def __init__(self, d_model, eps=1e-5):
        super().__init__()
        self.gamma = nn.Parameter(torch.ones(d_model))
        self.beta = nn.Parameter(torch.zeros(d_model))
        self.eps = eps

    def forward(self, x):
        mean = x.mean(dim=-1, keepdim=True)
        var = x.var(dim=-1, keepdim=True, unbiased=False)
        x_norm = (x - mean) / torch.sqrt(var + self.eps)
        return self.gamma * x_norm + self.beta

class RMSNorm(nn.Module):
    def __init__(self, d_model, eps=1e-6):
        super().__init__()
        self.weight = nn.Parameter(torch.ones(d_model))
        self.eps = eps

    def forward(self, x):
        rms = torch.sqrt(x.pow(2).mean(dim=-1, keepdim=True) + self.eps)
        return self.weight * (x / rms)

d_model = 512
batch, seq_len = 2, 128

layernorm = LayerNorm(d_model)
rmsnorm = RMSNorm(d_model)

x = torch.randn(batch, seq_len, d_model) * 10 + 5  # deliberately unnormalized
print(f"Before norm — mean: {x.mean().item():.4f}, std: {x.std().item():.4f}")
print(f"After LayerNorm — mean: {layernorm(x).mean().item():.4f}, std: {layernorm(x).std().item():.4f}")
print(f"After RMSNorm   — mean: {rmsnorm(x).mean().item():.4f}, std: {rmsnorm(x).std().item():.4f}")

# PyTorch built-in comparison
builtin_ln = nn.LayerNorm(d_model)
print(f"PyTorch LayerNorm — mean: {builtin_ln(x).mean().item():.4f}, std: {builtin_ln(x).std().item():.4f}")
```

## Common pitfalls

A common confusion is mixing up LayerNorm with BatchNorm. BatchNorm normalizes across the batch and requires different behavior at training vs. inference time. LayerNorm normalizes per-sample across features and behaves identically at all times. Using BatchNorm in a Transformer will cause problems. Another mistake is setting $\epsilon$ too small, which can cause numerical instability when variance is near zero, or too large, which reduces the normalization effect.

## Key takeaways
- LayerNorm normalizes each token's features to zero mean and unit variance with learnable scale/shift
- It operates per-sample, making it independent of batch size and consistent between train/inference
- Pre-norm placement (before the sub-layer) is more stable for deep models than post-norm
- RMSNorm is a faster, simplified variant used in modern models like LLaMA