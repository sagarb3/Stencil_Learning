class Tooltip extends HTMLElement {
  constructor() {
    super();
    //this._toolTipContainer;
    this._toolTipContent;
    this._toolTipText = "Default Tooltip text";
    this._toolTipVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
         div {
             background-color:black;
             color:white;
             position:absolute;
             top:1.5rem;
             left:0.75rem;
             z-index:10;
             padding:0.15rem;
             border-radius:3px;
             box-shadow:1px 1px 6px rgba(0,0,0,0.26);
             font-weight:normal;
         }
         ::slotted(span){
             color:green;
         }
         .icon{
            background:black;
            color:white;
            padding:0.15rem 0.5rem;
            border-radius:50%;
            text-align:center;
         }
         :host{
            position:relative;
            font-weight:bold;
         }
         :host(.important){
            background:var(--color-primary,lightgrey);
            padding:0.15rem;
         }
         :host-context(p){
             font-weight:bold;
         }
        </style>
        <slot>Some default</slot>
        <span class="icon">(?)</span>`;
  }

  connectedCallback() {
    if (this.getAttribute("text")) {
      this._toolTipText = this.getAttribute("text");
    }
    this._toolTipIcon = this.shadowRoot.querySelector("span");
    this._toolTipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._toolTipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this._toolTipIcon);
    //this.style.position = "relative";
    this._render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    //console.log(name, oldValue, newValue);
    if (oldValue === newValue) {
      return;
    } else {
      if (name === "text") {
        this._toolTipText = newValue;
      }
    }
  }

  disconnectedCallback() {
    this._toolTipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._toolTipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  static get observedAttribute() {
    return ["text"];
  }

  _render() {
    let toolTipContainer = this.shadowRoot.querySelector("div");
    if (this._toolTipVisible) {
      toolTipContainer = document.createElement("div");
      toolTipContainer.textContent = this._toolTipText;
      this.shadowRoot.appendChild(toolTipContainer);
    } else {
      if (toolTipContainer) {
        this.shadowRoot.removeChild(toolTipContainer);
      }
    }
  }
  _showTooltip() {
    // this._toolTipContainer = document.createElement("div");
    // this._toolTipContainer.textContent = this._toolTipText;
    // this.shadowRoot.appendChild(this._toolTipContainer);
    this._toolTipVisible = true;
    this._render();
  }
  _hideTooltip() {
    // this.shadowRoot.removeChild(this._toolTipContainer);
    this._toolTipVisible = false;
    this._render();
  }
}

customElements.define("sb3-tooltip", Tooltip);
