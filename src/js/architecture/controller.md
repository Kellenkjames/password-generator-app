## Controller

🧠 Password Generator – Controller Architecture Plan
This document outlines key decisions for structuring the Controller Layer in the Password Generator app using a modular MVC-Lite architecture.

✅ 1. Event Sources
Interactive elements handled by the controller:

Slider input (character length)

Checkbox toggles:

Include uppercase

Include lowercase

Include numbers

Include symbols

Generate button click

---

✅ 2. Data Extraction
On user interaction, the controller should extract:

```js
// Slider
const length = parseInt(slider.value);

// Checkbox states
const options = {
  useUppercase: uppercaseInput.checked,
  useLowercase: lowercaseInput.checked,
  useNumbers: numbersInput.checked,
  useSymbols: symbolsInput.checked,
};

// Final call
generatePassword(length, options);
```

---

✅ 3. Event Strategy
Chosen Approach: Event Delegation

A single parent-level event listener will handle child input interactions.

Improves performance and keeps code DRY.

Tradeoffs:

✅ Scales well with more inputs

✅ Easier to manage in MVC

⚠️ Slightly more logic to identify targets via event.target

✅ 4. Trigger Points
When should the password be generated?
✅ Only when the Generate button is clicked.

Why?

Follows the UX principle of explicit user action/confirmation.
Prevents unexpected changes or errors from assumptions.

---

✅ 5. Validation
Where does validation occur?

✅ Inside the Model (returns null if invalid).

✅ The Controller handles the fallback (e.g., null → trigger view.showError()).

Invalid UI states:

Currently not defined in Figma, but will be handled via visual feedback.

---

✅ 6. View Communication
How does the controller update the UI?

❌ No direct DOM manipulation

✅ Calls View Layer functions to render output (e.g., view.renderPassword(password))

This maintains clean separation of concerns between logic and presentation.

| Layer          | Responsibility                                |
| -------------- | --------------------------------------------- |
| **Model**      | Business logic, validation, password creation |
| **Controller** | Orchestrates input → model → view             |
| **View**       | DOM updates, rendering, error messages        |
