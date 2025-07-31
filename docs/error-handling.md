---
title: Error Handling
slug: designer/reference/error-handling
description: ''
hidden: false
---
This page outlines error patterns, debugging tips, and all possible errors for quick troubleshooting to aid developers in building resilient applications. API errors in Webflow may be a result of a number of scenarios including but not limited to insufficient Webflow entitlements, user role abilities, and more.


## Error patterns

The Designer API employs a structured format for exceptions, ensuring you have clear and actionable information at your disposal. Here's what you can expect in the event of an error:

```
Cause Tag: ResourceRemovalFailed
Message: "Failed to remove style. Ensure there are no usages of this style."
```

**Cause Tag** `(err.cause.tag)`: Accompanying each error message is a consistent, unchanging cause tag. These tags describe a unique error type for the purpose of programmatically distinguishing between different error scenarios and responding accordingly.

**Message** `(err.message)`: A descriptive sentence designed to provide insight into what went wrong. The wording of this message may change over time to clarify or reflect updated functionality within the Designer API.

## List of errors

This section provides a detailed list of error cause tags you might encounter while interacting with the Designer API.

| Cause Tag               | Description                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DuplicateValue          | Indicates a value was duplicated where it should be unique.                                                                                                    |
| Forbidden               | Indicates that a User and/or app doesn't have the permission to take a specific action. For more on this error see documentation on [App Modes](/designer/reference/app-modes) |
| InternalError           | An error occurred within the system or process.                                                                                                                |
| InvalidElementPlacement | An element was placed in an invalid location or context.                                                                                                       |
| InvalidRequest          | A request is invalid based on the designer's current ability                                                                                                   |
| InvalidStyle            | The specified style is invalid or not recognized.                                                                                                              |
| InvalidStyleName        | The specified style name doesn't exist or is incorrect.                                                                                                       |
| InvalidStyleProperty    | The property of the style is invalid or not applicable.                                                                                                        |
| InvalidStyleVariant     | The variant of the style specified is invalid or not recognized.                                                                                               |
| InvalidTargetElement    | The target element for the operation is invalid.                                                                                                               |
| PageCreateFailed        | Failed to create a page due to an unspecified error.                                                                                                           |
| ResourceCreationFailed  | Failed to create a resource due to an unspecified error.                                                                                                       |
| ResourceMissing         | The requested resource is missing or unavailable.                                                                                                              |
| VariableInvalid         | A variable's value is invalid or not within the expected range.                                                                                                |

## How to handle errors

Apps need to manage errors gracefully to maintain a seamless user experience. See the approaches below for a few patterns on how to handle errors if they arise when working with Designer APIs.

### Using try/catch for error handling

The try/catch block is seamlessly integrated with async/await syntax, offering a straightforward way to catch exceptions as demonstrated:

```typescript
try {
  const element = await webflow.getSelectedElement();
  await element.remove();
  // Attempting further operations on the removed element will throw an error
  const styles = await element.getStyles();
} catch (err) {
  console.error(`Cause:${err.cause.tag}`);
  console.error(`Message:${err.message}`);
}
```

### Notifying users of an error

By utilizing the [`webflow.notify`](/designer/reference/notify-user) method, you can send a notification directly to the user within Webflow that acknowledges the error and also, when feasible, provide guidance on resolving it. This proactive approach helps maintain trust and ensures users aren't left in the dark, improving their overall experience and satisfaction with your application.

<video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_User%20Events.webm" type="video/webm" />  Your browser doesn't support HTML video.</video>


```typescript
function handleErrors(err) {
  switch (err.cause.tag) {
    case 'ResourceMissing':
      webflow.notify({ type: 'Error', message: 'The element no longer exists. Select a different element' });
      break;
    case 'InvalidElementPlacement':
      // Handle specific error
      webflow.notify({  type: 'Error', message: 'The element cannot be placed here. Try another location' });
      break;
    // Additional error cases
    default:
      webflow.notify({ type: 'Error', message: 'An error occurred. Please try again later' });
  }
}
```
