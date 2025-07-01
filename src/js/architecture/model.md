🔐 Password Generator – Model Layer Planning (MVC-Lite)

🧠 Goal
Design the logic layer responsible for generating secure, valid passwords based on user input. The model should be pure, testable, and resilient to edge cases.

1. ✅ User Inputs (Model Function Arguments)

```js
generatePassword(length, {
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
});
```

## Controlled Inputs:

- Slider value (password length)

### Checkbox selections:

Include Uppercase Letters

Include Lowercase Letters

Include Numbers

Include Symbols

---

2. ✅ Validation

| Rule                                         | Reason                                            |
| -------------------------------------------- | ------------------------------------------------- |
| ✅ `length > 0`                              | Password must contain at least one character      |
| ✅ At least one option selected              | Cannot build a pool from nothing                  |
| ✅ `length >= number of selected categories` | Ensures at least one char from each selected type |

---

3. ✅ Character Pool Construction

| Approach                    | Strategy                                                        |
| --------------------------- | --------------------------------------------------------------- |
| 🧩 Use split arrays         | Maintain arrays for each category (upper, lower, nums, symbols) |
| 🔄 Build pool dynamically   | Based on user-selected types                                    |
| 🧪 Ensure category coverage | Randomly select **1 character per selected type**               |
| ➕ Fill remaining length    | From a combined pool of selected arrays                         |
| 🔀 Shuffle final result     | Prevent predictable ordering (e.g., uppercase always first)     |

---

💡 Example Arrays:

```js
const UPPERCASE = ['A', 'B', ..., 'Z'];
const LOWERCASE = ['a', 'b', ..., 'z'];
const NUMBERS = ['0', '1', ..., '9'];
const SYMBOLS = ['!', '@', '#', ...];
```

4. ✅ Entropy Awareness (Security)

Entropy = randomness = unpredictability

A password like abcABC123 is lower entropy than #dJ9vB!@q

We improve entropy by:

Drawing from larger and more varied character sets

Avoiding fixed character order

Avoiding repeated characters

Ensuring randomness via proper shuffling

---

5. ✅ Shuffling Strategy

🔁 Use a secure, deterministic shuffling algorithm like Fisher-Yates

Why?

Avoids pattern leakage (e.g., always ends with a symbol)

Prevents entropy loss due to character placement predictability

---

🧱 Function Responsibility

```js
generatePassword(length, {
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols,
});
```

🔗 Steps:

Validate config

Check length and selected character types

Return null or throw if invalid

Construct character sets

Build selected arrays and total pool

Pull 1 character from each selected type

Guarantees coverage

Fill remaining characters

Randomly draw from total pool

Shuffle entire result

Use Fisher-Yates or similar algorithm

Return string

Final password is a shuffled string of characters

---

🧠 Senior Engineer Mental Models

Separate logic and UI — keep generation pure, DOM-free

Fail early — block invalid configs before doing work

Think in constraints — match UX design (length limits, strength feedback)

Entropy ≠ randomness — it’s strategic unpredictability, not chaos

Balance — include all selected character types, not just random draws
