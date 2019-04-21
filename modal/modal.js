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
            top:15vh;
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
            <button>Cancel</button>
            <button>Okay</button>
        </section>
     </div>
    `;
  }
  connectedCallback() {}

  disconnectedCallback() {}

  _showModal() {}
  _hideModal() {}
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
}

customElements.define("sb3-modal", Modal);
