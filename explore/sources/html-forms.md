# HTML Forms & Input 📝

Forms are how users submit data to servers.

## 1. The `<form>` Tag

```html
<form action="/submit" method="POST">
    <!-- inputs go here -->
    <button type="submit">Send</button>
</form>
```
-   **action**: URL where data is sent.
-   **method**: `GET` (in URL) or `POST` (in body).

## 2. Input Types

### Text Inputs
```html
<label for="username">Username:</label>
<input type="text" id="username" name="username" placeholder="Enter name" required />

<label for="pwd">Password:</label>
<input type="password" id="pwd" name="password" minlength="8" />

<label for="email">Email:</label>
<input type="email" id="email" name="email" />
```

### Other Types
```html
<!-- Checkbox -->
<input type="checkbox" id="tos" />
<label for="tos">I agree to Terms</label>

<!-- Radio Buttons (Same name = Group) -->
<input type="radio" name="gender" value="male" /> Male
<input type="radio" name="gender" value="female" /> Female

<!-- Dropdown -->
<select name="role">
    <option value="user">User</option>
    <option value="admin">Admin</option>
</select>
```

## 3. Validations
HTML5 has built-in validation attributes:
-   `required`: Field cannot be empty.
-   `minlength` / `maxlength`: Character limits.
-   `pattern`: Regex validation (e.g., `pattern="[0-9]+"`).
-   `type="email"`: Validates email format automatically.
