<script setup lang="ts">
import type { Topic, Subtopic } from '~/data/topics';
import type { SubtopicContent } from '~/data/content-types';

const props = defineProps<{
  topic: Topic;
  subtopic: Subtopic;
}>();

const { currentSize } = useFontSize();
const { loadTopicContent } = await import('~/data/content/index');

const contentMap = await loadTopicContent(props.topic.slug);
const subContent = computed(() => contentMap[props.subtopic.slug]);

const codeExamples: Record<string, string> = {
  'computer-python-foundations/python': `import torch\n\nx = torch.randn(2, 3)\nprint(x.shape)  # torch.Size([2, 3])\nprint(x.dtype)  # torch.float32`,
  'computer-python-foundations/numpy': `import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = a * 2          # [[2,4,6],[8,10,12]]\nc = a.sum(axis=0)  # [5, 7, 9]`,
  'computer-python-foundations/tensors': `import torch\n\nscalar = torch.tensor(3.14)       # rank 0\nvector = torch.tensor([1, 2, 3])  # rank 1\nmatrix = torch.randn(2, 3)        # rank 2\nbatch  = torch.randn(4, 2, 3)     # rank 3\n\nprint(batch.ndim)   # 3\nprint(batch.shape)  # torch.Size([4, 2, 3])`,
  'computer-python-foundations/tensor-operations': `import torch\n\na = torch.tensor([[1, 2], [3, 4]])\nb = torch.tensor([[5, 6], [7, 8]])\n\na + b   # element-wise add\na * b   # element-wise multiply\na @ b   # matrix multiplication\na.T     # transpose`,
  'computer-python-foundations/matrix-multiplication': `import torch\n\nA = torch.randn(2, 3)\nB = torch.randn(3, 4)\nC = A @ B              # result: 2x4\n\n# C[i,j] = sum(A[i,:] * B[:,j])`,
  'computer-python-foundations/cpu-vs-gpu': `import torch\n\ndevice = 'cuda' if torch.cuda.is_available() else 'cpu'\nx = torch.randn(1000, 1000, device=device)\ny = torch.randn(1000, 1000, device=device)\nz = x @ y  # ~100x faster on GPU`,
  'computer-python-foundations/gpu-vram': `params = 7_000_000_000  # 7B\nbytes_per_param = 2    # FP16\nweight_gb = (params * bytes_per_param) / 1e9\nprint(f"Weight memory: {weight_gb:.1f} GB")  # ~14 GB`,
  'mathematics/scalars': `import torch\n\nx = torch.tensor(3.14)\ny = x * 2`,
  'mathematics/vectors': `import torch\n\nv = torch.tensor([3.0, 4.0])\nmagnitude = torch.norm(v)   # 5.0\ndirection = v / magnitude   # [0.6, 0.8]`,
  'mathematics/matrices': `import torch\n\nM = torch.tensor([[2, 0], [0, 3]])\nv = torch.tensor([1, 1])\nresult = M @ v  # [2, 3]`,
  'mathematics/dot-product': `import torch\n\na = torch.tensor([1, 2, 3])\nb = torch.tensor([4, 5, 6])\ndot = torch.dot(a, b)  # 32`,
  'mathematics/norms': `import torch\n\nv = torch.tensor([3.0, 4.0])\nl1 = torch.norm(v, p=1)           # 7\nl2 = torch.norm(v, p=2)           # 5\nlinf = torch.norm(v, p=float('inf'))  # 4`,
  'mathematics/derivatives': `import torch\n\nx = torch.tensor(2.0, requires_grad=True)\ny = x ** 3\ny.backward()\nprint(x.grad)  # 12`,
  'mathematics/gradients': `import torch\n\nx = torch.tensor(1.0, requires_grad=True)\ny = torch.tensor(2.0, requires_grad=True)\nloss = (x - 3)**2 + (y - 1)**2\nloss.backward()\nprint(f"grad: ({x.grad}, {y.grad})")`,
  'mathematics/chain-rule': `import torch\n\nx = torch.tensor(1.0, requires_grad=True)\ng = x ** 2\nf = g ** 3\nf.backward()\nprint(x.grad)  # 6`,
  'mathematics/gradient-descent': `import torch\n\nx = torch.tensor(5.0, requires_grad=True)\nlr = 0.1\n\nfor _ in range(100):\n    loss = x ** 2\n    loss.backward()\n    with torch.no_grad():\n        x -= lr * x.grad\n        x.grad = None\nprint(x)  # ~ 0.0`,
  'neural-networks/neuron': `import torch\n\ninputs = torch.tensor([1.0, 2.0, 3.0])\nweights = torch.tensor([0.5, -0.5, 0.25])\nbias = torch.tensor(0.1)\n\nz = (inputs * weights).sum() + bias\nout = torch.sigmoid(z)`,
  'neural-networks/activation-functions': `import torch\nimport torch.nn.functional as F\n\nx = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])\nsigmoid = torch.sigmoid(x)\ntanh = torch.tanh(x)\nrelu = F.relu(x)\ngelu = F.gelu(x)`,
  'neural-networks/forward-propagation': `import torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Linear(784, 256),\n    nn.ReLU(),\n    nn.Linear(256, 10),\n)\nout = model(torch.randn(1, 784))`,
  'neural-networks/backpropagation': `import torch, torch.nn as nn\n\nmodel = nn.Linear(3, 1)\ny_pred = model(torch.randn(1, 3))\nloss = nn.MSELoss()(y_pred, torch.tensor([[1.0]]))\nloss.backward()\nprint(model.weight.grad)`,
  'neural-networks/sgd': `import torch\n\np = torch.tensor([5.0], requires_grad=True)\nopt = torch.optim.SGD([p], lr=0.01)\n\nfor _ in range(100):\n    opt.zero_grad()\n    loss = (p - 3)**2\n    loss.backward()\n    opt.step()`,
  'nlp/rnn': `import torch.nn as nn\n\nrnn = nn.RNN(10, 20, batch_first=True)\nout, hidden = rnn(torch.randn(1, 5, 10))\n# out: (1, 5, 20)`,
  'nlp/lstm': `import torch.nn as nn\n\nlstm = nn.LSTM(10, 20, batch_first=True)\n# Gates: forget, input, output`,
  'tokenization/tokenization': `# Word-level:   ["The", "cat", "sat"]\n# Character:    ["T","h","e"," ","c","a","t",...]\n# Subword (BPE): ["The", " cat", " sat"]`,
  'tokenization/bpe': `# BPE: merge most frequent character pairs\n\n# "low low lower lowest"\n# Step 1: 'l','o' -> 'lo'\n# Step 2: 'lo','w' -> 'low'`,
  'embeddings/token-embeddings': `import torch.nn as nn\n\nembed = nn.Embedding(50000, 256)\nvectors = embed(torch.tensor([42, 100, 7]))`,
  'embeddings/embedding-matrix': `import torch.nn as nn\n\nembed = nn.Embedding(50257, 768)  # GPT-2\n# Params: 50257 * 768 = 38.6M`,
  'embeddings/cosine-similarity': `import torch, torch.nn.functional as F\n\na = torch.tensor([1.0, 2.0, 3.0])\nb = torch.tensor([2.0, 4.0, 6.0])\nsim = F.cosine_similarity(a.unsqueeze(0), b.unsqueeze(0))`,
  'positional-information/sinusoidal-encoding': `import torch, math\n\ndef pos_enc(pos, d):\n    pe = torch.zeros(d)\n    for i in range(0, d, 2):\n        pe[i] = math.sin(pos / 10000**(i/d))\n        if i+1 < d:\n            pe[i+1] = math.cos(pos / 10000**(i/d))\n    return pe`,
  'attention/self-attention': `import torch, torch.nn.functional as F\n\nQ = torch.randn(4, 8)\nK = torch.randn(4, 8)\nV = torch.randn(4, 8)\n\nscores = Q @ K.T / (8 ** 0.5)\nweights = F.softmax(scores, dim=-1)\noutput = weights @ V`,
  'attention/softmax': `import torch, torch.nn.functional as F\n\nlogits = torch.tensor([2.0, 1.0, 0.1, -1.0])\nprobs = F.softmax(logits, dim=-1)\n# [0.64, 0.24, 0.09, 0.03]`,
  'attention/causal-attention': `import torch\n\nmask = torch.tril(torch.ones(4, 4))\n# Token i sees only tokens 0..i`,
  'multi-head-attention/multiple-attention-heads': `import torch.nn as nn\n\nmha = nn.MultiheadAttention(512, 8, batch_first=True)\n# 8 heads x 64 dims each = 512`,
  'transformer/transformer-block': `import torch.nn as nn\n\nclass Block(nn.Module):\n    def __init__(self, d, h):\n        super().__init__()\n        self.attn = nn.MultiheadAttention(d, h, batch_first=True)\n        self.ffn = nn.Sequential(\n            nn.Linear(d, d*4), nn.GELU(), nn.Linear(d*4, d))\n        self.n1 = nn.LayerNorm(d)\n        self.n2 = nn.LayerNorm(d)\n\n    def forward(self, x):\n        x = self.n1(x + self.attn(*[x]*3)[0])\n        x = self.n2(x + self.ffn(x))\n        return x`,
  'transformer/gpt-architecture': `import torch.nn as nn\n\nclass GPT(nn.Module):\n    def __init__(self, vocab, d, h, n):\n        super().__init__()\n        self.embed = nn.Embedding(vocab, d)\n        self.blocks = nn.ModuleList([Block(d,h) for _ in range(n)])\n        self.norm = nn.LayerNorm(d)\n        self.head = nn.Linear(d, vocab)\n\n    def forward(self, toks):\n        x = self.embed(toks)\n        for b in self.blocks: x = b(x)\n        return self.head(self.norm(x))`,
  'language-modeling/next-token-prediction': `import torch, torch.nn.functional as F\n\nlogits = model(input_tokens)\nlast = logits[:, -1, :]\nprobs = F.softmax(last, dim=-1)\nnext_token = torch.argmax(probs, dim=-1)`,
  'text-generation/temperature': `import torch, torch.nn.functional as F\n\nlogits = torch.tensor([2.0, 1.0, 0.5])\nsharp = F.softmax(logits / 0.5, dim=-1)  # confident\nflat = F.softmax(logits / 1.5, dim=-1)   # creative`,
  'text-generation/top-k': `import torch\n\nlogits = torch.tensor([5, 3, 2, 1, 0.5])\ntop_vals, top_idx = logits.topk(3)`,
  'llm-architecture/parameter-count': `vocab, d, layers, heads = 50257, 768, 12, 12\nembed = vocab * d\nper_layer = 4 * d**2 + 2 * d * 4 * d\ntotal = embed + layers * per_layer + d * vocab\nprint(f"Total: {total:,}")  # ~124M`,
  'quantization/quantization': `# FP32: 4 bytes  -> 7B = 28 GB\n# FP16: 2 bytes  -> 7B = 14 GB\n# INT8: 1 byte   -> 7B =  7 GB\n# INT4: 0.5 bytes -> 7B = 3.5 GB`,
  'gpu-memory/vram': `params = 7e9\nweights = params * 2 / 1e9  # 14 GB FP16\n# Training (Adam): ~84 GB`,
  'kv-cache/kv-cache': `# Without cache: token N needs all N previous -> O(N^2)\n# With cache: store K,V -> O(N) per step`,
  'rag/retrieval-augmented-generation': `# 1. User asks: "What is our refund policy?"\n# 2. Retrieve: search vector DB for relevant chunks\n# 3. Augment: add chunks to prompt\n# 4. Generate: LLM answers using retrieved context`,
  'lora/low-rank-adaptation': `# Full fine-tune: d*d params\n# LoRA: W_new = W_frozen + A*B\n# d=4096, r=8: 256x fewer params`,
  'inference/prefill': `# Prefill: process entire prompt in parallel\n# Decode: generate one token at a time`,
};

