# HTML5 Advanced APIs 🛠️

HTML5 is not just tags. It includes mostly JavaScript APIs that give "Native" capabilities to the browser.

## 1. Geolocation API
Get user's current location (requires permission).

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Lat:", position.coords.latitude);
        console.log("Lng:", position.coords.longitude);
    });
}
```

## 2. LocalStorage & SessionStorage
Store data in user's browser (Client-side DB).

```javascript
// LocalStorage (Persists even after closing browser)
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');

// SessionStorage (Cleared when tab closes)
sessionStorage.setItem('session_id', '12345');
```

## 3. Drag and Drop API
Native drag and drop support.

```html
<div draggable="true" ondragstart="drag(event)">Drag me</div>
<div ondrop="drop(event)" ondragover="allowDrop(event)">Drop here</div>
```

## 4. Canvas API
Draw graphics via JS (used for Games, Charts).

```html
<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    
    // Draw red rectangle
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
</script>
```

## 5. Web Workers
Run JS in background thread (multithreading) to prevent UI freezing.

```javascript
// main.js
const worker = new Worker("worker.js");
worker.postMessage("Start");
worker.onmessage = (e) => console.log("Worker said:", e.data);

// worker.js
onmessage = () => {
    // Heavy computation
    postMessage("Done");
}
```
