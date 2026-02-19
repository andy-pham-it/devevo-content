# System Design Primer 🏗️

## 1. CAP Theorem Explained
In a distributed system, you can only satisfy two of the following three guarantees:

- **Consistency (C)**: Every read receives the most recent write or an error. All nodes see the same data at the same time.
- **Availability (A)**: Every request receives a response (non-error), without the guarantee that it contains the most recent write.
- **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network.

### Real-world Implications
> In Distributed Systems, **Partition Tolerance is unavoidable**. Networks fail. Therefore, you must choose between **CP** (Consistency) and **AP** (Availability).
- **CP (Consistency/Partition Tolerance)**: If a partition occurs, the system waits until data is consistent.
    - *Example*: MongoDB (by default), Banking Systems.
- **AP (Availability/Partition Tolerance)**: If a partition occurs, the system returns the most recent version of data it has, even if it's stale.
    - *Example*: Cassandra, DynamoDB, Social Media Feeds.

## 2. Scalability Patterns

### Vertical Scaling (Scale Up)
- **Concept**: Adding more power (CPU, RAM) to an existing machine.
- **Pros**: Simplest approach. No code changes required.
- **Cons**: Hardware limits are reached quickly. Single point of failure (SPOF). expensive.
- **Use Case**: Early stage startups, internal tools.

### Horizontal Scaling (Scale Out)
- **Concept**: Adding more machines to the resource pool.
- **Pros**: Theoretically unlimited scaling. Redundancy / High Availability.
- **Cons**: Complexity increases (Load Balancing, Data Consistency, Distributed Transactions).
- **Use Case**: Any large-scale internet application (Facebook, Google, Uber).

## 3. Load Balancing
Distributes incoming network traffic across a group of backend servers.

### Algorithms
1.  **Round Robin**: Requests are distributed sequentially.
2.  **Least Connections**: Sends requests to the server with the fewest active connections.
3.  **IP Hash**: Uses client IP to route to a specific server (useful for sticky sessions).

### Types
-   **Layer 4 (Transport Layer)**: Routes based on IP and Port (faster). *Example: TCP Load Balancer.*
-   **Layer 7 (Application Layer)**: Routes based on content (HTTP Header, URL, Cookies). *Example: Nginx, HAProxy, AWS ALB.*

## 4. Caching Strategies
Caching is the fastest way to improve performance.

### 4.1. Cache-Aside (Lazy Loading) - *Most Popular*
1.  App looks in Cache.
2.  If **Hit**, return data.
3.  If **Miss**, App loads from Database.
4.  App updates Cache and returns data.
-   *Pros*: Only requested data is cached. Resilient to cache failure.
-   *Cons*: First request is slow / "Thundering Herd" problem.

### 4.2. Write-Through
1.  App writes to Cache and Database simultaneously.
-   *Pros*: Data consistency.
-   *Cons*: Slower writes.

### 4.3. Write-Back (Write-Behind)
1.  App writes only to Cache.
2.  Cache asynchronously writes to Database.
-   *Pros*: Extremely fast writes.
-   *Cons*: Risk of data loss if Cache crashes before syncing.

## 5. Database Sharding
Decomposing a massive database into smaller, faster, more easily managed parts called **shards**.

-   **Horizontal Partitioning**: Splitting rows. E.g., Users 1-1M on DB1, 1M-2M on DB2.
-   **Key Based Sharding**: using `hash(UserID) % NumberOfServers` to determine shard.
-   **Challenges**:
    -   **Resharding**: Hard to add new servers later (need Consistent Hashing).
    -   **Joins**: Joining data across shards is very expensive or impossible.

## 6. SQL vs. NoSQL

| Feature | SQL (Relational) | NoSQL (Non-Relational) |
|---|---|---|
| **Structure** | Structured (Tables, Schemas) | Flexible (Document, Key-Value, Graph) |
| **Consistency** | Strong (ACID Transactions) | Often Eventual (BASE) |
| **Scalability** | Vertical (mostly) | Horizontal (built-in) |
| **Joins** | Powerful | Limited / None |
| **Examples** | PostgreSQL, MySQL, SQL Server | MongoDB, Redis, Cassandra, Neo4j |

### When to use?
-   **SQL**:
    -   Complex queries (Joins, Aggregations).
    -   Strict ACID compliance (Financial systems).
    -   Structured, unchanging data schema.
-   **NoSQL**:
    -   Flexible/Dynamic schema.
    -   Massive write throughput needed.
    -   Low latency simple lookups (Key-Value).
    -   Graph data / Social networks (Graph DB).

## 7. Message Queues (Async Processing)
Decouple services to improve scalability and reliability.

-   **Concept**: Producer sends message → Queue stores it → Consumer processes it asynchronously.
-   **Benefits**:
    -   **Decoupling**: Services don't need to know about each other.
    -   **Throttling**: Preventing traffic spikes from crashing backend workers.
    -   **Reliability**: Messages persist even if consumer is down.
-   **Popular Tools**:
    -   **Kafka**: High throughput, log-based, rigorous ordering.
    -   **RabbitMQ**: Complex routing, task queues.
    -   **AWS SQS**: Managed simple queue service.

## 8. Communication Protocols

| Protocol | Type | Use Case |
|---|---|---|
| **HTTP/REST** | Request-Response | Standard web APIs, public-facing services. |
| **gRPC** | RPC (Protobuf) | Microservices internal comms (fast, type-safe). |
| **WebSocket** | Bidirectional | Real-time chat, notifications, live updates. |
| **GraphQL** | Query Language | Flexible frontend data fetching (avoid over-fetching). |

## 9. Unique ID Generation in Distributed Systems
In a distributed database (sharded), simple `AUTO_INCREMENT` doesn't work.

1.  **UUID (Universally Unique ID)**:
    -   *Pros*: Simple, generate locally.
    -   *Cons*: Large (128-bit), unordered (bad for DB indexing).
2.  **Snowflake ID (Twitter)**:
    -   *Structure*: 64-bit integer (Timestamp + Machine ID + Sequence).
    -   *Pros*: Sortable by time (k-ordered), compact (64-bit).
    -   *Cons*: Requires coordination (Machine ID assignment).
3.  **Database Ticket Server**:
    -   Centralized DB purely for generating IDs.
    -   *Pros*: Simple numeric IDs.
    -   *Cons*: Single Point of Failure (SPOF).

## 10. System Design Interview Checklist
1.  **Requirements Clarification**: Functional (What it does) & Non-Functional (Traffic, Latency, Consistency).
2.  **Back-of-the-envelope Estimation**: Calculate storage and bandwidth needs.
3.  **API Design**: Define REST/GraphQL endpoints.
4.  **Database Design**: Schema, SQL vs NoSQL decision.
5.  **High-Level Design**: Draw the boxes (LB, App Server, DB, Cache).
6.  **Deep Dives**: Scaling specific components, handling bottlenecks.
