---
intro: Residual connections are the expressways that let gradients and information flow through deep Transformer stacks without degradation. They are deceptively simple but absolutely essential for training deep models.
callout: Without residual connections, a 100-layer Transformer would be un trainable. These skip connections are the circulatory system of deep networks.
---

## What is a Residual Connection?

A residual connection (also called a skip connection) adds a layer's input directly to its output: $y = x + f(x)$, where $x$ is the input and $f(x)$ is the transformation (such as attention or feed-forward). Instead of forcing each layer to learn a completely new representation, the residual connection allows each layer to learn a **residual** — a correction or refinement on top of what's already there.

This idea was popularized by the ResNet paper (He et al., 2016) for image recognition, but it's equally critical in Transformers. Without residual connections, stacking many layers causes the vanishing gradient problem: gradients shrink exponentially as they propagate backward through layers, making early layers nearly impossible to train. The residual connection provides a direct path for gradients to flow, bypassing the transformation.

In Transformers, every sub-layer — both attention and feed-forward — is wrapped in a residual connection. This means that even in a 96-layer model, information from the embedding layer can reach the final layer through a chain of additions, and gradients can flow all the way back during training.

## Why it matters

Residual connections are what make depth practical. The difference between a 12-layer model and a 96-layer model is enormous in terms of capability, but only possible because residuals prevent the signal from degrading. They also enable **iterative refinement**: each block doesn't need to reconstruct the full representation from scratch, it just needs to add useful adjustments.

From an optimization perspective, residuals create a smoother loss landscape. The network can learn the identity function by simply setting all weights to zero, which means adding more layers never hurts — at worst they do nothing. This property is called the "identity mapping" characteristic, and it's why deeper residual networks are reliably better, not worse.

## Code example

```python
import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, d_model, sub_layer, dropout=0.1):
        super().__init__()
        self.sub_layer = sub_layer
        self.norm = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, *args, **kwargs):
        # Residual: y = x + dropout(sub_layer(norm(x)))
        return x + self.dropout(self.sub_layer(self.norm(x), *args, **kwargs))

# Demonstration: comparing with and without residual
class DeepNetNoResidual(nn.Module):
    def __init__(self, d_model, n_layers):
        super().__init__()
        self.layers = nn.ModuleList([
            nn.Sequential(nn.Linear(d_model, d_model), nn.GELU(), nn.Linear(d_model, d_model))
            for _ in range(n_layers)
        ])

    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return x

class DeepNetWithResidual(nn.Module):
    def __init__(self, d_model, n_layers):
        super().__init__()
        self.layers = nn.ModuleList([
            nn.Sequential(nn.Linear(d_model, d_model), nn.GELU(), nn.Linear(d_model, d_model))
            for _ in range(n_layers)
        ])

    def forward(self, x):
        for layer in self.layers:
            x = x + layer(x)  # residual connection
        return x

d_model = 256
n_layers = 50
x = torch.randn(1, 32, d_model)

no_res = DeepNetNoResidual(d_model, n_layers)
with_res = DeepNetWithResidual(d_model, n_layers)

out_no = no_res(x)
out_with = with_res(x)
print(f"Without residual — output mean: {out_no.mean().item():.6f}, std: {out_no.std().item():.6f}")
print(f"With residual    — output mean: {out_with.mean().item():.6f}, std: {out_with.std().item():.6f}")
print(f"Without residual — output has {'NaN' if torch.isnan(out_no).any() else 'values'}")
```

## Common pitfalls

A subtle but dangerous mistake is placing the residual connection incorrectly relative to normalization. In post-norm architectures, the residual is added first and then normalized: `norm(x + f(x))`. In pre-norm architectures, normalization happens before the sub-layer: `x + f(norm(x))`. Mixing these up across layers can cause training instability. Another pitfall is forgetting the dropout on the sub-layer output before adding the residual — this regularization step is important for preventing overfitting.

## Key takeaways
- Residual connections add a layer's input to its output: $y = x + f(x)$
- They solve the vanishing gradient problem, enabling very deep networks
- Every Transformer sub-layer (attention and FFN) is wrapped in a residual connection
- Residuals enable iterative refinement — each layer adjusts rather than reconstructs