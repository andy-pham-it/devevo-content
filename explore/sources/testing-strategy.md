# Testing Strategy: Pyramid vs. Trophy

A strong testing strategy ensures code reliability while maintaining developer velocity. The two most popular models are the **Testing Pyramid** and the **Testing Trophy**.

---

## 1. The Core Layers

### Unit Tests
Tests a small, isolated piece of code (like a single function or class) in isolation.
- **Purpose**: To verify that the smallest units of the application work correctly.
- **Pros**: Extremely fast, low maintenance, pinpointing bugs is instant.
- **Cons**: Doesn't guarantee that units work together; low confidence in overall app stability.
- **Example**:
  ```typescript
  // Testing a pure function
  expect(sum(2, 2)).toBe(4);
  expect(formatCurrency(1000)).toBe('$1,000.00');
  ```

### Integration Tests
Tests how multiple units or components work together.
- **Purpose**: To ensure that different modules of your application interact as expected (e.g., a component and a hook).
- **Pros**: High confidence, catches "interaction" bugs, usually easier to refactor than unit tests.
- **Cons**: Slower than unit tests, more complex setup (may need mocks for APIs).
- **Example**:
  ```tsx
  // Testing a component with its internal logic
  render(<LoginForm />);
  fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'admin' } });
  fireEvent.click(screen.getByText(/submit/i));
  expect(await screen.findByText(/success/i)).toBeInTheDocument();
  ```

### End-to-End (E2E) Tests
Tests the entire user flow from the browser/app level, including the real backend and database.
- **Purpose**: To verify that the entire system works from the user's perspective.
- **Pros**: Highest level of confidence, tests the "real world" flow.
- **Cons**: Very slow, brittle (flaky), expensive to write and maintain.
- **Example**:
  - A Playwright script that opens the browser, logs in, adds an item to the cart, and completes the purchase.

---

## 2. Comparing Strategic Models

### The Testing Pyramid (Traditional)
Proposed by Mike Cohn, it emphasizes a heavy base of Unit tests.
- **Goal**: Catch logic bugs early and fast.
- **Structure**: High # of Unit tests, Medium Integration, Low E2E.
- **Best For**: Libraries, backends with complex math/logic, or utility-heavy projects.

### The Testing Trophy (Modern)
Proposed by Kent C. Dodds, it emphasizes **Integration tests** to maximize "confidence per line of code."
- **Goal**: Test the app the way it's actually used.
- **Structure**: Static analysis (Lint/TS) -> Unit -> **Integration (Bulk)** -> E2E.
- **Best For**: Modern web/mobile apps (React, Vue) where component interactions are the main source of bugs.

---

## 3. Trade-offs & Selection

| Feature | Unit Test | Integration | E2E |
| :--- | :--- | :--- | :--- |
| **Confidence** | Low | High | Very High |
| **Maintenance** | Low | Medium | High |
| **Execution Speed** | Ultra-Fast | Fast/Medium | Slow |
| **Refactoring** | High (Harder) | Low (Easier) | Low (Easier) |

### Real-World Selection Guide
1. **Got complex math/logic?** Use the **Pyramid** (heavy Unit tests).
2. **Developing a React/Native UI?** Use the **Trophy** (heavy Integration tests).
3. **Mission-critical features?** (Checkout, Signup). Always cover with at least one **E2E test**.

---

## 4. Key Takeaways
- **Testing behavioral results** (what the user sees) makes your app resilient.
- Focus on the tests that give you the **most confidence** with the **least maintenance**.

## 5. Advanced Strategies

### TDD (Test Driven Development)
Write tests *before* writing code.
**The Cycle**:
1.  **Red**: Write a failing test.
2.  **Green**: Write minimum code to pass.
3.  **Refactor**: Clean up the code.

### Mocking Strategies
When to fake it?
- **Mock**: External services (Stripe, Email), complex native modules (Camera).
- **Don't Mock**: Logic within your control (Redux reducers, Utils).
- **Tool**: MSW (Mock Service Worker) intercepts network requests at the network level, simulating a real server.

### Visual Regression Testing (VRT)
Detects pixel-level changes.
- **Tools**: Storybook + Chromatic / Percy.
- **Workflow**: 
    1. Capture screenshots of components.
    2. Compare with "baseline" images.
    3. Alert if pixels differ.

### Contract Testing
Ensures Frontend and Backend agree on API schema.
- **Tools**: Pact.
- **Why**: Prevents "Backend changed the API response structure" bugs.