const referenceLinks: Record<string, { text: string; url: string }[]> = {
  'attention/self-attention': [
    { text: 'Attention Is All You Need (2017)', url: 'https://arxiv.org/abs/1706.03762' },
    { text: 'The Illustrated Transformer — Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/' }
  ],
  'neural-networks/backpropagation': [
    { text: 'Backpropagation — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U' },
    { text: 'Calculus on Computational Graphs — colah', url: 'https://colah.github.io/posts/2015-08-Backprop/' }
  ],
  'tokenization/bpe': [
    { text: 'BPE — Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/chapter2section4' },
    { text: 'BPE Paper (Sennrich et al., 2016)', url: 'https://arxiv.org/abs/1508.07909' }
  ],
  'embeddings/token-embeddings': [
    { text: 'Illustrated Word2Vec — Jay Alammar', url: 'https://jalammar.github.io/illustrated-word2vec/' }
  ],
  'transformer/gpt-architecture': [
    { text: 'nanoGPT — Andrej Karpathy', url: 'https://github.com/karpathy/nanoGPT' },
    { text: 'The Annotated Transformer', url: 'http://nlp.seas.harvard.edu/annotated-transformer/' }
  ],
  'language-modeling/next-token-prediction': [
    { text: 'Illustrated GPT-2 — Jay Alammar', url: 'https://jalammar.github.io/illustrated-gpt2/' }
  ],
  'text-generation/temperature': [
    { text: 'How to Generate Text — Hugging Face', url: 'https://huggingface.co/blog/how-to-generate' }
  ],
  'lora/low-rank-adaptation': [
    { text: 'LoRA Paper (Hu et al., 2021)', url: 'https://arxiv.org/abs/2106.09685' }
  ],
  'rag/retrieval-augmented-generation': [
    { text: 'RAG Paper (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' }
  ],
  'mathematics/gradient-descent': [
    { text: 'Gradient Descent — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=IHZwWFHWa-w' }
  ],
  'fine-tuning/fine-tuning': [
    { text: 'Fine-tuning Guide — Hugging Face', url: 'https://huggingface.co/docs/transformers/training' }
  ],
  'agents/agent-loop': [
    { text: 'LLM Agents — LangChain Docs', url: 'https://python.langchain.com/docs/modules/agents/' }
  ],
};

