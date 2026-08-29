import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "book-dataset": {
    whatIs: "A book dataset is a small, clean text corpus (e.g., a single public domain book) used to train a miniature LLM for learning purposes. It provides enough text to learn basic language patterns while being small enough to train on a single GPU.",
    whereUsed: "Karpathy's nanoGPT and 'Build GPT from Scratch' tutorial train on Shakespeare or TinyStories datasets. The original GPT-2 paper used BookCorpus. For students, Project Gutenberg books or the TinyStories corpus are ideal small-scale training datasets.",
    howToBuild: "Download a public domain book from Project Gutenberg as plain text. Save as `.txt`. For TinyStories: `datasets.load_dataset('roneneldan/TinyStories')`. For Shakespeare: download `input.txt` from nanoGPT's repo. Keep the raw text for the next preprocessing step.",
  },
  "text-extraction": {
    whatIs: "Text extraction converts raw source files (HTML, PDF, EPUB) into clean plain text suitable for tokenization. It strips formatting, metadata, navigation elements, and encoding artifacts, leaving only the natural language content.",
    whereUsed: "When building datasets from Project Gutenberg (HTML/EPUB), arXiv (PDF), or web crawls, text extraction is the first step. LLaMA's CommonCrawl pipeline uses `resiliparse` for HTML extraction. For books, removing Gutenberg licenses and headers is standard.",
    howToBuild: "For HTML: `BeautifulSoup(html).get_text()`. For PDF: `pypdf.PdfReader(file).extract_text()`. For Gutenberg: find start/end markers (`*** START OF ... ***` and `*** END OF ... ***`) and slice between them. Save the extracted text as UTF-8 `.txt`.",
  },
  "text-cleaning": {
    whatIs: "Text cleaning normalizes the extracted text: fixing encoding issues, removing non-printable characters, normalizing whitespace, and optionally lowercasing. This ensures the tokenizer sees consistent input and the model learns clean patterns.",
    whereUsed: "Every LLM dataset pipeline (LLaMA, GPT-3, RefinedWeb) includes a text cleaning step. For small-scale projects, cleaning is simpler but still important: Project Gutenberg texts contain ligatures, smart quotes, and inconsistent line breaks that need normalization.",
    howToBuild: "Pipeline: `text = ftfy.fix_text(text); text = unicodedata.normalize('NFKC', text); text = re.sub(r'\\s+', ' ', text); text = text.lower()`. Remove non-printable: `text = ''.join(c for c in text if c.isprintable() or c == '\\n')`. Save the cleaned `.txt`.",
  },
  "tokenizer": {
    whatIs: "A tokenizer converts raw text into a sequence of integer token IDs that the model can process. For a small LLM, this is often a character-level or simple BPE tokenizer trained on the dataset's vocabulary, mapping each unit to a unique ID.",
    whereUsed: "GPT-2 uses BPE with 50K tokens; LLaMA uses SentencePiece with 32K. For educational small LLMs, Karpathy's nanoGPT trains a custom BPE tokenizer with `tiktoken` or uses a character-level tokenizer for the Shakespeare dataset (vocab size ~65).",
    howToBuild: "Character-level: build `chars = sorted(set(text)); stoi = {c: i for i, c in enumerate(chars)}; encode = lambda s: [stoi[c] for c in s]`. BPE: `from tiktoken import get_encoding; enc = get_encoding('gpt2')` or train custom with `tokenizers` library.",
  },
  "training-sequences": {
    whatIs: "Training sequences are fixed-length token chunks extracted from the tokenized corpus, each serving as one training example. The model learns to predict each token given the preceding tokens within the sequence window.",
    whereUsed: "nanoGPT packs the Shakespeare token stream into sequences of `block_size=256` or `1024`. GPT-2 used sequences of 1024; LLaMA-2 uses 4096. Packing concatenates documents with EOS to avoid padding waste. Each sequence yields `block_size - 1` prediction targets.",
    howToBuild: "Tokenize all text: `data = encode(text)`. Chunk: `data = torch.tensor(data); sequences = data[:n * block_size].view(n, block_size)`. In the dataset: `return seq[:-1], seq[1:]` as (input, target). Use `DataLoader` with `shuffle=True`.",
  },
  "embeddings": {
    whatIs: "The embedding layer converts token IDs into dense vectors of dimension `d_model`, which is the model's internal representation size. These vectors are learnable parameters that the model adjusts to encode semantic and positional information about each token.",
    whereUsed: "Every transformer (GPT-2, LLaMA, BERT) starts with an embedding layer. GPT-2's token embedding is 50257 x 768. In small educational models, embeddings might be just 65 x 384 (Shakespeare char-level). The embedding matrix is often tied to the output LM head.",
    howToBuild: "`self.token_embedding = nn.Embedding(vocab_size, d_model)`. Optionally add positional: `self.pos_embedding = nn.Embedding(block_size, d_model)`. Forward: `x = self.token_embedding(ids) + self.pos_embedding(torch.arange(T))`. Or use RoPE (no params).",
  },
  "transformer": {
    whatIs: "The transformer is the core architecture of the small LLM: a stack of decoder-only blocks, each with causal self-attention and a feed-forward network, connected by residual connections and layer normalization.",
    whereUsed: "A small transformer with 6-12 layers, 6-12 heads, and d_model=384-768 can learn basic language patterns from a book dataset. Karpathy's nanoGPT uses 6 layers, 6 heads, 384 dims for Shakespeare. This same architecture scales to GPT-3 175B with more layers and width.",
    howToBuild: "Define `TransformerBlock` with `LayerNorm → CausalSelfAttention → residual → LayerNorm → MLP → residual`. Stack N blocks in `GPT`. Add final `LayerNorm` and `Linear(d_model, vocab_size)` LM head. Initialize weights with `nn.init.normal_` (std=0.02) and scale residuals by `1/sqrt(2*n_layer)`.",
  },
  "training-loop": {
    whatIs: "The training loop iterates over batches of sequences, performing forward pass, loss computation, backpropagation, and weight updates. It runs for many epochs until the model's validation loss stops improving or a target quality is reached.",
    whereUsed: "Every LLM pretraining uses this loop. nanoGPT trains Shakespeare for ~5000 iterations on a single GPU in minutes. LLaMA-2 trains for ~2T tokens over weeks on thousands of GPUs. The loop is the same; the scale differs.",
    howToBuild: "`for step in range(max_steps): x, y = next(loader); logits = model(x); loss = F.cross_entropy(logits.view(-1, V), y.view(-1)); optimizer.zero_grad(); loss.backward(); clip_grad_norm_(model.parameters(), 1.0); optimizer.step(); scheduler.step()`. Log loss every 100 steps.",
  },
  "text-generation": {
    whatIs: "Text generation uses the trained model to produce new text autoregressively. Starting from a prompt (or empty), the model predicts one token at a time, appends it, and repeats until a length limit or stop condition is met.",
    whereUsed: "After training nanoGPT on Shakespeare, generation produces Shakespeare-like text. After training on TinyStories, it generates simple stories. This is the same mechanism used by GPT-4 and Claude, just at a smaller scale and with less coherent output.",
    howToBuild: "`def generate(model, ids, max_new, temperature=1.0): for _ in range(max_new): logits = model(ids)[:, -1] / temperature; probs = F.softmax(logits, dim=-1); next = torch.multinomial(probs, 1); ids = torch.cat([ids, next], dim=1); return ids`. Decode with `tokenizer.decode(ids[0])`.",
  },
  "model-inspection": {
    whatIs: "Model inspection involves examining the trained model's internals: parameter count, weight statistics, attention patterns, and embedding similarities. This helps students understand what the model learned and debug training issues.",
    whereUsed: "Tools like BertViz, TransformerLens, and HuggingFace's `model.generate(output_attentions=True)` visualize attention. nanoGPT tutorials inspect token embedding norms and attention maps. Researchers use probing to understand what each layer represents.",
    howToBuild: "Count params: `sum(p.numel() for p in model.parameters())`. Inspect embeddings: `model.token_embedding.weight` and compute cosine similarity between tokens. Visualize attention: save `attn_weights` from the forward pass and plot with `matplotlib.imshow()`.",
  },
};