# JavaScript Tips & Tricks

## Array Methods

### Map, Filter, Reduce
```javascript
const numbers = [1, 2, 3, 4, 5];

// Map - Transform array
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filter - Select elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// Reduce - Aggregate values
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15
```

### Find & Some/Every
```javascript
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
];

// Find first match
const activeUser = users.find(u => u.active);

// Check if any match
const hasActive = users.some(u => u.active); // true

// Check if all match
const allActive = users.every(u => u.active); // false
```

## Destructuring

### Object Destructuring
```javascript
const user = { name: 'Alice', age: 25, email: 'alice@example.com' };

// Basic
const { name, age } = user;

// Rename
const { name: userName } = user;

// Default values
const { role = 'user' } = user;

// Nested
const { address: { city } } = user;
```

### Array Destructuring
```javascript
const colors = ['red', 'green', 'blue'];

const [first, second] = colors;
// first = 'red', second = 'green'

// Skip elements
const [, , third] = colors; // third = 'blue'

// Rest operator
const [primary, ...secondary] = colors;
```

## Spread Operator

### Array Spreading
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];
```

### Object Spreading
```javascript
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };

// Merge objects (latter overwrites)
const prefs = { ...defaults, ...userPrefs };
// { theme: 'dark', lang: 'en' }
```

## Template Literals

```javascript
const name = 'Alice';
const age = 25;

// String interpolation
const greeting = `Hello, ${name}!`;

// Multi-line strings
const message = `
  Name: ${name}
  Age: ${age}
`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    result + str + (values[i] ? `<b>${values[i]}</b>` : ''), 
    ''
  );
}

const html = highlight`User ${name} is ${age} years old`;
```

## Optional Chaining & Nullish Coalescing

```javascript
const user = {
  profile: {
    name: 'Alice'
  }
};

// Optional chaining - Safe property access
const email = user.profile?.email; // undefined (no error)
const firstLetter = user.profile?.name?.[0]; // 'A'

// Nullish coalescing - Default for null/undefined only
const value = null ?? 'default'; // 'default'
const value2 = 0 ?? 'default'; // 0 (not 'default'!)
```

## Async/Await

```javascript
// Promise
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/Await
async function getUsers() {
  try {
    const res = await fetch('/api/users');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Parallel execution
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
```

## Short-Circuit Evaluation

```javascript
// && - Execute if truthy
isLoggedIn && fetchUserData();

// || - Default value (careful with falsy values)
const name = userName || 'Guest';

// Ternary
const status = isOnline ? 'Online' : 'Offline';
```

## Object Methods

```javascript
const obj = { a: 1, b: 2, c: 3 };

// Get keys, values, entries
Object.keys(obj); // ['a', 'b', 'c']
Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// From entries (reverse)
const entries = [['a', 1], ['b', 2]];
const newObj = Object.fromEntries(entries); // { a: 1, b: 2 }

// Assign (shallow merge)
Object.assign({}, obj, { d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
```

## Array Tips

```javascript
// Remove duplicates
const unique = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]

// Flatten array
const nested = [1, [2, [3, 4]]];
const flat = nested.flat(2); // [1, 2, 3, 4]

// Create range
const range = Array.from({ length: 5 }, (_, i) => i);
// [0, 1, 2, 3, 4]
```

## Function Tips

```javascript
// Arrow function implicit return
const double = n => n * 2;

// Default parameters
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```
