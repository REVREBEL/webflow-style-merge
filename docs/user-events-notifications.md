---
title: User events & notifications
slug: designer/reference/events
description: ''
hidden: false
'og:title': 'Webflow Designer API: User Events'
'og:description': >-
  Listen for certain events based on a user's behavior in the Webflow Designer,
  or notify a user of important events.
---
Listen for certain events based on a user's behavior in the Webflow Designer, or notify a user of important events.

## Notify a user

Send a notification to a user to alert them of important information and events.

Notifications will appear in the top right corner of the designer, and can be styled as either a success, error, or general information message. Notifications are helpful to let a user know that they have - or have not - completed a task successfully. Additionally, it's helpful to let a user know about any unexpected errors your app may encounter.

To notify a user, use the [`webflow.notify()`](/designer/reference/notify-user) method.

<video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_User%20Events.webm" type="video/webm" />  Your browser does not support HTML video.</video>


## Subscribe to an event

Additionally, you can subscribe to events in the designer using the `subscribe` method by subscribing to different event types. Including:

<Tabs>
  <Tab title="Detect a new selected element">
    Subscribe to the `selectedElement` event to be notified whenever a different element is selected in the Webflow designer. This is useful if you want to perform specific actions or updates based on the currently selected element. A `null` element signifies that no element is selected.

    ```javascript
    webflow.subscribe('selectedElement', (element) => {
      if (element) {
        console.log('Selected element:', element);
        // Perform actions with the selected element
      } else {
        console.log('No element selected');
      }
    });
    ```
  </Tab>

  <Tab title="Detect a breakpoint change">
    Use the `mediaquery` event to stay informed as the designer switches between breakpoints for desktops, tablets, or smartphones.

    ```javascript
    webflow.subscribe('mediaquery', (breakpoint) => {
      console.log('Current breakpoint:', breakpoint);
      // Update your style information based on the current breakpoint
    });
    ```
  </Tab>

  <Tab title="Detect a page change">
    The `currentPage` event allows you to respond when the user switches to a different page in the Webflow designer. This can be handy if you want to load additional data or perform actions specific to the selected page.

    ```javascript
    webflow.subscribe('currentPage', (page) => {
      console.log('Current page:', page);
      // Load page-specific data or update UI
    });
    ```
  </Tab>
</Tabs>

### Using callbacks

Callback functions are used to handle and respond to events triggered by the Webflow Designer. Add your callback function as a parameter to the `subscribe` function to determine how to handle events in the designer. Here are some general tips for writing callbacks to handle events:

- **Keep them lightweight:** Callbacks should be fast to execute to ensure a responsive user experience.
- **Error handling:** Always include error handling in your callbacks to manage exceptions gracefully.
- **Unsubscribe when necessary:** Remember to unsubscribe from events when your app no longer needs to listen to them, to prevent memory leaks and unnecessary processing.

```javascript
// Example of setting up and using callbacks for event subscriptions
try {
  // Store unsubscribe functions to clean up later
  const unsubscribeFunctions = [];
  
  // Subscribe to element selection with error handling
  // webflow.subscribe returns an unsubscribe function directly
  const unsubscribeElement = webflow.subscribe('selectedElement', (element) => {
    try {
      // Process the selected element
      if (element) {
        const elementType = element.type;
        const elementId = element.id;
        
        // Perform different actions based on element type
        if (elementType === 'Image') {
          // Handle image element selection
          console.log(`Selected image element: ${elementId}`);
        } else if (elementType === 'DOM') {
          // Handle DOM element selection
          console.log(`Selected DOM element: ${elementId}`);
        }
      }
    } catch (error) {
      console.error('Error in selectedElement callback:', error);
    }
  });
  
  // Add the unsubscribe function to our array
  unsubscribeFunctions.push(unsubscribeElement);
  
  // Detect and respond to breakpoint changes
  const unsubscribeBreakpoint = webflow.subscribe('mediaquery', (breakpoint) => {
    try {
      // Update UI based on breakpoint
      if (breakpoint.name === 'xxl') {
        // Handle xxl view
      } else if (breakpoint.name === 'xl') {
        // Handle xl view
      } else if (breakpoint.name === 'large') {
        // Handle large view
      }
    } catch (error) {
      console.error('Error in mediaquery callback:', error);
    }
  });
  
  // Add the unsubscribe function to our array
  unsubscribeFunctions.push(unsubscribeBreakpoint);
  
  // Cleanup function to unsubscribe when your app is done
  function cleanupSubscriptions() {
    // Call each unsubscribe function
    unsubscribeFunctions.forEach(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    console.log('Successfully unsubscribed from all events');
  }
  
  // Call cleanup when your app is closing or switching modes
  // For example: yourApp.on('beforeClose', cleanupSubscriptions);
} catch (error) {
  console.error('Error setting up event subscriptions:', error);
  webflow.notify({
    message: 'Failed to set up event monitoring',
    type: 'error'
  });
}
```



