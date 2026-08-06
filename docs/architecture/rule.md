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