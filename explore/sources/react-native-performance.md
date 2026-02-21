# React Native Performance Guide 🚀

Achieving 60fps requires understanding how the Bridge/JSI works and minimizing UI blocking tasks.

## 1. List Optimization (The #1 Bottleneck)

### FlatList Configuration
For large lists (100+ items), default props are not enough.

```javascript
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  
  // 1. Skip measurement if height is constant (HUGE BOOST)
  getItemLayout={(data, index) => ({
    length: 80, 
    offset: 80 * index, 
    index
  })}
  
  // 2. Unmount off-screen items to save RAM
  removeClippedSubviews={true}
  
  // 3. Adjust window size (lower = less RAM, higher = less blank space on fast scroll)
  windowSize={10} 
  
  // 4. Render minimal initial batch
  initialNumToRender={10}
  maxToRenderPerBatch={10}
/>
```

### Alternatives
-   **FlashList** (by Shopify): Drop-in replacement for FlatList. Uses recycling views (like RecyclerView on Android) instead of destroying them. 5x-10x faster on low-end devices.

## 2. Memoization Strategy

### React.memo
Prevents re-rendering of child components if props haven't changed.

```javascript
// Only re-renders if 'title' prop changes (shallow comparison)
const UserCard = React.memo(({ title, onPress }) => {
  console.log("Rendering UserCard");
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});
```

### useCallback is Mandatory
Pass functions to memoized components using `useCallback`, otherwise `React.memo` breaks because a new function reference is created on every parent render.

```javascript
// BAD
const Parent = () => {
    return <UserCard onPress={() => console.log('Hi')} /> // UserCard always re-renders!
}

// GOOD
const Parent = () => {
    const handlePress = useCallback(() => console.log('Hi'), []);
    return <UserCard onPress={handlePress} /> // UserCard re-renders only if necessary
}
```

## 3. Images
-   **Format**: Use **WebP** instead of PNG/JPG (smaller size, faster decode).
-   **Resizing**: Never load a 4000x4000px image into a 100x100px avatar. Resize on server or use Cloudinary.
-   **Caching**: `react-native-fast-image` is better than `<Image />` for caching logic.

## 4. UI Thread vs JS Thread
React Native logic runs on JS Thread. Animations run better on UI Thread.

### Use Native Driver
```javascript
Animated.timing(opacity, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true // Logic moves to Native side, JS thread can freeze without affecting animation
}).start();
```

### Reanimated 3
For complex gestures/animations, `Reanimated 3` uses **Worklets** (tiny JS functions running on UI thread) to guarantee 60fps synchronous response.

## 5. Hermes Engine
Hermes is a JS Engine optimized for React Native.
-   **Bytecode Precompilation**: App parses JS at build time, not runtime.
-   **Faster TTI** (Time to Interactive).
-   **Smaller APK**.

**Check if active**:
```javascript
const isHermes = () => global.HermesInternal != null;
console.log('Is Hermes enabled?', isHermes());
```

## 6. Debugging Performance
1.  **React DevTools Profiler**: identify which component re-renders too much ("Why did this render?").
2.  **Flipper**: Monitor network requests, databases, and logs.
3.  **Perf Monitor**: Toggle in Dev Menu. Watch `UI` and `JS` fps. If JS drops to 0, you blocked the bridge. If UI drops, you have too many views.

## 7. The New Architecture (Fabric & TurboModules)
The biggest change in React Native history.

### JSI (JavaScript Interface)
- **Old Bridge**: Async, JSON serialization (slow).
- **New JSI**: Sync, Direct C++ calls (fast). JS can call C++ methods directly.

### Fabric (New Renderer)
- Uses JSI to render UI.
- **Benefits**:
    - **Synchronous Layout**: Reduces "jumpy" UI.
    - **Concurrency**: React 18 Concurrent features (startTransition) work on Native side.
    - **Type Safety**: Code generation (Codegen) ensures type safety between JS and Native.

### TurboModules
- **Lazy Loading**: Native modules load only when used (faster startup).
- **JSI-based**: Direct communication vs Bridge.

## 8. Startup Time Optimization
Users expect the app to open instantly.

1.  **Hermes**: Ensure it's enabled (pre-compiles JS).
2.  **Inline Requires**: Delay loading modules until needed.
    ```javascript
    // Instead of top-level import
    import { VeryLargeLib } from 'very-large-lib'; 
    
    // Do this inside component/function
    const handlePress = () => {
        const { VeryLargeLib } = require('very-large-lib');
        VeryLargeLib.doWork();
    }
    ```
3.  **App ENTRY Point**: Keep `index.js` and `App.js` minimal. Don't initialize heavy SDKs (Analytics, Crashlytics) until after the first render (`useEffect`).

