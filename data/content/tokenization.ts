import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "tokenization": {
    whatIs: "Tokenization is the process of splitting raw text into discrete units (tokens) that a model can process. It bridges human language and the integer IDs a neural network consumes.",
    whereUsed: "GPT-4 uses a tiktoken BPE tokenizer with ~100k tokens; Llama 3 uses a 128k SentencePiece tokenizer; every LLM pipeline starts with tokenization before embedding lookup.",
    howToBuild: "Install `tiktoken` and call `tiktoken.encoding_for_model('gpt-4').encode('Hello world')` to see integer token IDs, then decode them back to text.",
  },
  "character-tokenization": {
    whatIs: "Character tokenization splits text into individual characters, giving a tiny vocabulary (~100 for ASCII) but very long sequences. It handles any word but loses semantic unit granularity.",
    whereUsed: "Character-level models appear in research and some early language models (char-RNN); they are rarely used in production LLMs because sequence lengths become prohibitive.",
    howToBuild: "Implement with `list('hello')` → `['h','e','l','l','o']`, build a char-to-id dictionary, and train a small char-RNN to generate text one character at a time.",
  },
  "word-tokenization": {
    whatIs: "Word tokenization splits text on whitespace or punctuation into whole words, giving readable tokens but a huge vocabulary with separate IDs for 'run', 'runs', 'running', and out-of-vocabulary issues.",
    whereUsed: "Word-level tokenization was used in early NLP (word2vec, GloVe) and some legacy NLP pipelines; modern LLMs avoid it because of vocabulary bloat and morphology handling.",
    howToBuild: "Use `nltk.word_tokenize` or a simple `text.split()`, build a word-to-id map, and observe how quickly the vocabulary grows on a real corpus — then compare with subword methods.",
  },
  "subword-tokenization": {
    whatIs: "Subword tokenization splits text into units between characters and words — common words stay whole, rare words break into meaningful pieces ('unfriend' → 'un', 'friend'). It balances vocabulary size and sequence length.",
    whereUsed: "Subword tokenization is the standard for all modern LLMs — BPE (GPT), WordPiece (BERT), and SentencePiece (Llama, T5) are all subword methods.",
    howToBuild: "Train a tokenizer with `tokenizers.Tokenizer(models.BPE())` from HuggingFace, feed it a corpus, and inspect how it splits a rare word into subwords versus keeping common words intact.",
  },
  "bpe": {
    whatIs: "Byte-Pair Encoding (BPE) is a subword tokenization algorithm that starts from characters and iteratively merges the most frequent adjacent pair into a new token until the vocabulary reaches a target size.",
    whereUsed: "BPE is used by GPT-2, GPT-3, GPT-4 (via tiktoken), and Llama 2; it is the most widely deployed tokenizer in LLMs today.",
    howToBuild: "Use `tiktoken.get_encoding('gpt2').encode('tokenization')` to see the BPE split, or train one with `tokenizers.Tokenizer(models.BPE()).train(files)` and inspect merges.",
  },
  "wordpiece": {
    whatIs: "WordPiece is a subword tokenization algorithm similar to BPE but selects merges that maximize the likelihood of the training corpus, not just frequency. It uses '##' prefixes for word-internal subwords.",
    whereUsed: "WordPiece is used by BERT, DistilBERT, and Electra; it is optimized for the masked-language-modeling objective rather than generation.",
    howToBuild: "Load `BertTokenizer.from_pretrained('bert-base-uncased')`, call `.tokenize('unaffable')` to see `['un', '##aff', '##able']`, and inspect `vocab.txt` for the merge set.",
  },
  "sentencepiece": {
    whatIs: "SentencePiece is a language-independent subword tokenizer that treats the input as a raw byte stream, so it works on any language without pre-tokenization on whitespace. It supports BPE and Unigram modes.",
    whereUsed: "SentencePiece is used by Llama 2/3, T5, ALBERT, and multilingual models like XLM-R; its whitespace-agnostic design is crucial for languages without spaces (Chinese, Japanese).",
    howToBuild: "Install `sentencepiece`, train with `spm.SentencePieceTrainer.train('--input=corpus.txt --model_prefix=m --vocab_size=32000'`, and encode/decode with `spm.SentencePieceProcessor`.",
  },
  "vocabulary": {
    whatIs: "The vocabulary is the fixed set of all tokens a tokenizer can produce, each mapped to a unique integer ID. It defines the input and output space of the language model.",
    whereUsed: "GPT-4 has a ~100k vocabulary; Llama 3 has 128k tokens; a larger vocabulary covers more languages and rare words but increases the embedding and output projection parameter count.",
    howToBuild: "Load any tokenizer with `AutoTokenizer.from_pretrained('gpt2')`, print `len(tokenizer)` and `tokenizer.get_vocab()`, and observe how vocabulary size ties to embedding matrix shape.",
  },
  "token-ids": {
    whatIs: "Token IDs are the integer indices assigned to each token in the vocabulary. They are the actual numbers fed into the embedding layer and predicted by the output softmax.",
    whereUsed: "Every LLM forward pass converts text to token IDs, looks up embeddings by ID, and produces logits over IDs; the final layer maps hidden states back to vocabulary-size logits.",
    howToBuild: "Call `tokenizer.encode('Hello')` to get `[15496]`, pass it as `torch.tensor(ids)` to `model.generate()`, and decode the output IDs back with `tokenizer.decode`.",
  },
  "special-tokens": {
    whatIs: "Special tokens are reserved non-text tokens like `<bos>`, `<eos>`, `<pad>`, and `<unk>` that signal sequence boundaries, padding, or unknown words. They are part of the vocabulary but not natural language.",
    whereUsed: "Llama uses `<bos>` to start sequences; GPT-2 uses `<|endoftext|>` as document separator; padding tokens batch variable-length sequences in training and inference.",
    howToBuild: "Inspect `tokenizer.special_tokens_map` and `tokenizer.pad_token_id`, encode a pair of sequences with `padding=True`, and observe where pad tokens appear in the ID tensor.",
  },
  "vocabulary-size": {
    whatIs: "Vocabulary size is the number of distinct tokens the tokenizer supports. It directly determines the embedding matrix and final output projection dimensions, so it is a key architectural tradeoff.",
    whereUsed: "Smaller models use 32k vocab (Llama 2); larger multilingual models use 128k (Llama 3) or 256k (Qwen2) to cover more languages without excessive sequence lengths.",
    howToBuild: "Compare `nn.Embedding(32000, 4096)` vs `nn.Embedding(128000, 4096)` parameter counts with `sum(p.numel() for p in layer.parameters())` to see the memory cost of larger vocab.",
  },
  "token-count": {
    whatIs: "Token count is the number of tokens a piece of text produces after tokenization. It determines sequence length, compute cost, and context-window consumption for a given input.",
    whereUsed: "LLM APIs bill per token; GPT-4 has a 128k context window; estimating token count before sending prompts prevents truncation and controls cost in production.",
    howToBuild: "Use `len(tokenizer.encode(text))` to count tokens, build a cost estimator that multiplies token count by price per token, and test how token count varies across languages.",
  },
};