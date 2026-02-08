# Web Components

Web Components are a suite of different technologies allowing you to create reusable custom elements—with their functionality encapsulated away from the rest of your code—and utilize them in your web apps.

---

## 1. The Three Main Pillars

### Custom Elements

A set of JavaScript APIs that allow you to define custom elements and their behavior.

- **Purpose**: Create your own HTML tags (e.g., `<my-button>`).
- **Example**:

  ```javascript
  class MyButton extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<button>Click Me!</button>`;
    }
  }
  customElements.define('my-button', MyButton);
  ```

### Shadow DOM

A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element.
- **Purpose**: Scope styles and structure so they don't leak out or get affected by global CSS.
- **Example**:
  ```javascript
  const shadow = this.attachShadow({ mode: 'open' });
  shadow.innerHTML = `<style>button { color: red; }</style><button>I am protected</button>`;
  ```

### HTML Templates

The `<template>` and `<slot>` elements enable you to write markup templates that are not rendered in the main page but can be reused.
- **Purpose**: Define a blueprint for your component's UI.
- **Example**:

  ```html
  <template id="my-card">
    <div class="card">
      <slot name="title">Default Title</slot>
    </div>
  </template>
  ```

---

## 2. Component Lifecycle Callbacks

To build dynamic components, you must understand the four primary lifecycle methods:

- **`constructor()`**: Called when the element is created or upgraded. Used for initial state and attaching the Shadow DOM.
- **`connectedCallback()`**: Called every time the element is inserted into the DOM. Best for initial rendering or fetching data.
- **`disconnectedCallback()`**: Called when the element is removed from the DOM. Used for cleanup (removing listeners, stopping timers).
- **`attributeChangedCallback(name, oldVal, newVal)`**: Called when an observed attribute is added, removed, or changed.

---

## 3. Dynamic Behavior: Attributes & Events

### Attribute Observation

To react to attribute changes, you must specify which attributes to watch.

```javascript
class MyComponent extends HTMLElement {
  static get observedAttributes() {
    return ['theme', 'size'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute ${name} changed from ${oldVal} to ${newVal}`);
    this.render();
  }
}
```

### Custom Events (Communication)
Web Components follow the **"Data down, Events up"** pattern. You pass data in via attributes/properties and communicate back via `CustomEvents`.

```javascript
this.dispatchEvent(new CustomEvent('user-follow', {
  detail: { userId: 123 },
  bubbles: true,
  composed: true // Allows the event to cross the Shadow DOM boundary
}));
```

---

## 4. Complex Example: Reactive User Card

This example combines **Shadow DOM**, **Slots**, **Attributes**, and **Custom Events**.

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['name', 'avatar'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  handleFollow() {
    const name = this.getAttribute('name');
    this.dispatchEvent(new CustomEvent('follow-clicked', {
      detail: { name },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const name = this.getAttribute('name') || 'Guest';
    const avatar = this.getAttribute('avatar') || 'https://via.placeholder.com/50';

    this.shadowRoot.innerHTML = `
      <style>
        .card { display: flex; align-items: center; border: 1px solid #ccc; padding: 10px; border-radius: 8px; font-family: sans-serif; }
        .avatar { width: 50px; height: 50px; border-radius: 50%; margin-right: 15px; }
        .info { flex: 1; }
        button { background: #007aff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
      </style>
      <div class="card">
        <img src="${avatar}" class="avatar" alt="${name}">
        <div class="info">
          <strong>${name}</strong>
          <div><slot name="bio">No bio provided.</slot></div>
        </div>
        <button id="follow-btn">Follow</button>
      </div>
    `;

    this.shadowRoot.querySelector('#follow-btn')
      .addEventListener('click', () => this.handleFollow());
  }
}
customElements.define('user-card', UserCard);
```

**Usage:**

```html
<user-card name="Antigravity" avatar="logo.png">
  <span slot="bio">Your favorite AI coding assistant.</span>
</user-card>
```

---

## 5. Pros & Cons

| Feature | Pros | Cons |
| :--- | :--- | :--- |
| **Encapsulation** | Strict isolation (Shadow DOM). | Theming can be complex (CSS Parts needed). |
| **Portability** | Framework agnostic. | SEO for deep Shadow DOM can be tricky. |
| **Lifecycle** | Standardized hooks (DOM APIs). | Less "reactive" than React/Vue (no auto-diffing). |
| **Performance** | Native browser speed, no library overhead. | Manual DOM manipulation is error-prone. |

---

## 6. Real-World Use Cases

- **Enterprise Design Systems**: Ensuring consistent UI across React, Angular, and legacy apps.
- **Embedded Widgets**: Third-party tools (Chatbots, Maps) that shouldn't break the host's styles.
- **Modular Microfrontends**: Independent UI units developed and deployed by different teams.

---

## 7. Key Takeaways

- **Data in via Attributes/Properties, Actions out via Events.**
- **Composed: true** is essential for events to escape the Shadow DOM.
- **`connectedCallback`** is better than the constructor for rendering logic.
- **CSS Variables and ::part** are the modern ways to theme Web Components.
