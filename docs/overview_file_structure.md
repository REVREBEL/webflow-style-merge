---
title: Create your first Designer Extension
hidden: false
description: >-
  A quick guide to help you set up a Designer Extension and start creating Apps
  that work directly in the designer
layout: overview
hide-toc: true
'og:title': 'Getting Started with Webflow Apps: Designer Extensions'
'og:description': >-
  A quick guide to help you set up a Designer Extension and start creating Apps
  that work directly in the designer
---

<img src='file:e387ed5f-6e62-49d8-998a-e5299a690360' />


In this tutorial, you'll learn how to create and run a [Designer Extension](/data/docs/designer-extensions) that updates text on elements within the Designer. This guide is intended for developers who want to build custom functionality directly into the Webflow design environment.

By the end of this tutorial, you will be able to:
  - **Install and configure** the [Webflow CLI](/designer/reference/webflow-cli)
  - **Scaffold** a new Designer Extension project
  - **Run your extension locally** in the Webflow Designer
  - **Programmatically update elements** on a page
  - **Use the [Designer APIs](/designer/reference/introduction)** to extend your extension’s capabilities

  ---

### Prerequisites

Before you begin, make sure you have:
  - Node.js 16.20 or later
  - Access to a Webflow site for development and testing
  - A registered Webflow App installed on your test site

If you haven’t set up an app yet, follow the [creating an App guide.](/data/docs/register-an-app) 

## Set up your development environment
<Steps>
<Step title="Install the Webflow CLI">
Webflow’s CLI lets you create, manage, and locally run Designer Extensions from the command line.

To install the CLI globally, run:

```shell
npm i -g @webflow/webflow-cli
```
</Step>

<Step title="Create a Designer Extension project">
Use the CLI to scaffold a new Designer Extension with the recommended structure and settings. You can also use templates for frameworks like React and TypeScript. After creating your project, you'll need to navigate to the project directory and install the dependencies.

Replace my-extension-name with your desired project name:

```shell
webflow extension init my-extension-name react
cd my-extension-name
npm install
```

</Step>

<Step title="Review the project structure">
Your new project folder will look like this. For a detailed explanation of each file and folder, see [App Structure](/designer/reference/app-structure) and [App Settings](/designer/reference/app-settings). 

    ```
    my_example_extension/
    ├── node_modules/
    ├── public/             # Contains all the files to serve your designer extension
    │   ├── index.html      # Required:This file serves as the initial point of entry for your single page app.
    │   ├── index.js        # This file adds interactivity and dynamic behavior to your web app.
    │   └── styles.css      # Defines the visual appearance of your App
    ├── src/                # Contains the source code for your designer extension
    │   └── index.ts
    ├── package-lock.json
    ├── package.json
    ├── webflow.json        # Contains the settings for your designer extension
    ├── README.md       
    └── tsconfig.json       # Contains the TypeScript configuration for your designer extension
    ```

  
</Step>
</Steps>

## Run your Designer Extension locally
Before you can test your extension in Webflow, you’ll want to run it locally to enable live development and preview changes as you make them.

<Steps>
  <Step title="Start the development server">
  Navigate to your project directory and run the following command to start the development server:

  ```shell
  npm run dev
  ```

  This command serves your Designer Extension on port 1337 using the CLI’s `webflow extension serve` command and runs webpack in watch mode with `npm run watch-webpack` concurrently. This setup enables live updates as you develop.

  <Note>
    While you can load your extension in a browser at `http://localhost:1337`, your app will only be able to interact with the Designer fully when loaded within the Webflow Designer. 
  </Note>

  </Step>

  <Step title="Install your extension to your test site">
  In your Workspace Settings, navigate to the "Apps & Integrations" > "Develop" section. Find your App and select the "..." button. Click "Install" and follow the instructions to install your extension to your test site.
  <Frame>
      <img src='file:35e623f9-ee6c-4c0c-a271-a6d0852f7126' />
    </Frame> 

  </Step>

  <Step title="Open App the Webflow Designer">
  Open your test site in the Webflow Designer, and press the "E" key to open the app panel. Find your app and click "Launch development app" to see your extension running in the Webflow Designer.

  <Frame>
    <img src='file:5d39e787-9c1e-45aa-b4c7-5a0948c8acda' />
  </Frame> 

  <Note>
    If you don't see your extension in the apps panel, you may need to refresh the page.
  </Note>
    
  </Step>

</Steps>


## Modify elements with the Designer APIs
The starter project you created already includes a basic example of using the Designer APIs: when you select a text element in the Webflow Designer and click the "Lorem Ipsum" button in your extension, the selected element’s text is replaced with placeholder content.

