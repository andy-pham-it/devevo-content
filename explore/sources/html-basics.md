# HTML Basics for Beginners 🌐

## 1. Structure of a Web Page
Every HTML document follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first paragraph.</p>
</body>
</html>
```

## 2. Common Tags

### Text Formatting
-   `<h1>` to `<h6>`: Headings (h1 is main title).
-   `<p>`: Paragraph.
-   `<strong>` or `<b>`: **Bold** text.
-   `<em>` or `<i>`: *Italic* text.

### Links & Images
```html
<!-- Anchor Tag (Link) -->
<a href="https://example.com" target="_blank">Visit Example</a>

<!-- Image Tag -->
<img src="logo.png" alt="Company Logo" width="200" />
```

### Lists
```html
<!-- Unordered List (Bullet points) -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Ordered List (Numbers) -->
<ol>
    <li>First step</li>
    <li>Second step</li>
</ol>
```

## 3. Best Practices
-   **Always** include `alt` attributes for images (Accessibility).
-   **Always** close tags properly (even `<br />` or `<hr />` in XHTML, though HTML5 is forgiving).
-   Use **lowercase** tag names (`<div>` not `<DIV>`).
-   Keep structure (HTML) separate from style (CSS) and logic (JS).
