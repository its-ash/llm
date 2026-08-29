import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "model-evaluation": {
    whatIs: "Model evaluation is the systematic process of measuring an LLM's quality, capability, and safety across benchmarks, held-out datasets, and human judgement to compare models and guide development.",
    whereUsed: "Llama-3, GPT-4, and Claude report MMLU, HumanEval, and MT-Bench scores; the `lm-evaluation-harness` from EleutherAI is the standard open framework for running benchmarks.",
    howToBuild: "Install `lm-eval`, run `lm_eval --model hf --model_args pretrained=meta-llama/Meta-Llama-3-8B --tasks mmlu,hellaswag,arc_challenge --batch_size 8` to get benchmark scores.",
  },
  "training-loss": {
    whatIs: "Training loss is the average cross-entropy (or other) loss computed on the training set during training, measuring how well the model fits the data it is learning from.",
    whereUsed: "Every LLM training run logs training loss via `Trainer` and `wandb`; it should decrease smoothly — divergence indicates learning-rate or data issues.",
    howToBuild: "Log `loss = outputs.loss.item()` each step in the training loop, plot with `wandb.log({\"train/loss\": loss})`, and inspect the curve for spikes or plateau.",
  },
  "validation-loss": {
    whatIs: "Validation loss is the loss computed on a held-out validation set, used to monitor generalisation and detect overfitting when training loss keeps decreasing but validation loss rises.",
    whereUsed: "Hugging Face `Trainer` with `eval_dataset` reports validation loss each epoch; early stopping callbacks trigger when validation loss stops improving.",
    howToBuild: "Pass `eval_dataset` to `Trainer`, set `eval_strategy=\"epoch\"`, and monitor `eval_loss` in `wandb`; enable `EarlyStoppingCallback(early_stopping_patience=3)` to halt on overfit.",
  },
  "perplexity": {
    whatIs: "Perplexity is the exponential of the average cross-entropy loss, interpretable as the model's effective vocabulary size at each prediction; lower perplexity means the model is more confident and accurate.",
    whereUsed: "GPT-3, Llama-2, and Mistral report perplexity on WikiText and The Pile; `evaluate` library and `lm-eval-harness` compute it; it is the standard intrinsic language-modelling metric.",
    howToBuild: "Compute `perplexity = torch.exp(torch.mean(loss))` over a held-out dataset, or use `evaluate.load(\"perplexity\")` with `model_id` and `input_texts` to get the score in one call.",
  },
  "accuracy": {
    whatIs: "Accuracy is the fraction of predictions that exactly match the ground-truth answer, used for multiple-choice and classification benchmarks like MMLU and ARC.",
    whereUsed: "MMLU, ARC, and HellaSwag report accuracy; `lm-eval-harness` computes `acc` and `acc_norm`; it is the headline metric for most LLM capability comparisons.",
    howToBuild: "Run `lm_eval --tasks mmlu --model hf --model_args pretrained=...` and read the `acc` column; for custom MCQ, compare `argmax(logits)` to the gold label and average the match.",
  },
  "benchmarking": {
    whatIs: "Benchmarking is the standardised evaluation of a model on a fixed suite of tasks (MMLU, HumanEval, GSM8K) to produce comparable scores across models and track progress over time.",
    whereUsed: "The Open LLM Leaderboard uses `lm-eval-harness` with MMLU/ARC/HellaSwag/Winogrande; Chatbot Arena uses Elo from human votes; HELM is a comprehensive multi-metric benchmark.",
    howToBuild: "Run `lm_eval --model hf --model_args pretrained=<model> --tasks mmlu,arc_challenge,hellaswag,winogrande,gsm8k --output_path results/` and submit to the Open LLM Leaderboard format.",
  },
  "human-evaluation": {
    whatIs: "Human evaluation collects human judgements of model outputs (pairwise preference, rating, or ranking) to assess qualities like helpfulness and safety that automated metrics miss.",
    whereUsed: "LMSYS Chatbot Arena uses crowdsourced pairwise votes for Elo scores; Anthropic and OpenAI use human raters for alignment eval; MT-Bench uses GPT-4 as a human-proxy judge.",
    howToBuild: "Use `lm-eval-harness --tasks mt_bench` for GPT-4 judged scores, or deploy a pairwise voting UI with `fastapi` + `gradio` to collect human preferences and compute Elo with `elo.py`.",
  },
  "hallucination-evaluation": {
    whatIs: "Hallucination evaluation measures the rate at which a model generates factually incorrect or unsupported statements, critical for RAG and knowledge-intensive tasks.",
    whereUsed: "TruthfulQA, HaluEval, and RAGAS faithfulness metrics measure hallucination; production RAG systems use self-check or LLM-judge pipelines to flag ungrounded claims.",
    howToBuild: "Use `ragas.metrics.Faithfulness` with `(response, context)` to score groundedness, or run `lm_eval --tasks truthfulqa` and inspect the MC1/MC2 scores for hallucination tendency.",
  },
  "latency-evaluation": {
    whatIs: "Latency evaluation measures the time-to-first-token and inter-token latency of an LLM under controlled prompts, critical for real-time chat and interactive applications.",
    whereUsed: "vLLM benchmarks, TensorRT-LLM `benchmark.py`, and `optimum-benchmark` report latency; production serving teams set latency SLAs and regress-test them on every model update.",
    howToBuild: "Use `optimum-benchmark --backend vllm --task text-generation --model meta-llama/Meta-Llama-3-8B` to get TTFT and inter-token latency, or time `model.generate` with `torch.cuda.Event`.",
  },
  "throughput-evaluation": {
    whatIs: "Throughput evaluation measures the number of output tokens per second a serving system can sustain under concurrent load, critical for capacity planning and cost estimation.",
    whereUsed: "vLLM `benchmark_throughput.py`, Triton Inference Server metrics, and `locust` load tests measure throughput; production teams balance throughput against latency SLAs.",
    howToBuild: "Run `python -m vllm.entrypoints.openai.api_server --model ...` then `benchmark_serving.py --backend vllm --num-prompts 1000 --request-rate 20` to measure sustained tokens/s.",
  },
};