# Design Guidelines

> A guide on designing for Webflow Apps for the designer

<img src="file:696be41e-f0a4-4f58-9322-8afe011ef4ca" alt="Developer UI kit" />

In this guide, we'll explore essential principles and practical tips to ensure your extensions engage users and seamlessly integrate with the Webflow ecosystem.

By focusing on user-centered design, thoughtful layout strategies, and effective color and typography choices, you'll create extensions that not only enhance functionality but also delight users. Let's dive in and discover how to make your extensions feel like a natural part of the Webflow experience. If youâ€™re looking to publish your App on the Marketplace, please review our [Design and Usability section of our Marketplace App Guidelines.](/data/docs/marketplace-guidelines)

<Note title="Looking to build a native looking Webflow App?">
  Weâ€™ve provided a simplified version of our design system with colors, typography, components, patterns, and App examples to help kickstart the design and build of your App. [Access the Webflow Apps Figma UI kit here](https://www.figma.com/community/file/1291823507081366246/webflow-app-ui-kit-2-0).
</Note>

## Crafting your user interface

Since Designer Extensions run within an iframe, you can use traditional HTML, CSS, and JavaScript to design and develop your user interface like you would any single-page application. You can use frameworks and libraries to help with this process. For instance, you might use [React](https://react.dev/) or [Vue.js](https://vuejs.org/) for creating your UI components, and [Tailwind CSS](https://tailwindcss.com/) or [Bootstrap](https://getbootstrap.com/) for styling.

Webflow doesnâ€™t require Designer Extensions to feel native to the Designer, but we do believe Apps that feel native will resonate with our customers and provide a higher-level experience.

## Design principles

Your UI should adhere to the following key principles:

1. **Customer-focused:** The App's purpose and value should be defined around the needs of Webflow users. It should solve a unique problem for them.
2. **Simplicity & approachability:** Your App should be simple to use and not require extensive learning to get started. It should complement Webflow's visual abstraction of code, not complicate it.
3. **Consistent design:** Use consistent design elements like color, typography, and button styles throughout your App. This improves the user experience and makes your App easier to navigate.
4. **Foster creative momentum:** Your App should not hinder the creative process. Avoid unnecessary steps or options that could break the user's flow state.
5. **Clear Language:** Use clear and concise copy throughout your App. It should guide users and connect the dots between visuals, layouts, and usability.
6. **Inclusive & Accessible:** Strive to make your App accessible to all users. This means ensuring it adheres to accessibility standards and best practices.

## Layout guidelines

1. **Vertical component arrangement:** For the narrow, default interface, components should be stacked vertically rather than horizontally.
2. **Full-width buttons & components:** Full-width elements enforce a vertical orientation and make your App easier to scan.
3. **Avoid horizontal scrolling:** Ensure your UI elements fit within the iframe's width to prevent horizontal scrolling.
4. **Consistent spacing:** Use a consistent spacing rhythm (e.g., multiples of 4px) to create a visually pleasing App. Use white space effectively to create a balanced layout and highlight important information.
5. **Clear & concise copy:** Use sentence case for all text, including headings and buttons. Make error states helpful and actionable, and always strive for clarity over complexity.
6. **Consistent design language:** Use a consistent design language, including typography, color schemes, and button styles. This will create a more cohesive user experience and help users navigate your plugin more easily.
7. **Iconography**: Use recognizable and intuitive icons throughout your App. Icons can help users navigate your App more easily and quickly.

## Enhancing with colors & typography

Choose a color scheme that aligns with the purpose and tone of your App. Webflow primarily uses the Inter font for its interface. You can consider adopting it for consistency.

### Fonts

To use Webflowâ€™s main font face, Inter, you will need to download the files into your App or access them via Google Fontâ€™s API. [Access Inter font family on Google Fonts](https://fonts.google.com/specimen/Inter).

### CSS variables

To design and build an App that feels native to Webflowâ€™s Designer, you can use the following Webflow hosted CSS variables. These variables will automatically adjust based on a users [Appearance settings](https://webflow.com/feature/adjust-appearance-settings#:~:text=All%20display%20options%20are%20available,settings%20for%20the%20Webflow%20Designer.). Implement these by calling them in your CSS selectors with the `var()` function:

```css CSS
/* Webflow colors */
--background1: #1E1E1E;
--background2: #2E2E2E;
--background3: #383838;
--background4: #373737;
--background5: #444444;
--backgroundInactive: #2E2E2E;
--backgroundInverse: #EBEBEB;
--backgroundInput: rgba(0, 0, 0, 0.15);

--actionPrimaryBackground: #006ACC;
--actionPrimaryBackgroundHover: #187CD9;
--actionSecondaryBackground: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.10) 100%);
--actionSecondaryBackgroundHover: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%);
--actionPrimaryText: #FFFFFF;
--actionPrimaryTextHover: #FFFFFF;
--actionSecondaryText: #E0E0E0;
--actionSecondaryTextHover: #E0E0E0;

--border1: rgba(255, 255, 255, 0.13);
--border2: rgba(255, 255, 255, 0.14);
--border3: rgba(255, 255, 255, 0.19);

--text1: #F5F5F5;
--text2: #BDBDBD;
--text3: #A3A3A3;
--textInactive: #757575;
--textInverse: #1E1E1E;

--blueText: #8AC2FF;
--blueIcon: #8AC2FF;
--blueBorder: #007DF0;

--greenBackground: #007A41;
--greenBackgroundHover: #0D8A4F;
--greenText: #63D489;
--greenIcon: #63D489;
--greenBorder: #259D4D;
--yellowBackground: #946B00;

--yellowBackgroundHover: #AF7F00;
--yellowText: #F3C831;
--yellowIcon: #F3C831;
--yellowBorder: #D7A220;

--redBackground: #CF313B;
--redBackgroundHover: #CB3535;
--redText: #FF8A8A;
--redIcon: #FF8A8A;
--redBorder: #E42F3A;

--orangeBackground: #BF4704;
--orangeBackgroundHover: #DC95616;
--orangeText: #EBA267;
--orangeIcon: #EBA267;
--orangeBorder: #DF640C;

--purpleBackground: #734CE0;
--purpleBackgroundHover: #815BEB;
--purpleText: #B89EFF;
--purpleIcon: #B89EFF;
--purpleBorder: #875FFD;

/* Box shadows for buttons and inputs */
--boxShadows-action-colored: 0px 0.5px 1px 0px rgba(0, 0, 0, 0.8),0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.20) inset;
--boxShadows-action-secondary: 0px 0.5px 1px rgba(0, 0, 0, 0.8),inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.12);
--boxShadows-input-inner: 0px 1px 1px -1px rgba(0, 0, 0, 0.13) inset,0px 3px 3px -3px rgba(0, 0, 0, 0.17) inset,0px 4px 4px -4px rgba(0, 0, 0, 0.17) inset,0px 8px 8px -8px rgba(0, 0, 0, 0.17) inset,0px 12px 12px -12px rgba(0, 0, 0, 0.13) inset,0px 16px 16px -16px rgba(0, 0, 0, 0.13) inset;

--boxShadows-menu: 0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.12) inset, 0px 12px 24px 8px rgba(0, 0, 0, 0.04), 0px 8px 16px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px 2px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 0px 1px 0px rgba(0, 0, 0, 0.25);

--input-inner-shadow: 0px 1px 1px -1px rgba(0, 0, 0, 0.13) inset, 0px 3px 3px -3px rgba(0, 0, 0, 0.17) inset, 0px 4px 4px -4px rgba(0, 0, 0, 0.17) inset, 0px 8px 8px -8px rgba(0, 0, 0, 0.17) inset, 0px 12px 12px -12px rgba(0, 0, 0, 0.13) inset, 0px 16px 16px -16px rgba(0, 0, 0, 0.13) inset;

--menu-shadow: 0px 12px 24px 8px rgba(0, 0, 0, 0.08), 0px 8px 16px 4px rgba(0, 0, 0, 0.08), 0px 4px 8px 2px rgba(0, 0, 0, 0.08), 0px 2px 6px 0px rgba(0, 0, 0, 0.08), 0px -0.5px 0.5px 0px rgba(0, 0, 0, 0.12) inset, 0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.12) inset;

/* TYPOGRAPHY */
--font-stack: 'Inter', sans-serif;
--font-size-small: 11.5px;
--font-size-small-letter-spacing: -0.115px;
--font-size-large: 12.5px;
--font-weight-normal: 400;
--font-weight-medium: 600;
--border-radius: 4px;
```