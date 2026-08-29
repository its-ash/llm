import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "quantization": {
    whatIs: "Quantization reduces the precision of model weights and/or activations from floating-point (FP32/FP16) to lower-bit integer formats (INT8, INT4). This shrinks model size, reduces memory bandwidth, and speeds up inference with minimal accuracy loss.",
    whereUsed: "LLaMA, Mistral, and GPT models are quantized for deployment on consumer GPUs. GGUF format (llama.cpp) uses INT4/INT8 quantization. GPTQ and AWQ are popular post-training quantization methods. BitsAndBytes provides INT4/INT8 for HuggingFace models.",
    howToBuild: "With BitsAndBytes: `model = AutoModelForCausalLM.from_pretrained(name, load_in_8bit=True)`. With GPTQ: `from auto_gptq import AutoGPTQForCausalLM; model = AutoGPTQForCausalLM.from_quantized(path)`. Manual: `q = torch.round(x / scale).clamp(-128, 127).to(torch.int8)`.",
  },
  "dequantization": {
    whatIs: "Dequantization converts quantized integer values back to floating-point for computation. It multiplies the integer by the quantization scale and adds the zero point, reconstructing an approximation of the original float value.",
    whereUsed: "During quantized inference (llama.cpp, GPTQ models), weights are stored as INT4/INT8 but dequantized to FP16 on-the-fly for matrix multiplication. Some kernels fuse dequantization with matmul for efficiency. AWQ and GPTQ both dequantize during the forward pass.",
    howToBuild: "Given quantized `q` (int8), `scale`, and `zero_point`: `dequantized = scale * (q.float() - zero_point)`. In PyTorch: `torch.dequantize(tensor)` for quantized tensors. For fused inference, use custom CUDA kernels or BitsAndBytes `Linear8bitLt` which dequantizes in the forward pass.",
  },
  "quantization-scale": {
    whatIs: "The quantization scale is the float value that maps the range of integer values to the range of the original floating-point data. It is computed as `(max_val - min_val) / (quant_max - quant_min)` and determines the step size between adjacent quantized levels.",
    whereUsed: "In INT8 quantization (BitsAndBytes, GPTQ), each weight tensor or channel gets a scale. Smaller scales mean finer quantization resolution. In per-channel quantization, each output channel has its own scale, reducing error compared to per-tensor quantization.",
    howToBuild: "For symmetric INT8: `scale = x.abs().max() / 127`. For asymmetric: `scale = (x.max() - x.min()) / 255`. Store `scale` as a float alongside the quantized tensor. Apply: `q = torch.round(x / scale).to(torch.int8); deq = q.float() * scale`.",
  },
  "zero-point": {
    whatIs: "The zero point is the integer value that corresponds to the floating-point value 0.0 in asymmetric quantization. It shifts the integer range so that the float zero maps to an exact integer, important because activations are often non-symmetric around zero.",
    whereUsed: "Asymmetric quantization with zero points is used in TFLite for mobile inference and in some LLM quantization schemes. ReLU activations, which are non-negative, benefit from asymmetric quantization. Symmetric quantization (zero_point=0) is more common for LLM weights.",
    howToBuild: "Compute: `scale = (x.max() - x.min()) / 255; zero_point = round(-x.min() / scale)`. Quantize: `q = torch.round(x / scale + zero_point).to(torch.uint8)`. Dequantize: `deq = scale * (q.float() - zero_point)`. Verify: `deq` approximates `x`.",
  },
  "quantization-error": {
    whatIs: "Quantization error is the difference between the original floating-point value and the dequantized approximation. It arises because multiple float values map to the same integer level, introducing noise that can degrade model accuracy.",
    whereUsed: "GPTQ and AWQ are designed to minimize quantization error by choosing scales that preserve important weights. LLM.int8() detects outlier features and keeps them in FP16 to reduce error. Quantization error is measured by perplexity increase or benchmark accuracy drop.",
    howToBuild: "Compute: `error = (dequantized - original).abs().mean()` (MAE) or `((deq - orig) ** 2).mean()` (MSE). Compare across quantization methods. To reduce error: use per-channel scales, group quantization (e.g., 128-element groups in GGUF), or mixed-precision (outliers in FP16).",
  },
  "symmetric-quantization": {
    whatIs: "Symmetric quantization maps float values to integers symmetrically around zero, so the zero point is always 0. It uses the maximum absolute value to set the scale, making it simpler and faster but potentially wasting range if the data is asymmetric.",
    whereUsed: "Symmetric INT8 is the default for LLM weight quantization in llama.cpp (GGUF), GPTQ, and BitsAndBytes. Weights are roughly symmetric around zero (initialized with zero-mean distributions), so symmetric quantization works well. Activations like ReLU outputs are asymmetric and may need asymmetric quantization.",
    howToBuild: "Compute: `scale = x.abs().max() / 127`. Quantize: `q = torch.round(x / scale).clamp(-128, 127).to(torch.int8)`. Dequantize: `deq = q.float() * scale`. Simpler than asymmetric: no zero point to store or apply. Used when `x` is approximately zero-centered.",
  },
  "asymmetric-quantization": {
    whatIs: "Asymmetric quantization uses both a scale and a zero point to map the float range [min, max] to the full integer range [0, 255] (for uint8). This utilizes all integer levels even when the data is not centered at zero, reducing quantization error for asymmetric distributions.",
    whereUsed: "Asymmetric quantization is used for activations in TFLite, ONNX Runtime, and some LLM inference engines. Post-Training Quantization (PTQ) in TensorFlow uses asymmetric for activations and symmetric for weights. It is essential for ReLU outputs which range [0, max].",
    howToBuild: "Compute: `scale = (x.max() - x.min()) / 255; zero_point = round(-x.min() / scale)`. Quantize: `q = torch.clamp(torch.round(x / scale + zero_point), 0, 255).to(torch.uint8)`. Dequantize: `deq = scale * (q.float() - zero_point)`. Store both `scale` and `zero_point`.",
  },
  "weight-quantization": {
    whatIs: "Weight quantization converts only the model's weight matrices to lower precision (INT8/INT4), while activations remain in floating-point. This is the simplest form of quantization and primarily reduces model size and memory bandwidth.",
    whereUsed: "GPTQ, AWQ, and GGUF quantize weights of LLaMA, Mistral, and Falcon models. Weight-only quantization is popular because it does not require calibration data for activations and dequantizes weights on-the-fly during matmul. It is the default for consumer-GPU LLM inference.",
    howToBuild: "Per-tensor: `scale = w.abs().max() / 127; q_w = torch.round(w / scale).to(torch.int8)`. In the forward pass: `out = x @ (q_w.float() * scale)`. Per-channel: compute scale per output channel. With AWQ: `from awq import AutoAWQForCausalLM; model.quantize(...)`.",
  },
  "activation-quantization": {
    whatIs: "Activation quantization converts the intermediate activation values (outputs of attention, FFN, etc.) to lower precision during the forward pass. This speeds up computation further but requires calibration data to determine activation ranges.",
    whereUsed: "TensorRT and TFLite use activation quantization for maximum inference speed. LLM.int8() quantizes activations but keeps outlier features in FP16. Full INT8 inference (weights + activations) is used in production serving where throughput matters more than setup complexity.",
    howToBuild: "Calibrate: run ~100 representative inputs through the model and record activation min/max per layer. Compute scales: `act_scale = act.abs().max() / 127`. In forward: `q_act = torch.round(act / act_scale).clamp(-128, 127).to(torch.int8); act = q_act.float() * act_scale`. Use PyTorch `torch.quantization` API or TensorRT PTQ.",
  },
  "post-training-quantization": {
    whatIs: "Post-training quantization (PTQ) quantizes a model after training is complete, without retraining. It is fast and requires no training infrastructure, making it the most practical quantization approach for deploying existing models.",
    whereUsed: "GPTQ, AWQ, and BitsAndBytes are all PTQ methods used on LLaMA, Mistral, and GPT models. GGUF conversion in llama.cpp is PTQ. PTQ is the go-to for users who want to run models on consumer hardware without access to training GPUs or the original training data.",
    howToBuild: "GPTQ: `from auto_gptq import AutoGPTQForCausalLM; model = AutoGPTQForCausalLM.from_pretrained(base); model.quantize(calibration_data); model.save_quantized('out')`. BitsAndBytes: `from_pretrained(..., load_in_4bit=True)`. AWQ: `AutoAWQForCausalLM.from_pretrained(base); model.quantize(...)`. Calibrate with ~128 samples.",
  },
  "quantization-aware-training": {
    whatIs: "Quantization-aware training (QAT) simulates quantization effects during training by inserting fake-quantization operations in the forward pass, allowing the model to adapt to quantization noise. This typically yields better accuracy than PTQ, especially at low bit widths.",
    whereUsed: "QAT is used in mobile/edge deployment (TensorFlow Lite, PyTorch Mobile) where INT8 accuracy matters. It is less common for LLMs due to training cost, but QLoRA is a related approach that quantizes base weights while training low-rank adapters. QAT is used for INT4 and lower precision where PTQ accuracy is unacceptable.",
    howToBuild: "In PyTorch: `model.qconfig = torch.ao.quantization.get_default_qconfig('fbgemm'); model = torch.ao.quantization.prepare_qat(model, inplace=True)`. Train normally; quantization noise is simulated in forward. Convert: `model_int8 = torch.ao.quantization.convert(model)`. For LLMs: use QLoRA with NF4 quantization during fine-tuning.",
  },
  "quantized-inference": {
    whatIs: "Quantized inference runs the model using quantized weights and/or activations, performing matrix multiplications in integer arithmetic where possible. This reduces memory footprint and leverages hardware INT8/INT4 acceleration for faster inference.",
    whereUsed: "llama.cpp runs quantized GGUF models (INT4/INT8) on CPU and GPU. TensorRT and vLLM support INT8 inference on NVIDIA GPUs. ONNX Runtime and TFLite run quantized models on mobile. Quantized inference is the standard for deploying LLMs on resource-constrained hardware.",
    howToBuild: "With llama.cpp: `./main -m model-Q4_K_M.gguf -p 'prompt'`. With HuggingFace + BitsAndBytes: `model = AutoModelForCausalLM.from_pretrained(name, load_in_8bit=True); outputs = model.generate(**inputs)`. Measure: compare tokens/second and perplexity vs FP16 baseline.",
  },
};