However, if you select a non-text element, the extension will not be able to update the text content. **Let’s improve this experience by adding user feedback for error cases.**

<Steps>
<Step title="Understand the starter functionality">
Your extension’s UI includes a "Lorem Ipsum" button. When clicked, the extension:

- [Gets the currently selected element](/designer/reference/get-selected-element) in the Designer
- [Replaces the text](/designer/reference/set-text-content) of the selected element with placeholder text

This code is found in `src/index.ts`.

```ts title="src/index.ts" {3-7}
document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault();
  const el = await webflow.getSelectedElement();
  if (el && el.textContent) {
    el.setTextContent(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  }
};
```

</Step>

<Step title="Improve the user experience with notifications">
Currently, if no element is selected or the selected element doesn’t support text, nothing happens. Let’s add a notification to guide the user in these cases. To do this, we'll add an `else` clause to the `if` statement in `index.ts` and use the [`webflow.notify()`](/designer/reference/notify-user) method to notify a user that they should choose a supported element.

Update your code as follows:

```ts title="index.ts" {16-18}
    document.getElementById("lorem").onsubmit = async (event) => {
      
      // Prevent the default form submission behavior, which would reload the page
      event.preventDefault()

      // Get the currently selected element in the Designer
      const el = await webflow.getSelectedElement()

      // Check if an element was returned, and the element can contain text content
      if (el && el.textContent) {
        // If we found the element and it has the ability to update the text content,
        // replace it with some placeholder text
        el.setTextContent(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " +
          "eiusmod tempor incididunt ut labore et dolore magna aliqua."
        )
      } else { // If an element isn't selected, or an element doesn't have text content, notify the user
        await webflow.notify({ type: 'Error', message: "Please select an element that contains text." })
      }
    }
```

Now, if the user clicks the button without selecting a valid text element, they’ll see a clear error notification in the Designer.

</Step>
<Step title="Test your extension">
Refresh your extension by clicking the <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle" }}> <path d="M10.2949 6C10.2949 6.79113 10.0603 7.56448 9.6208 8.22228C9.18128 8.88008 8.55656 9.39277 7.82566 9.69552C7.09475 9.99827 6.29049 10.0775 5.51456 9.92314C4.73864 9.7688 4.02591 9.38784 3.4665 8.82843C2.90709 8.26902 2.52612 7.55629 2.37178 6.78036C2.21744 6.00444 2.29665 5.20017 2.59941 4.46927C2.90216 3.73836 3.41485 3.11365 4.07264 2.67412C4.73044 2.2346 5.5038 2 6.29492 2V3C5.70158 3 5.12156 3.17595 4.62821 3.50559C4.13487 3.83524 3.75035 4.30377 3.52328 4.85195C3.29622 5.40013 3.23681 6.00333 3.35257 6.58527C3.46832 7.16721 3.75405 7.70176 4.1736 8.12132C4.59316 8.54088 5.12771 8.8266 5.70965 8.94236C6.2916 9.05811 6.8948 8.9987 7.44297 8.77164C7.99115 8.54458 8.45969 8.16006 8.78933 7.66671C9.11898 7.17336 9.29492 6.59334 9.29492 6H10.2949Z" fill="#000"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.29492 0L9.29492 2.5L6.29492 5V0Z" fill="#000"/> </svg> icon in the top right of your Designer Extension.

- Select a text element and click the button: the text should update.
- Select a non-text element (like an image) and click the button: you should see an error notification.

If both behaviors work as described, you’ve successfully improved your extension.

<Frame>
  ![Notify user](file:fc1c39b5-5901-4366-ab6a-7e90b5842601)
</Frame>

</Step>
</Steps>


### Next steps
Congratulations! You’ve built and run your first Designer Extension.

To continue your journey and unlock more advanced capabilities, explore the following resources:

- **Learn more about the [Designer APIs](/designer/reference/introduction)**<br/>
Dive deeper into what’s possible with the [Designer API reference.](/designer/reference/introduction)

- **Build and publish your extension**<br/>
Follow our guide on [building and deploying](/designer/docs/publishing-your-app) Designer Extensions to prepare your app for the [Marketplace](https://webflow.com/marketplace).

- **Submit your App to the Webflow Marketplace**<br/>
Share your extension with the community by [submitting your app.](https://developers.webflow.com/submit)

- **Troubleshoot and get help**<br/>
Visit our [developer forums](https://discourse.webflow.com/c/publishing-help/api/29) for support, tips, and to connect with other Webflow extension developers.
