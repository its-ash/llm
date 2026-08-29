# LLM Learning Website — Topic → Subtopic → Design / Interactive Logic

## 01. Computer & Python Foundations

### Python
- Design: Interactive code editor with input/output panel.
- Interactive Logic: Let the learner modify a small Python example and run it against predefined test cases.

### NumPy
- Design: Array/matrix playground.
- Interactive Logic: Change array values and operations; visualize the resulting array immediately.

### Tensors
- Design: Tensor shape explorer.
- Interactive Logic: Add/remove dimensions and show shape, rank, indexing, and memory representation.

### Tensor Operations
- Design: Operation visualizer.
- Interactive Logic: Select add, multiply, transpose, reshape, or broadcasting and animate the transformation.

### Matrix Multiplication
- Design: Matrix multiplication animation.
- Interactive Logic: Highlight each row-column multiplication and show the accumulated result cell-by-cell.

### CPU vs GPU
- Design: Parallel-computation comparison.
- Interactive Logic: Run the same workload with different worker counts and visualize serial vs parallel execution.

### GPU & VRAM
- Design: Interactive VRAM allocation diagram.
- Interactive Logic: Change model size, precision, batch size, and context length; update estimated memory usage.


## 02. Mathematics

### Scalars
- Design: Number-line playground.
- Interactive Logic: Change scalar values and observe operations.

### Vectors
- Design: 2D vector canvas.
- Interactive Logic: Drag vector endpoints and display magnitude, direction, and coordinates.

### Matrices
- Design: Matrix grid with transformation canvas.
- Interactive Logic: Modify matrix values and show how points/vectors transform.

### Dot Product
- Design: Two-vector angle visualizer.
- Interactive Logic: Rotate vectors and display dot product, magnitude, and angle.

### Norms
- Design: Distance visualization.
- Interactive Logic: Compare L1, L2, and other norms for the same vector.

### Probability
- Design: Probability distribution playground.
- Interactive Logic: Adjust probabilities and normalize the distribution automatically.

### Sampling
- Design: Random sampling simulator.
- Interactive Logic: Repeatedly sample from a distribution and build a live histogram.

### Derivatives
- Design: Interactive function graph.
- Interactive Logic: Drag a point and display the tangent line and derivative at that point.

### Gradients
- Design: 3D loss surface.
- Interactive Logic: Move the current point and show the gradient direction.

### Chain Rule
- Design: Computational graph.
- Interactive Logic: Change inputs and animate forward values and backward gradients.

### Gradient Descent
- Design: Loss landscape with moving parameter point.
- Interactive Logic: Adjust learning rate and optimizer; animate parameter updates.


## 03. Machine Learning

### Machine Learning
- Design: Input → Model → Prediction pipeline.
- Interactive Logic: Change model parameters and show prediction changes.

### Dataset
- Design: Dataset table + scatter plot.
- Interactive Logic: Add/remove examples and observe model behavior.

### Training
- Design: Training dashboard.
- Interactive Logic: Start/stop training and display loss and parameter changes.

### Validation
- Design: Train/validation split visualizer.
- Interactive Logic: Change split ratio and show effects on evaluation.

### Inference
- Design: Model playground.
- Interactive Logic: Enter an input and visualize model processing and prediction.

### Loss
- Design: Prediction vs target visualization.
- Interactive Logic: Change prediction and show loss value and gradient.

### Overfitting
- Design: Model complexity slider.
- Interactive Logic: Increase model complexity and visualize training vs validation error.

### Generalization
- Design: Training/test distribution visualizer.
- Interactive Logic: Generate new samples and compare model performance.


## 04. Neural Networks

### Perceptron
- Design: 2D classification canvas.
- Interactive Logic: Add points, move the decision boundary, and train the perceptron.

### Neuron
- Design: Single-neuron calculator.
- Interactive Logic: Adjust inputs, weights, and bias; animate weighted sum.

### Weights
- Design: Network connection visualization.
- Interactive Logic: Change a weight and highlight all downstream effects.

### Bias
- Design: Decision-boundary visualizer.
- Interactive Logic: Adjust bias and show boundary movement.

### Activation Functions
- Design: Function comparison graph.
- Interactive Logic: Switch between sigmoid, tanh, ReLU, and GELU.

### Forward Propagation
- Design: Animated neural network.
- Interactive Logic: Send an input through the network and animate values layer-by-layer.

### Cross Entropy
- Design: Probability/loss visualization.
- Interactive Logic: Change predicted probability for the correct class and show loss.

### Backpropagation
- Design: Reverse-flow network animation.
- Interactive Logic: Run backward propagation and display gradients on each connection.

### SGD
- Design: Optimization trajectory.
- Interactive Logic: Adjust learning rate and batch size; animate parameter movement.

### Adam / AdamW
- Design: Optimizer comparison.
- Interactive Logic: Run multiple optimizers on the same loss surface and compare trajectories.

