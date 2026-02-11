# SOLID Principles: A Comprehensive Guide to Clean Code

This document outlines the five essential principles of Object-Oriented Design (OOD) that help developers create software that is easy to maintain, extend, and understand.

---

## 1. Single Responsibility Principle (SRP)
> "A class should have one, and only one, reason to change."

### Detailed Explanation
SRP dictates that a class should be focused on a single task. If a class has multiple responsibilities, those responsibilities become coupled. A change to one responsibility may impair or break the others.

* **Goal:** To achieve high cohesion and low coupling.
* **Benefits:** Easier testing, fewer side effects during updates, and better organization.

### Example (Java/C#)
- **Bad:** A `Report` class that calculates data, formats it for PDF, and saves it to a Database.
- **Good:** - `ReportData` class (handles logic).
    - `ReportFormatter` class (handles PDF/HTML).
    - `ReportRepository` class (handles DB persistence).

---

## 2. Open/Closed Principle (OCP)
> "Software entities should be open for extension, but closed for modification."

### Detailed Explanation
You should be able to add new functionality without touching the existing, tested code. This is typically achieved using inheritance or interfaces (abstractions).

* **Goal:** To prevent bugs in existing features when introducing new ones.
* **Benefits:** Code stability and easier scalability.

### Example
- **Bad:** Using a large `switch` or `if-else` block to check for shape types (Circle, Square) to calculate area. Adding a new shape requires changing the core logic.
- **Good:** Creating a `Shape` interface with an `area()` method. Each new shape (Triangle, Pentagon) simply implements that interface.



---

## 3. Liskov Substitution Principle (LSP)
> "Subtypes must be substitutable for their base types."

### Detailed Explanation
If class **B** is a subclass of class **A**, we should be able to pass an object of class **B** to any method that expects class **A** without the method producing wrong results.

* **Goal:** To ensure that inheritance hierarchies are logically sound.
* **Benefits:** Predictability in code behavior and safe polymorphism.

### Example
- **Bad:** A `Square` class inheriting from `Rectangle`. If you set the width and height independently on a `Rectangle`, it works. If you do it on a `Square`, it breaks the geometric definition (violating the expected behavior of the parent).
- **Good:** Keep `Square` and `Rectangle` as separate shapes or ensure they share a more generic `Shape` interface that doesn't enforce independent side scaling.

---

## 4. Interface Segregation Principle (ISP)
> "Clients should not be forced to depend upon interfaces they do not use."

### Detailed Explanation
It is better to have many small, specific interfaces than one large, "fat" interface. When a class implements an interface, it shouldn't be forced to write "empty" methods for functions it doesn't need.

* **Goal:** To keep the system decoupled and easier to refactor.
* **Benefits:** Reduced "code smell" and clearer intent for implementing classes.

### Example
- **Bad:** An `IMachine` interface with `print()`, `scan()`, and `fax()`. A simple `Printer` class is forced to implement `scan()` and `fax()` as "NotImplementedException".
- **Good:** Separate into `IPrinter`, `IScanner`, and `IFax`. The `SimplePrinter` only implements `IPrinter`.



---

## 5. Dependency Inversion Principle (DIP)
> "Depend upon abstractions, [not] concretions."

### Detailed Explanation
High-level modules (the business logic) should not depend on low-level modules (the tools, like databases or APIs). Both should depend on abstractions (interfaces).

* **Goal:** To decouple the software from its underlying implementation details.
* **Benefits:** Ability to swap out components (e.g., changing from MySQL to MongoDB) without rewriting business logic.

### Example
- **Bad:** A `Notification` class that directly creates a `GmailEmail` object to send alerts.
- **Good:** The `Notification` class depends on an `IMessageService` interface. You can then inject `GmailService`, `SmsService`, or `TelegramService` at runtime.



---