const contentKey = computed(() => `${props.topic.slug}/${props.subtopic.slug}`);
const code = computed(() => codeExamples[contentKey.value]);
const links = computed(() => referenceLinks[contentKey.value]);
</script>

<template>
  <div class="flex-1 overflow-y-auto grid-bg">
    <div class="article-content max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-12" :data-size="currentSize">

      <div class="flex items-center gap-2 mb-4">
        <NuxtLink :to="`/topic/${topic.slug}`" class="badge">← {{ topic.title }}</NuxtLink>
      </div>

      <h1 class="art-h1 font-black leading-tight">{{ subtopic.name }}</h1>
      <p v-if="subContent" class="mt-4 art-lead leading-relaxed">{{ subContent.whatIs }}</p>
      <p v-else class="mt-4 art-lead leading-relaxed">{{ subtopic.design }}</p>

      <!-- What is this? -->
      <section v-if="subContent" class="mt-10">
        <h2 class="art-h2 font-black">What is {{ subtopic.name }}?</h2>
        <p class="mt-3 art-body leading-relaxed">{{ subContent.whatIs }}</p>
        <div class="mt-6 rounded-lg p-5 border-l-4" style="border-color: var(--accent); background: var(--accent-soft);">
          <p class="art-body leading-relaxed">{{ subContent.whatIs }}</p>
        </div>
      </section>

      <!-- Where is it used? -->
      <section v-if="subContent" class="mt-10">
        <h2 class="art-h2 font-black">Where is it used?</h2>
        <p class="mt-3 art-body leading-relaxed">{{ subContent.whereUsed }}</p>
      </section>

      <!-- How to build it -->
      <section v-if="subContent" class="mt-10">
        <h2 class="art-h2 font-black">How to build it</h2>
        <p class="mt-3 art-body leading-relaxed">{{ subContent.howToBuild }}</p>
      </section>

      <!-- Code example -->
      <section v-if="code" class="mt-10">
        <h2 class="art-h2 font-black">Code</h2>
        <p class="mt-3 art-body leading-relaxed">A practical example:</p>
        <CodeBlock :code="code" filename="example.py" lang="python" class="mt-6" />
      </section>

      <!-- Further reading -->
      <section v-if="links && links.length" class="mt-10">
        <h2 class="art-h2 font-black">Further reading</h2>
        <p class="mt-3 art-body leading-relaxed">Want to go deeper? These resources cover {{ subtopic.name }} in more detail:</p>
        <div class="mt-4 space-y-2">
          <a
            v-for="(link, j) in links"
            :key="j"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="content-link art-body flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>
            {{ link.text }}
          </a>
        </div>
      </section>

      <div class="mt-10 pt-8 border-t flex items-center justify-between" style="border-color: var(--border);">
        <NuxtLink :to="`/topic/${topic.slug}`" class="flex items-center gap-2 art-body font-bold mono">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          Back to {{ topic.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>