---
title: Send notification to user
slug: designer/reference/notify-user
description: ''
hidden: false
'og:title': 'Webflow Designer API: Send notification to user'
'og:description': >-
  Send an in-Designer notification to the user. The notification can be styled
  as either a success, error, or general information message. Error messages
  provide users with the opportunity to close the Designer Extension
---
## `notify(opts)`

Send an in-Designer notification to the user. The notification can be styled as either a success, error, or general information message. Error messages provide users with the opportunity to close the Designer Extension.

<video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_User%20Events.webm" type="video/webm" />  Your browser does not support HTML video.</video>


### Syntax

```typescript
webflow.notify(opts: {type: 'Error' | 'Info' | 'Success'; message: string;}): Promise<void>
```

### Parameters

**`opts`** :   `{message: string, type: 'Error' | 'Info' | 'Success'`

The options for the notification.

- **message**: string
- **type**: "Error" | "Info" | "Success"


### Returns

**Promise\<_Void_>**

A Promise that returns a value of `undefined`.


### Example

```typescript
webflow.notify({ type: 'Info', message: 'Great work!' }); // General notification
webflow.notify({ type: 'Error', message: 'Something went wrong, try again!' }); // Error notification
webflow.notify({ type: 'Success', message: 'Successfully did something!' }); // Success notification
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

***



---
title: User selects element
slug: designer/reference/user-selects-element
description: ''
hidden: false
'og:title': 'Webflow Designer API: User selects element'
'og:description': >-
  User Event. Use this method to start listening for specific events in your
  App. In this case, we're listening for when a user selects an element on a
  page.
---
## `subscribe("selectedelement", callback)`

Use this method to start listening for specific events in your App. In this case, we're listening for when a user selects an element on a page.


### Syntax

```typescript
 webflow.subscribe( event: 'selectedelement',callback: (element: null | AnyElement) => void): Unsubscribe;
```

### Parameters

**`event`** :   `"selectedlement"`

The name of the event to subscribe to.

***

**callback**:  `(element: null | AnyElement => void )`

This is the function that will be called each time the event occurs. It takes an `element` as a parameter. A `null` element signifies that no element is selected. Use this function to define what should happen when the event is triggered.

***


### Returns

#### **_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.


### Example

```typescript
// Subscribe to changes in the selected element
const selectedElementCallback = (element: AnyElement | null) => {
  if (element) {
    console.log('Selected Element:', element);
  } else {
    console.log('No element is currently selected.');
  }
}

const unsubscribeSelectedElement = webflow.subscribe('selectedelement', selectedElementCallback);
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>




---
title: User changes breakpoint
slug: designer/reference/user-changes-breakpoint
description: ''
hidden: false
'og:title': 'Webflow Designer API: User changes breakpoint'
'og:description': >-
  Use this method to start listening for specific events in your App. In this
  case, we're listening for when a user selects a different media query, also
  known as a breakpoint,  in the Designer.
---
## `subscribe("mediaquery", callback)`

Use this method to start listening for specific events in your App. In this case, we're listening for when a user selects a different media query, also known as a [breakpoint](https://university.webflow.com/lesson/intro-to-breakpoints?topics=layout-design),  in the Designer.  

Webflow's built-in responsive breakpoints allow users to customize site designs for different screen sizes. Knowing the current breakpoint can help your app build responsive content that's applicable to different screen sizes and contexts.