### Batch
- Design: Dataset batching animation.
- Interactive Logic: Change batch size and show which samples enter each update.

### Epoch
- Design: Dataset-pass timeline.
- Interactive Logic: Run epochs and show how many times each example has been processed.


## 05. NLP

### Text Representation
- Design: Text transformation pipeline.
- Interactive Logic: Convert the same sentence through character, word, one-hot, and embedding representations.

### One-Hot Encoding
- Design: Vocabulary matrix.
- Interactive Logic: Select a word and highlight its one-hot vector.

### Bag of Words
- Design: Document-term matrix.
- Interactive Logic: Add documents and visualize word frequencies.

### TF-IDF
- Design: Document-term heatmap.
- Interactive Logic: Change documents and show how term importance changes.

### RNN
- Design: Unrolled sequence diagram.
- Interactive Logic: Step through tokens and show hidden-state changes.

### LSTM
- Design: Cell/gate visualization.
- Interactive Logic: Step through a sequence and animate forget, input, and output gates.

### GRU
- Design: Simplified recurrent-cell visualization.
- Interactive Logic: Compare GRU state updates with RNN/LSTM.


## 06. Tokenization

### Tokenization
- Design: Text → tokens interactive viewer.
- Interactive Logic: Type text and highlight token boundaries in real time.

### Character Tokenization
- Design: Character sequence.
- Interactive Logic: Split text into characters and display token IDs.

### Word Tokenization
- Design: Word segmentation viewer.
- Interactive Logic: Show punctuation and whitespace handling.

### Subword Tokenization
- Design: Token-merging animation.
- Interactive Logic: Start from characters and animate subword merges.

### BPE
- Design: BPE training playground.
- Interactive Logic: Display pair frequencies, select merges, and rebuild vocabulary step-by-step.

### WordPiece
- Design: Subword segmentation viewer.
- Interactive Logic: Compare WordPiece segmentation with BPE.

### SentencePiece
- Design: Tokenization comparison playground.
- Interactive Logic: Tokenize the same text with different segmentation strategies.

### Vocabulary
- Design: Searchable vocabulary table.
- Interactive Logic: Search tokens and inspect token IDs and frequencies.

### Token IDs
- Design: Token ↔ ID mapping.
- Interactive Logic: Click a token to highlight its numeric ID and embedding row.

### Special Tokens
- Design: Special-token control panel.
- Interactive Logic: Insert BOS/EOS/PAD tokens and show their effect on sequences.

### Vocabulary Size
- Design: Vocabulary-size slider.
- Interactive Logic: Show how vocabulary size affects tokenization and embedding parameters.

### Token Count
- Design: Live token counter.
- Interactive Logic: Type text and display characters, tokens, estimated context usage, and token IDs.


## 07. Embeddings

### Token Embeddings
- Design: Token-to-vector visualization.
- Interactive Logic: Select a token and display its embedding vector.

### Embedding Matrix
- Design: Matrix viewer.
- Interactive Logic: Select token IDs and highlight corresponding rows.

### Embedding Dimension
- Design: Dimension comparison.
- Interactive Logic: Change embedding dimension and display parameter count.

### Semantic Representation
- Design: 2D/3D embedding space.
- Interactive Logic: Search words and highlight nearby representations.

### Vector Space
- Design: Interactive point cloud.
- Interactive Logic: Rotate, zoom, filter, and select points.

### Cosine Similarity
- Design: Two-vector comparison.
- Interactive Logic: Drag vectors and update cosine similarity and angle.

### Semantic Search
- Design: Query + vector-space visualization.
- Interactive Logic: Enter a query and animate nearest-neighbor retrieval.


## 08. Positional Information

### Token Position
- Design: Token sequence with position labels.
- Interactive Logic: Move tokens and update positional indices.

### Positional Encoding
- Design: Encoding heatmap.
- Interactive Logic: Change sequence length and dimensions and regenerate encodings.

### Sinusoidal Encoding
- Design: Sine/cosine graph + heatmap.
- Interactive Logic: Change position/dimension and inspect encoding values.

### Learned Positional Embeddings
- Design: Position embedding matrix.
- Interactive Logic: Inspect the learned vector associated with each position.

### Relative Position
- Design: Token-distance matrix.
- Interactive Logic: Select two tokens and display their relative distance.

### RoPE
- Design: Rotating-vector visualization.
- Interactive Logic: Change position and visualize vector rotation.


## 09. Attention

### Attention
- Design: Token-to-token connection graph.
- Interactive Logic: Select a token and highlight where it attends.

### Self-Attention
- Design: Attention heatmap.
- Interactive Logic: Type a sentence and generate an attention matrix.

### Query
- Design: Q-vector inspector.
- Interactive Logic: Select a token and display its query representation.

### Key
- Design: Key-vector inspector.
- Interactive Logic: Compare the selected query against all keys.

### Value
- Design: Value-flow visualization.
- Interactive Logic: Highlight which values contribute to the output.

