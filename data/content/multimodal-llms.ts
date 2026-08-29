import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "multimodal-models": {
    whatIs: "Multimodal models process and generate content across multiple modalities — text, images, audio, video — within a single model, enabling cross-modal understanding and generation.",
    whereUsed: "GPT-4o, Gemini, and Claude 3.5 Sonnet are multimodal; LLaVA, Qwen-VL, and Pixtral are open-weight multimodal LLMs built by attaching a vision encoder to a text LLM.",
    howToBuild: "Use `transformers.LlavaForConditionalGeneration.from_pretrained(\"llava-hf/llava-1.5-7b-hf\")`, pass `{\"image\": image, \"text\": prompt}` via the processor, and call `.generate()`.",
  },
  "vision-language-models": {
    whatIs: "Vision-Language Models (VLMs) are multimodal models specialised in understanding images and text together, answering questions about images, captioning, and reading documents.",
    whereUsed: "LLaVA, Qwen2-VL, InternVL, and GPT-4o are VLMs; they power visual chat, OCR-free document understanding, and robotics perception; HF `VLChat` pipelines serve them.",
    howToBuild: "Build LLaVA-style: project CLIP image features with an MLP into the LLM embedding space, prepend them as pseudo-tokens to the text prompt, and fine-tune with `Trainer` on instruction data.",
  },
  "image-embeddings": {
    whatIs: "Image embeddings are dense vector representations of an image produced by a vision encoder, capturing visual semantics that can be projected into the LLM's token embedding space.",
    whereUsed: "CLIP and SigLIP produce image embeddings used by LLaVA and Qwen-VL; the projection layer maps 1024-dim CLIP features to 4096-dim Llama hidden states.",
    howToBuild: "Load `CLIPModel.from_pretrained(\"openai/clip-vit-large-patch14\")`, run `model.get_image_features(pixel_values=image)`, and project with `nn.Linear(1024, d_model)` into the LLM space.",
  },
  "vision-encoder": {
    whatIs: "The vision encoder is the image backbone (usually a ViT) that extracts patch-level features from an image, which are then projected and fed into the language model as visual tokens.",
    whereUsed: "LLaVA uses CLIP-ViT-L/14, Qwen2-VL uses a custom ViT with dynamic resolution, and InternVL uses InternViT; SigLIP is the encoder for Pixtral and Idefics3.",
    howToBuild: "Load `ViTModel.from_pretrained(\"google/vit-base-patch16-224\")`, pass `pixel_values`, and take `outputs.last_hidden_state` (shape `(1, n_patches, hidden)`) as visual token features.",
  },
  "audio-models": {
    whatIs: "Audio multimodal models process speech or audio input (waveforms or spectrograms) alongside text, enabling speech-to-text, speech commands, and audio question answering.",
    whereUsed: "Whisper (OpenAI) does speech-to-text; Qwen2-Audio and AudioPaLM handle audio-in text-out; GPT-4o has native audio I/O; `transformers` supports these via `AutoModelForSpeechSeq2Seq`.",
    howToBuild: "Load `WhisperForConditionalGeneration.from_pretrained(\"openai/whisper-large-v3\")`, pass `input_features` from `WhisperProcessor(audio=waveform, return_tensors=\"pt\")`, and call `.generate()`.",
  },
  "video-understanding": {
    whatIs: "Video understanding models process sequences of frames plus audio/text to answer questions about video content, recognise actions, and summarise events over time.",
    whereUsed: "Gemini 1.5 Pro, GPT-4o, and Qwen2-VL (video) handle video QA; Video-LLaVA and LLaVA-NeXT-Video are open models; they sample frames, embed each, and feed them as a temporal sequence.",
    howToBuild: "Sample N frames from a video with `decord`, embed each frame with CLIP, project into LLM space, prepend as N visual tokens with positional encodings, and generate a caption.",
  },
  "cross-modal-representation": {
    whatIs: "Cross-modal representation is the shared embedding space where vectors from different modalities (text, image, audio) are aligned so that semantically related content is close regardless of modality.",
    whereUsed: "CLIP's contrastive image-text alignment and ImageBind's six-modality shared space are foundational; LLaVA's projection layer aligns image features into the text LLM's space.",
    howToBuild: "Train a CLIP-like model with `InfoNCE` contrastive loss between image and text embeddings using `transformers.CLIPModel`, or fine-tune a projection layer with `nn.CosineEmbeddingLoss`.",
  },
};