### Syntax

```typescript
 webflow.subscribe( event: 'mediaquery',callback: (element: null | AnyElement) => void): Unsubscribe;
```

### Parameters

**`event`** :   `"mediaQuery"`

The name of the event to subscribe to.

***

**callback**:  `(breakpoint: BreakpointId) => void`

This is the function that will be called each time the event occurs. It takes a `breakpoint` as a parameter. Use this function to define what should happen when the event is triggered.

***


### Returns

#### **_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.


### Example

```typescript
/**
 * Subscribe to the 'mediaquery' event and get the Unsubscribe function.
 * This event notifies when the breakpoint changes in the Webflow Designer.
 * @param {BreakpointId} breakpoint - The current breakpoint ID ('xxl', 'xl', 'large', 'main', 'medium', 'small', 'tiny').
 */
const unsubscribeMediaQuery = webflow.subscribe("mediaquery", (breakpoint) => {
  switch (breakpoint) {
    case 'xxl':
      console.log("The current view is for very large screens or high-resolution monitors.");
      break;
    case 'xl':
      console.log("The current view is suitable for large desktop monitors.");
      break;
    case 'large':
      console.log("The current view fits standard desktop monitors.");
      break;
    case 'main':
      console.log("The current view is suitable for smaller desktops or large tablets.");
      break;
    case 'medium':
      console.log("The current view is suitable for tablets and some large phones.");
      break;
    case 'small':
      console.log("The current view is designed for larger mobile devices.");
      break;
    case 'tiny':
      console.log("The current view is for the smallest mobile devices.");
      break;
    default:
      console.log("Unknown breakpoint:", breakpoint);
  }
});

/**
 * Later, when you want to unsubscribe from the 'mediaquery' event:
 * @function
 */
unsubscribeMediaQuery();
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>



---
title: User changes current page
slug: designer/reference/user-changes-current-page
description: ''
hidden: false
'og:title': 'Webflow Designer API: User changes current page'
'og:description': >-
  Use this method to start listening for specific events in your App. In this
  case, we're listening for when a user selects a new page in the Designer.
---
## `webflow.subscribe("currentpage", callback)`

Use this method to start listening for specific events in your App. In this case, we're listening for when a user selects a new page in the Designer.


### Syntax

```typescript
 webflow.subscribe( event: 'currentpage',callback: (element: null | AnyElement) => void): Unsubscribe;
```

### Parameters

**`event`** :   `"currentpage"`

The name of the event to subscribe to.

***

**callback**: `(page: Page => void)`

The callback function to execute when the event occurs. The page parameter should be the page you're watching.

***


### Returns

#### **_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.


### Example

```typescript
// Subscribe to changes in the selected page
const selectedPageCallback = (page: Page | null) => {
  if (page) {
    console.log('Selected Page:', page);
  } else {
    console.log('No element is currently selected.');
  }
}

const unsubscribeSelectedElement = webflow.subscribe('currentpage', selectedPageCallback);
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>



---
title: User changes CMS Page
slug: designer/reference/user-changes-cms-page
description: ''
hidden: false
---
## `webflow.subscribe("currentcmsitem", callback)`