### Q/K/V Matrices
- Design: Three synchronized matrix viewers.
- Interactive Logic: Select a token and synchronize Q, K, and V rows.

### Attention Scores
- Design: Score matrix heatmap.
- Interactive Logic: Show QKᵀ calculation cell-by-cell.

### Scaled Dot-Product Attention
- Design: Formula pipeline.
- Interactive Logic: Toggle scaling and compare score magnitudes.

### Softmax
- Design: Logit-to-probability animation.
- Interactive Logic: Change logits and visualize normalized probabilities.

### Attention Weights
- Design: Token heatmap.
- Interactive Logic: Hover a cell to display the exact attention weight.

### Causal Attention
- Design: Triangular attention matrix.
- Interactive Logic: Move through sequence positions and show which tokens are accessible.

### Attention Mask
- Design: Interactive mask grid.
- Interactive Logic: Toggle individual connections and recompute attention.


## 10. Multi-Head Attention

### Attention Head
- Design: Individual-head visualizer.
- Interactive Logic: Switch heads and compare their attention patterns.

### Multiple Attention Heads
- Design: Parallel attention panels.
- Interactive Logic: Change number of heads and display each head separately.

### Head Dimension
- Design: Dimension calculator.
- Interactive Logic: Change model dimension and number of heads and calculate head dimension.

### QKV Projection
- Design: Projection pipeline.
- Interactive Logic: Show input embedding becoming Q, K, and V.

### Concatenation
- Design: Head-output stacking visualization.
- Interactive Logic: Combine head outputs and inspect dimensions.

### Output Projection
- Design: Final linear transformation.
- Interactive Logic: Show concatenated heads entering the output projection.


## 11. Transformer

### Transformer Architecture
- Design: Fully animated Transformer block.
- Interactive Logic: Step through each operation.

### Transformer Block
- Design: Expandable architecture diagram.
- Interactive Logic: Click each component to inspect its input/output shape.

### Feed-Forward Network
- Design: Neuron expansion/compression animation.
- Interactive Logic: Change hidden dimension and visualize the transformation.

### Residual Connection
- Design: Skip-connection animation.
- Interactive Logic: Toggle residual connection and compare outputs.

### Layer Normalization
- Design: Distribution visualization.
- Interactive Logic: Change input distribution and show normalization.

### Dropout
- Design: Neuron masking animation.
- Interactive Logic: Adjust dropout probability and randomly disable connections.

### Encoder
- Design: Encoder stack visualization.
- Interactive Logic: Step through layers and inspect representations.

### Decoder
- Design: Decoder stack visualization.
- Interactive Logic: Show causal attention and generation flow.

### Decoder-Only Transformer
- Design: GPT-style architecture.
- Interactive Logic: Trace a token through all layers.

### GPT Architecture
- Design: Complete GPT pipeline.
- Interactive Logic: Click any component and show tensor shapes, parameters, and computation.


## 12. Language Modeling

### Language Model
- Design: Next-token prediction interface.
- Interactive Logic: Enter context and display candidate next tokens.

### Next-Token Prediction
- Design: Probability-bar visualization.
- Interactive Logic: Select a token and append it to the context.

### Autoregressive Generation
- Design: Token-by-token timeline.
- Interactive Logic: Generate one token at a time and animate the growing sequence.

### Logits
- Design: Raw-score bar chart.
- Interactive Logic: Compare logits before softmax.

### Probability Distribution
- Design: Probability bars.
- Interactive Logic: Sort, filter, and inspect token probabilities.

### Causal Language Modeling
- Design: Input/target alignment.
- Interactive Logic: Show each input position predicting the next token.


## 13. Text Generation

### Greedy Decoding
- Design: Highest-probability token selector.
- Interactive Logic: Highlight the maximum-probability token at every step.

### Random Sampling
- Design: Probability-wheel sampler.
- Interactive Logic: Sample repeatedly and show frequency distribution.

### Temperature
- Design: Distribution slider.
- Interactive Logic: Change temperature and animate probability redistribution.

### Top-K
- Design: Ranked-token filter.
- Interactive Logic: Change K and highlight remaining candidates.

### Top-P
- Design: Cumulative-probability selector.
- Interactive Logic: Change P and show the selected candidate set.

### Repetition Penalty
- Design: Token-probability comparison.
- Interactive Logic: Repeat tokens and show their adjusted probabilities.

### Beam Search
- Design: Search tree.
- Interactive Logic: Change beam width and animate candidate sequences.


## 14. Stopping Generation

### EOS Token
- Design: Generation timeline.
- Interactive Logic: Highlight EOS and stop generation when selected.

### Stop Conditions
- Design: Generation control panel.
- Interactive Logic: Toggle EOS, maximum tokens, and stop-sequence conditions.

### Stop Sequences
- Design: Streaming text monitor.
- Interactive Logic: Define a stop string and stop generation when it appears.

### Maximum Tokens
- Design: Token budget meter.
- Interactive Logic: Set a limit and show remaining generation budget.

