import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "research-papers": {
    whatIs: "Research papers are peer-reviewed or preprint manuscripts that introduce new LLM architectures, training methods, or evaluation techniques, forming the primary knowledge source for the field.",
    whereUsed: "arXiv (cs.CL, cs.LG), ACL/EMNLP/NeurIPS proceedings, and Papers With Code are the main venues; 'Attention Is All You Need' and the GPT/Llama reports are canonical examples.",
    howToBuild: "Use `arxiv` Python library to search: `arxiv.Search(query=\"mixture of experts\", max_results=10)`, download PDFs, and summarise with an LLM for rapid literature review.",
  },
  "paper-reproduction": {
    whatIs: "Paper reproduction is the process of re-implementing a paper's model and training pipeline from its description, verifying that the claimed results are achievable with the given details.",
    whereUsed: "Reproducing 'Attention Is All You Need', GPT-2, or LoRA from scratch is a rite of passage; `lucidrains` GitHub repos and the `minGPT`/`nanoGPT` projects are reference reproductions.",
    howToBuild: "Build a mini transformer in PyTorch following the paper's equations, train on a small dataset like `tinyshakespeare`, and compare validation loss to the paper's reported numbers.",
  },
  "experiment-design": {
    whatIs: "Experiment design is the planning of controlled training runs — varying one factor at a time (architecture, hyperparameter, data) with fixed seeds and baselines to draw causal conclusions.",
    whereUsed: "Ablation studies in every major paper (Llama, GPT, LoRA) isolate the contribution of each component; `wandb` and `mlflow` track configs, seeds, and metrics for reproducibility.",
    howToBuild: "Define a base config, use `hydra` to sweep one variable (e.g., `num_heads: [4, 8, 16]`), launch with `wandb sweep`, and compare validation loss across runs in a single dashboard.",
  },
  "dataset-design": {
    whatIs: "Dataset design is the curation, cleaning, deduplication, and formatting of training or evaluation data to maximise model quality and minimise bias, toxicity, and contamination.",
    whereUsed: "Llama-3's 15T-token pretraining mix and OpenAI's RLHF preference datasets are carefully designed; The Pile and RedPajama are open pretraining datasets; `datasets` and `dolma` tooling help.",
    howToBuild: "Use `datasets.load_dataset`, deduplicate with `datasketch.MinHash`, filter toxicity with `transformers.pipeline(\"text-classification\", model=\"...toxic-bert\")`, and log stats with `datasets`.",
  },
  "architecture-experiments": {
    whatIs: "Architecture experiments systematically vary model components (attention type, activation, normalisation) to measure their impact on quality and efficiency.",
    whereUsed: "SwiGLU vs GELU (Llama), RoPE vs ALiBi, GQA vs MHA (Llama-3), and MoE vs dense (Mixtral) were validated through architecture experiments before adoption.",
    howToBuild: "Implement a config-driven transformer in PyTorch, sweep `attention: [\"mha\", \"mqa\", \"gqa\"]` with `hydra`, train each on the same data, and compare perplexity and throughput.",
  },
  "ablation-studies": {
    whatIs: "Ablation studies remove or replace individual components of a model or training pipeline to quantify each one's contribution, confirming that every part is necessary.",
    whereUsed: "The original Transformer paper ablated multi-head attention and positional encoding; LoRA ablated rank and target modules; DPO ablated beta and reference model presence.",
    howToBuild: "Train the full model and variants with one component removed (e.g., no residual, no LayerNorm), log validation loss in `wandb`, and report a table of metric deltas per ablation.",
  },
  "benchmark-design": {
    whatIs: "Benchmark design creates standardised task sets, metrics, and evaluation protocols to measure and compare LLM capabilities fairly across models and over time.",
    whereUsed: "MMLU (57 subjects), HumanEval (164 code problems), GSM8K (math), and BIG-Bench are designed benchmarks; HELM and Open LLM Leaderboard standardise their evaluation.",
    howToBuild: "Collect task instances with gold answers, define a metric (exact-match, pass@k), write an `lm-eval-harness` task YAML with `doc_to_text` and `doc_to_target`, and validate on 2 models.",
  },
  "model-comparison": {
    whatIs: "Model comparison evaluates multiple LLMs on the same benchmarks and human-evaluation protocols to rank them by capability, efficiency, and cost for model selection.",
    whereUsed: "LMSYS Chatbot Arena Elo, Open LLM Leaderboard, and Artificial Analysis compare GPT-4, Claude, Llama, and Gemini; `lm-eval-harness` ensures identical prompts and metrics.",
    howToBuild: "Run `lm_eval --tasks mmlu,gsm8k,humaneval --model hf --model_args pretrained=<model_A>` and repeat for model_B, then build a pandas comparison table of scores and tokens/s.",
  },
  "training-experiments": {
    whatIs: "Training experiments vary training-time factors (data mixture, learning rate schedule, batch size, optimiser) to study their effect on final model quality and training stability.",
    whereUsed: "Llama scaling-law experiments, the Chinchilla compute-optimal study, and learning-rate sweeps in every production training run are training experiments; `wandb` sweeps automate them.",
    howToBuild: "Use `wandb.sweep` with a `method: bayes` config over `learning_rate: {min: 1e-5, max: 1e-3}` and `batch_size: [32, 64, 128]`, launch agents, and pick the config with best validation loss.",
  },
  "inference-experiments": {
    whatIs: "Inference experiments vary serving parameters (quantisation, batch size, speculative decoding, chunk size) to study their effect on latency, throughput, and quality.",
    whereUsed: "vLLM `benchmark_throughput.py` and TensorRT-LLM benchmark suites run inference experiments; the FlashAttention and speculative-decoding papers report these trade-off curves.",
    howToBuild: "Sweep `--max-num-batched-tokens [1024, 4096, 16384]` and `--quantization [none, awq, fp8]` in vLLM, log TTFT and tokens/s with `benchmark_serving.py`, and plot the Pareto frontier.",
  },
};