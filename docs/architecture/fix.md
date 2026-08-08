If you want to check whether a **website/project contains too much AI-generated code**, don't rely on an "AI detector" alone. For source code, look for **patterns that indicate the developer doesn't fully understand or own the code**.

### Key points to check

| Area               | Signs of excessive AI-generated code                                                  |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Code structure** | Many unnecessary abstractions, wrappers, helpers, or components                       |
| **Naming**         | Generic names like `handleData`, `processData`, `utils`, `result`, `data2` everywhere |
| **Comments**       | Lots of verbose comments explaining obvious code                                      |
| **Consistency**    | Different coding styles/patterns within the same project                              |
| **Dependencies**   | Libraries added for problems that could be solved with a few lines of code            |
| **Error handling** | Generic `try/catch` everywhere, often without meaningful recovery                     |
| **React**          | Excessive `useEffect`, unnecessary state, duplicated components, prop drilling        |
| **Backend**        | Over-engineered services/controllers/repositories for simple CRUD                     |
| **Database**       | Poor schema design, unnecessary indexes, inefficient queries                          |
| **Security**       | AI-generated-looking authentication/authorization with subtle vulnerabilities         |
| **Dead code**      | Unused functions, imports, components, variables, or fallback logic                   |
| **Duplication**    | Similar code repeated instead of understanding and refactoring it                     |
| **Edge cases**     | Happy-path implementation but poor handling of invalid/empty/unexpected input         |
| **Understanding**  | Developer cannot explain why a piece of code exists or why a library was chosen       |

### Especially important: test the developer

If you're evaluating a project, I'd use this approach:

**1. Find suspicious sections**

* Search for unusually complex functions.
* Look for huge components/functions.
* Look for recently added generic utilities.
* Identify code with inconsistent style.

**2. Ask "why?"**
For example:

> Why did you use `useMemo` here?

> Why is this database index necessary?

> Why does this `useEffect` depend on these variables?

> Why did you create this abstraction instead of putting the logic directly here?

> What happens if this API returns `null`?

A developer who wrote/understands the code should usually be able to explain the reasoning.

**3. Ask them to modify it**

This is often much better than AI detection.

For example:

> "Add a filter for students scoring above 8.0."

Then observe whether they can **navigate and modify their own architecture** without asking AI to explain everything.

### A useful scoring system

You can score each area:

* **0 — Human-understood:** clear, intentional code
* **1 — Slight AI assistance:** some generated boilerplate
* **2 — Significant AI assistance:** developer understands most of it
* **3 — Heavy AI generation:** lots of code the developer probably doesn't understand
* **4 — AI-dependent:** developer struggles to explain or modify the code

Then evaluate:

**Code quality + consistency + architectural understanding + ability to modify + dependency choices**

rather than trying to determine an exact "AI percentage."

### For a React + Tailwind project

Since you mentioned React/Tailwind previously, I'd pay particular attention to:

* giant React components (`500+` lines)
* excessive `useEffect`
* excessive `useState`
* unnecessary `useMemo` / `useCallback`
* duplicated JSX
* components created for trivial elements
* Tailwind classes that are extremely long/repetitive
* arbitrary values everywhere (`mt-[13px]`, `w-[437px]`, etc.)
* inconsistent responsive design
* unused Tailwind classes
* unnecessary UI libraries
* generic hooks that aren't actually reusable
* AI-style comments such as explaining every obvious JSX operation

**The strongest signal isn't "does this code look like AI?" It's "does the author demonstrate understanding of the code?"**

If you're specifically trying to **audit a submitted source-code project and produce a report showing which files/lines are likely AI-generated**, I can also give you a practical detection methodology and scoring rubric for that.