### Maximum Context Length
- Design: Context-window meter.
- Interactive Logic: Fill the context and show when the model can no longer accept additional tokens.

### Generation Loop
- Design: Step-by-step execution diagram.
- Interactive Logic: Run one generation iteration at a time.


## 15. LLM Architecture

### Model Parameters
- Design: Parameter map.
- Interactive Logic: Click a component to inspect its parameter tensors.

### Parameter Count
- Design: Parameter calculator.
- Interactive Logic: Change layers, hidden dimension, vocabulary, and heads and update total parameters.

### Weight Matrices
- Design: Matrix explorer.
- Interactive Logic: Select a layer and inspect its matrices.

### Embedding Parameters
- Design: Vocabulary × embedding-dimension calculator.
- Interactive Logic: Change vocabulary and dimension.

### Attention Parameters
- Design: Q/K/V/output projection calculator.
- Interactive Logic: Calculate parameter contribution from attention.

### Feed-Forward Parameters
- Design: FFN parameter calculator.
- Interactive Logic: Change hidden dimensions and compare parameter count.

### Model Depth
- Design: Layer-stack visualization.
- Interactive Logic: Add/remove Transformer blocks.

### Model Width
- Design: Hidden-dimension visualization.
- Interactive Logic: Change hidden dimension and display compute/parameter impact.

### Number of Heads
- Design: Head configuration control.
- Interactive Logic: Change head count and update head dimensions.


## 16. Context Window

### Context Window
- Design: Horizontal token-window visualization.
- Interactive Logic: Add text and watch the window fill.

### Sequence Length
- Design: Sequence-length slider.
- Interactive Logic: Change sequence length and show memory/compute implications.

### Prompt Tokens
- Design: Prompt token counter.
- Interactive Logic: Highlight prompt tokens separately from generated tokens.

### Generated Tokens
- Design: Generation counter.
- Interactive Logic: Increment generated tokens and update context usage.

### Long Context
- Design: Zoomable context timeline.
- Interactive Logic: Navigate through very long sequences.

### Context Limit
- Design: Capacity meter.
- Interactive Logic: Exceed the limit and demonstrate truncation/rejection behavior.


## 17. LLM Training

### Pretraining
- Design: Full training pipeline.
- Interactive Logic: Animate dataset → tokens → batches → model → loss → update.

### Training Dataset
- Design: Dataset explorer.
- Interactive Logic: Filter and inspect training examples.

### Data Cleaning
- Design: Before/after document viewer.
- Interactive Logic: Toggle cleaning operations and show removed/modified content.

### Data Filtering
- Design: Filter pipeline.
- Interactive Logic: Adjust filtering rules and display retained data.

### Data Deduplication
- Design: Duplicate-document graph.
- Interactive Logic: Detect and group similar documents.

### Training Samples
- Design: Sliding-window tokenizer.
- Interactive Logic: Move sequence window through text and show input/target pairs.

### Batch Construction
- Design: Sample-to-batch animation.
- Interactive Logic: Change batch size and show batch composition.

### Forward Pass
- Design: Model execution animation.
- Interactive Logic: Trace tensors through the network.

### Loss Calculation
- Design: Prediction vs target panel.
- Interactive Logic: Select target token and inspect cross-entropy loss.

### Backpropagation
- Design: Reverse gradient animation.
- Interactive Logic: Step backward through each layer.

### Weight Updates
- Design: Before/after weight matrix.
- Interactive Logic: Apply one optimizer step and visualize weight changes.

### Learning Rate
- Design: Slider + training graph.
- Interactive Logic: Compare low, useful, and excessive learning rates.

### Learning Rate Scheduling
- Design: Learning-rate curve.
- Interactive Logic: Switch schedules and compare training trajectories.

### Checkpoints
- Design: Training timeline.
- Interactive Logic: Save/restore checkpoints and compare model states.

### Validation
- Design: Training vs validation loss graph.
- Interactive Logic: Run validation periodically and detect overfitting.


## 18. Build a Small LLM

### Book Dataset
- Design: Book reader + dataset panel.
- Interactive Logic: Select a book and inspect extracted text.

### Text Extraction
- Design: Raw-book-to-text pipeline.
- Interactive Logic: Display raw content and extracted training text.

### Text Cleaning
- Design: Cleaning preview.
- Interactive Logic: Toggle whitespace, metadata, and unwanted-content removal.

### Tokenizer
- Design: Tokenizer playground.
- Interactive Logic: Build/use tokenizer and inspect tokens.

### Training Sequences
- Design: Sliding context window.
- Interactive Logic: Adjust sequence length and stride.

### Embeddings
- Design: Token embedding flow.
- Interactive Logic: Select token and trace it into the embedding matrix.

### Transformer
- Design: Small GPT architecture builder.
- Interactive Logic: Change layers, heads, and hidden dimension.

### Training Loop
- Design: Live training dashboard.
- Interactive Logic: Start training and observe loss, learning rate, and steps.

