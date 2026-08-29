---
intro: The encoder is the understanding half of the original Transformer — it reads the input sequence and builds a rich, context-aware representation of every token. It's the part that turns text into meaning.
callout: BERT is a pure encoder model — it's brilliant at understanding text but cannot generate it autoregressively.
---

## What is the Encoder?

The Transformer encoder is a stack of identical layers (blocks) that process the entire input sequence simultaneously. Each encoder layer contains two sub-layers: a **multi-head self-attention** mechanism and a **position-wise feed-forward network**, each wrapped in residual connections and layer normalization. The encoder uses bidirectional (unmasked) attention — every token can attend to every other token, including tokens that come after it.

This bidirectionality is the encoder's defining characteristic. When processing the sentence "The bank by the river was muddy," the token "bank" can look at "river" to determine that it refers to a river bank, not a financial institution. A decoder-only model with causal masking cannot do this during its forward pass — it only sees left context.

The encoder takes a sequence of token embeddings (plus positional encodings) and produces a sequence of contextualized embeddings of the same length. These output embeddings are meant to capture the meaning of each token in context. In the original Transformer for translation, the encoder's output is passed to the decoder via cross-attention.

## Why it matters

Encoder models like BERT (Bidirectional Encoder Representations from Transformers) excel at understanding tasks: classification, named entity recognition, question answering, and sentence embedding. The bidirectional context gives them a complete picture of the input, making them superior to decoder-only models for tasks that require understanding the full text rather than generating it.

However, encoders are not naturally suited for text generation. They don't have a causal mask, so they can't predict "the next token" in the autoregressive sense. This is why the LLM revolution has been driven by decoder-only models — generation is what captured the world's imagination. But for many practical NLP tasks (sentiment analysis, embeddings, classification), encoder models remain highly effective and efficient.

## Code example

```python
import torch
import torch.nn as nn

class TransformerEncoder(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, d_ff, n_layers, max_seq_len=512, dropout=0.1):
        super().__init__()
        self.token_embed = nn.Embedding(vocab_size, d_model)
        self.pos_embed = nn.Embedding(max_seq_len, d_model)
        self.dropout = nn.Dropout(dropout)

        self.layers = nn.ModuleList([
            nn.TransformerEncoderLayer(
                d_model=d_model,
                nhead=n_heads,
                dim_feedforward=d_ff,
                dropout=dropout,
                batch_first=True,
                activation='gelu',
                norm_first=True  # pre-norm
            )
            for _ in range(n_layers)
        ])
        self.norm = nn.LayerNorm(d_model)  # final norm

    def forward(self, input_ids, padding_mask=None):
        batch_size, seq_len = input_ids.shape
        positions = torch.arange(seq_len, device=input_ids.device).unsqueeze(0)

        x = self.token_embed(input_ids) + self.pos_embed(positions)
        x = self.dropout(x)

        for layer in self.layers:
            x = layer(x, src_key_padding_mask=padding_mask)

        return self.norm(x)

# BERT-like encoder for classification
class EncoderForClassification(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, d_ff, n_layers, n_classes):
        super().__init__()
        self.encoder = TransformerEncoder(vocab_size, d_model, n_heads, d_ff, n_layers)
        self.classifier = nn.Linear(d_model, n_classes)

    def forward(self, input_ids, padding_mask=None):
        encoded = self.encoder(input_ids, padding_mask)
        cls_token_rep = encoded[:, 0]  # use first token [CLS] for classification
        return self.classifier(cls_token_rep)

model = EncoderForClassification(vocab_size=30000, d_model=768, n_heads=12, d_ff=3072, n_layers=12, n_classes=5)
input_ids = torch.randint(0, 30000, (4, 128))
logits = model(input_ids)
print(f"Classification logits shape: {logits.shape}")  # (4, 5)
print(f"Total params: {sum(p.numel() for p in model.parameters()):,}")
```

## Common pitfalls

Students often try to use an encoder model for text generation, but encoders lack causal masking and a language modeling head trained for next-token prediction. You'll get outputs, but they won't be coherent generations. Another mistake is forgetting the padding mask — without it, the encoder will attend to padding tokens, corrupting the representations. Always pass a padding mask when sequences have different lengths.

## Key takeaways
- The encoder processes the full input sequence with bidirectional self-attention
- It produces contextualized embeddings where each token attends to all others
- Encoder models like BERT excel at understanding tasks but not generation
- Always use padding masks when processing variable-length sequences