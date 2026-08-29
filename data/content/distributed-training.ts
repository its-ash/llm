import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "distributed-computing": {
    whatIs: "Distributed computing for LLM training spreads computation and data across multiple GPUs or nodes to train models too large or slow for a single device, using data, tensor, and pipeline parallelism.",
    whereUsed: "GPT-4 and Llama-3 training use thousands of GPUs across nodes with Megatron-LM and FSDP; Hugging Face `Accelerate` and `torch.distributed` orchestrate multi-GPU training.",
    howToBuild: "Wrap your model with `accelerate.Accelerator()`, call `accelerator.prepare(model, optimizer, dataloader)`, and launch with `accelerate launch --multi_gpu --num_processes 8 train.py`.",
  },
  "data-parallelism": {
    whatIs: "Data parallelism replicates the full model on every GPU, splits the input batch across GPUs, and synchronises gradients via all-reduce after backward, enabling larger effective batch sizes.",
    whereUsed: "PyTorch `DistributedDataParallel` (DDP) is the default for single-node multi-GPU training of models that fit on one GPU; FSDP extends it by sharding parameters.",
    howToBuild: "Use `torch.nn.parallel.DistributedDataParallel(model, device_ids=[local_rank])`, wrap the dataloader with `DistributedSampler`, and launch with `torchrun --nproc_per_node=8 train.py`.",
  },
  "tensor-parallelism": {
    whatIs: "Tensor parallelism splits individual weight matrices across GPUs (e.g., column-split for QKV projections) and communicates partial results via all-reduce, enabling models too large for one GPU's VRAM.",
    whereUsed: "Megatron-LM and vLLM use TP for Llama-3-70B training and serving; `torch.distributed.tensor_parallel` and DeepSpeed-Megatron provide production-grade TP implementations.",
    howToBuild: "Use `megatron.core.tensor_parallel.ColumnParallelLinear` for QKV and `RowParallelLinear` for the output projection, launch across 8 GPUs, and verify the all-reduce fusion in the trace.",
  },
  "pipeline-parallelism": {
    whatIs: "Pipeline parallelism partitions the model's layers across GPUs and pipelines micro-batches through the stages, overlapping compute and communication to keep all GPUs busy.",
    whereUsed: "GPipe and PipeDream-Flush in Megatron-LM and DeepSpeed pipeline stages for 100B+ models; HF `Accelerate` `pipeline_parallel` config orchestrates simple pipelines.",
    howToBuild: "Use `torch.distributed.pipeline.sync.Pipe` with `DevicePlacement` to split an `nn.Sequential` across GPUs, feed micro-batches, and inspect the schedule to see bubble overhead.",
  },
  "model-parallelism": {
    whatIs: "Model parallelism is the umbrella term for splitting a model's parameters across multiple GPUs — combining tensor and pipeline parallelism — when the model does not fit in a single GPU's memory.",
    whereUsed: "GPT-3 (175B) and Llama-3-405B training combine TP and PP across thousands of GPUs; Megatron-LM's 3D parallelism (DP+TP+PP) is the industry standard for frontier-scale training.",
    howToBuild: "Configure Megatron-LM with `--tensor-model-parallel-size 8 --pipeline-model-parallel-size 4` across 32 GPUs, and inspect the memory per GPU to confirm the model is sharded as expected.",
  },
  "gpu-communication": {
    whatIs: "GPU communication refers to the collective operations (all-reduce, all-gather, reduce-scatter) used to synchronise gradients or activations across GPUs, typically over NVLink or InfiniBand.",
    whereUsed: "NCCL powers PyTorch DDP/FSDP collectives; NVLink within a node and InfiniBand across nodes provide the high bandwidth needed for Llama-3 and GPT-4 scale training.",
    howToBuild: "Run `torch.distributed.all_reduce(tensor, op=ReduceOp.SUM)` across `torchrun` processes, profile with `torch.profiler` to see NCCL kernels, and compare NVLink vs PCIe bandwidth.",
  },
  "communication-overhead": {
    whatIs: "Communication overhead is the time spent on collective operations (all-reduce, all-gather) that does not contribute to forward/backward compute, often the bottleneck in large-scale distributed training.",
    whereUsed: "FSDP's all-gather during forward and reduce-scatter during backward add overhead; gradient compression and overlap of compute with communication in Megatron-LM mitigate this.",
    howToBuild: "Profile DDP with `torch.profiler` and inspect NCCL kernel time as a fraction of total; enable `gradient_as_bucket_view` and `static_graph` in DDP to reduce overhead, re-profile to compare.",
  },
};