### Text Generation
- Design: Interactive local-model chat.
- Interactive Logic: Change sampling parameters and generate text from the trained model.

### Model Inspection
- Design: Layer/parameter explorer.
- Interactive Logic: Inspect weights, activations, attention maps, and generated tokens.


## 19. Model Precision

### Floating-Point Numbers
- Design: Bit-level representation.
- Interactive Logic: Inspect sign, exponent, and mantissa.

### FP32
- Design: 32-bit representation.
- Interactive Logic: Enter a number and inspect its representation.

### FP16
- Design: 16-bit comparison.
- Interactive Logic: Compare FP16 and FP32 representation/error.

### BF16
- Design: BF16 vs FP16 vs FP32 comparison.
- Interactive Logic: Compare numerical range and precision.

### Mixed Precision
- Design: Layer precision map.
- Interactive Logic: Assign different precisions to model components and estimate memory.


## 20. Quantization

### Quantization
- Design: Floating-point → integer visualizer.
- Interactive Logic: Select precision and watch values map to discrete levels.

### Dequantization
- Design: Integer → approximate floating-point reconstruction.
- Interactive Logic: Compare original and reconstructed values.

### Quantization Scale
- Design: Scale-factor visualizer.
- Interactive Logic: Adjust scale and display quantization error.

### Zero Point
- Design: Number-line quantizer.
- Interactive Logic: Change zero point and show mapping.

### Quantization Error
- Design: Original vs quantized graph.
- Interactive Logic: Calculate absolute and relative error.

### Symmetric Quantization
- Design: Centered quantization levels.
- Interactive Logic: Compare symmetric and asymmetric ranges.

### Asymmetric Quantization
- Design: Offset quantization levels.
- Interactive Logic: Change zero point and observe range.

### INT8
- Design: 8-bit representation explorer.
- Interactive Logic: Compare storage and reconstruction error.

### INT4
- Design: 4-bit quantization visualizer.
- Interactive Logic: Compare FP16/INT8/INT4 memory and error.

### Weight Quantization
- Design: Model-weight matrix before/after.
- Interactive Logic: Quantize selected layers and display error.

### Activation Quantization
- Design: Activation histogram.
- Interactive Logic: Apply quantization and show clipping/error.

### Post-Training Quantization
- Design: Finished-model quantization pipeline.
- Interactive Logic: Quantize a trained model without retraining and compare results.

### Quantization-Aware Training
- Design: Training loop with simulated quantization.
- Interactive Logic: Compare normal training with quantization-aware training.

### Quantized Inference
- Design: Inference memory/latency comparison.
- Interactive Logic: Change precision and compare estimated memory and throughput.


## 21. GPU & Memory

### VRAM
- Design: GPU memory meter.
- Interactive Logic: Change model configuration and display memory usage.

### Model Memory
- Design: Model-size calculator.
- Interactive Logic: Change parameter count and precision.

### Weight Memory
- Design: Weight-storage visualization.
- Interactive Logic: Compare FP32, FP16, BF16, INT8, and INT4.

### Activation Memory
- Design: Activation tensor timeline.
- Interactive Logic: Change batch and sequence length.

### Gradient Memory
- Design: Training-memory diagram.
- Interactive Logic: Toggle training/inference and compare memory.

### Optimizer Memory
- Design: Optimizer-state allocation diagram.
- Interactive Logic: Switch optimizer and show additional memory.

### KV Cache Memory
- Design: Cache-growth visualization.
- Interactive Logic: Change context length, layers, heads, and precision.


## 22. KV Cache

### Key Cache
- Design: Layer-by-layer cache matrix.
- Interactive Logic: Generate tokens and watch keys accumulate.

### Value Cache
- Design: Layer-by-layer cache matrix.
- Interactive Logic: Generate tokens and watch values accumulate.

### KV Cache
- Design: Before/after caching comparison.
- Interactive Logic: Compare repeated computation with cached computation.

### Cache Growth
- Design: Memory-over-time graph.
- Interactive Logic: Change context length and show cache growth.

### Prefix Caching
- Design: Shared-prefix tree.
- Interactive Logic: Submit prompts sharing a prefix and show reused computation.


## 23. Fine-Tuning

### Fine-Tuning
- Design: Base model → fine-tuned model pipeline.
- Interactive Logic: Compare model behavior before and after training.

### Pretraining vs Fine-Tuning
- Design: Side-by-side training comparison.
- Interactive Logic: Change dataset size/type and show different objectives.

### Supervised Fine-Tuning
- Design: Instruction/response dataset.
- Interactive Logic: Create examples and run a simplified training simulation.

### Instruction Tuning
- Design: Instruction-following playground.
- Interactive Logic: Compare base and instruction-tuned behavior.

### Catastrophic Forgetting
- Design: Capability radar/chart.
- Interactive Logic: Fine-tune on a narrow dataset and track previous-task performance.

