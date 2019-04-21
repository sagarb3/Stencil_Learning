# Web Component Lifecycle

- Element Created => constructor() = > basic intiallizations

- Element attached to DOM => connectedCallback() => DOM intializations

- Element detached from DOM => disconnectedCallback() => Cleanup Work

- Observered Attribute updated => attributeChangedCallback() => Update Data + DOM

- Shadow DOM slot is not a part of shadow dom , instead it is a part of the light dom or main Dom

- Slotted Component can select the parent element only

## CSS Specificity

- Light Dom Style preceeds's the style of shadow dom

## Slotted and host selector

- For setting style on web components use :host selector

  ````css
   :host {
       background-color:red;
   }```

  ````

- For setting style of slotted component use ::slotted selector

  ```css
  ::slotted(span) {
    color: green;
  }
  ```

## Special Class Selectors in shadow dom

1. :host selector -- also serves as function wherein optional class name can be passed and the style will only be applied if the particular class is present
   example

   ```css
   :host {
     color: red;
   }
   :host(.customclass) {
     color: blue;
   }
   ```

2. :host-context -- depenidng on the parent context the child style is applied

   ````css
       :host-context(p){
          background:lightgreen
       }
       ```
   ````

3. ::slotted -- styles immediate parent element only , current restriction to only the parent element

\*\*You cannot use style rule like this
`css : host.xyz{}`

## Theming variables for web-components

1. Declare the css variables in the web-component

   ````css
       :host(.important){
           background:var(--color-primary,lightgrey);
        }
       ```
   ````

2. in the light dom pass the style

   ```css
   html {
     --color-primary: lightblue;
   }
   ```

## Attribute Watcher in Web Component

- To list an attribute to watch for change in value we need to add it into the following static function

  ````js
      static get observedAttribute() {
        return ["text"];
        }```
  ````

  here text is the attribute being watched

- Then to observer for the change the method attributeChangedCallback need to be used as a part of web-component lifecycle , it takes three input parameters \*name,oldValue,newValue
  example
  `js attributeChangedCallback(name,oldValue,newValue){}`

  - name : the attribute name
  - oldValue : the oldValue of the attribute
  - newValue: the changed value of the attribute

## Code Cleanup

- use method disconnectedCallback to cleanup the eventlisteners bound to the web-component

## Performance Optimization
