# ESSENTIAL DESIGN PATTERNS: FROM PRINCIPLES TO PRACTICE

Design Patterns are typical solutions to common problems in software design. Each pattern is like a blueprint that you can customize to solve a particular design problem in your code.

---

## 1. STRATEGY PATTERN (Behavioral)
> "Defines a family of algorithms, encapsulates each one, and makes them interchangeable."

This is the perfect implementation of **Open/Closed Principle** and **Composition Over Inheritance**.

* **The Problem:** You have a class that performs a task in different ways (e.g., a "Payment" system that supports Credit Card, PayPal, and Bitcoin). Using `if-else` blocks makes the code hard to maintain.
* **The Solution:** Create an interface for the "Strategy" and implement each algorithm in a separate class.



* **Implementation Example (Conceptual):**
  - Interface: `IPaymentStrategy` with method `pay(amount)`.
  - Concrete Strategies: `CreditCardPayment`, `PaypalPayment`.
  - Context: `ShoppingCart` which holds a reference to `IPaymentStrategy`. You can swap the strategy at runtime.

---

## 2. ADAPTER PATTERN (Structural)
> "Allows objects with incompatible interfaces to collaborate."

This pattern is a lifesaver when you need to integrate 3rd-party libraries or legacy code without breaking the **Single Responsibility Principle**.

* **The Problem:** You have an existing system that expects interface A, but you want to use a new library that provides interface B.
* **The Solution:** Create a "Wrapper" (The Adapter) that converts the interface of one object so that another object can understand it.



* **Benefits:** Decouples your business logic from external dependencies.
* **Example:** A `PowerAdapter` that converts a 3-pin plug (The Adaptee) into a 2-pin socket (The Target Interface).

---

## 3. FACTORY METHOD PATTERN (Creational)
> "Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created."

This pattern realizes the **Dependency Inversion Principle** by hiding the instantiation logic from the client.

* **The Problem:** Your code depends on concrete classes (e.g., `new MySQLDatabase()`). If you want to switch to `PostgreSQL`, you have to change your code everywhere.
* **The Solution:** The client asks a "Factory" to create the object. The client only knows about the Interface, not the concrete class.



* **Real-world Example:** A `Logistics` app. A `RoadLogistics` factory creates `Truck` objects, while a `SeaLogistics` factory creates `Ship` objects. The client just calls `planDelivery()` without caring if it's a truck or a ship.

---

## SUMMARY: PATTERNS vs. PRINCIPLES

| Pattern | Principle it solves | Main Use Case |
| :--- | :--- | :--- |
| **Strategy** | Open/Closed, Composition | Swapping algorithms at runtime. |
| **Adapter** | Single Responsibility | Connecting incompatible libraries. |
| **Factory** | Dependency Inversion | Decoupling object creation from usage. |

---

# ADVANCED IMPLEMENTATION: COMBINING FACTORY AND STRATEGY

In real-world applications, you often don't know which Strategy to use until the user provides some input. This is where the **Factory Pattern** comes in to produce the correct **Strategy**.

---

## 1. THE SCENARIO: A MULTI-CHANNEL NOTIFICATION SYSTEM
Imagine you are building a system that sends notifications to users via **Email**, **SMS**, or **Push Notification**.

- **The Strategy:** Defines HOW to send (Email logic, SMS logic).
- **The Factory:** Decides WHICH channel to use based on user preference.

---

## 2. THE CODE IMPLEMENTATION (PYTHON)



```python
from abc import ABC, abstractmethod

# ==========================================
# STEP 1: DEFINE THE STRATEGY INTERFACE
# ==========================================
class NotificationStrategy(ABC):
    @abstractmethod
    def send(self, message):
        pass

# ==========================================
# STEP 2: CONCRETE STRATEGIES
# ==========================================
class EmailStrategy(NotificationStrategy):
    def send(self, message):
        return f"Sending Email: {message} (via SMTP)"

class SMSStrategy(NotificationStrategy):
    def send(self, message):
        return f"Sending SMS: {message} (via Twilio)"

class PushStrategy(NotificationStrategy):
    def send(self, message):
        return f"Sending Push: {message} (via Firebase)"

# ==========================================
# STEP 3: THE STRATEGY FACTORY
# ==========================================
class NotificationFactory:
    @staticmethod
    def get_strategy(channel_type):
        strategies = {
            "email": EmailStrategy(),
            "sms": SMSStrategy(),
            "push": PushStrategy()
        }
        # Returns the requested strategy or a default/error
        return strategies.get(channel_type.lower(), EmailStrategy())

# ==========================================
# STEP 4: THE CLIENT CODE (PUTTING IT ALL TOGETHER)
# ==========================================
def main():
    # Simulation: User preferences from a database
    user_preferences = [
        {"name": "Alice", "pref": "email", "msg": "Your order is shipped!"},
        {"name": "Bob", "pref": "sms", "msg": "Your OTP is 1234"},
        {"name": "Charlie", "pref": "push", "msg": "New friend request!"}
    ]

    for user in user_preferences:
        # The Factory picks the right tool
        notifier = NotificationFactory.get_strategy(user["pref"])
        
        # The Strategy executes the specific logic
        result = notifier.send(user["msg"])
        
        print(f"User {user['name']}: {result}")

if __name__ == "__main__":
    main()
```

---

## 3. WHY THIS IS POWERFUL

1. **Clean Client Code:** The `main()` function doesn't have any `if channel == "email": ... elif channel == "sms":`. It just asks the Factory and executes.
2. **Open/Closed Principle:** To add a "Telegram" notification, you only need to:
    - Create a new `TelegramStrategy` class.
    - Add one line to the `NotificationFactory`.
    - **Zero changes** to the existing Email or SMS logic.
3. **Single Responsibility:** - The Factory only cares about **creation**.
    - Each Strategy only cares about **sending**.
    - The Client only cares about **orchestration**.

---

## 4. SUMMARY TABLE: ROLE OF EACH PATTERN

| Pattern | Responsibility in this Example |
| :--- | :--- |
| **Strategy** | Encapsulates the specific API logic (SMTP vs Twilio vs Firebase). |
| **Factory** | Maps the user's string input ("sms") to an actual Object instance. |
| **Interface** | Ensures all notification types have a `.send()` method. |

