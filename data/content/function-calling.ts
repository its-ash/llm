import type { SubtopicContent } from '~/data/content-types';

export const content: Record<string, SubtopicContent> = {
  "tools": {
    whatIs: "Tools are external functions (APIs, calculators, databases) with a defined name, description, and JSON-schema parameter spec that an LLM can invoke to interact with the outside world.",
    whereUsed: "OpenAI function calling, Anthropic tool use, and LangChain `@tool` decorator define tools; Claude, GPT-4, and Llama-3.1-Instruct are trained to emit structured tool-call requests.",
    howToBuild: "Define `def get_weather(city: str) -> str: ...`, wrap with `langchain.tools.tool`, pass `[get_weather]` to `create_tool_calling_agent`, and let the LLM emit `{\"name\": \"get_weather\", \"args\": {\"city\": \"SF\"}}`.",
  },
  "tool-definitions": {
    whatIs: "Tool definitions are JSON-Schema objects describing each tool's name, purpose, and parameter types, provided to the LLM so it knows what tools are available and how to call them correctly.",
    whereUsed: "OpenAI `tools=[{\"type\": \"function\", \"function\": {...}}]`, Anthropic `tools=[{\"name\": ..., \"input_schema\": ...}]`, and LangChain `.bind_tools()` all use schema-based definitions.",
    howToBuild: "Write a Pydantic `class WeatherInput(BaseModel): city: str`, derive the JSON schema with `WeatherInput.model_json_schema()`, and pass it in the `tools` parameter of `client.chat.completions.create`.",
  },
  "tool-selection": {
    whatIs: "Tool selection is the LLM's decision process of choosing which tool (if any) to call based on the user query and the available tool descriptions, emitting a structured tool-call request.",
    whereUsed: "GPT-4 Turbo, Claude 3.5, and Llama-3.1 use their instruction-tuning and tool-use training to select tools; the model outputs a tool name and arguments or a normal response.",
    howToBuild: "Send `messages` with `tools` to the LLM API, inspect `response.choices[0].message.tool_calls` — if present, the model selected a tool; parse `tool_call.function.name` and `.arguments`.",
  },
  "structured-output": {
    whatIs: "Structured output is the constraint that the LLM's response conforms to a given JSON schema, guaranteeing parseable tool arguments or data extraction results without manual regex parsing.",
    whereUsed: "OpenAI `response_format={\"type\": \"json_schema\", \"schema\": ...}`, Anthropic tool use, and `instructor` library use structured output for reliable function-calling and data extraction.",
    howToBuild: "Use `instructor.from_openai(client)` with a Pydantic model as `response_model`, call `client.chat.completions.create_with_completion(model=..., response_model=WeatherInput, ...)` to get a validated object.",
  },
  "function-arguments": {
    whatIs: "Function arguments are the JSON object the LLM generates to fill the parameters of a selected tool, matching the tool's schema so the runtime can execute the function with valid inputs.",
    whereUsed: "OpenAI returns `tool_calls[0].function.arguments` as a JSON string; `json.loads` parses it before calling the actual Python function; LangChain `ToolCallingAgent` does this automatically.",
    howToBuild: "Parse `args = json.loads(tool_call.function.arguments)`, validate with `WeatherInput(**args)` via Pydantic, and call `tool.func(**validated.model_dump())` to execute the function.",
  },
  "tool-execution": {
    whatIs: "Tool execution is the runtime step where the host application runs the selected function with the LLM-provided arguments and captures the return value to feed back into the conversation.",
    whereUsed: "LangChain `AgentExecutor` and OpenAI Assistants run tools server-side; the result is appended as a `tool` role message so the LLM can produce a final natural-language answer.",
    howToBuild: "Dispatch on `tool_call.function.name`, run the matching Python function, append `{\"role\": \"tool\", \"tool_call_id\": ..., \"content\": str(result)}` to messages, and re-call the LLM for a final answer.",
  },
  "tool-calling-loop": {
    whatIs: "The tool-calling loop is the iterative cycle of LLM → tool_call → execute → append result → LLM again, repeating until the model emits a final answer with no further tool calls.",
    whereUsed: "LangChain `AgentExecutor` and the OpenAI Assistants `run` API run this loop; multi-step agents like AutoGPT and Claude's computer use rely on many loop iterations.",
    howToBuild: "Write a `while True:` loop: call the LLM, if `message.tool_calls` execute each and append results, else `break` and return `message.content`; cap iterations to avoid infinite loops.",
  },
};