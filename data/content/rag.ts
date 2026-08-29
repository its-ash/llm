import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "retrieval-augmented-generation": {
    whatIs: "Retrieval-Augmented Generation (RAG) is a technique that grounds an LLM's response by retrieving relevant documents from an external knowledge base and inserting them into the prompt at inference time.",
    whereUsed: "ChatGPT's file search, Perplexity, and enterprise LLM apps built on LangChain/LlamaIndex all use RAG to answer questions over private documents without fine-tuning the model.",
    howToBuild: "Use `langchain` with a `FAISS` vector store and `OpenAIEmbeddings`, create a `RetrievalQA` chain over your documents, and call `chain.run(query)` to retrieve and generate an answer.",
  },
  "document-loading": {
    whatIs: "Document loading is the process of reading files (PDF, HTML, Markdown, DOCX) and converting them into a uniform text-document object that downstream RAG components can chunk and embed.",
    whereUsed: "LangChain `PyPDFLoader`, `WebBaseLoader`, and LlamaIndex `SimpleDirectoryReader` handle loading; Unstructured.io supports 25+ file types for enterprise RAG pipelines.",
    howToBuild: "In LangChain, use `PyPDFLoader(\"doc.pdf\").load()` to get a list of `Document(page_content=..., metadata={...})` objects; inspect `.page_content` and `.metadata` to verify extraction quality.",
  },
  "text-chunking": {
    whatIs: "Text chunking splits long documents into smaller, semantically coherent pieces so that embeddings capture focused meaning and retrieval returns precise passages rather than entire documents.",
    whereUsed: "LangChain `RecursiveCharacterTextSplitter` and LlamaIndex `SentenceSplitter` are standard; the chunk strategy directly impacts RAG answer quality and is tuned per use case.",
    howToBuild: "Use `RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_documents(docs)` and print the first few chunks to inspect boundaries; adjust separators for Markdown or code.",
  },
  "chunk-size": {
    whatIs: "Chunk size is the maximum number of characters or tokens in each text chunk, controlling the granularity of retrieval — smaller chunks give precise snippets, larger chunks provide richer context.",
    whereUsed: "Typical RAG setups use 256–1024 tokens; OpenAI's file search uses ~800-token chunks; LlamaIndex and Haystack expose chunk size as a tunable parameter that trades recall against noise.",
    howToBuild: "Run retrieval with chunk sizes 256, 512, and 1024 on the same corpus, measure recall@5 against a labelled QA set, and pick the size that maximises answer accuracy.",
  },
  "chunk-overlap": {
    whatIs: "Chunk overlap is the number of characters or tokens shared between adjacent chunks, ensuring that semantically related content split across a boundary is not lost during retrieval.",
    whereUsed: "LangChain's default overlap is 10-20% of chunk size; LlamaIndex and Haystack set overlap to preserve context around split points; too much overlap wastes storage, too little loses context.",
    howToBuild: "Use `RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)` and verify chunks 0 and 1 share the last 100 chars of chunk 0; sweep overlap 0-200 and measure retrieval recall.",
  },
  "embeddings": {
    whatIs: "Embeddings are dense vector representations of text produced by an embedding model, capturing semantic meaning so that similar passages map to nearby points in vector space for similarity search.",
    whereUsed: "OpenAI `text-embedding-3-large`, `BAAI/bge-large-en`, and `sentence-transformers/all-MiniLM-L6-v2` are common embedding models used in LangChain/LlamaIndex RAG pipelines.",
    howToBuild: "Load `SentenceTransformer('all-MiniLM-L6-v2')`, call `model.encode(chunks)` to get a `(n, 384)` numpy array, and verify similar chunks have high `cosine_similarity` scores.",
  },
  "vector-database": {
    whatIs: "A vector database is a system that stores embedding vectors with metadata and supports fast approximate nearest-neighbour search, forming the retrieval backbone of a RAG system.",
    whereUsed: "Pinecone, Weaviate, Milvus, Qdrant, and pgvector are used in production RAG; FAISS and Chroma are popular for local prototyping with LangChain.",
    howToBuild: "Use `chromadb.Client().create_collection(\"docs\")`, call `.add(ids=..., embeddings=..., documents=...)`, then `.query(query_embeddings=..., n_results=5)` to retrieve top chunks.",
  },
  "similarity-search": {
    whatIs: "Similarity search is the operation of finding the k nearest vectors to a query embedding in a vector database, returning the most semantically similar stored passages.",
    whereUsed: "Every RAG pipeline performs similarity search before generation; FAISS `IndexFlatIP.search`, Qdrant `.search()`, and pgvector `<=>` operator implement this under the hood.",
    howToBuild: "Build a FAISS `IndexFlatL2(d)`, call `.add(vectors)` and `.search(query_vec, k=5)` to get indices and distances, then map indices back to original chunk text for the prompt.",
  },
  "retrieval": {
    whatIs: "Retrieval is the end-to-end step of embedding a user query, searching the vector store, and returning the top-k relevant chunks that will be inserted into the LLM prompt as grounding context.",
    whereUsed: "LangChain `retriever.get_relevant_documents(query)` and LlamaIndex `index.as_retriever().retrieve(query)` wrap this step; production systems add hybrid search and reranking on top.",
    howToBuild: "Create `retriever = vectorstore.as_retriever(search_kwargs={\"k\": 5})`, call `docs = retriever.invoke(query)`, and concatenate `doc.page_content` for each result into a context string.",
  },
  "reranking": {
    whatIs: "Reranking takes an initial set of retrieved documents and re-scores them with a more powerful cross-encoder model that jointly reads query and document, improving precision over bi-encoder retrieval.",
    whereUsed: "Cohere Rerank, `BAAI/bge-reranker-large`, and `cross-encoder/ms-marco-MiniLM-L-6-v2` are used in LangChain `ContextualCompressionRetriever` and LlamaIndex `CohereRerank` nodes.",
    howToBuild: "Load `CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')`, call `model.rank(query, retrieved_docs)` to get scores, sort docs by score, and keep the top-3 for prompt context.",
  },
  "context-construction": {
    whatIs: "Context construction is the step of assembling the retrieved chunks, a system prompt, and the user query into a single prompt string that is sent to the LLM for grounded generation.",
    whereUsed: "LangChain prompt templates and LlamaIndex `PromptHelper` construct context; production RAG systems also inject metadata, citations, and token-budget truncation logic here.",
    howToBuild: "Build a template string `f\"Context: {context}\\n\\nQuestion: {query}\\nAnswer:\"` where `context = \"\\n\".join(doc.page_content for doc in retrieved)`, and pass it to the LLM.",
  },
  "grounded-generation": {
    whatIs: "Grounded generation is the final LLM call in a RAG pipeline that produces an answer conditioned on the retrieved context, ideally staying faithful to the provided documents and citing them.",
    whereUsed: "Perplexity, ChatGPT file search, and enterprise RAG apps use grounded generation; guardrails like NeMo Guardrails and LlamaIndex response synthesizers enforce faithfulness.",
    howToBuild: "Call `llm.invoke(rag_prompt)` where `rag_prompt` includes retrieved context; add an instruction like `\"Answer only using the context; if not found, say 'I don't know.'\"` to reduce hallucination.",
  },
};