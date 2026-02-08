# SQL Cheat Sheet 🗄️

## 1. Advanced Queries

### Subqueries
A query nested inside another query.

```sql
-- Find users who have spent more than the average
SELECT * FROM users 
WHERE total_spend > (SELECT AVG(total_spend) FROM users);
```

### CTE (Common Table Expressions)
More readable alternative to subqueries, useful for recursive queries.

```sql
WITH HighValueCustomers AS (
    SELECT customer_id, SUM(amount) as total
    FROM orders
    GROUP BY customer_id
    HAVING SUM(amount) > 1000
)
SELECT users.name, hvc.total
FROM users
JOIN HighValueCustomers hvc ON users.id = hvc.customer_id;
```

### Window Functions
Perform calculations across a set of table rows that are somehow related to the current row.

```sql
-- Rank employees by salary within each department
SELECT 
    name, 
    department, 
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;
```

## 2. JOINs Visualized

| JOIN Type | Result |
| :--- | :--- |
| **INNER JOIN** | Returns records that have matching values in **both** tables. |
| **LEFT JOIN** | Returns **all** records from the left table, and the matched records from the right table. |
| **RIGHT JOIN** | Returns **all** records from the right table, and the matched records from the left table. |
| **FULL OUTER JOIN** | Returns all records when there is a match in **either** left or right table. |

## 3. Modifying Data

```sql
-- INSERT with multiple rows
INSERT INTO users (name, email) VALUES 
('John', 'john@example.com'),
('Jane', 'jane@example.com');

-- UPDATE with Join
UPDATE products p
JOIN categories c ON p.category_id = c.id
SET p.price = p.price * 1.1
WHERE c.name = 'Electronics';

-- DELETE with condition
DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

## 4. Indexing Strategy Guide

### When to Index?
-   **Primary Keys**: Always indexed (Clustered Index).
-   **Foreign Keys**: Crucial for JOIN performance.
-   **Search Columns**: Columns frequently used in `WHERE`, `ORDER BY`, `GROUP BY`.

### When NOT to Index?
-   Small tables.
-   Columns with low cardinality (e.g., "Gender" M/F, "Status" Active/Inactive) -> use Partial Index if supported.
-   Columns frequently updated (Index slows down WRITE operations).

### Composite Index Order
The order of columns in a composite index matters!
**Rule: Equality First, Range Last.**

If query is: `WHERE age = 25 AND location = 'NY'`
Index should be: `(age, location)` or `(location, age)`.

If query is: `WHERE location = 'NY' AND age > 25`
Index MUST be: `(location, age)`. If you index `(age, location)`, the DB cannot optimize `location` filtering effectively after the range scan on `age`.

## 5. ACID Properties (Transaction)
-   **Atomicity**: All or nothing. If one part fails, the entire transaction rolls back.
-   **Consistency**: Database moves from one valid state to another.
-   **Isolation**: Transactions do not interfere with each other (Isolation Levels: Read Committed, Repeatable Read, Serializable).
-   **Durability**: Once committed, data is saved permanently even if power is lost.

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- or ROLLBACK;
```
