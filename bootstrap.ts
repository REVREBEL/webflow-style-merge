// No React imports here!

// Use the official Webflow API to wait for the Designer to be ready.
// This ensures that global variables like `React` and `ReactDOM` are available.
webflow.ready().then(() => {
  // Dynamically import the main application file.
  // This defers the execution of all imports (including React) until the environment is ready.
  import('./index');
}).catch((err: unknown) => {
  console.error("Failed to initialize Webflow App:", err);
});