### PEFT
- Design: Frozen vs trainable parameter map.
- Interactive Logic: Toggle PEFT methods and compare trainable parameters.


## 24. LoRA

### Low-Rank Adaptation
- Design: Frozen model + low-rank adapter diagram.
- Interactive Logic: Change LoRA rank and visualize parameter reduction.

### Frozen Weights
- Design: Model parameter map.
- Interactive Logic: Highlight frozen parameters.

### Trainable Adapters
- Design: Adapter overlay.
- Interactive Logic: Toggle adapters and inspect trainable components.

### Low-Rank Matrices
- Design: A × B matrix reconstruction visualizer.
- Interactive Logic: Change rank and compare reconstructed update.

### LoRA Rank
- Design: Rank slider.
- Interactive Logic: Show parameter count and representational capacity as rank changes.

### LoRA Merging
- Design: Base + adapter merge animation.
- Interactive Logic: Merge/unmerge adapters and inspect resulting weights.

### QLoRA
- Design: Quantized base model + LoRA adapter.
- Interactive Logic: Compare memory requirements with regular fine-tuning.


## 25. Alignment

### Human Preferences
- Design: Pairwise response comparison.
- Interactive Logic: Choose preferred response and build preference data.

### Preference Data
- Design: Preference dataset table.
- Interactive Logic: Add chosen/rejected response pairs.

### Reward Model
- Design: Preference → reward visualization.
- Interactive Logic: Change response quality features and observe reward score.

### RLHF
- Design: Complete RLHF pipeline.
- Interactive Logic: Step through supervised model → reward model → policy optimization.

### PPO
- Design: Policy-update visualization.
- Interactive Logic: Show old/new policy probabilities and update constraints.

### DPO
- Design: Chosen vs rejected probability comparison.
- Interactive Logic: Change model probabilities and calculate preference objective.


## 26. RAG

### Retrieval-Augmented Generation
- Design: End-to-end RAG pipeline.
- Interactive Logic: Run query through retrieval and generation stages.

### Document Loading
- Design: Document ingestion panel.
- Interactive Logic: Add documents and show extracted text.

### Text Chunking
- Design: Document chunk viewer.
- Interactive Logic: Change chunk size and overlap.

### Chunk Size
- Design: Chunk boundary visualization.
- Interactive Logic: Adjust chunk size and compare retrieval units.

### Chunk Overlap
- Design: Overlapping-window visualization.
- Interactive Logic: Increase overlap and display resulting chunks.

### Embeddings
- Design: Document embedding map.
- Interactive Logic: Embed chunks and visualize clusters.

### Vector Database
- Design: Vector-index visualization.
- Interactive Logic: Add/remove vectors and search the index.

### Similarity Search
- Design: Query-to-nearest-vectors animation.
- Interactive Logic: Change similarity metric and inspect ranking.

### Retrieval
- Design: Top-k retrieval panel.
- Interactive Logic: Change k and compare retrieved chunks.

### Reranking
- Design: Retrieval ranking pipeline.
- Interactive Logic: Compare initial retrieval order with reranked order.

### Context Construction
- Design: Prompt assembly view.
- Interactive Logic: Select retrieved chunks and build final context.

### Grounded Generation
- Design: Context + query → answer.
- Interactive Logic: Highlight answer spans supported by retrieved context.


## 27. Vector Search

### Vector Database
- Design: Interactive vector-space database.
- Interactive Logic: Insert, search, and remove vectors.

### Vector Index
- Design: Index structure visualization.
- Interactive Logic: Compare brute-force and approximate search.

### Nearest Neighbor Search
- Design: Query point + neighbors.
- Interactive Logic: Move query point and update nearest neighbors.

### Approximate Nearest Neighbor
- Design: Search-path animation.
- Interactive Logic: Adjust search parameters and compare speed vs recall.

### Cosine Similarity
- Design: Vector-angle visualization.
- Interactive Logic: Rotate vectors and update similarity.

### Dot Product
- Design: Vector score comparison.
- Interactive Logic: Compare dot-product ranking with cosine ranking.

### Euclidean Distance
- Design: Distance circles.
- Interactive Logic: Move points and update distances.

### Metadata Filtering
- Design: Search + filter controls.
- Interactive Logic: Apply metadata filters before/after vector search.

### Hybrid Search
- Design: Keyword + vector search pipeline.
- Interactive Logic: Adjust weighting between lexical and semantic scores.

### Reranking
- Design: Candidate-ranking visualization.
- Interactive Logic: Compare retrieval score with reranker score.


## 28. Function Calling

### Tools
- Design: Tool registry.
- Interactive Logic: Add/remove tools and display their schemas.

### Tool Definitions
- Design: JSON schema editor.
- Interactive Logic: Modify tool parameters and validate schema.

### Tool Selection
- Design: Model-to-tool decision flow.
- Interactive Logic: Enter a request and show candidate tool selection.

### Structured Output
- Design: JSON output validator.
- Interactive Logic: Change generated fields and validate against schema.

