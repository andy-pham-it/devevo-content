# HTML5 Semantic & SEO 🚀

Using semantic tags helps Search Engines (SEO) and Screen Readers (Accessibility) understand your content.

## 1. Non-Semantic vs Semantic

-   **Non-Semantic**: `<div>` and `<span>`. They tell nothing about their content.
-   **Semantic**: `<header>`, `<article>`, `<footer>`. They describe the meaning.

## 2. Common Semantic Tags

### Structure
```html
<header>
    <nav>
        <!-- Navigation links -->
    </nav>
</header>

<main>
    <article>
        <h1>Blog Post Title</h1>
        <p>Main content...</p>
    </article>
    
    <aside>
        <!-- Sidebar content, related links -->
    </aside>
</main>

<footer>
    <p>&copy; 2024 Company Name</p>
</footer>
```

### Text Content
-   `<time datetime="2024-01-01">`: Machine-readable dates.
-   `<mark>`: Highlighted text.
-   `<figure>` & `<figcaption>`: Images with captions.

## 3. SEO Meta Tags
Place these in `<head>`:

```html
<!-- Title (Shows in Google results) -->
<title>HTML5 Course - DevEvo</title>

<!-- Description (Snippet in Google results) -->
<meta name="description" content="Learn HTML5 from basics to advanced. Covers Forms, Semantics, and APIs." />

<!-- Viewport (Mobile Responsiveness) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Open Graph (Facebook/LinkedIn preview) -->
<meta property="og:title" content="HTML5 Course" />
<meta property="og:image" content="https://example.com/thumb.jpg" />
```

## 4. Accessibility (A11y) Rules
1.  **Alt Text**: `<img src="cat.jpg" alt="A cute sleeping cat" />`.
2.  **Labels**: Always connect `<label>` to inputs using `for` and `id`.
3.  **Headings**: Use `h1` -> `h6` in order. Don't skip levels.
4.  **Buttons**: Use `<button>`, not `<div onClick="...">`. If you must, use `role="button"` and `tabindex="0"`.
