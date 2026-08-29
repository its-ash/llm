import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "perceptron": {
    whatIs: "A perceptron is the simplest neural network — a single neuron that computes a weighted sum of inputs, adds a bias, and applies a step function. It is a linear binary classifier.",
    whereUsed: "Perceptrons are the building blocks of all neural networks. Modern LLMs use the same weighted-sum-plus-activation pattern, just with millions of neurons stacked in layers.",
    howToBuild: "In PyTorch, create a single `nn.Linear` layer with one output, apply a sigmoid or threshold. Train it on 2D data with gradient descent using `torch.optim.SGD`.",
  },
  "neuron": {
    whatIs: "A neuron is a computational unit that takes weighted inputs, sums them with a bias, and applies a non-linear activation function. Stacking neurons in layers produces deep networks.",
    whereUsed: "Every feed-forward layer in a transformer contains thousands of neurons; the MLP in GPT-2 small has 3,072 neurons per layer that process each token's hidden state.",
    howToBuild: "Implement a neuron manually: `y = activation(torch.dot(w, x) + b)`, then compare with `nn.Linear(in, 1)` followed by `F.relu` to see the same computation abstracted.",
  },
  "weights": {
    whatIs: "Weights are learnable parameters that scale each input to a neuron, determining how much that input contributes to the output. They are what training optimizes.",
    whereUsed: "Llama-3 70B has ~70 billion weights (parameters); each attention and MLP layer's weight matrices are tuned by gradient descent over trillions of tokens.",
    howToBuild: "Inspect weights via `model.parameters()`, print their shapes and `.requires_grad` flags, and initialize a custom layer with `nn.init.xavier_uniform_(layer.weight)`.",
  },
  "bias": {
    whatIs: "Bias is an additive learnable constant in a neuron that shifts the activation independently of the input, allowing the model to fit data that does not pass through the origin.",
    whereUsed: "Every `nn.Linear` in a transformer has a bias (except in some architectures like Llama which omit bias in attention); biases give layers the flexibility to threshold activations.",
    howToBuild: "Create `nn.Linear(3,1)` and print `layer.bias`; train a model with and without bias (`bias=False`) on offset data to see why bias matters for fit.",
  },
  "activation-functions": {
    whatIs: "An activation function introduces non-linearity into a neuron's output, enabling the network to approximate complex functions. Common choices are ReLU, GELU, and SiLU (SwiGLU).",
    whereUsed: "Transformers use GELU (GPT-2) or SiLU within SwiGLU (Llama, PaLM) in their MLP layers; without nonlinearity, stacking layers would collapse into a single linear map.",
    howToBuild: "Plot `F.relu`, `F.gelu`, and `F.silu` over `torch.linspace(-5,5,100)` with matplotlib, and build a 2-layer net with and without activation to show nonlinearity's effect.",
  },
  "forward-propagation": {
    whatIs: "Forward propagation is the process of passing input through every layer of a network to produce an output prediction. It is the computation that happens at inference time.",
    whereUsed: "Every ChatGPT response is a forward pass through a transformer; during training, forward propagation produces logits whose loss is then backpropagated.",
    howToBuild: "Call `output = model(input_tensor)` in PyTorch — this triggers `forward()` through all submodules; trace shapes at each layer with print statements in a custom module.",
  },
  "cross-entropy": {
    whatIs: "Cross-entropy loss measures the difference between a predicted probability distribution and the true distribution, heavily penalizing confident wrong predictions. It is the standard loss for classification.",
    whereUsed: "Every autoregressive LLM — GPT, Llama, Claude — trains with cross-entropy loss over the vocabulary at each token position to learn next-token prediction.",
    howToBuild: "Use `F.cross_entropy(logits, targets)` where logits are (N, vocab_size) and targets are (N,) integer labels; verify it equals `-log_softmax(logits)[targets]`.",
  },
  "backpropagation": {
    whatIs: "Backpropagation computes the gradient of the loss with respect to every weight by applying the chain rule backward through the network. It makes training deep networks computationally feasible.",
    whereUsed: "PyTorch's `loss.backward()` runs backprop through every transformer layer; without it, training GPT-scale models would be intractable.",
    howToBuild: "Set `requires_grad=True` on inputs, compute a loss, call `.backward()`, then inspect `param.grad` for each parameter — register a backward hook with `register_full_backward_hook` to trace it.",
  },
  "sgd": {
    whatIs: "Stochastic Gradient Descent updates weights using the gradient computed on a small mini-batch, adding noise from sampling but enabling scalable training on large datasets.",
    whereUsed: "SGD with momentum is used in vision models (ResNet) and some LLM pretraining recipes; its simplicity makes it a baseline optimizer, though Adam dominates transformers.",
    howToBuild: "Use `torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)` in a training loop, compare convergence speed with plain SGD (momentum=0) on a loss curve.",
  },
  "adam-adamw": {
    whatIs: "Adam combines momentum (running gradient average) and RMSprop (running squared gradient average) for adaptive per-parameter learning rates. AdamW decouples weight decay from the gradient update, improving regularization.",
    whereUsed: "AdamW is the default optimizer for training GPT, Llama, and virtually all modern transformers; it converges faster and more stably than SGD on large language models.",
    howToBuild: "Use `torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.1)`, train a small transformer, and compare loss curves against vanilla Adam to see weight decay's effect.",
  },
  "batch": {
    whatIs: "A batch is a group of input examples processed together in one forward and backward pass. Batching improves GPU utilization and stabilizes gradient estimates through averaging.",
    whereUsed: "LLM pretraining uses batch sizes of millions of tokens (via gradient accumulation); inference batches multiple user requests to maximize throughput on H100 GPUs.",
    howToBuild: "Use `DataLoader(dataset, batch_size=32, shuffle=True)`, iterate `for x, y in loader`, and observe GPU memory scaling with batch size via `torch.cuda.max_memory_allocated()`.",
  },
  "epoch": {
    whatIs: "An epoch is one complete pass through the entire training dataset. Multiple epochs allow the model to see each example repeatedly, refining its learned representations.",
    whereUsed: "LLM pretraining often runs a single epoch over trillions of tokens; fine-tuning runs 3-5 epochs on smaller instruction datasets to avoid overfitting.",
    howToBuild: "Wrap your training loop in `for epoch in range(num_epochs):` and log training and validation loss per epoch to watch the model improve and detect overfitting.",
  },
};