### Function Arguments
- Design: Argument inspector.
- Interactive Logic: Generate/edit arguments and validate types.

### Tool Execution
- Design: LLM → tool → result animation.
- Interactive Logic: Execute a simulated tool and return structured results.

### Tool Calling Loop
- Design: Multi-step execution timeline.
- Interactive Logic: Run repeated tool calls until a final answer is produced.


## 29. Agents

### AI Agents
- Design: Goal-driven agent workspace.
- Interactive Logic: Give an objective and watch planning/action steps.

### Agent Loop
- Design: Observe → think → act cycle.
- Interactive Logic: Step through each loop iteration.

### Planning
- Design: Task decomposition tree.
- Interactive Logic: Break a goal into subgoals and reorder them.

### Reasoning
- Design: Decision-state visualization.
- Interactive Logic: Show high-level decision steps without exposing private chain-of-thought.

### Actions
- Design: Action execution panel.
- Interactive Logic: Select and execute available tools.

### Observations
- Design: Environment-state panel.
- Interactive Logic: Feed tool/environment results back into the agent loop.

### Memory
- Design: Short-term/long-term memory panels.
- Interactive Logic: Add, retrieve, and remove simulated memories.

### Multi-Step Tasks
- Design: Task timeline.
- Interactive Logic: Execute multiple dependent actions and show state changes.


## 30. Inference

### LLM Inference
- Design: Request-to-token pipeline.
- Interactive Logic: Trace a request from input through prefill and decoding.

### Prefill
- Design: Parallel prompt-processing visualization.
- Interactive Logic: Change prompt length and show computation.

### Decode
- Design: Token-by-token generation visualization.
- Interactive Logic: Generate one token per step.

### Token Generation
- Design: Live token stream.
- Interactive Logic: Pause generation and inspect current probabilities.

### Inference Latency
- Design: Latency timeline.
- Interactive Logic: Change model, batch, context, and precision.

### Throughput
- Design: Requests/tokens-per-second dashboard.
- Interactive Logic: Increase concurrency and observe throughput.

### Batch Inference
- Design: Multiple-request batching animation.
- Interactive Logic: Change batch size and show request grouping.

### Continuous Batching
- Design: Dynamic batch timeline.
- Interactive Logic: Add/remove requests while generation is running.

### Streaming
- Design: Token-stream output.
- Interactive Logic: Adjust simulated token delay and observe streaming behavior.


## 31. Inference Optimization

### Flash Attention
- Design: Attention-memory comparison.
- Interactive Logic: Compare conceptual standard attention and memory-efficient attention.

### Speculative Decoding
- Design: Draft-model → verification-model animation.
- Interactive Logic: Change draft length and acceptance rate.

### Memory Optimization
- Design: VRAM allocation dashboard.
- Interactive Logic: Toggle optimizations and compare memory.

### Compute Optimization
- Design: FLOPs/throughput dashboard.
- Interactive Logic: Change sequence length and model dimensions.


## 32. Distributed Training

### Distributed Computing
- Design: Multi-GPU cluster.
- Interactive Logic: Add/remove GPUs and distribute work.

### Data Parallelism
- Design: Dataset replicas across GPUs.
- Interactive Logic: Change GPU count and visualize gradient synchronization.

### Tensor Parallelism
- Design: Matrix sharding visualization.
- Interactive Logic: Split matrices across GPUs and reconstruct results.

### Pipeline Parallelism
- Design: Layer stages across GPUs.
- Interactive Logic: Move layers between stages and animate microbatches.

### Model Parallelism
- Design: Model partition map.
- Interactive Logic: Assign model components to different GPUs.

### GPU Communication
- Design: GPU-to-GPU network diagram.
- Interactive Logic: Change communication volume and visualize transfer overhead.

### Communication Overhead
- Design: Compute vs communication timeline.
- Interactive Logic: Increase GPU count and show scaling efficiency.


## 33. Mixture of Experts

### Mixture of Experts
- Design: Router + expert network.
- Interactive Logic: Send tokens through router and highlight selected experts.

### Expert Networks
- Design: Parallel expert modules.
- Interactive Logic: Inspect each expert's activation.

### Router
- Design: Routing probability bars.
- Interactive Logic: Change token representation and show routing probabilities.

### Routing
- Design: Token-to-expert graph.
- Interactive Logic: Change top-k routing and visualize assignments.

### Sparse Activation
- Design: Active/inactive expert map.
- Interactive Logic: Compare dense activation with sparse activation.

### Load Balancing
- Design: Expert utilization histogram.
- Interactive Logic: Change routing distribution and detect overloaded experts.


## 34. Multimodal LLMs

### Multimodal Models
- Design: Text/image/audio input workspace.
- Interactive Logic: Combine modalities and visualize the processing pipeline.

### Vision-Language Models
- Design: Image + text alignment view.
- Interactive Logic: Select image regions and inspect associated representations.

