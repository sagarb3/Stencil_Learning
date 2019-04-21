# Advanced Custom WebElements

- To simply mutate the css property instead of attribute change observer we can make a clever use of the :host function and use it implement style in child elements

  ````css
      :host([opened]) #backdrop {
          opacity:1;
          pointer-events:all;
      }
      :host([opened]) #modal {
          opacity:1;
          pointer-events:all;
      }```
  ````

## Public Method in Web Components

- Public method on the web-components can be referenced from the parent light dom

  ````js
      const confirmButton = document.querySelector("button");
      const modal = document.querySelector("sb3-modal");
      confirmButton.addEventListener("click", () => {
            modal.open();
        });```
  ````

## Assignation of title to slots

- Slots can be named and use in the light dom , multiple slot can be present in a web-component , to replace each slot content a property name need to be assigned to the slot and for using the slot , we need to pick the slot name and place it in out web component.

  **Refer code for sample**

## Custom Events on Web-Component
