import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "reasoning": {
    whatIs: "Reasoning in LLMs refers to the model's ability to produce explicit step-by-step chain-of-thought before answering, improving performance on math, coding, and multi-step problems.",
    whereUsed: "OpenAI o1/o3, DeepSeek-R1, and Claude 3.5 with extended thinking are reasoning models; they generate long hidden or visible reasoning traces before the final answer.",
    howToBuild: "Fine-tune a base model on chain-of-thought traces (e.g., OpenThoughts dataset) with `SFTTrainer`, or prompt with `\"Let's think step by step\"` to elicit reasoning at inference.",
  },
  "test-time-compute": {
    whatIs: "Test-time compute is the extra inference-time computation (more reasoning tokens, search, or verification) spent to improve answer quality, trading latency for accuracy on hard problems.",
    whereUsed: "OpenAI o1 dynamically scales test-time compute by generating more reasoning tokens for harder problems; AlphaCode and ToT also use search at inference to boost accuracy.",
    howToBuild: "Increase `max_new_tokens` for the reasoning phase and use a `\"<|end_reasoning|>\"` delimiter; log tokens generated vs answer accuracy to measure the compute-quality scaling curve.",
  },
  "verification": {
    whatIs: "Verification is the reasoning-model step of checking candidate answers for correctness — via self-evaluation, unit tests, or a separate verifier model — before returning a final answer.",
    whereUsed: "OpenAI o1's hidden verifier, AlphaCode's test-case filtering, and self-consistency voting all verify outputs; `SelfCheck` and `Self-Refine` papers formalise verification prompts.",
    howToBuild: "Generate N solutions, prompt the model with `\"Check this solution for errors: {solution}\"`, keep solutions marked correct, and return the majority-vote answer among verified candidates.",
  },
  "search": {
    whatIs: "Search at reasoning time explores multiple solution paths (tree-of-thoughts, beam search, MCTS) and selects the most promising branch, improving accuracy on combinatorial problems.",
    whereUsed: "Tree-of-Thoughts (ToT), AlphaCode's beam search, and rStar-Math's MCTS explore reasoning branches; LangGraph `ToolNode` with backtracking implements search in agent frameworks.",
    howToBuild: "Implement a ToT loop: generate K candidate next-steps, score each with an LLM evaluator, expand the top branch, and backtrack on dead ends using `langgraph` state graphs.",
  },
  "self-verification": {
    whatIs: "Self-verification is the process where the same LLM that generated an answer critiques and verifies it, re-deriving the solution or checking each step for consistency without an external oracle.",
    whereUsed: "Self-Refine and Self-CheckGPT use the model to verify its own outputs; DeepSeek-R1's reasoning trace includes self-correction steps; this improves math and code accuracy.",
    howToBuild: "After generating a solution, prompt `\"Review your answer step by step. If an error is found, correct it.\"` in a second LLM call, and return the revised answer; compare accuracy with and without.",
  },
  "reward-signals": {
    whatIs: "Reward signals in reasoning models guide search and verification — from a trained reward model, rule-based checks (unit tests, math verification), or self-evaluation scores — to rank candidate solutions.",
    whereUsed: "OpenAI's ORM/PRM (process reward model) for o1, DeepSeek-R1's rule-based math rewards, and AlphaCode's test-case pass rate all serve as reward signals during reasoning search.",
    howToBuild: "For code problems, run `pytest` on each candidate solution and use pass rate as the reward; for math, compare the final numeric answer to the ground truth with `float(pred) == float(gold)`.",
  },
};