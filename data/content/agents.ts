import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "ai-agents": {
    whatIs: "AI agents are systems that use an LLM as a reasoning engine to autonomously decide actions, call tools, observe results, and iterate until a user-defined goal is achieved.",
    whereUsed: "Claude's computer use, Devin, AutoGPT, and LangGraph agents use LLMs in a tool-calling loop; the `langgraph` and `crewai` frameworks scaffold multi-step agent workflows.",
    howToBuild: "Use `langgraph.prebuilt.create_react_agent(model, tools)` to get a ReAct agent that automatically runs the reason-act-observe loop; invoke with `agent.invoke({\"messages\": [...]})`.",
  },
  "agent-loop": {
    whatIs: "The agent loop is the core execution cycle where the agent reasons about the current state, selects an action, executes it, observes the result, and repeats until the task is complete.",
    whereUsed: "ReAct, LangGraph, and AutoGPT all implement a loop; the loop terminates when the LLM emits a final answer or a max-iteration guard triggers to prevent runaway agents.",
    howToBuild: "Implement `for step in range(max_iter): response = llm(messages); if no tool_calls: break; execute and append results` — this is the minimal agent loop in pure Python.",
  },
  "planning": {
    whatIs: "Planning is the agent's ability to decompose a complex goal into a sequence of sub-tasks before execution, improving coherence and reducing errors in multi-step problems.",
    whereUsed: "Tree-of-Thoughts, ReWOO, and LangGraph `Plan-and-Execute` agents plan upfront; OpenAI o1 and Claude internally reason through plans before producing a final answer.",
    howToBuild: "Prompt the LLM with `\"Break this task into numbered sub-tasks: {goal}\"`, parse the list, then iterate executing each sub-task with its own tool-calling sub-loop.",
  },
  "reasoning": {
    whatIs: "Reasoning in agents is the LLM's internal chain-of-thought process that connects observations and goals to decide the next action, often surfaced as explicit \"Thought:\" text in ReAct-style agents.",
    whereUsed: "ReAct prompting, OpenAI o1's hidden chain-of-thought, and DeepSeek-R1's reasoning traces all leverage step-by-step reasoning to improve tool selection and final answer quality.",
    howToBuild: "Use a ReAct prompt template with `\"Thought: ...\\nAction: ...\\nObservation: ...\"` sections, or enable `reasoning_effort` in OpenAI o1 API to get deeper hidden reasoning before tool calls.",
  },
  "actions": {
    whatIs: "Actions are the concrete operations an agent performs in the environment — calling a tool, executing code, searching the web — based on the LLM's reasoning output.",
    whereUsed: "LangGraph `ToolNode`, CrewAI tasks, and Claude computer-use actions (click, type) are all agent actions; the action space is defined by the set of registered tools.",
    howToBuild: "Map each `tool_call.function.name` to a Python callable in a dict, execute it inside the agent loop, and append the stringified result as an `Observation` message for the next reasoning step.",
  },
  "observations": {
    whatIs: "Observations are the results returned to the agent after executing an action — tool outputs, API responses, or environment state — that the LLM uses to reason about the next step.",
    whereUsed: "In ReAct, observations are appended as a `tool` message; in LangGraph, `ToolNode` returns observation messages; web agents observe DOM screenshots or HTML text after a browser action.",
    howToBuild: "After executing a tool, append `{\"role\": \"tool\", \"content\": str(result)[:2000]}` (truncate to fit context) to the messages list so the LLM can reason over the observation.",
  },
  "memory": {
    whatIs: "Agent memory is the storage of past interactions, facts, and context that persists across agent steps or sessions, enabling long-term coherence beyond a single context window.",
    whereUsed: "LangGraph `MemorySaver` checkpoints state, MemGPT and Letta manage tiered memory, and Claude Projects store persistent context; vector-store-backed long-term memory is common in RAG agents.",
    howToBuild: "Use `langgraph.checkpoint.memory.MemorySaver()` as the checkpointer in `create_react_agent(..., checkpointer=memory)`, and pass a `thread_id` to persist state across turns.",
  },
  "multi-step-tasks": {
    whatIs: "Multi-step tasks are goals that require the agent to chain several actions and observations — e.g., search, read, compute, then write — because no single tool call can solve the problem.",
    whereUsed: "Devin (coding), SWE-agent (GitHub issue resolution), and research agents like Perplexity Pro perform multi-step tasks over many loop iterations with planning and self-correction.",
    howToBuild: "Define a complex goal, run the agent loop with `max_iter=20`, log each Thought/Action/Observation triple, and inspect the trace to verify the agent recovers from intermediate failures.",
  },
};