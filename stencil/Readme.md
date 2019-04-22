# Stencil Js

Stencil JS is used for designing the web-components in a more robust manner. Stencil js provides polyfill for old browser support

## Component Decorators

- tag : declare the tag which is used to call the element in html.

- scoped : emulate a shadow dom without using shadow dom , it add's a property to all the web-component.

- shadow : provides shadow dom natively supported by modern browser. For older browser polyfill.

## Using Prop's

- Prop() : decorator on class members to declare them as watchable attribute and property of the class,i.e we can use it either as an attribute on the selector or access it as a property of our custom element

  ````js
      var customComponent = document.querySelector('sb3-custom-component')
      customComponent.title = 'New Title'
      ```
  ````

  ```html
  <sb3-custom-component title="some-title"></sb3-custom-component>
  ```

## Limitation of the slots

- In General Styling of the slot is limited to the parent-element from the web-component , so for better style of slotted element , it is best to use the light dom.

## Decorators in Stencil

- Prop : For exposing a property to be set from outside , optionally with mutable true can be updated from inside, but by default not allowed

- State : For managing the local state inside the component , to manage the state of variable inside component , not accessible from outside

- Method : To make a web-component method public accessible this decorator need to used

- Component : To declare a stencil web-component

## API Key

## Styling Web Components

- By Default Web Components are inline element so we need to apply the proper display property to have the component pick up the correct styles.

## Refering Input

## Two way data-binding
