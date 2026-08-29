import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "text-representation": {
    whatIs: "Text representation is the process of converting human language into numerical form so machines can process it. It spans from simple bag-of-words to dense learned embeddings.",
    whereUsed: "Before transformers, TF-IDF and word2vec were standard; modern LLMs represent text as sequences of dense token embeddings fed directly into transformer layers.",
    howToBuild: "Compare `sklearn.feature_extraction.text.TfidfVectorizer` with `torch.nn.Embedding` outputs on the same sentences to contrast sparse vs dense representations.",
  },
  "one-hot-encoding": {
    whatIs: "One-hot encoding represents each token as a vector of length V (vocabulary size) with a 1 at the token's index and 0 elsewhere. It is the simplest text representation but has no semantics and is high-dimensional.",
    whereUsed: "One-hot vectors are conceptually the input to embedding layers — multiplying the one-hot by the embedding matrix selects the corresponding row, which is what `nn.Embedding` does efficiently.",
    howToBuild: "Use `F.one_hot(torch.tensor([2,5,1]), num_classes=10)` to create one-hot vectors, then multiply by an embedding matrix to see how `nn.Embedding` is an efficient lookup of the same operation.",
  },
  "bag-of-words": {
    whatIs: "Bag-of-words represents a document as an unordered count vector of how many times each vocabulary word appears, discarding word order and grammar entirely.",
    whereUsed: "BoW is used in spam classifiers, sentiment baselines, and topic-modeling (LDA); it is too lossy for LLMs that depend on token order, but still serves as a baseline in NLP courses.",
    howToBuild: "Use `sklearn.feature_extraction.text.CountVectorizer` on a list of sentences, inspect `.toarray()`, and build a Naive Bayes classifier to see how far orderless features get.",
  },
  "tf-idf": {
    whatIs: "TF-IDF (Term Frequency–Inverse Document Frequency) weights words by how often they appear in a document versus across the corpus, highlighting distinctive words. It improves on raw bag-of-words counts.",
    whereUsed: "TF-IDF powers search engines (Elasticsearch, Lucene) and document clustering; it remains a strong sparse baseline for retrieval before dense embedding methods.",
    howToBuild: "Use `TfidfVectorizer().fit_transform(docs)`, inspect the sparse matrix, and build a cosine-similarity document retriever to compare against a dense embedding retriever.",
  },
  "rnn": {
    whatIs: "A Recurrent Neural Network (RNN) processes sequences one token at a time, maintaining a hidden state that carries information from previous steps. It was the dominant sequence model before transformers.",
    whereUsed: "Early neural language models and translation systems (seq2seq with RNNs, Google's original NMT) used RNNs; they fell out of favor because they cannot parallelize and forget long context.",
    howToBuild: "Use `nn.RNN(input_size, hidden_size, num_layers)` in PyTorch, feed a sequence, and inspect the final hidden state; compare training speed with a transformer on the same data.",
  },
  "lstm": {
    whatIs: "An LSTM (Long Short-Term Memory) is an RNN variant with gating mechanisms (input, forget, output gates) that control information flow, allowing it to capture longer dependencies than vanilla RNNs.",
    whereUsed: "LSTMs powered early speech recognition (DeepSpeech), machine translation, and text generation; they remain useful for small-scale sequential tasks where transformers are overkill.",
    howToBuild: "Use `nn.LSTM(input_size, hidden_size, batch_first=True)`, run a sequence through it, and inspect the tuple of (output, (h_n, c_n)) to see the cell state that carries long-term memory.",
  },
  "gru": {
    whatIs: "A GRU (Gated Recurrent Unit) is a simplified LSTM with fewer gates (update and reset), making it faster while retaining much of the long-range modeling capability. It merges the cell and hidden states.",
    whereUsed: "GRUs are used in lightweight sequence models for mobile NLP, time-series forecasting, and as efficient baselines before scaling up to transformers.",
    howToBuild: "Use `nn.GRU(input_size, hidden_size, num_layers=2)`, compare parameter count and speed with an equivalent LSTM, and measure accuracy on a sequence classification task.",
  },
};