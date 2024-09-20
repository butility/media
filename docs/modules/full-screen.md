### FullScreen Module

This module provides functionality for managing and interacting with the Fullscreen API, allowing developers to detect fullscreen support, enter and exit fullscreen mode, and retrieve the currently active fullscreen element. It is designed to streamline working with fullscreen features in web applications.

#### Namespace: `FullScreen`

The `FullScreen` namespace includes the following exported functions for managing fullscreen behavior:

---

### **Functions:**

#### **1. detectFullscreenSupport(): boolean**
- **Description**: Detects if the current browser supports the Fullscreen API.
- **Returns**: 
  - `true` if fullscreen support is available.
  - `false` if fullscreen is not supported.

#### **2. enterFullscreen(element: HTMLElement): void**
- **Description**: Requests fullscreen mode for the specified HTML element.
- **Parameters**:
  - `element` (HTMLElement, required): The HTML element to display in fullscreen mode.

#### **3. exitFullscreen(): void**
- **Description**: Exits fullscreen mode, if active.

#### **4. getFullscreenElement(): Element | null**
- **Description**: Returns the currently active fullscreen element.
- **Returns**: 
  - The `Element` currently in fullscreen mode, or `null` if no element is in fullscreen.

---

#### Default Export:
- The `FullScreen` namespace is exported by default, enabling easy access to all of its functions for managing fullscreen features in web applications.

