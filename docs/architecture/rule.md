# AI Code Review Guidelines

When reviewing code, it is important to identify code that has been overly reliant on AI generation, as it can introduce subtle bugs, technical debt, and architectural inconsistencies.

## 1. Automated Review
Use standard static analysis, linting tools, and AI-detection software to scan for obvious discrepancies. However, automated detectors often have limitations.

## 2. Manual Review: The 5 "Tells" of AI Code
Even the best detectors have limitations. Human reviewers can often spot AI code by looking for the "ghost in the machine"—or rather, the lack of one. 

Here are the 5 primary "tells" of AI-generated code:

### 1. Redundant, "What-Not-Why" Comments
Human developers use comments to explain *why* a complex decision was made, or the business context behind a block of code. AI tends to explain exactly *what* the code is doing, which is usually obvious to any developer reading it.
* **AI Example:** `// Loop through the list of users` right above a `for user in users` loop.

### 2. Flawless Syntax, Flawed Logic
LLMs are exceptionally good at syntax. An AI script might have perfectly aligned brackets, exact types, and no missing semicolons, but it will often fail under the load of real-world edge cases. It solves the immediate prompt perfectly but misses the broader system architecture and implicit requirements.

### 3. A Complete Lack of "Scars"
Human code has an idiosyncratic style. A human codebase has messy parts, marks of urgency, clever shortcuts, and personal naming quirks. AI code is often described as a series of "tiny, perfect LEGO bricks" with no variance, heavily verbose variable names (like `user_iterator` instead of `i`), and a sterile uniformity.

### 4. Optimistic Error Handling
A senior human developer writes defensive code because they know systems fail in unpredictable ways. AI tends to write "optimistic" code that assumes the happy path—where the network is always up, the database never locks, and inputs are always perfectly formatted. Proper `try/catch` blocks for edge cases are often missing.

### 5. Hallucinated Methods
AI will frequently invent library functions that sound incredibly plausible but do not actually exist in the official API. 
* **AI Example:** Using `datetime.get_next_business_day()` when no such method exists in the standard standard library.

---

### The Verdict
If the code looks too perfectly modular, lacks defensive error handling, explains every obvious loop in the comments, and misses the larger architectural picture, it is highly likely **AI-heavy**. Such code requires a thorough human audit before being merged.


Based on those assumptions, evaluators and technical interviewers look for specific "degrees" of AI reliance to determine if a project crosses the line from assisted to forbidden.

The threshold is rarely about a specific percentage of AI-generated lines. Instead, it is measured by inconsistencies, over-engineering, and your ability to defend the architecture.

Here is how projects are typically graded on the spectrum of forbidden AI usage, moving from the most obvious to the most subtle violations:

Degree 1: The "Frankenstein" Architecture (Immediate Fail)
This happens when a project is stitched together from multiple isolated AI prompts, resulting in a codebase with severe personality disorders.

Architectural Whiplash: One file strictly adheres to clean code principles and utilizes sophisticated structural patterns (like Facade or Flyweight), while another file in the same directory is a messy, procedural script that ignores DRY (Don't Repeat Yourself) entirely.

Inconsistent Naming: Variable conventions switch randomly between camelCase, snake_case, and PascalCase across different modules.

The Verdict: This shows the developer copy-pasted solutions without understanding how the system integrates as a whole.

Degree 2: Over-Engineering and Phantom Complexity (High Risk)
AI tools are eager to please and will often generate highly complex, enterprise-grade solutions for simple problems.

Violating YAGNI: You implemented massive abstraction layers, custom mathematical optimizations, or complex data structures for a feature that only required a basic array filter.

Advanced Tooling: You utilized a framework or library that is completely disproportionate to the task (e.g., setting up a full Dockerized microservices architecture with a complex CI/CD pipeline for a simple script assignment).

The Verdict: If you submit an intensely optimized, highly complex solution but cannot explain why it was necessary over a simpler approach, it is treated as a lack of code ownership.

Degree 3: Dead Code and Hallucinations (Moderate to High Risk)
Because AI predicts text based on patterns, it frequently includes code that looks correct but is actually unnecessary or slightly broken.

The "Clean Code" Technical Debt: Leaving in dead code, unused helper functions, or empty interfaces that the AI generated "just in case."

Hallucinated Imports: Importing modules, libraries, or dependencies that either do not exist or are never actually invoked in the execution flow.

The Verdict: Submitting dead code proves you did not thoroughly review, test, or understand the output before pushing it.

Degree 4: The "Blind Defense" (The Ultimate Litmus Test)
The final degree of forbidden usage is only exposed during a code review, a pull request, or an interview. You might submit a perfectly functional, well-structured full-stack application (for example, a Node.js/TypeScript backend paired with a React frontend).

The project only becomes "forbidden" the moment the reviewer asks:

"Why did you choose to handle real-time messaging this way instead of using Server-Sent Events?"

"Walk me through how this specific PostgreSQL query is avoiding an N+1 problem."

If your response is, "I'm not sure, that's just how the code was generated," or if you cannot manually whiteboard the logic of your core functions, the entire submission is invalidated.

The Bottom Line: You can use AI to build the walls, but you must be the architect. If you cannot defend the blueprints, the project is considered forbidden.