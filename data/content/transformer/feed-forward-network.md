---
intro: The feed-forward network is the per-token computation engine inside every Transformer block. While attention lets tokens talk to each other, the feed-forward layer is where each token's representation is independently transformed.
callout: The feed-forward network is where most of a Transformer's parameters live — typically two-thirds of the model's weights are in these layers.
---

## What is the Feed-Forward Network?

The position-wise feed-forward network (FFN) is a simple two-layer neural network applied independently to each position in the sequence. It consists of two linear transformations with a non-linear activation in between. The first linear layer expands the representation from `d_model` to a larger intermediate dimension `d_ff` (typically 4× `d_model`), and the second layer projects it back down to `d_model`. The expansion-then-contraction pattern gives the network more capacity to learn complex transformations.

Mathematically, for each position, the FFN computes:

$$\text{FFN}(x) = W_2 \cdot \text{GELU}(W_1 x + b_1) + b_2$$

where $W_1$ is `(d_ff, d_model)` and $W_2$ is `(d_model, d_ff)`. The activation function has evolved — the original Transformer used ReLU, BERT used GELU, and some modern models like LLaMA use SwiGLU, which adds a gating mechanism.

The term "position-wise" is critical: the same FFN weights are applied to every token position, but each token is processed independently. There is no cross-token interaction in the FFN. That's attention's job. The FFN is where the model "thinks" about each token's meaning given the context it has already gathered from attention.

## Why it matters

The FFN is surprisingly the largest parameter consumer in a Transformer. For a model with `d_model=512` and `d_ff=2048`, each FFN has `512*2048 + 2048*512 = 2,097,152` parameters — compared to attention's `4*512*512 = 1,048,576` parameters. This 2:1 ratio means roughly two-thirds of a standard Transformer's parameters are in the FFN layers.

This matters for understanding model capacity and for optimization techniques like quantization and pruning, which often target FFN layers first. It also matters for mixture-of-experts (MoE) models, which replace the single FFN with multiple expert FFNs and route tokens to different experts — this is how models like Mixtral achieve massive parameter counts without proportional compute costs.

## Code example

```python
import torch
import torch.nn as nn

class FeedForwardNetwork(nn.Module):
    def __init__(self, d_model, d_ff, dropout=0.1, activation='gelu'):
        super().__init__()
        self.w1 = nn.Linear(d_model, d_ff)
        self.w2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)

        if activation == 'gelu':
            self.act = nn.GELU()
        elif activation == 'relu':
            self.act = nn.ReLU()
        elif activation == 'swiglu':
            self.w_gate = nn.Linear(d_model, d_ff)
            self.act = nn.SiLU()
        else:
            raise ValueError(f"Unknown activation: {activation}")

        self.activation_name = activation

    def forward(self, x):
        if self.activation_name == 'swiglu':
            return self.w2(self.dropout(self.act(self.w1(x)) * self.w_gate(x)))
        return self.w2(self.dropout(self.act(self.w1(x))))

# Standard GELU FFN (BERT/GPT-2 style)
ffn = FeedForwardNetwork(d_model=512, d_ff=2048, activation='gelu')
x = torch.randn(2, 128, 512)
out = ffn(x)
print(f"GELU FFN params: {sum(p.numel() for p in ffn.parameters()):,}")

# SwiGLU FFN (LLaMA style)
swiglu_ffn = FeedForwardNetwork(d_model=512, d_ff=2048, activation='swiglu')
out2 = swiglu_ffn(x)
print(f"SwiGLU FFN params: {sum(p.numel() for p in swiglu_ffn.parameters()):,}")
```

## Common pitfalls

Students sometimes forget that the FFN is applied independently to each token position — they expect it to mix information across the sequence. If you want cross-token interaction, that's what attention is for. Another common error is setting `d_ff` too small, which starves the model of per-token capacity. The standard ratio of 4× `d_model` is a well-tested default — deviating from it should be done deliberately.

## Key takeaways
- The FFN is a two-layer MLP applied independently to each token position
- It expands to 4× `d_model` and contracts back, giving per-token reasoning capacity
- The FFN holds roughly two-thirds of a Transformer's total parameters
- Modern variants like SwiGLU use gating mechanisms for improved performance