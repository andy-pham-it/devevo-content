# Clean Code & SOLID 🧹

## 1. General Principles

### DRY (Don't Repeat Yourself)
Before copying and pasting code, think: "Can I make this a reusable function or component?"
**Warning**: Don't over-abstract. Sometimes WET (Write Everything Twice) is better than a wrong abstraction.

### KISS (Keep It Simple, Stupid)
Complex code is potential technical debt.
```typescript
// Bad: Clever one-liner, hard to debug
const ids = users.reduce((acc, u) => u.isActive ? [...acc, u.id] : acc, []);

// Good: Readable
const ids = users
    .filter(u => u.isActive)
    .map(u => u.id);
```

### Self-Documenting Code
Comments explain **WHY**, not WHAT. The code should explain WHAT.
```typescript
// Bad
// Check if user is 18 or older
if (user.age >= 18) { ... }

// Good
const isLegalAdult = user.age >= 18;
if (isLegalAdult) { ... }
```

## 2. SOLID Principles with Examples

### S - Single Responsibility Principle (SRP)
A module should have only one reason to change.

**Bad**: `UserManager` handles persistence, email notification, and logging.
**Good**:
-   `UserRepository`: Handles DB.
-   `EmailService`: Handles email.
-   `Logger`: Handles logging.
-   `UserManager`: Coordinates them.

### O - Open/Closed Principle (OCP)
Open for extension, closed for modification. Use Polymorphism.

```typescript
// Bad: Need to modify class to add new shape
class AreaCalculator {
    calculate(shape: any) {
        if (shape.type === 'circle') return Math.PI * shape.radius ** 2;
        if (shape.type === 'square') return shape.side ** 2;
    }
}

// Good: Add new class, don't touch existing logic (Interface oriented)
interface Shape { area(): number; }

class Circle implements Shape {
    area() { return Math.PI * this.radius ** 2; }
}
class Square implements Shape {
    area() { return this.side ** 2; }
}
```

### L - Liskov Substitution Principle (LSP)
Subclasses must be substitutable for their base classes.
If `Bird` has a `fly()` method, then `Ostrich` (which cannot fly) should NOT inherit from `Bird`, or `fly()` shouldn't be in `Bird`.

### I - Interface Segregation Principle (ISP)
Don't force clients to implement interfaces they don't use.

```typescript
// Bad: One giant interface
interface Worker {
    work(): void;
    eat(): void;
    sleep(): void;
}

// Robot doesn't eat or sleep!
class Robot implements Worker {
    work() { ... }
    eat() { throw Error("Cannot eat"); } // Violation
}

// Good: Segregate interfaces
interface Workable { work(): void; }
interface Eatable { eat(): void; }
```

### D - Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions.
**Dependency Injection** is the key.

```typescript
// Bad: Tight coupling
class UserService {
    private db = new MySQLDatabase(); // Hard dependency
}

// Good: Loose coupling
class UserService {
    constructor(private db: IDatabase) {} // Inject any DB implementing IDatabase
}
```