### Image Embeddings
- Design: Image-to-vector pipeline.
- Interactive Logic: Compare image embeddings in a vector space.

### Vision Encoder
- Design: Image patch visualization.
- Interactive Logic: Split an image into patches and trace them into representations.

### Audio Models
- Design: Waveform → representation visualization.
- Interactive Logic: Change audio input and display transformed representations.

### Video Understanding
- Design: Frame timeline.
- Interactive Logic: Select frames and visualize temporal processing.

### Cross-Modal Representation
- Design: Shared embedding space.
- Interactive Logic: Search text using an image and images using text.


## 35. Reasoning Models

### Reasoning
- Design: Problem-solving workflow visualization.
- Interactive Logic: Compare direct generation with additional computation.

### Test-Time Compute
- Design: Compute-budget slider.
- Interactive Logic: Increase reasoning/search budget and compare output quality in a simplified simulation.

### Verification
- Design: Candidate-answer comparison.
- Interactive Logic: Generate multiple candidates and apply a verifier.

### Search
- Design: Search tree.
- Interactive Logic: Expand/prune candidate states.

### Self-Verification
- Design: Answer → verification pipeline.
- Interactive Logic: Generate an answer, run checks, and show accepted/rejected candidates.

### Reward Signals
- Design: Reward timeline.
- Interactive Logic: Change reward values and show optimization effects.


## 36. Evaluation

### Model Evaluation
- Design: Evaluation dashboard.
- Interactive Logic: Run selected test sets and compare models.

### Training Loss
- Design: Live loss curve.
- Interactive Logic: Zoom into training steps.

### Validation Loss
- Design: Train vs validation graph.
- Interactive Logic: Detect divergence and overfitting.

### Perplexity
- Design: Token prediction confidence visualization.
- Interactive Logic: Change predictions and calculate perplexity.

### Accuracy
- Design: Correct/incorrect result grid.
- Interactive Logic: Filter failures and inspect examples.

### Benchmarking
- Design: Model comparison table/chart.
- Interactive Logic: Select benchmarks and models.

### Human Evaluation
- Design: Pairwise comparison UI.
- Interactive Logic: Rate or select preferred outputs.

### Hallucination Evaluation
- Design: Claim verification interface.
- Interactive Logic: Compare generated claims against supplied evidence.

### Latency Evaluation
- Design: Request latency distribution.
- Interactive Logic: Run simulated requests and inspect percentiles.

### Throughput Evaluation
- Design: Tokens-per-second dashboard.
- Interactive Logic: Change concurrency and measure simulated throughput.


## 37. LLM Systems

### Model Serving
- Design: Production-serving architecture.
- Interactive Logic: Configure model server, GPU count, batching, and concurrency.

### API Server
- Design: Request/response flow.
- Interactive Logic: Send simulated API requests and inspect lifecycle.

### Request Handling
- Design: Request queue.
- Interactive Logic: Add requests and visualize queueing and batching.

### Load Balancing
- Design: Multiple inference workers.
- Interactive Logic: Change worker capacity and route requests.

### GPU Allocation
- Design: GPU cluster allocation panel.
- Interactive Logic: Assign models/requests to GPUs.

### Caching
- Design: Cache-hit/miss visualization.
- Interactive Logic: Repeat requests and show cache reuse.

### Monitoring
- Design: Production dashboard.
- Interactive Logic: Change traffic and observe latency, errors, throughput, and VRAM.

### Logging
- Design: Request trace viewer.
- Interactive Logic: Inspect simulated request lifecycle.

### Cost Optimization
- Design: Cost calculator.
- Interactive Logic: Change model, traffic, tokens, GPU count, and caching.


## 38. LLM Research

### Research Papers
- Design: Paper-to-concept map.
- Interactive Logic: Select a paper and map its architecture and experiments.

### Paper Reproduction
- Design: Experiment checklist.
- Interactive Logic: Configure the reported experiment and compare results.

### Experiment Design
- Design: Experiment builder.
- Interactive Logic: Define variables, controls, metrics, and expected outcomes.

### Dataset Design
- Design: Dataset composition dashboard.
- Interactive Logic: Change dataset proportions and inspect effects.

### Architecture Experiments
- Design: Model configuration laboratory.
- Interactive Logic: Change architecture variables and compare metrics.

### Ablation Studies
- Design: Feature/component toggle matrix.
- Interactive Logic: Disable one component at a time and compare performance.

### Benchmark Design
- Design: Evaluation-suite builder.
- Interactive Logic: Select tasks and metrics and create a benchmark.

### Model Comparison
- Design: Side-by-side model laboratory.
- Interactive Logic: Run the same inputs through different configurations.

### Training Experiments
- Design: Experiment dashboard.
- Interactive Logic: Compare learning rate, batch size, model size, and dataset variations.

### Inference Experiments
- Design: Inference benchmark laboratory.
- Interactive Logic: Compare precision, context length, batch size, and decoding settings.
