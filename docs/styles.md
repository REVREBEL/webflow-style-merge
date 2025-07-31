
---
title: Styles
slug: designer/reference/styles-overview
description: ''
hidden: false
'og:title': 'Webflow Designer API: Styles'
'og:description': >-
  The Styles APIs enable Apps to customize the look and feel of Elements,
  helping designers create consistent and responsive pro websites. Use these
  methods to create styles, use CSS to adjust their look and feel through style
  properties, and apply styles to multiple elements throughout a page.
---
Customize the look and feel of Elements with Styles. Styles, [also referred to as Classes in the Designer](https://university.webflow.com/lesson/web-styling-using-classes?topics=layout-design), save styling information that can be applied to as many elements as you want across a site.

## Working with styles

<Steps>

  <Step title="Create a style">

  To create a style, you need to provide a unique name. The Webflow API prevents creating styles with duplicate names to maintain uniqueness across your project.

  ```typescript
  // Create new style
  const newStyle = await webflow.createStyle(styleName);
  ```

  </Step>
  <Step title="Add style properties">

  Add CSS properties to a style. [Refer to this list of Style Properties](/designer/reference/style-properties) for a full index of properties that can added to a style in Webflow.

  You can add properties to a style in two ways:

  <Tabs>
    <Tab title="Set a single property">

    The [`set property`](/designer/reference/set-style-property) method requires you to pass a single property name and its corresponding value as `string` parameters. Additionally, you can include an optional `options`  parameter, [which we cover below.](#responsive-styling-with-breakpoints-and-pseudo-states)

    ```typescript
    // Create new style
    const newStyle = await webflow.createStyle("My Custom Style");

    // Set a single property
    await newStyle.setProperty("background-color", "blue")
    ```

    </Tab>
    <Tab title="Set multiple properties">

    The [set properties](/designer/reference/set-style-properties) method allows you to set multiple properties at once through  a _PropertyMap_ parameter. 
    
    A **_PropertyMap_** is a TypeScript object that maps CSS property names to their corresponding values. Each key in the object represents a CSS property name, while the value can be either a string literal (like "16px" or "bold") or a Webflow Variable (like a ColorVariable or SizeVariable).

    ```typescript
    // Create new style
    const newStyle = await webflow.createStyle("My Custom Style");

    // Create a variable
    const collection = await webflow.getDefaultVariableCollection()
    const webflowBlue = await collection?.createColorVariable('Webflow Blue', '#146EF5')

    // Create a PropertyMap object
    const propertyMap : PropertyMap = {
                    'background-color': webflowBlue as ColorVariable,
                    'font-size': "16px",
                    'font-weight': "bold",
                  }

    // Set style properties
    await newStyle.setProperties(propertyMap)
    ```
    </Tab>
  </Tabs>

  </Step>
  <Step title="Apply styles to elements">
    Once you've created and modified a style, you can apply it to one or more elements.

    <CodeBlock>
      ```typescript
      // Get selected element
      const selectedElement = await webflow.getSelectedElement()

      // Get style
      const myStyle = await webflow.getStyleByName("My Custom Style");

      // Apply style to element
      await selectedElement.setStyles([newStyle])
      ```
    </CodeBlock>
  </Step>
</Steps>

## Responsive styling with [breakpoints and pseudo states](https://university.webflow.com/lesson/intro-to-breakpoints?topics%3Dlayout-design&sa=D&source=docs&ust=1706631470173943&usg=AOvVaw1itdh_-wDf_3NgNzP2w-N8)

Webflow's responsive design features enable customization of style properties for different contexts, such as varying screen sizes or specific states like `:hover` or `:active`. 

Pass the `options` parameter when setting style properties to customize the style for different breakpoints and pseudo-states.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

**Example**
```typescript
// Create new style
const newStyle = await webflow.createStyle("My Custom Style");

// Property Map for XXL Breakpoint
const propertyMapXXL = {
  'font-size': "16px",
  'font-weight': "bold",
}

// Property Map for Medium Breakpoint
const propertyMapMedium = {
  'font-size': "12px",
  'font-weight': "bold",
}

// Set style properties for XXL Breakpoint and hover state
await newStyle.setProperties(propertyMapXXL, {breakpoint: "xxl", pseudo: "hover"})

// Set styles for Medium Breakpoint and hover state
await newStyle.setProperties(propertyMapMedium, {breakpoint: "medium", pseudo: "hover"})
```
### Breakpoint IDs

| Breakpoint ID | Description |
|:------------|:------------|
| `xxl` | Very large screens or high-resolution monitors |
| `xl` | Large desktop monitors |
| `large` | Standard desktop monitors |
| `main` | Suitable for smaller desktops or large tablets |
| `medium` | Suitable for tablets and some large phones |
| `small` | Suitable for larger mobile devices |
| `tiny` | Suitable for the smallest mobile devices |

### Pseudo-State Keys

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





---
title: Get all styles
slug: designer/reference/get-all-styles
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get all styles'
'og:description': 'Retrieve all Styles, also known as Classes, present on the Webflow site.'
---
## **`webflow.getAllStyles()`**

[Retrieve all Styles, also known as Classes](https://university.webflow.com/lesson/web-styling-using-classes?topics=layout-design), present on the Webflow site.


### Syntax

```typescript
webflow.getAllStyles(): Promise<Array<Style>>
```

### Returns

**Promise\<Array\<_Style_>>**

A Promise that resolves to an array of _Style_ objects representing all the styles present on the current site.


### Example

```typescript
// Get all Styles
const allStyles = await webflow.getAllStyles();

// List Styles
if (allStyles.length > 0) {

  console.log("List of all styles:");

  allStyles.forEach(async (style, index) => {

    // Print style names and ids
    console.log(`${index + 1}. Style Name: ${await style.getName()}, Style ID: ${style.id}`);
  });
} else {
  console.log("No styles found in the current context.");
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |






---
title: Get style by name
slug: designer/reference/get-style-by-name
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get style by name'
'og:description': Retrieve a Style by its name.
---
## **`webflow.getStyleByName(name)`**

Retrieve a Style by its name.


### Syntax

```typescript
webflow.getStyleByName(name: string): Promise<Style | null>
```

### Parameters

- **`name`**: _string_ - The name of the style to retrieve.


### Returns

**Promise\<_`Style`_ \| `null`>**

A Promise that resolves to a style object, or `null` if the named style doesn't exist.


### Example

```typescript
getStyleByName: async (styleName: string) => {
  // Retrieve the style by name
  const retrievedStyle = await webflow.getStyleByName(styleName);

  if (retrievedStyle) {
    // Get and print properties of the retrieved style
    const styleProperties = await retrievedStyle.getProperties();
    console.log("Style properties:", styleProperties);
  } else {
    console.log(`Style ${styleName} not found.`);
  }
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |



---
title: Create style
slug: designer/reference/create-style
description: ''
hidden: false
'og:title': 'Webflow Designer API: Create style'
'og:description': Create a new Style with a provided name.
---
## **`webflow.createStyle(name)`**

Create a new style with a provided name. Provide a parent style to create a [combo class](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes#how-to-create-a-combo-class).


### Syntax

```typescript
webflow.createStyle(name: string, options?: {parent?: Style}): Promise<Style>
```

### Parameters

- **`name`**: _String_ - The name of the style.
- **`options`**: _Object_ - An object containing the following properties:
    - **`parent`**: _Style_ - A style object that will be the parent of the combo class style.


### Returns

**Promise\<_Style_>**

A Promise that resolves to a Style object.


### Example

```typescript
// Create new style
const newStyle = await webflow.createStyle(styleName);

// Set properties for the style
newStyle.setProperties({
  "background-color": "blue",
  "font-size": "16px",
  "font-weight": "bold",
});

// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Apply style to selected element
  await selectedElement.setStyles([newStyle])

} else {
  console.log("No element selected")
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer ability

| Designer ability         | Locale  | Branch | Workflow | Sitemode |
| :----------------------- | :------ | :----- | :------- | :------- |
| **canCreateStyleBlocks** | Primary | Any    | Canvas   | Design   |




---
title: Remove style
slug: designer/reference/remove-style
description: ''
hidden: false
---
## **`webflow.removeStyle(Style)`**

Remove an unused style from a site. In order to remove the style, it must not be used by any elements throughout the site.


### Syntax

```typescript
webflow.removeStyle(style: Style): Promise<void>
```

### Parameters

- **`Style`**: _StyleObject_ - The style to remove.


### Returns

**Promise\<void>**

A Promise that resolves to `undefined`.


### Example

```typescript
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName)

if (retrievedStyle) {

  // Remove Style
  await webflow.removeStyle(retrievedStyle)
  console.log(`Style: ${styleName} was removed`)

} else {
  console.log(`Style ${styleName} not found.`)
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |



---
title: Check if a style is a combo class
slug: designer/reference/style/is-combo-class
description: Check if a style is a combo class
hidden: null
'og:title': Check if a style is a combo class
'og:description': Check if a style is a combo class
---

## `style.isComboClass()`

Check if a style is a combo class.

#

### Syntax

```typescript
style.isComboClass(): Promise<boolean>
```


### Returns

**Promise\<boolean\>**

A Promise that resolves to a boolean value.

#

### Example

```typescript
// Check if a style is a combo class
const isComboClass = await style.isComboClass()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canAccessCanvas**    | Any | Any   | Any   | Any   |




---
title: Style Properties
slug: designer/reference/style-properties
description: Reference guide for CSS style properties supported by the Webflow Designer API
hidden: false
'og:title': 'Webflow Designer API: Style Properties'
'og:description': Reference guide for CSS style properties supported by the Webflow Designer API
---

Style properties define the visual appearance and layout of web page elements. Using the Webflow Designer API, you can programmatically set these CSS properties to control design aspects like colors, typography, spacing, and positioning.

## How to use style properties

The Designer API accepts style properties as a `PropertyMap` object. A `PropertyMap` is a key-value collection where keys are CSS property names and values are their corresponding settings.

```typescript title="PropertyMap Example"
{
    "color": "#ff5733",
    "font-size": "16px", 
    "font-weight": "bold",
    "text-align": "center",
    "background-color": "#e0e0e0",
    "border-radius": "5px",
    "border-color": "#000000",
}
```

<Note title="Property naming">
Use the long-form CSS property names when setting styles. For example, use `grid-row-gap` instead of `row-gap`. See the [MDN CSS Properties reference](https://developer.mozilla.org/en-US/docs/Web/CSS) for complete property names.
</Note>

## Supported properties

The following properties are organized by functional category for reference. Each property accepts either a string value or, where noted, a Webflow variable reference.

### Layout & positioning
| Property | Type | Example |
|----------|------|---------|
| `display` | string | `flex` |
| `position` | string | `absolute` |
| `top` | string or SizeVariable | `100px` |
| `right` | string or SizeVariable | `0px` |
| `bottom` | string or SizeVariable | `0` |
| `left` | string or SizeVariable | `50px` |
| `width` | string or SizeVariable | `50%` |
| `height` | string or SizeVariable | `100vh` |
| `min-width` | string or SizeVariable | `60px` |
| `max-width` | string or SizeVariable | `80%` |
| `min-height` | string or SizeVariable | `100px` |
| `max-height` | string or SizeVariable | `200px` |
| `z-index` | string | `10` |

### Flex layout
| Property | Type | Example |
|----------|------|---------|
| `flex-direction` | string | `row` |
| `flex-wrap` | string | `wrap` |
| `flex-basis` | string or SizeVariable | `auto` |
| `flex-grow` | string | `1` |
| `flex-shrink` | string | `1` |
| `justify-content` | string | `space-between` |
| `align-items` | string | `flex-start` |
| `align-content` | string | `center` |
| `align-self` | string | `stretch` |

### Grid
| Property | Type | Example |
|----------|------|---------|
| `grid-template-columns` | string | `50px 100px` |
| `grid-template-rows` | string | `auto` |
| `grid-template-areas` | string | `'header header'` |
| `grid-column-start` | string | `1` |
| `grid-column-end` | string | `span 2` |
| `grid-row-start` | string | `1` |
| `grid-row-end` | string | `3` |
| `grid-column-gap` | string | `10px` |
| `grid-row-gap` | string or SizeVariable | `20px` |
| `grid-auto-flow` | string | `row dense` |

### Typography
| Property | Type | Example |
|----------|------|---------|
| `font-family` | string or FontFamilyVariable | `Arial, sans-serif` |
| `font-size` | string or SizeVariable | `16px` |
| `font-weight` | string | `bold` |
| `font-style` | string | `italic` |
| `line-height` | string or SizeVariable | `1.5` |
| `text-align` | string | `justify` |
| `text-transform` | string | `uppercase` |
| `letter-spacing` | string or SizeVariable | `0.5em` |
| `word-spacing` | string or SizeVariable | `5px` |
| `color` | string or ColorVariable | `#FF9800` |

### Colors & backgrounds
| Property | Type | Example |
|----------|------|---------|
| `background-color` | string or ColorVariable | `#e0e0e0` |
| `background-image` | string | `url('image.jpg')` |
| `background-size` | string | `cover` |
| `background-position` | string | `top right` |
| `background-repeat` | string | `repeat-x` |
| `background-attachment` | string | `fixed` |
| `background-blend-mode` | string | `multiply` |
| `accent-color` | string or ColorVariable | `#ff5733` |
| `caret-color` | string or ColorVariable | `blue` |

### Borders
| Property | Type | Example |
|----------|------|---------|
| `border-top-width` | string or SizeVariable | `2px` |
| `border-top-style` | string | `ridge` |
| `border-top-color` | string or ColorVariable | `#3F51B5` |
| `border-top-left-radius` | string or SizeVariable | `20px` |
| `border-top-right-radius` | string or SizeVariable | `20px` |
| `border-bottom-width` | string or SizeVariable | `1px` |
| `border-bottom-style` | string | `groove` |
| `border-bottom-color` | string or ColorVariable | `#f44336` |
| `border-bottom-left-radius` | string or SizeVariable | `4px` |
| `border-bottom-right-radius` | string or SizeVariable | `4px` |
| `border-left-width` | string or SizeVariable | `2px` |
| `border-left-style` | string | `dashed` |
| `border-left-color` | string or ColorVariable | `#9C27B0` |
| `border-right-width` | string or SizeVariable | `1px` |
| `border-right-style` | string | `double` |
| `border-right-color` | string or ColorVariable | `#FFEB3B` |

### Spacing
| Property | Type | Example |
|----------|------|---------|
| `margin-top` | string or SizeVariable | `10px` |
| `margin-right` | string or SizeVariable | `30px` |
| `margin-bottom` | string or SizeVariable | `20px` |
| `margin-left` | string or SizeVariable | `30px` |
| `padding-top` | string or SizeVariable | `10px` |
| `padding-right` | string or SizeVariable | `10px` |
| `padding-bottom` | string or SizeVariable | `15px` |
| `padding-left` | string or SizeVariable | `10px` |

### Effects & transforms
| Property | Type | Example |
|----------|------|---------|
| `box-shadow` | string | `10px 5px 5px black` |
| `text-shadow` | string | `2px 2px 5px grey` |
| `filter` | string | `blur(2px)` |
| `backdrop-filter` | string | `blur(5px)` |
| `transform` | string | `rotate(45deg)` |
| `transform-origin` | string | `top left` |
| `opacity` | string | `0.5` |
| `mix-blend-mode` | string | `multiply` |

### Transitions & animations
| Property | Type | Example |
|----------|------|---------|
| `transition-property` | string | `opacity` |
| `transition-duration` | string | `300ms` |
| `transition-timing-function` | string | `ease-in-out` |
| `transition-delay` | string | `0.5s` |
| `animation-name` | string | `slidein` |
| `animation-duration` | string | `1s` |
| `animation-timing-function` | string | `ease-in-out` |
| `animation-delay` | string | `2s` |
| `animation-iteration-count` | string | `infinite` |
| `animation-direction` | string | `alternate` |
| `animation-fill-mode` | string | `forwards` |
| `animation-play-state` | string | `paused` |

### Complete property reference

For a comprehensive list of all supported properties, see the [W3Schools CSS Properties reference](https://www.w3schools.com/cssref/index.php).

{/* <!-- vale off --> */}
| Style Property              | Value                        | Example                         |
| --------------------------- | ---------------------------- | ------------------------------- |
| accent-color                | string or ColorVariable      | `#ff5733`                       |
| align-content               | string                       | `center`                        |
| align-items                 | string                       | `flex-start`                    |
| align-self                  | string                       | `stretch`                       |
| animation-delay             | string                       | `2s`                            |
| animation-direction         | string                       | `alternate`                     |
| animation-duration          | string                       | `1s`                            |
| animation-fill-mode         | string                       | `forwards`                      |
| animation-iteration-count   | string                       | `infinite`                      |
| animation-name              | string                       | `slidein`                       |
| animation-play-state        | string                       | `paused`                        |
| animation-timing-function   | string                       | `ease-in-out`                   |
| appearance                  | string                       | `none`                          |
| backdrop-filter             | string                       | `blur(5px)`                     |
| backface-visibility         | string                       | `hidden`                        |
| background-attachment       | string                       | `fixed`                         |
| background-blend-mode       | string                       | `multiply`                      |
| background-clip             | string                       | `border-box`                    |
| background-color            | string or ColorVariable      | `#e0e0e0`                       |
| background-image            | string                       | `url('image.jpg')`              |
| background-origin           | string                       | `padding-box`                   |
| background-position         | string                       | `top right`                     |
| background-position-x       | string or SizeVariable       | `50%`                           |
| background-position-y       | string or SizeVariable       | `50%`                           |
| background-repeat           | string                       | `repeat-x`                      |
| background-size             | string                       | `cover`                         |
| block-size                  | string or SizeVariable       | `100px`                         |
| border-block-end-color      | string or ColorVariable      | `#000000`                       |
| border-block-end-style      | string                       | `dotted`                        |
| border-block-end-width      | string or SizeVariable       | `3px`                           |
| border-block-start-color    | string or ColorVariable      | `#333333`                       |
| border-block-start-style    | string                       | `solid`                         |
| border-block-start-width    | string or SizeVariable       | `2px`                           |
| border-bottom-color         | string or ColorVariable      | `#f44336`                       |
| border-bottom-left-radius   | string or SizeVariable       | `4px`                           |
| border-bottom-right-radius  | string or SizeVariable       | `4px`                           |
| border-bottom-style         | string                       | `groove`                        |
| border-bottom-width         | string or SizeVariable       | `1px`                           |
| border-collapse             | string                       | `collapse`                      |
| border-end-end-radius       | string or SizeVariable       | `10px`                          |
| border-end-start-radius     | string or SizeVariable       | `10px`                          |
| border-image-outset         | string or SizeVariable       | `5px`                           |
| border-image-repeat         | string                       | `stretch`                       |
| border-image-slice          | string                       | `30%`                           |
| border-image-source         | string                       | `url('border.png')`             |
| border-image-width          | string or SizeVariable       | `10px`                          |
| border-inline-end-color     | string or ColorVariable      | `#4CAF50`                       |
| border-inline-end-style     | string                       | `inset`                         |
| border-inline-end-width     | string or SizeVariable       | `4px`                           |
| border-inline-start-color   | string or ColorVariable      | `#2196F3`                       |
| border-inline-start-style   | string                       | `outset`                        |
| border-inline-start-width   | string or SizeVariable       | `3px`                           |
| border-left-color           | string or ColorVariable      | `#9C27B0`                       |
| border-left-style           | string                       | `dashed`                        |
| border-left-width           | string or SizeVariable       | `2px`                           |
| border-right-color          | string or ColorVariable      | `#FFEB3B`                       |
| border-right-style          | string                       | `double`                        |
| border-right-width          | string or SizeVariable       | `1px`                           |
| border-start-end-radius     | string or SizeVariable       | `5px`                           |
| border-start-start-radius   | string or SizeVariable       | `5px`                           |
| border-top-color            | string or ColorVariable      | `#3F51B5`                       |
| border-top-left-radius      | string or SizeVariable       | `20px`                          |
| border-top-right-radius     | string or SizeVariable       | `20px`                          |
| border-top-style            | string                       | `ridge`                         |
| border-top-width            | string or SizeVariable       | `2px`                           |
| bottom                      | string or SizeVariable       | `0`                             |
| box-shadow                  | string                       | `10px 5px 5px black`            |
| box-sizing                  | string                       | `border-box`                    |
| break-after                 | string                       | `auto`                          |
| break-before                | string                       | `always`                        |
| break-inside                | string                       | `avoid`                         |
| caption-side                | string                       | `bottom`                        |
| caret-color                 | string or ColorVariable      | `blue`                          |
| clear                       | string                       | `both`                          |
| clip                        | string                       | `rect(0,0,0,0)`                 |
| clip-path                   | string                       | `circle(50%)`                   |
| clip-rule                   | string                       | `evenodd`                       |
| color                       | string or ColorVariable      | `#FF9800`                       |
| color-interpolation         | string                       | `sRGB`                          |
| color-interpolation-filters | string                       | `linearRGB`                     |
| column-count                | string                       | `3`                             |
| column-gap                  | string or SizeVariable       | `20px`                          |
| column-rule-color           | string or ColorVariable      | `#607D8B`                       |
| column-rule-style           | string                       | `solid`                         |
| column-rule-width           | string or SizeVariable       | `1px`                           |
| column-span                 | string                       | `all`                           |
| column-width                | string or SizeVariable       | `200px`                         |
| content                     | string                       | `'Hello'`                       |
| cursor                      | string                       | `pointer`                       |
| cx                          | string                       | `50`                            |
| cy                          | string                       | `50`                            |
| direction                   | string                       | `ltr`                           |
| display                     | string                       | `flex`                          |
| dominant-baseline           | string                       | `alphabetic`                    |
| empty-cells                 | string                       | `show`                          |
| fill                        | string                       | `#f00`                          |
| fill-opacity                | string                       | `0.5`                           |
| fill-rule                   | string                       | `nonzero`                       |
| filter                      | string                       | `blur(2px)`                     |
| flex-basis                  | string or SizeVariable       | `auto`                          |
| flex-direction              | string                       | `row`                           |
| flex-grow                   | string                       | `1`                             |
| flex-shrink                 | string                       | `1`                             |
| flex-wrap                   | string                       | `wrap`                          |
| float                       | string                       | `right`                         |
| flood-color                 | string or ColorVariable      | `#00BCD4`                       |
| flood-opacity               | string                       | `0.7`                           |
| font-family                 | string or FontFamilyVariable | `Arial, sans-serif`             |
| font-kerning                | string                       | `normal`                        |
| font-optical-sizing         | string                       | `auto`                          |
| font-size                   | string or SizeVariable       | `16px`                          |
| font-stretch                | string                       | `condensed`                     |
| font-style                  | string                       | `italic`                        |
| font-variant-alternates     | string                       | `normal`                        |
| font-variant-caps           | string                       | `small-caps`                    |
| font-variant-east-asian     | string                       | `normal`                        |
| font-variant-ligatures      | string                       | `none`                          |
| font-variant-numeric        | string                       | `ordinal`                       |
| font-weight                 | string                       | `bold`                          |
| grid-auto-columns           | string                       | `minmax(100px, auto)`           |
| grid-auto-flow              | string                       | `row dense`                     |
| grid-auto-rows              | string                       | `auto`                          |
| grid-column-end             | string                       | `span 2`                        |
| grid-column-gap             | string                       | `10px`                          |
| grid-column-start           | string                       | `1`                             |
| grid-row-end                | string                       | `3`                             |
| grid-row-gap                | string or SizeVariable       | `20px`                          |
| grid-row-start              | string                       | `1`                             |
| grid-template-areas         | string                       | `'header header'`               |
| grid-template-columns       | string                       | `50px 100px`                    |
| grid-template-rows          | string                       | `auto`                          |
| height                      | string or SizeVariable       | `100vh`                         |
| image-orientation           | string                       | `90deg`                         |
| image-rendering             | string                       | `auto`                          |
| inline-size                 | string or SizeVariable       | `200px`                         |
| inset-block-end             | string or SizeVariable       | `20px`                          |
| inset-block-start           | string or SizeVariable       | `5px`                           |
| inset-inline-end            | string or SizeVariable       | `10px`                          |
| inset-inline-start          | string or SizeVariable       | `10px`                          |
| isolation                   | string                       | `isolate`                       |
| justify-content             | string                       | `space-between`                 |
| justify-items               | string                       | `stretch`                       |
| justify-self                | string                       | `center`                        |
| left                        | string or SizeVariable       | `50px`                          |
| letter-spacing              | string or SizeVariable       | `0.5em`                         |
| lighting-color              | string or ColorVariable      | `white`                         |
| line-break                  | string                       | `strict`                        |
| line-height                 | string or SizeVariable       | `1.5`                           |
| list-style-image            | string                       | `url('star.png')`               |
| list-style-position         | string                       | `inside`                        |
| list-style-type             | string                       | `disc`                          |
| margin-block-end            | string or SizeVariable       | `15px`                          |
| margin-block-start          | string or SizeVariable       | `15px`                          |
| margin-bottom               | string or SizeVariable       | `20px`                          |
| margin-inline-end           | string or SizeVariable       | `10px`                          |
| margin-inline-start         | string or SizeVariable       | `10px`                          |
| margin-left                 | string or SizeVariable       | `30px`                          |
| margin-right                | string or SizeVariable       | `30px`                          |
| margin-top                  | string or SizeVariable       | `10px`                          |
| marker-end                  | string                       | `url('arrowhead.svg')`          |
| marker-mid                  | string                       | `url('dot.svg')`                |
| marker-start                | string                       | `url('circle.svg')`             |
| mask-type                   | string                       | `luminance`                     |
| max-block-size              | string or SizeVariable       | `100px`                         |
| max-height                  | string or SizeVariable       | `200px`                         |
| max-inline-size             | string or SizeVariable       | `300px`                         |
| max-width                   | string or SizeVariable       | `80%`                           |
| min-block-size              | string or SizeVariable       | `50px`                          |
| min-height                  | string or SizeVariable       | `100px`                         |
| min-inline-size             | string or SizeVariable       | `150px`                         |
| min-width                   | string or SizeVariable       | `60px`                          |
| mix-blend-mode              | string                       | `multiply`                      |
| object-fit                  | string                       | `cover`                         |
| object-position             | string                       | `center top`                    |
| offset-anchor               | string                       | `auto`                          |
| offset-distance             | string or SizeVariable       | `10px`                          |
| offset-path                 | string                       | `path('M10 80 Q 95 10 180 80')` |
| offset-rotate               | string                       | `auto`                          |
| opacity                     | string                       | `0.5`                           |
| order                       | string                       | `2`                             |
| outline-color               | string or ColorVariable      | `#FF5722`                       |
| outline-offset              | string or SizeVariable       | `2px`                           |
| outline-style               | string                       | `dashed`                        |
| outline-width               | string or SizeVariable       | `3px`                           |
| overflow-wrap               | string                       | `break-word`                    |
| overflow-x                  | string                       | `auto`                          |
| overflow-y                  | string                       | `scroll`                        |
| overscroll-behavior-block   | string                       | `contain`                       |
| overscroll-behavior-inline  | string                       | `none`                          |
| padding-block-end           | string or SizeVariable       | `25px`                          |
| padding-block-start         | string or SizeVariable       | `25px`                          |
| padding-bottom              | string or SizeVariable       | `15px`                          |
| padding-inline-end          | string or SizeVariable       | `20px`                          |
| padding-inline-start        | string or SizeVariable       | `20px`                          |
| padding-left                | string or SizeVariable       | `10px`                          |
| padding-right               | string or SizeVariable       | `10px`                          |
| padding-top                 | string or SizeVariable       | `10px`                          |
| paint-order                 | string                       | `fill stroke markers`           |
| perspective                 | string or SizeVariable       | `500px`                         |
| perspective-origin          | string                       | `50% 50%`                       |
| pointer-events              | string                       | `none`                          |
| position                    | string                       | `absolute`                      |
| r                           | string or SizeVariable       | `50px`                          |
| resize                      | string                       | `both`                          |
| right                       | string or SizeVariable       | `0px`                           |
| rotate                      | string                       | `45deg`                         |
| row-gap                     | string or SizeVariable       | `20px`                          |
| rx                          | string or SizeVariable       | `10px`                          |
| ry                          | string or SizeVariable       | `10px`                          |
| scale                       | string                       | `1.2`                           |
| scroll-behavior             | string                       | `smooth`                        |
| scroll-margin-block-end     | string or SizeVariable       | `10px`                          |
| scroll-margin-block-start   | string or SizeVariable       | `10px`                          |
| scroll-margin-inline-end    | string or SizeVariable       | `10px`                          |
| scroll-margin-inline-start  | string or SizeVariable       | `10px`                          |
| scroll-padding-block-end    | string or SizeVariable       | `20px`                          |
| scroll-padding-block-start  | string or SizeVariable       | `20px`                          |
| scroll-padding-inline-end   | string or SizeVariable       | `20px`                          |
| scroll-padding-inline-start | string or SizeVariable       | `20px`                          |
| shape-image-threshold       | string                       | `0.3`                           |
| shape-margin                | string or SizeVariable       | `15px`                          |
| shape-outside               | string                       | `circle(50%)`                   |
| shape-rendering             | string                       | `auto`                          |
| stop-color                  | string or ColorVariable      | `#0D47A1`                       |
| stop-opacity                | string                       | `0.8`                           |
| stroke                      | string or ColorVariable      | `black`                         |
| stroke-dasharray            | string                       | `5, 10`                         |
| stroke-dashoffset           | string or SizeVariable       | `5px`                           |
| stroke-linecap              | string                       | `round`                         |
| stroke-linejoin             | string                       | `bevel`                         |
| stroke-miterlimit           | string                       | `10`                            |
| stroke-opacity              | string                       | `1`                             |
| stroke-width                | string or SizeVariable       | `3px`                           |
| tab-size                    | string or SizeVariable       | `4`                             |
| table-layout                | string                       | `fixed`                         |
| text-align                  | string                       | `justify`                       |
| text-align-last             | string                       | `center`                        |
| text-anchor                 | string                       | `start`                         |
| text-decoration             | string                       | `underline`                     |
| text-decoration-color       | string or ColorVariable      | `red`                           |
| text-decoration-line        | string                       | `overline`                      |
| text-decoration-skip-ink    | string                       | `auto`                          |
| text-decoration-style       | string                       | `dotted`                        |
| text-emphasis-color         | string or ColorVariable      | `green`                         |
| text-emphasis-position      | string                       | `under right`                   |
| text-emphasis-style         | string                       | `filled circle`                 |
| text-indent                 | string or SizeVariable       | `20px`                          |
| text-overflow               | string                       | `ellipsis`                      |
| text-rendering              | string                       | `optimizeLegibility`            |
| text-shadow                 | string                       | `2px 2px 5px grey`              |
| text-transform              | string                       | `uppercase`                     |
| text-underline-position     | string                       | `under`                         |
| top                         | string or SizeVariable       | `100px`                         |
| touch-action                | string                       | `pan-right`                     |
| transform                   | string                       | `rotate(45deg)`                 |
| transform-origin            | string                       | `top left`                      |
| transform-style             | string                       | `preserve-3d`                   |
| transition-delay            | string                       | `0.5s`                          |
| transition-duration         | string                       | `300ms`                         |
| transition-property         | string                       | `opacity`                       |
| transition-timing-function  | string                       | `ease-in-out`                   |
| translate                   | string or SizeVariable       | `10px, 20px`                    |
| unicode-bidi                | string                       | `bidi-override`                 |
| vector-effect               | string                       | `non-scaling-stroke`            |
| vertical-align              | string                       | `middle`                        |
| visibility                  | string                       | `hidden`                        |
| white-space                 | string                       | `nowrap`                        |
| width                       | string or SizeVariable       | `50%`                           |
| will-change                 | string                       | `transform`                     |
| word-break                  | string                       | `break-word`                    |
| word-spacing                | string or SizeVariable       | `5px`                           |
| writing-mode                | string                       | `vertical-rl`                   |
| x                           | string or SizeVariable       | `5px`                           |
| y                           | string or SizeVariable       | `10px`                          |
| z-index                     | string                       | `10`                            |
| -webkit-line-clamp          | string                       | `3`                             |
| -webkit-text-fill-color     | string or ColorVariable      | `#FF5722`                       |
| -webkit-text-stroke-color   | string or ColorVariable      | `#4CAF50`                       |
| -webkit-text-stroke-width   | string or SizeVariable       | `1px`                           |
{/* <!-- vale on --> */}



---
title: Get style properties
slug: designer/reference/get-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get style properties'
'og:description': Retrieves the CSS properties of the specified Style Object.
---
## **`style.getProperties(options?)`**

Retrieves the CSS properties of the specified Style Object. See the [style properties list](/designer/reference/style-properties) for an index of CSS properties that can be set on a Style.


### Syntax

```typescript
style.getProperties(options?: BreakpointAndPseudo): Promise<PropertyMap>
```

### Parameters

- **options**: _BreakpointAndPseudo_ (optional)
  
  An object that lets you filter properties by breakpoint and/or pseudo-state.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<_PropertyMap_>**

A Promise that resolves to a [_PropertyMap_ ](/designer/reference/style-properties)object. A dictionary of style properties and their values. 

#### Example

```typescript
// Get selected element
const element = await webflow.getSelectedElement()

if (element?.styles) {

  // Get Element Styles
  const styles = await element.getStyles()

  // Initialize an empty object to store all properties
  const allProperties: { [key: string]: any } = {};

  for (let style of styles) {
    // Use string type for styleName
    const styleName: string = await style.getName();
    const breakpoint : BreakpointAndPseudo = {breakpoint: 'xxl'}
    const properties = await style.getProperties(breakpoint);
    allProperties[styleName] = properties;
  }

  console.log(allProperties);

}
```

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | An       |





---
title: Set style properties
slug: designer/reference/set-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Set style properties'
'og:description': Set multiple style-properties on a style.
---
## **`style.setProperties(props, options?)`**

Set multiple style-properties on a Style object.


### Syntax

```typescript
 style.setProperties( props: PropertyMap, options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`props`**: _PropertyMap_ - The properties to set. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.
- **`options`**: _BreakpointAndPseudo_ (optional)
  
  An object that lets you filter properties by breakpoint and/or pseudo-state.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`

### Example

```typescript
// Create a new style 
const newStyle = await webflow.createStyle('MyCustomStyle')

const propertyMap : PropertyMap = {
    'background-color': "blue",
    'font-size': "16px",
    'font-weight': "bold",
  }
const myBreakpoint = {breakpoint: "medium"} as BreakpointAndPseudo

// Set and save properties for the style
await newStyle.setProperties(propertyMap, myBreakpoint);
await newStyle.save()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |



---
title: Get style property
slug: designer/reference/get-style-property
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get style property'
'og:description': Retrieve the value of a specific property in a Style.
---
## **`style.getProperty(prop, options?)`**

Retrieve the value of a specific property in a Style object. 


### Syntax

```typescript
 style.getProperty(prop: StyleProperty, options?: BreakpointAndPseudo): Promise<null | PropertyMap[p]>
```

### Parameters

- **options**: _BreakpointAndPseudo_ (optional)
  
  An object that lets you filter properties by breakpoint and/or pseudo-state.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<_PropertyMap_ \| _Variable_ \| `null`>**

Returns a Promise that resolves to:

- _PropertyMap[p]_ - The value of the provided style property, if one exists.
- A [Variable](/designer/reference/variables-overview) representing the value of the provided style property, if a variable is used as the value of the provided style property.
- `null` - If value does not exist for the provided style property, this method will return `null`.

### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

// Get Element Styles
if (selectedElement?.styles) {

    const styles = await selectedElement.getStyles()
    const selectedPropertyList = await Promise.all(styles.map(async style => {

      const styleName = await style.getName()
      const property = await style.getProperty(`box-shadow`)
      console.log(`Style Name: ${styleName}, box-shadow: ${property}`)

    }))

  }
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | An       |



---
title: Set style property
slug: designer/reference/set-style-property
description: ''
hidden: false
'og:title': 'Webflow Designer API: Set style property'
'og:description': >-
  Manage the CSS of a Style by setting a specific style property at the given
  breakpoint and pseudo-state.
---
## **`style.setProperty(prop, value, options?)`**

Manage the CSS of a Style by setting a specific style property at the given breakpoint and pseudo-state. 


### Syntax

```typescript
 style.setProperty(prop: StyleProperty, value: String, options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`prop`**: _StyleProperty_ - The property to set. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.
- **`value`**: _String_ | _VariableReference_ - The value to set. You can set the value to a string or a [variable reference](/designer/reference/variables-overview).
- **`options`**: _BreakpointAndPseudo_ (optional)
  
  An object to set the style property at a specific breakpoint and/or pseudo-state.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to set the style property for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to set the style property for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`

### Example

```typescript
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName);

// Set Style Properties
const options: BreakpointAndPseudo = { breakpoint: "xl", pseudo: "hover" }
await retrievedStyle?.setProperty('background-color', 'blue', options)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |




---
title: Remove a style property
slug: designer/reference/remove-a-style-property
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove a style property'
'og:description': Remove a single style-property from a Style object.
---
## **`style.remove(prop, options?)`**

Remove a single style-property from a Style object.


### Syntax

```typescript
style.removeProperty(prop: StyleProperty, options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`prop`**: _StyleProperty_ - The name of the property to remove from the style. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.
- **`options`**: _BreakpointAndPseudo_ (optional)
  
  An object that lets you filter properties by breakpoint and/or pseudo-state.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`void`>**

A Promise that resolves to `undefined`

### Example

```typescript
removeSingleStyleProperty: async (property: StyleProperty) => {

  // Get Selected Element
  const selectedElement = await webflow.getSelectedElement()

  if (selectedElement?.styles) {

    // Get Element Styles
    const styles = await selectedElement.getStyles()
    const primaryStyle = styles[0]
    await primaryStyle.removeProperty(property) // Remove the property from the style

  }
},
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |



---
title: Remove style properties
slug: designer/reference/remove-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove style properties'
'og:description': Remove multiple style properties from a Style object.
---
## **`style.removeProperties(props, options?)`**

Remove multiple style properties from a Style object.


### Syntax

```typescript
style.removeProperties(props: Array<StyleProperty>,options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`props`**: _Array\<StyleProperty>_ - The properties to remove from the style. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.

- **`options`**: _BreakpointAndPseudo_ (optional)
  
  An object that lets you filter properties by breakpoint and/or pseudo-state.
  
  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```
  
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```
  
  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" | 
      "first-child" | "last-child" | "hover" | "active" | "pressed" | 
      "visited" | "focus" | "focus-visible" | "focus-within" | 
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`

### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Get Element Styles
  const styles = await selectedElement.getStyles()
  const primaryStyle = styles[0]
  const properties : StyleProperty[] = ['background-color', 'accent-color',"font-family"]
  await primaryStyle.removeProperties(properties)

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |




---
title: Remove all style properties
slug: designer/reference/clear-all-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove all style properties'
'og:description': Remove all style properties from a Style.
---
## **`style.removeAllProperties()`**

Remove all style properties from a Style.

### Syntax

```typescript
style.removeAllProperties(): Promise<void>
```

### Returns

**Promise\<`null`>**

A promise that resolves to `null`

### Example

```typescript
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName);

// Clear Style Properties
await retrievedStyle?.removeAllProperties()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62" 
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |

