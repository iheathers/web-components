class Tooltip extends HTMLElement {
  static get observedAttributes() {
    return ['tooltip-text'];
  }

  constructor() {
    super();
    this._tooltipIcon;
    this._tootTipContentContainer;
    this._toolTipText = 'Default text';
    this.attachShadow({ mode: 'open' });

    // Remove html
    this.shadowRoot.innerHTML = `
      <style>
        div {
          position: absolute;
          padding: 1rem;
          border-radius: 0.25rem;
          background-color: black;
          color: white;
          left: 1rem;
        }

        :host(.purple) {
          border: 1px solid var(--color-primary, white);
          position: relative;
        }

        :host-context(span) {
          background-color: white;
        }

        ::slotted(.slotted) {
          color: black;
        }
      </style>
      <slot>Default slot value</slot>
      <span> (?) </span>
    `;
  }

  connectedCallback() {
    // console.log('Connected Callback Method called.');
    // console.dir(this);
    if (this.hasAttribute('tooltip-text')) {
      this._toolTipText = this.getAttribute('tooltip-text');
    }

    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseover',
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this)
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name }, { oldValue }, { newValue });

    if (oldValue === newValue) {
      return;
    }

    if (name === 'tooltip-text') {
      this._toolTipText = newValue;
    }
  }

  _showTooltip() {
    // console.log('showTooptip() called');

    this._tootTipContentContainer = document.createElement('div');
    this._tootTipContentContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._tootTipContentContainer);
  }

  _hideTooltip() {
    // console.log('hideTooltip called');

    this.shadowRoot.removeChild(this._tootTipContentContainer);
  }

  disconnectedCallback() {
    console.log('disconnectedCallback called');
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }
}

customElements.define('tb-tooltip', Tooltip);
