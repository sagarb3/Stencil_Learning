class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
     <style>
        #backdrop {
            position:fixed;
            top:0;
            left:0;
            height:100vh;
            width:100%;
            background-color:rgba(0,0,0,0.75);
            opacity:0;
            z-index:10;
            pointer-events:none;
        }

        header{
            padding:1rem;

        }
        header h1{
            font-size:1.25rem;
        }
        #modal {
            z-index:100;
            position:fixed;
            top:10vh;
            left:25%;
            width:50%;
            background:white;
            border-radius:3px;
            box-shadow:0px 2px 8px rgba(0,0,0,0.26);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            opacity:0;
            pointer-events:none;
            transition:all 0.3s ease-out;
        }
        #actions {
            border-top:1px solid #ccc;
            padding:1rem;
            display:flex;
            justify-content:flex-end;
        }
        #actions button {
            margin:0 0.25rem;
        }

        #main {
            padding:1rem;
        }

        :host([opened]) #backdrop {
            opacity:1;
            pointer-events:all;
        }
        :host([opened]) #modal {
            opacity:1;
            pointer-events:all;
        }

        :host([opened]) #modal {
          top:15vh;
        }

        ::slotted(h1){
            font-size:1.2rem;
        }
     </style>
     <div id="backdrop"></div>
     <div id="modal">
        <header>
           <slot name="title">
            <h1>Please confirm Payment</h1>
           </slot>
        </header>
        <section id="main">
            <slot></slot>
        </section>
        <section id="actions">
            <button id="cancel-btn">Cancel</button>
            <button id="confirm-btn">Okay</button>
        </section>
     </div>
    `;

    /** listening to slot content updated */
    const slots = this.shadowRoot.querySelector("slot");
    slots[1].addEventListener("slotchange", () => {
      console.dir(slots[1].assignedNodes());
    });

    const cancelButton = this.shadowRoot.querySelector("#cancel-btn");
    const confirmButton = this.shadowRoot.querySelector("#confirm-btn");
    const backdropClick = this.shadowRoot.querySelector("#backdrop");

    /** backdrop and cancel same events */
    cancelButton.addEventListener("click", this._cancel.bind(this));
    backdropClick.addEventListener("click", this._cancel.bind(this));

    /** confirm other event */
    confirmButton.addEventListener("click", this._confirm.bind(this));
  }
  connectedCallback() {}

  disconnectedCallback() {}

  hide() {}
  show() {}

  _render() {}
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
  static get observedAttribute() {
    return ["opened"];
  }
  open() {
    this.setAttribute("opened", "");
  }
  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
  }
  _confirm(event) {
    this.hide();
    const confirmEvent = new Event("confirm");
    // event.target.dispatchEvent(confirmEvent);
    this.dispatchEvent(confirmEvent);
  }
  _cancel(event) {
    this.hide();
    /** commeted is one way to do it */
    // const cancelEvent = new Event("cancel",{bubbles:true,composed:true});
    // event.target.dispatchEvent(cancelEvent);

    /**proper way */
    const cancelEvent = new Event("cancel");
    this.dispatchEvent(cancelEvent);
  }
}

customElements.define("sb3-modal", Modal);
