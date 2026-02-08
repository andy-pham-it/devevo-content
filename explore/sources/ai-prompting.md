# AI Prompt Engineering & Code Review

## 1. The Core Framework: CIRA

To get the best results from LLMs (like GPT-4, Claude, or Copilot), use the **CIRA** framework:

- **C**ontext: Provide background (state the framework, file structure, or intent).
- **I**nstruction: Be explicit about what you want (e.g., "Refactor this into a custom hook").
- **R**equirements: Define constraints (e.g., "No external libraries", "Include JSDoc").
- **A**dopt a Persona: Tell the AI who it is (e.g., "Act as a Senior React Architect").

---

## 2. Effective Prompting Techniques

### Few-Shot Prompting

Provide examples of the desired output to "fine-tune" the AI's response in-context.
> "Here are two examples of how we write unit tests: [Example 1], [Example 2]. Now, write a test for this new component..."

### Chain of Thought (CoT)

Ask the AI to think step-by-step to improve reasoning in complex logic.
> "Think step-by-step about how this authentication flow should work before writing the code."

### Iterative Refinement

Don't settle for the first response. Use follow-up prompts:
- "This is good, but make it more performant."
- "Explain the trade-offs of this approach."
- "Add error handling for the edge case where the API is down."

---

## 3. Reviewing AI-Generated Code

**NEVER trust AI code blindly.** Use this checklist during review:

- [ ] **Functional Correctness**: Does it actually solve the problem? (AI often "hallucinates" APIs that don't exist).
- [ ] **Security**: Are there vulnerabilities like SQL injection or hardcoded secrets?


- [ ] **Context Awareness**: Does it follow the project's existing patterns and naming conventions?
- [ ] **Performance**: Is the algorithm efficient? Did it introduce unnecessary re-renders or loops?
- [ ] **Maintainability**: Is the code readable? Are the variable names meaningful?

## 4. Real-World Examples & Analysis

### Example 1: Refactoring Logic

**Prompt:**
> "Act as a Senior React Developer. Refactor the following `useEffect` logic into a custom hook named `useUserData`. The hook should handle fetching, loading state, and error handling for a user profile. Use TypeScript for all types. Ensure it follows our project's pattern of using `zustand` for global state if possible."

**Analysis:**

- **Context**: "Senior React Developer", "custom hook named `useUserData`".
- **Instruction**: "Refactor the following `useEffect` logic".
- **Requirements**: "fetching, loading, error handling", "TypeScript", "zustand sync".
- **Why it works**: By specifying the name and specific states to handle, you prevent the AI from giving a generic solution. Mentioning `zustand` ensures the AI doesn't just return a `useState` version if your project uses a different state manager.

### Example 2: Generating Unit Tests

**Prompt:**
> "Write 5 Vitest unit tests for the `calculateDiscount` function below. Include edge cases for negative prices, 100% discounts, and invalid input types. Follow the Arrange-Act-Assert pattern and use `describe` blocks to group tests."

**Analysis:**

- **Context**: "Vitest", "calculateDiscount function".
- **Instruction**: "Write 5... unit tests".
- **Requirements**: "edge cases (negative, 100%, types)", "Arrange-Act-Assert pattern", "describe blocks".
- **Why it works**: Specifying the number of tests (5) and the exact edge cases forces the AI to think beyond the "happy path." Requesting an architectural pattern (AAA) ensures the code matches professional standards.

### Example 3: Debugging a Bug

**Prompt:**
> "I'm getting a 'Maximum update depth exceeded' error in this React component. I think it's related to how I'm setting state inside `useEffect`. Analyze the code and suggest a fix. Explain exactly why the infinite loop is happening."

**Analysis:**

- **Context**: "Maximum update depth exceeded", "React component".
- **Instruction**: "Analyze the code and suggest a fix", "Explain exactly why".
- **Requirements**: Focus on `useEffect` dependencies.
- **Why it works**: By describing the error message and your suspicion, you narrow down the AI's "search space," leading to a faster and more accurate diagnosis.

---

## 5. Best Practices for GitHub Copilot

- **Open Related Files**: Copilot uses open tabs as context. Keep relevant files open to improve suggestions.
- **Write Comments First**: Describe the function logic in a comment to guide the autocomplete.
- **Use Copilot Chat for Refactoring**: Highlight a block of code and ask for specific improvements (e.g., "Make this function pure").
- **Slash Commands**: Use `/tests` to generate unit tests or `/explain` to understand legacy code.
