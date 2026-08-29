import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "python": {
    whatIs: "Python is a high-level, interpreted programming language known for its readable syntax and extensive ecosystem of scientific computing libraries. It is the dominant language for machine learning and deep learning research.",
    whereUsed: "Python is used to implement virtually every major LLM framework — PyTorch, TensorFlow, JAX, Hugging Face Transformers, and the training scripts for GPT, Llama, and Claude all run on Python.",
    howToBuild: "Install Python 3.11+, create a virtual environment with `python -m venv venv`, install PyTorch with `pip install torch`, and write a script that creates a tensor and prints it to verify your setup.",
  },
  "numpy": {
    whatIs: "NumPy is Python's foundational library for numerical computing, providing fast n-dimensional arrays (ndarray) and vectorized math operations. It is the backbone of nearly all scientific Python packages.",
    whereUsed: "NumPy arrays underlie PyTorch tensor operations on CPU and are used for data preprocessing, tokenized dataset manipulation, and feature engineering across every ML pipeline.",
    howToBuild: "Install with `pip install numpy`, create an array with `np.array([[1,2],[3,4]])`, and practice broadcasting by adding a 1D array to a 2D array to understand shape rules.",
  },
  "tensors": {
    whatIs: "A tensor is a multi-dimensional array generalizing scalars (0D), vectors (1D), and matrices (2D) to arbitrary rank. Tensors are the core data structure in deep learning frameworks.",
    whereUsed: "Every LLM represents tokens, embeddings, attention scores, and weights as tensors. PyTorch tensors flow through transformer layers during both training and inference.",
    howToBuild: "In PyTorch, create tensors with `torch.tensor([1,2,3])` or `torch.randn(3,4)`, check their shape with `.shape`, and move them to GPU with `.to('cuda')`.",
  },
  "tensor-operations": {
    whatIs: "Tensor operations include element-wise math, reshaping, slicing, broadcasting, reduction (sum/mean), and matrix products performed on multi-dimensional arrays. These primitives compose into all neural network computations.",
    whereUsed: "Reshaping and broadcasting are used constantly in transformers — e.g., splitting the embedding into multiple heads requires `.view()` and `.transpose()` on tensors in every attention layer.",
    howToBuild: "Practice with `torch.reshape`, `torch.cat`, `torch.sum(x, dim=-1)`, and `x.transpose(1,2)` on random tensors to understand how shape manipulation drives model architecture.",
  },
  "matrix-multiplication": {
    whatIs: "Matrix multiplication is the binary operation where each element of the result is the dot product of a row from the first matrix and a column from the second. It is the single most important operation in neural networks.",
    whereUsed: "Every linear layer, embedding lookup (as matmul with one-hot), attention score computation (Q×K^T), and feed-forward network in GPT/Llama is implemented as matrix multiplication.",
    howToBuild: "Use `torch.matmul(a, b)` or the `@` operator on two 2D tensors, verify the inner dimensions match, and benchmark `torch.matmul` on GPU to see why BLAS-accelerated matmul drives modern AI.",
  },
  "cpu-vs-gpu": {
    whatIs: "CPUs have few powerful cores optimized for sequential logic and low latency, while GPUs have thousands of simpler cores optimized for parallel arithmetic throughput. Deep learning is massively parallel, so GPUs dominate.",
    whereUsed: "Training GPT-4 class models requires thousands of NVIDIA H100 GPUs; inference on Llama 3 is also GPU-bound. CPUs handle data loading, tokenization, and small-model inference.",
    howToBuild: "Compare `torch.matmul` timing on CPU vs CUDA using `time.time()` around a large matmul, moving tensors with `.to('cuda')` and back, to empirically measure the 10-100x speedup.",
  },
  "gpu-vram": {
    whatIs: "VRAM (Video RAM) is the high-bandwidth memory on a GPU that stores model weights, activations, gradients, and the optimizer state. It is the primary bottleneck for LLM size and batch size.",
    whereUsed: "An 8B-parameter model in fp16 needs ~16GB VRAM just for weights; training it with Adam adds ~32GB for optimizer state. H100s have 80GB HBM3 to fit large batch sizes for GPT-scale training.",
    howToBuild: "Inspect VRAM usage with `torch.cuda.memory_allocated()` and `nvidia-smi`, load a model, run a forward pass, and observe how activation memory scales with batch size.",
  },
};