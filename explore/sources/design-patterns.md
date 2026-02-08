# Gang of Four (GoF) Design Patterns

Design patterns are reusable solutions to common software design problems. They provide a standard terminology and best practices for object-oriented programming.

## 1. Creational Patterns

Focus on **object creation** mechanisms, trying to create objects in a manner suitable to the situation.

| Pattern | Description | Real-World Example |
| :--- | :--- | :--- |
| **Singleton** | Ensures a class has only one instance and provides a global point of access. | Database connection pool, Logger, Configuration manager. |
| **Factory Method** | Defines an interface for creating an object, but lets subclasses decide which class to instantiate. | UI component libraries (creating different buttons based on OS/Theme). |
| **Abstract Factory** | Provides an interface for creating families of related or dependent objects without specifying their concrete classes. | Multi-platform UI toolkits (Windows vs Mac buttons, menus, scrolls). |
| **Builder** | Separates the construction of a complex object from its representation. | SQL Query builders, Pizza ordering system, Complex document generator. |
| **Prototype** | Creates new objects by cloning an existing object. | Resource-intensive objects created once and cloned for performance (e.g., game NPCs). |

---

## 2. Structural Patterns

Focus on **object composition**—how classes and objects are composed to form larger structures.

| Pattern | Description | Real-World Example |
| :--- | :--- | :--- |
| **Adapter** | Allows incompatible interfaces to work together by acting as a bridge. | Wrapping a legacy XML-based API to work with a modern JSON-based app. |
| **Decorator** | Adds new functionality to an object dynamically without altering its structure. | Adding scrolling or borders to UI components; Compression or Encryption streams. |
| **Facade** | Provides a simplified interface to a complex system of classes. | A "PlaceOrder" method that hides complex logic for inventory, payment, and shipping. |
| **Proxy** | Provides a placeholder for another object to control access to it. | Lazy loading high-res images; Authentication/Authorization checks before action. |
| **Composite** | Treats individual objects and compositions of objects uniformly (tree structure). | File system (Files and Folders); UI element trees (Button vs Layout containing Buttons). |
| **Bridge** | Decouples an abstraction from its implementation so the two can vary independently. | Remote Control (Abstraction) vs TVs (Implementation) of different brands. |

---

## 3. Behavioral Patterns

Focus on **object communication**—how objects interact and distribute responsibility.

| Pattern | Description | Real-World Example |
| :--- | :--- | :--- |
| **Observer** | Defines a one-to-many dependency so that when one object changes state, all dependents are notified. | Event listeners (Pub/Sub); Stock market notification systems; Firebase real-time listeners. |
| **Strategy** | Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime. | Payment processing (Sort by Price, Date, or Name); Compression algorithms (Zip, Gzip). |
| **Command** | Encapsulates a request as an object, allowing logging, queueing, and undo/redo operations. | Remote control buttons; Text editor (Copy, Paste, Undo actions). |
| **State** | Allows an object to alter its behavior when its internal state changes. | ATM machine states (NoCard, HasCard, HasPin, OutOfCash); Order status (Pending, Paid, Shipped). |
| **Template Method** | Defines the skeleton of an algorithm in a method, deferring some steps to subclasses. | Data processing pipelines (Download -> Parse -> Clean -> Save); Framework lifecycles. |
| **Mediator** | Defines an object that encapsulates how a set of objects interact to reduce direct coupling. | Air Traffic Control (Pilot-Pilot communication via Tower); Form validation logic. |
| **Iterator** | Provides a way to access elements of a collection sequentially without exposing its underlying representation. | `Array.forEach()`; Database cursors; Pagination helpers. |

---

## Key Takeaways

- **Creational**: "How can I make this object efficiently?"
- **Structural**: "How can I fit these objects together?"
- **Behavioral**: "How should these objects talk to each other?"

**Anti-pattern Warning:** Don't find a problem for your favorite pattern. Only apply a pattern when it simplifies the code or solves a genuine design complexity.
