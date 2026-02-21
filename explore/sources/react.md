# React Best Practices

## Component Design

### Functional Components
Always prefer functional components with hooks over class components.

```jsx
// Good
function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  // ...
}

// Avoid (unless necessary)
class UserProfile extends React.Component {
  // ...
}
```

### Single Responsibility
Each component should do one thing well.

```jsx
// Good - Focused components
function UserList({ users }) {
  return users.map(user => <UserCard key={user.id} user={user} />);
}

function UserCard({ user }) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

## State Management

### Use Appropriate Hooks

```jsx
// useState for local state
const [count, setCount] = useState(0);

// useReducer for complex state logic
const [state, dispatch] = useReducer(reducer, initialState);

// useContext for shared state
const theme = useContext(ThemeContext);
```

### Keep State Minimal
Only store what you need. Derive values instead of duplicating state.

```jsx
// Good
const [items, setItems] = useState([]);
const itemCount = items.length; // Derived

// Avoid
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0); // Duplicate
```

## Performance Optimization

### Memoization

```jsx
// Memoize expensive computations
const expensiveValue = useMemo(() => 
  computeExpensiveValue(a, b), 
  [a, b]
);

// Memoize callback functions
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Memoize components
const MemoizedComponent = React.memo(MyComponent);
```

### Avoid Inline Functions
Don't create new functions on every render when passing to children.

```jsx
// Good
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

return <Button onClick={handleClick} />;

// Avoid
return <Button onClick={() => console.log('clicked')} />;
```

## Code Organization

### Custom Hooks
Extract reusable logic into custom hooks.

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [name, setName] = useLocalStorage('name', '');
```

### Folder Structure
```
src/
  components/
    common/       # Reusable components
    features/     # Feature-specific components
  hooks/          # Custom hooks
  utils/          # Helper functions
  contexts/       # Context providers
```

## Error Handling

### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## Testing

### Write Testable Code
```jsx
// Good - Easy to test
function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`;
}

function UserGreeting({ user }) {
  return <h1>Hello, {formatUserName(user)}!</h1>;
}
```

## Key Principles

1. **Keep components small and focused**
2. **Lift state up when needed**
3. **Use composition over inheritance**
4. **Avoid premature optimization**
5. **Write clean, readable code**
6. **Test your components**
7. **Use TypeScript for type safety**
8. **Follow consistent naming conventions**

## Advanced Patterns

### Server Components (RSC)
RSC allows components to render exclusively on the server, reducing the client-side bundle size.

- **Server Components**: Can access DB/FS directly. Cannot use hooks (`useState`, `useEffect`).
- **Client Components**: Labeled with `"use client"`. Can use hooks and interactivity.

**When to use?**
- Use **Server Components** for data fetching and static content.
- Use **Client Components** for interactivity (clicks, form inputs, animations).

### Suspense & Transitions
Handle async states gracefully without scattered `isLoading` flags.

```jsx
// Suspense for loading states
<Suspense fallback={<Spinner />}>
  <UserData />
</Suspense>

// Transitions for non-urgent updates
const [isPending, startTransition] = useTransition();

function handleClick() {
  startTransition(() => {
    // This state update is low priority
    setTab('profile');
  });
}
```

### State Management: Which one to choose?

| Library | Best For | Pros | Cons |
|---|---|---|---|
| **Context API** | Theming, Auth, Localization | Built-in, simple API. | Performance issues with frequent updates (re-renders entire subtree). |
| **Redux Toolkit** | Large complex apps | Redux DevTools, predictable flow, widely used. | Boilerplate, steep learning curve. |
| **Zustand** | Mid-to-large apps | Minimalist, no boilerplate, highly performant. | Less "strict" structure than Redux. |
| **Recoil / Jotai** | Atomic state | Great for derived state dependencies. | Specific mental model (Atoms). |

### Compound Components Pattern
Great for building flexible, reusable UI libraries (like Select, Tabs, Accordion).

```jsx
// 1. Create Context
const ToggleContext = createContext();

// 2. Parent Component
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// 3. Child Components
Toggle.On = ({ children }) => {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
}

Toggle.Button = () => {
  const { toggle } = useContext(ToggleContext);
  return <Switch onPress={toggle} />;
}

// Usage
<Toggle>
  <Toggle.On>The light is ON</Toggle.On>
  <Toggle.Button />
</Toggle>
```
