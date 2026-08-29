import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "model-serving": {
    whatIs: "Model serving is the deployment of a trained LLM behind an API that handles inference requests, batching, caching, and scaling to serve users in production.",
    whereUsed: "vLLM, TensorRT-LLM, TGI, and Triton serve Llama/Mistral in production; OpenAI and Anthropic run custom serving stacks; `TextGenerationInference` powers HF Inference Endpoints.",
    howToBuild: "Serve Llama-3-8B with `python -m vllm.entrypoints.openai.api_server --model meta-llama/Meta-Llama-3-8B-Instruct --port 8000`, then call `POST /v1/chat/completions` with a curl request.",
  },
  "request-handling": {
    whatIs: "Request handling is the process of receiving an inference request, tokenising the prompt, scheduling it into a batch, running generation, detokenising, and returning the response.",
    whereUsed: "vLLM's `LLMEngine` and TGI's internal scheduler handle requests; they manage waiting queues, continuous batching, and cancellation for streaming clients.",
    howToBuild: "In a FastAPI handler, call `llm.generate(prompt, sampling_params)`, iterate the output generator, and yield `data: {json.dumps(chunk)}\\n\\n` chunks for SSE streaming.",
  },
  "load-balancing": {
    whatIs: "Load balancing distributes inference requests across multiple model replicas or GPUs to maximise throughput, minimise latency, and provide fault tolerance under varying traffic.",
    whereUsed: "Kubernetes `Service` with multiple vLLM pods, NVIDIA Triton with multi-instance routing, and cloud LBs (ALB, CloudLB) balance LLM traffic; KServe autoscales replicas on GPU metrics.",
    howToBuild: "Deploy 4 vLLM pods behind a Kubernetes `ClusterIP` Service with `kubectl expose deployment vllm --port=8000`, and use `requests` to confirm round-robin routing via pod logs.",
  },
  "gpu-allocation": {
    whatIs: "GPU allocation is the assignment of model replicas, pipeline stages, or KV-cache memory to specific GPUs to maximise utilisation while respecting VRAM and latency constraints.",
    whereUsed: "vLLM `--tensor-parallel-size` and Ray Serve manage GPU allocation; Kubernetes device plugin and NVIDIA MIG partition H100s for multi-tenant LLM serving.",
    howToBuild: "Launch vLLM with `--tensor-parallel-size 4 --gpu-memory-utilization 0.9` across 4 GPUs, monitor `nvidia-smi` per-GPU VRAM, and adjust `--max-num-batched-tokens` to fit KV cache.",
  },
  "caching": {
    whatIs: "Caching in LLM systems stores computed KV caches (prefix caching), embeddings, or full responses to skip redundant computation for repeated prompts and reduce latency.",
    whereUsed: "vLLM `--enable-prefix-caching`, GPTCache, and Redis-based response caches are common; Anthropic's prompt caching bills less for repeated long prefixes by reusing KV state.",
    howToBuild: "Enable vLLM prefix caching with `--enable-prefix-caching`, benchmark two identical-prompt-prefix requests, and measure the TTFT drop; add a Redis response cache for exact-match prompts.",
  },
  "monitoring": {
    whatIs: "Monitoring tracks inference latency, throughput, GPU utilisation, error rates, and queue depth in real time to detect degradation and trigger autoscaling or alerts.",
    whereUsed: "Prometheus + Grafana, NVIDIA DCGM, and Datadog monitor vLLM/TGI metrics; production teams alert on TTFT p99 and GPU memory pressure.",
    howToBuild: "Scrape vLLM's `/metrics` endpoint with Prometheus, build a Grafana dashboard for `vllm:num_requests_waiting`, `vllm:time_to_first_token_seconds`, and GPU `DCGM_FI_DEV_GPU_UTIL`.",
  },
  "logging": {
    whatIs: "Logging records request prompts, generated outputs, latency, errors, and model versions for debugging, auditing, safety review, and post-hoc analysis of LLM behaviour.",
    whereUsed: "Langfuse, Helicone, and Phoenix log LLM I/O for production apps; vLLM and TGI expose structured logs; OpenAI Dashboard logs API calls for billing and abuse review.",
    howToBuild: "Integrate `langfuse` SDK by wrapping the OpenAI client with `langfuse.openai.OpenAI()`, and inspect traced prompts, responses, token counts, and latency in the Langfuse dashboard.",
  },
};