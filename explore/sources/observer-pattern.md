# DESIGN PATTERNS: THE OBSERVER PATTERN (BEHAVIORAL)

The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

---

## 1. THE CONCEPT (THE "PUBLISHER-SUBSCRIBER" MODEL)

Think of a YouTube channel:
- **The Subject (Publisher):** The YouTuber. When they upload a new video, they don't call every fan individually.
- **The Observers (Subscribers):** The fans. They "subscribe" to the channel.
- **The Action:** As soon as a video is live, the channel sends a notification to all subscribers automatically.

[Image of Observer Design Pattern publisher subscriber diagram]

* **Goal:** To achieve a loose coupling between objects that need to interact.
* **Benefits:**
    * You can add or remove subscribers at runtime without changing the Publisher's code.
    * Supports the **Hollywood Principle** ("Don't call us, we'll call you").

---

## 2. CODE IMPLEMENTATION (PYTHON)

Imagine a **Stock Market** system where multiple "Display Boards" need to update whenever a stock price changes.

```python
from abc import ABC, abstractmethod

# ==========================================
# STEP 1: THE OBSERVER INTERFACE
# ==========================================
class Observer(ABC):
    @abstractmethod
    def update(self, price):
        pass

# ==========================================
# STEP 2: THE SUBJECT (PUBLISHER)
# ==========================================
class StockMarket:
    def __init__(self):
        self._observers = [] # List of subscribers
        self._price = 0

    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def set_price(self, price):
        print(f"\n--- Stock Market: Price changed to ${price} ---")
        self._price = price
        self.notify_all()

    def notify_all(self):
        for observer in self._observers:
            observer.update(self._price)

# ==========================================
# STEP 3: CONCRETE OBSERVERS (SUBSCRIBERS)
# ==========================================
class MobileAppDisplay(Observer):
    def update(self, price):
        print(f"[Mobile App] Updating price to: ${price}")

class WebDashboardDisplay(Observer):
    def update(self, price):
        print(f"[Web Dashboard] Alert: Price is now ${price}")

# ==========================================
# STEP 4: EXECUTION
# ==========================================
def main():
    market = StockMarket()

    # Create displays
    phone_app = MobileAppDisplay()
    web_panel = WebDashboardDisplay()

    # Subscribe them to the market
    market.attach(phone_app)
    market.attach(web_panel)

    # Change price - both displays update
    market.set_price(150)

    # Someone unsubscribes
    market.detach(phone_app)

    # Change price again - only web panel updates
    market.set_price(165)

if __name__ == "__main__":
    main()
```

---

## 3. REAL-WORLD APPLICATIONS

1. **GUI Frameworks:** Every time you click a button (Subject), the "Click Listeners" (Observers) execute their logic.
2. **Social Media:** When you post a status, your followers get notified.
3. **Reactive Programming:** Frameworks like RxJS or libraries like `Redux` (in a way) rely on the idea of observing state changes.

---

## 4. PATTERN COMPARISON: OBSERVER VS. STRATEGY

| Feature | Observer | Strategy |
| :--- | :--- | :--- |
| **Primary Intent** | Notification / Synchronization. | Encapsulating Algorithms. |
| **Coupling** | One-to-Many (Publisher doesn't know details of subscribers). | One-to-One (Context uses one strategy at a time). |
| **Trigger** | Automatic (Event-based). | Explicit (Client chooses when to call). |