Use this method to listen for specific events in your app. When a user selects a [collection page](https://university.webflow.com/lesson/structure-and-style-collection-pages?topics=cms-dynamic-content) or chooses a new CMS item on a collection page, this event will trigger. This can be especially useful for determining the path of auto-generated pages from a CMS or Ecommerce collection.


### Syntax

```typescript
webflow.subscribe( event: 'currentcmsitem',callback: (element: null | AnyElement) => void): Unsubscribe;
```

### Parameters

**`event`** :   `"currentpage"`

The name of the event to subscribe to.

***

**callback**: `(() => void)`

The callback function to execute when the event occurs.

***


### Returns

#### **_`Unsubscribe`_**

This is a special function returned after subscribing. Call this function when you want to stop listening to the event and discontinue receiving notifications.


### Example

```typescript
// Callback for subscription
    const cmsCallback = async () => {
      const page = await webflow.getCurrentPage()
      console.log(await page.getPublishPath())
    }

// Subscribe to changes for CMS Pages
 const unsubscribeCmsPages = webflow.subscribe('currentcmsitem', cmsCallback)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>



---
title: User changes Designer mode
slug: designer/reference/user-changes-mode
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get Designer capabilities'
'og:description': Determine if the user has a specified list of App abilities.
---

## `webflow.subscribe("currentappmode", callback)`

Subscribe to this event to detect when a user switches modes in the Designer, such as changing to Edit mode or selecting a secondary locale. This event helps you track the user's current mode, allowing your app to adjust the UI or display relevant error messages based on the available actions.

Tracking mode changes ensures your app provides the right experience at the right time, managing user expectations and preventing actions that aren’t allowed in the current mode.

<Info title="What are App Modes?">
  Designer Extensions enhance user functionality while adhering to the Designer's current mode. Each method within the Designer API provides specific capabilities, aligning with actions available in each mode. For more context on this API, see the [App Modes](https://developers.webflow.com/designer/reference/app-modes) docs.
</Info>


### Syntax

```typescript
webflow.subscribe( event: 'currrentappmode',callback: () => void): Unsubscribe;
```

### Parameters

**`event`** :   `"currentappmode"`

The name of the event to subscribe to.

***

**callback**: `(() => void)`

The callback function to execute when the event occurs.

***


### Returns

#### **_`Unsubscribe`_**

This is a special function returned after subscribing. Call this function when you want to stop listening to the event and discontinue receiving notifications.


### Example

```typescript
// Callback for subscription
    const checkAppModes = async () => {
      const capabilities = await webflow.canForAppMode(Object.values(webflow.appModes))
      console.log(capabilities)
    }

// Subscribe to changes for CMS Pages
 const unsubscribeAppModes = webflow.subscribe('currentappmode', checkAppModes)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>



---
title: User changes pseudo mode of Designer
slug: reference/user-changes-pseudo-mode
description: >-
  User Event. Use this method to start listening for specific events in your
  App. In this case, we're listening for when a user changes the pseudo mode of
  the Designer.
hidden: false
'og:title': 'Webflow Designer API: User changes pseudo mode of Designer'
'og:description': >-
  User Event. Use this method to start listening for specific events in your
  App. In this case, we're listening for when a user changes the pseudo mode of
  the Designer.
---
## `webflow.subscribe("pseudomode", callback)`

Use this method to start listening for when a user changes the [pseudo-state](https://help.webflow.com/hc/en-us/articles/33961301727251-States) of the Designer.

### Syntax

```typescript
webflow.subscribe(event: "pseudomode", callback: (pseudoState: PseudoStateKey) => void): Unsubscribe;
```
<Accordion title="Pseudo-State Key Values">
| Pseudo-State | Designer State | Description |
|:------------|:------------|:------------|
| `hover` | Hover | Element is hovered over by the mouse |
| `pressed` | Pressed | Element is in pressed state |
| `visited` | Visited | **Link** element has been visited |
| `focus` | Focused | Element has keyboard/input focus |
| `focus-visible` | Focused (Keyboard) | Element has keyboard focus with visible indicator |
| `focus-within` | --| Element or its descendant has focus |
| `placeholder` | Placeholder | Placeholder text in form block inputs |
| `first-child` | First Item | First Collection Item in a collection list |
| `last-child` | Last Item | Last Collection Item in a collection list |
| `nth-child(odd)` | Odd Items | Odd-numbered Collection Item in a collection list |
| `nth-child(even)` | Even Items | Even-numbered Collection Item in a collection list |

</Accordion>

### Parameters

- **event**: `"pseudomode"` - The event to listen for.
- **callback**: `(pseudoState: PseudoStateKey) => void` - The callback function to execute when the event occurs. The `pseudoState` parameter is the new pseudo-state of the Designer.

### Returns

**Return Value**

**_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.

#

### Example

```typescript
// Subscribe to changes in the pseudo state
const pseudoStateCallback = (pseudoState: PseudoStateKey) => {
  console.log('Pseudo State:', pseudoState);
}

const unsubscribePseudoState = webflow.subscribe('pseudomode', pseudoStateCallback);
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canAccessCanvas**    | Any | Any   | Any   | Any   |

